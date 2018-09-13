using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{

    [Authorize]
    [Route("api/users/{userId}/photos")]
    public class PhotoController: ControllerBase
    {
        private readonly IOptions<CloudinarySettings> _cloudinarySettings;
        private readonly IMapper _mapper;
        private readonly IDatingRepository _repo;
        private Cloudinary _cloudinary;

        public PhotoController(IDatingRepository repo, IOptions<CloudinarySettings> cloudinarySettings, IMapper mapper){
            this._repo = repo;
            this._mapper = mapper;
            this._cloudinarySettings = cloudinarySettings;

            Account acc = new Account(){
               ApiKey =  _cloudinarySettings.Value.ApiKey,
               ApiSecret = _cloudinarySettings.Value.ApiSecret,
               Cloud = _cloudinarySettings.Value.CloudName
            };

            _cloudinary = new Cloudinary(acc); 
        }

         [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, PhotoForCreationDto photoDto)
        {
            var user = await _repo.GetUser(userId);

            if (user == null)
                return BadRequest("Could not find user");

            var file = photoDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream)
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoDto.Url = uploadResult.Uri.ToString();
            photoDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoDto);

            photo.User = user;

            if (!user.Photos.Any(m => m.IsMain))
                photo.IsMain = true;

            user.Photos.Add(photo);
            

            if (await _repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new { id = photo.Id }, photoToReturn);
            }

            return BadRequest("Could not add the photo");
        }
        
    }
}