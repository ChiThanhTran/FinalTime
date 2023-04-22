using Microsoft.EntityFrameworkCore;
using Server.DB;
using Server.DTO;
using Server.Entities;
using Server.Interfaces;

namespace Server.Services
{
    public class LikePostService : ILikePostService
    {
        private MyDBContext _context;

        public LikePostService(MyDBContext context)
        {
            _context = context;
        }

        public async Task<LikePost> AddLikePost(LikePostDTO likepost)
        {           
            var foundPost = await _context.Posts.FindAsync(likepost.PostId);
            var foundUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == likepost.UserId);
            if (foundPost != null && foundUser != null)
            {
                var item = new LikePost
                {                   
                    PostId = foundPost.Id,
                    UserId = foundUser.Id,
                    IsLikePost = Enum.ELikePost.Yes,
                };
                var validate = await _context.LikePosts.FirstOrDefaultAsync(u => u.UserId == likepost.UserId && u.PostId == likepost.PostId);
                if (validate == null){
                    var addingItem = await _context.LikePosts.AddAsync(item);
                    await _context.SaveChangesAsync();
                    return addingItem.Entity;
                }
                
            }
            return null;
        }
    
        public async Task DeleteLikePost(int UserId, int PostId)
        {
            var _likepost = await _context.LikePosts.FirstOrDefaultAsync(u => u.UserId == UserId && u.PostId == PostId);
            if (_likepost != null)
            {
                _context.LikePosts.Remove(_likepost);

                await _context.SaveChangesAsync();
            }
        }
    }
}