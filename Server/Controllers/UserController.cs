using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.Common;
using Server.DB;
using Server.DTO;
using Server.Entities;
using Server.Interfaces;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [EnableCors("MyPolicy")]
    // [Authorize(Roles = "Admin,Staff")]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        private MyDBContext _context;

        public UserController(IUserService userService, MyDBContext context)
        {
            _userService = userService;
            _context = context;
        }
        [HttpPost("/createuser")]
        public async Task<User> CreateUser(UserDTO user)
        {
            var addingUser = await _context.Users.AddAsync(
                new User
                {
                    Name = user.Name,
                    DateOfBirth = user.DateOfBirth,
                    Gender = user.Gender,
                    Type = Enum.Roles.Staff,
                    Username = user.UserName,
                    Password = user.Password,
                    Location = user.Location,
                    Email = user.Email,
                }
            );

            await _context.SaveChangesAsync();

            return addingUser.Entity;
        }

        [HttpGet("/getallusers")]
        public async Task<List<User>> GetAllUsers([FromQuery] Pagination userPaging, string location)
        {
            var count = _context.Users.Where(x => x.Location.ToLower().Contains(location.ToLower())).Count();

            Response.Headers.Add("User-Pagination", count.ToString());

            return await _userService.GetAllUsers(location, userPaging);
        }
        [HttpGet("/getalluserbytype")]
        public async Task<List<User>> GetAllUserByType(int type)
        {
            return await _userService.GetAllUserByType(type);
        }

        // [Authorize(Roles = "Admin")]
        [HttpDelete("/deleteuser/{id:int}")]
        public async Task DeleteUser(int id)
        {
            await _userService.DeleteUser(id);
        }

        [HttpGet("/getuser/{id:int}")]
        public async Task<User> GetUserById(int id)
        {
            return await _userService.GetUserById(id);
        }
      
        [HttpPut("/updateuser/{id:int}")]
        public async Task<User> UpdateUser(int id, UserDTO user)
        {
            return await _userService.UpdateUser(id, user);
        }
      
    }
}