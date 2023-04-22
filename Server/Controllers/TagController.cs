using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Server.DTO;
using Server.Entities;
using Server.Interfaces;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    // [Authorize(Roles = "Admin")]
    public class TagController : ControllerBase
    {
        private ITagService _service;

        public TagController(ITagService service)
        {
            _service = service;
        }

        [HttpPost("/addtag")]
        public async Task<Tag> AddTag(TagDTO tag)
        {
            return await _service.AddTag(tag);
        }

        // [AllowAnonymous]
        [HttpGet("/getalltags")]
        public async Task<List<Tag>> GetAllTags()
        {
            return await _service.GetAllTags();
        }

        // [AllowAnonymous]
        [HttpGet("/gettag/{id:int}")]
        public async Task<Tag> GetTagById(int id)
        {
            return await _service.GetTagById(id);
        }
        [HttpPut("/updatetag/{id:int}")]
        public async Task<Tag> UpdateTag(int id, TagDTO tag)
        {
            return await _service.UpdateTag(id, tag);
        }
        [HttpDelete("/deletetag/{id:int}")]
        public async Task DeleteTag(int id)
        {
            await _service.DeleteTag(id);
        }
    }
}