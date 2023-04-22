using Microsoft.EntityFrameworkCore;
using Server.DB;
using Server.DTO;
using Server.Entities;
using Server.Interfaces;

namespace Server.Services
{
    public class LikeReplyCommentService : ILikeReplyCommentService
    {
        private MyDBContext _context;

        public LikeReplyCommentService(MyDBContext context)
        {
            _context = context;
        }

        public async Task<LikeReplyComment> AddLikeReplyComment(LikeReplyCommentDTO likereplycomment)
        {           
            var foundReplyComment = await _context.ReplyComments.FindAsync(likereplycomment.ReplyCommentId);
            var foundUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == likereplycomment.UserId);
            if (foundReplyComment != null && foundUser != null)
            {
                var item = new LikeReplyComment
                {                   
                    ReplyCommentId = foundReplyComment.Id,
                    UserId = foundUser.Id,
                    IsLikeReplyComment = Enum.ELikeReplyComment.Yes,
                };               
                var validate = await _context.LikeReplyComments.FirstOrDefaultAsync(u => u.UserId == likereplycomment.UserId && u.ReplyCommentId == likereplycomment.ReplyCommentId);
                if(validate == null){
                    var addingItem = await _context.LikeReplyComments.AddAsync(item);
                    await _context.SaveChangesAsync();
                    return addingItem.Entity;
                }
            }
            return null;
        }
    
        public async Task DeleteLikeReplyComment(int UserId, int ReplyCommentId)
        {
            var _likereplycomment = await _context.LikeReplyComments.FirstOrDefaultAsync(u => u.UserId == UserId && u.ReplyCommentId == ReplyCommentId);
            if (_likereplycomment != null )
            {
                _context.LikeReplyComments.Remove(_likereplycomment);
                await _context.SaveChangesAsync();
            }
        }
    }
}