using Microsoft.AspNetCore.Mvc;
using Server.DTO;
using Server.Entities;
using Server.Models;

namespace Server.Interfaces
{
    public interface ICommentService
    {
        Task<Comment> AddComment(CommentDTO comment);

        Task<Comment> UpdateComment(int id, CommentDTO comment);

        Task DeleteComment(int id);
    }
}