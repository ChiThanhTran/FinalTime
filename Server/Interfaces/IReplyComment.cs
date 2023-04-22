using Microsoft.AspNetCore.Mvc;
using Server.DTO;
using Server.Entities;
using Server.Models;

namespace Server.Interfaces
{
    public interface IReplyCommentService
    {
        Task<ReplyComment> AddReplyComment(ReplyCommentDTO replycomment);

        Task<ReplyComment> UpdateReplyComment(int id, ReplyCommentDTO replycomment);

        Task DeleteReplyComment(int id);
    }
}