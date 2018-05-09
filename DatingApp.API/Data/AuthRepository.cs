using System;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _ctx;
        public AuthRepository(DataContext ctx)
        {
            _ctx = ctx;

        }
        public async Task<User> Login(string userName, string password)
        {
            var user = await _ctx.Users.FirstOrDefaultAsync(x=> x.Username == userName);
            if(user == null)
                return  null;

            if(!VerificarPassword(password, user.PasswordSalt, user.PasswordHash)){
                return null;
            }

            return user;
        }

        private bool VerificarPassword(string password, byte[] passwordSalt, byte[] passwordHash)
        {
            byte[] checkHash;
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt)){
                checkHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

            for (int i = 0; i < passwordHash.Length; i++)
            {
                if(checkHash[i] != passwordHash[i]){
                    return false;
                }
            }

            return true;
        }

        public async Task<User> Register(string userName, string password)
        {
            byte[] passwordSalt, passwordHash;
            CreatePasswordSalt(password, out passwordSalt, out passwordHash);

            var user = new User(){
                Username = userName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            await _ctx.Users.AddAsync(user);
            await _ctx.SaveChangesAsync();
            return user;

        }

        private void CreatePasswordSalt(string password, out byte[] passwordSalt, out byte[] passwordHash)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512()){
                passwordSalt =  hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExist(string userName)
        {
            return await _ctx.Users.AnyAsync(x=> x.Username == userName);
        }
    }
}