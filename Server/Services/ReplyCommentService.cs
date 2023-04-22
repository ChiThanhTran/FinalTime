using Microsoft.EntityFrameworkCore;
using Server.DB;
using Server.DTO;
using Server.Entities;
using Server.Interfaces;

namespace Server.Services
{
    public class ReplyCommentService : IReplyCommentService
    {
        private MyDBContext _context;

        public ReplyCommentService(MyDBContext context)
        {
            _context = context;
        }

        public async Task<ReplyComment> AddReplyComment(ReplyCommentDTO replycomment)
        {           
            var foundComment = await _context.Comments.FindAsync(replycomment.CommentId);
            var foundUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == replycomment.UserId);
            if (foundComment!= null && foundUser != null)
            {
                var item = new ReplyComment
                {                   
                    CommentId = foundComment.Id,
                    UserId = foundUser.Id,
                    Text = replycomment.Text,
                    CreateAt = replycomment.CreateAt,
                };

                var addingItem = await _context.ReplyComments.AddAsync(item);

                await _context.SaveChangesAsync();

                return addingItem.Entity;
            }
            return null;
        }
      
        public async Task<ReplyComment> UpdateReplyComment(int id, ReplyCommentDTO replycomment)
        {
            var _replycomment = await _context.ReplyComments.FindAsync(id);
            if (_replycomment != null)
            {
                _replycomment.Text = replycomment.Text;
                _context.ReplyComments.Update(_replycomment);
                await _context.SaveChangesAsync();
                return _replycomment;
            }
            return null;
        }
        public async Task DeleteReplyComment(int id)
        {
            var _replycomment = await _context.ReplyComments.FindAsync(id);
            if (_replycomment != null)
            {
                _context.ReplyComments.Remove(_replycomment);

                await _context.SaveChangesAsync();
            }
        }
    }
}