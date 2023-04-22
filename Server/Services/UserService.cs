using Microsoft.EntityFrameworkCore;
using Server.DB;
using Server.DTO;
using Server.Entities;
using Server.Interfaces;
using Server.Models;

namespace Server.Services
{
    public class UserService : IUserService
    {
        private MyDBContext _context;

        public UserService(MyDBContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetAllUsers(string location, Pagination userPaging)
        {
            return await _context.Users.Where(x => x.Location.ToLower().Contains(location.ToLower())).Skip((userPaging.PageNumber - 1) * userPaging.PageSize).Take(userPaging.PageSize).ToListAsync();
        }
        public async Task<List<User>> GetAllUserByType(int type)
        {
            return await _context.Users.Where(x =>(int) x.Type == type).ToListAsync();
        }

        public async Task<User> GetUserById(int id)
        {
            var _user = await _context.Users.FindAsync(id);
            if (_user != null)
            {
                return _user;
            }
            return null;
        }       
        public async Task<User> UpdateUser(int id, UserDTO user)
        {
            var _user = await _context.Users.FindAsync(id);
            if (_user != null)
            {
                _user.Name = user.Name;
                _user.DateOfBirth = user.DateOfBirth;
                _user.Gender = user.Gender;
                _user.Type = user.Type;
                _user.Email = user.Email;
                _user.Phone = user.Phone;
                _user.Bio = user.Bio;
                _user.Location = user.Location;
                _user.Image = user.Image;
                _user.BackgroundImage = user.BackgroundImage;
                _user.Password = user.Password;
                _context.Users.Update(_user);
                await _context.SaveChangesAsync();
                return _user;
            }
            return null;
        }
        public async Task DeleteUser(int id)
        {
            var _user = await _context.Users.FindAsync(id);
            if (_user != null)
            {
                _context.Users.Remove(_user);

                await _context.SaveChangesAsync();
            }
        }
    }
}