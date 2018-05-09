using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dto
{
    public class UserRegistroDto
    {
        [Required]
        public string Username { get; set; }
        
        [Required]
        [StringLength(8,MinimumLength = 4,ErrorMessage = "el password debe tener entre 4 y 8 caracteres")]
        public string Password { get; set; }
    }
}