using Microsoft.EntityFrameworkCore;
using Server.DB;
using Server.DTO;
using Server.Entities;
using Server.Interfaces;

namespace Server.Services
{
    public class SafeService : ISafeService
    {
        private MyDBContext _context;

        public SafeService(MyDBContext context)
        {
            _context = context;
        }

        public async Task<Safe> AddSafe(SafeDTO safe)
        {           
            var foundPost = await _context.Posts.FindAsync(safe.PostId);
            var foundUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == safe.UserId);
            if (foundPost != null && foundUser != null)
            {
                var item = new Safe
                {                   
                    PostId = foundPost.Id,
                    UserId = foundUser.Id,
                    IsSafe = Enum.ESafe.Yes,
                };
                var validate = await _context.Safes.FirstOrDefaultAsync(u => u.UserId == safe.UserId && u.PostId == safe.PostId);
                if (validate == null){
                    var addingItem = await _context.Safes.AddAsync(item);
                    await _context.SaveChangesAsync();
                    return addingItem.Entity;
                }
            }
            return null;
        }
    
        public async Task DeleteSafe(int UserId, int PostId)
        {
            var _safe = await _context.Safes.FirstOrDefaultAsync(u => u.UserId == UserId && u.PostId == PostId);
            if (_safe != null)
            {
                _context.Safes.Remove(_safe);

                await _context.SaveChangesAsync();
            }
        }
    }
}