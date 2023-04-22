using Microsoft.AspNetCore.Mvc;
using Server.DTO;
using Server.Entities;
using Server.Models;

namespace Server.Interfaces
{
    public interface ILikeCommentService
    {
        Task<LikeComment> AddLikeComment(LikeCommentDTO likecomment);

        Task DeleteLikeComment(int UserId, int CommentId);
    }
}