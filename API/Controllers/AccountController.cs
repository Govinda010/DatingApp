
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Enitites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController: BaseApiController
    {
        private readonly DataContext _context;
        public AccountController(DataContext context)
        {
            _context = context;
            
        }

        [HttpPost("register")] //Post: api/account/register
        public async Task<ActionResult<AppUser>>Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");
            using var hmac = new HMACSHA512();
            var user = new AppUser()
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PassowrdSlat = hmac.Key

            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
        private async Task<bool>UserExists(string username)
        {
            return await _context.Users.AnyAsync(x=>x.UserName== username.ToLower());
        }
        
    }
}