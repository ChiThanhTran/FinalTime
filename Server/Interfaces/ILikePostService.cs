using Microsoft.AspNetCore.Mvc;
using Server.DTO;
using Server.Entities;
using Server.Models;

namespace Server.Interfaces
{
    public interface ILikePostService
    {
        Task<LikePost> AddLikePost(LikePostDTO likepost);

        Task DeleteLikePost(int UserId, int PostId);
    }
}