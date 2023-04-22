using Microsoft.AspNetCore.Mvc;
using Server.DTO;
using Server.Entities;
using Server.Models;

namespace Server.Interfaces
{
    public interface ITagService
    {
        Task<Tag> AddTag(TagDTO tag);

        Task<List<Tag>> GetAllTags();

        Task<Tag> GetTagById(int id);

        Task<Tag> UpdateTag(int id, TagDTO tag);

        Task DeleteTag(int id);
    }
}