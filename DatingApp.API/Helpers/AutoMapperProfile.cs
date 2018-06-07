using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;

public class AutoMapperProfile: Profile {
    public AutoMapperProfile(){
        CreateMap<User, UserForListDto>()
            .ForMember(dest => dest.Age, opt => {
                opt.ResolveUsing(src => src.DateOfBirth.CalcularEdad());
            })
            .ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url);
            });


        CreateMap<User, UserForDetailedDto>()
            .ForMember(dest => dest.Age, opt => {
                opt.ResolveUsing(src => src.DateOfBirth.CalcularEdad());
            })
            .ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url);
            });

        CreateMap<Photo, PhotosForDetailedDto>();
    }

}