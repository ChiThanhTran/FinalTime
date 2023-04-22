using Microsoft.AspNetCore.Mvc;
using Server.DTO;
using Server.Entities;
using Server.Models;

namespace Server.Interfaces
{
    public interface ILikeReplyCommentService
    {
        Task<LikeReplyComment> AddLikeReplyComment(LikeReplyCommentDTO likereplycomment);

        Task DeleteLikeReplyComment(int UserId, int ReplyCommentId);
    }
}