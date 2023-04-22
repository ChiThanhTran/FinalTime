using Microsoft.AspNetCore.Mvc;
using Server.DTO;
using Server.Entities;
using Server.Models;

namespace Server.Interfaces
{
    public interface ITagInPostService
    {
        Task<TagInPost> AddTagInPost(TagInPostDTO taginpost);

        Task DeleteTagInPost(int PostId, int TagId);
    }
}