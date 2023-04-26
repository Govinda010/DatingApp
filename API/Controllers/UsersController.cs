using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController: BaseApiController
    {
        
        private readonly IUserRepository _repository;
        public UsersController(IUserRepository repository)
        {
           _repository = repository; 
        }

        //API EndPoint to get Users from Users table
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers(){
            return Ok(await _repository.GetUsersAsync());
        }

        // API to return the User as Id
        [HttpGet("{username}")]
        public async Task<ActionResult<AppUser>>GetUser(string username){
            return await _repository.GetUserByUsernameAsync(username);
        }

    }
}