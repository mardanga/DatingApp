using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Login (string userName, string password);
         Task<User> Register (string userName, string password);
         Task<bool> UserExist (string userName);
    }
}