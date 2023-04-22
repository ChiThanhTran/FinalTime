using Microsoft.EntityFrameworkCore;
using Server.DB;
using Server.DTO;
using Server.Entities;
using Server.Interfaces;

namespace Server.Services
{
    public class LikeCommentService : ILikeCommentService
    {
        private MyDBContext _context;

        public LikeCommentService(MyDBContext context)
        {
            _context = context;
        }

        public async Task<LikeComment> AddLikeComment(LikeCommentDTO likecomment)
        {           
            var foundComment = await _context.Comments.FindAsync(likecomment.CommentId);
            var foundUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == likecomment.UserId);
            if (foundComment != null && foundUser != null)
            {
                var item = new LikeComment
                {                   
                    CommentId = foundComment.Id,
                    UserId = foundUser.Id,
                    IsLikeComment = Enum.ELikeComment.Yes,
                };
                var validate = await _context.LikeComments.FirstOrDefaultAsync(u => u.UserId == likecomment.UserId && u.CommentId == likecomment.CommentId);
                if(validate == null){
                    var addingItem = await _context.LikeComments.AddAsync(item);
                    await _context.SaveChangesAsync();
                    return addingItem.Entity;
                }
                
            }
            return null;
        }
    
        public async Task DeleteLikeComment(int UserId, int CommentId)
        {
            var _likecomment = await _context.LikeComments.FirstOrDefaultAsync(u => u.UserId == UserId && u.CommentId == CommentId);
            if (_likecomment != null )
            {
                _context.LikeComments.Remove(_likecomment);
                await _context.SaveChangesAsync();
            }
        }
    }
}