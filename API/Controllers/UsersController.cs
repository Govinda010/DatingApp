using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController: BaseApiController
    {
        private readonly IPhotoService _photoService;
        
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository,IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
           _userRepository = userRepository; 
           _mapper = mapper;
        }

        //API EndPoint to get Users from Users table
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers(){
            var users = await _userRepository.GetUsersAsync();
            var userToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
            return Ok(userToReturn);
        }

        // API to return the User as Id
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>>GetUser(string username){
            return  await _userRepository.GetMemberDto(username);
        }
        
        // API to update the User Info
        [HttpPut]
        public async Task<ActionResult>UpdateUser(MemberUpdateDto memberUpdateDto)
        {            
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            if(user==null) return NotFound();
            _mapper.Map(memberUpdateDto,user);
            if(await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");


        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>>AddPhoto(IFormFile file)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            if(user == null) return NotFound();
            var result = await _photoService.AddPhotoAsync(file);
            if(result.Error !=null) return BadRequest(result.Error.Message);
            var photo = new Photo
            {
                Url = result.SecureUrl.AbsolutePath,
                PublicId = result.PublicId
            };
            if(user.Photos.Count==0)photo.IsMain = true;
            user.Photos.Add(photo);
            if(await _userRepository.SaveAllAsync()) return _mapper.Map<PhotoDto>(photo);
            return BadRequest("Problem adding photo");
        }

    }
}