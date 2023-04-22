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
    public class TagInPostController : ControllerBase
    {
        private ITagInPostService _service;

        public TagInPostController(ITagInPostService service)
        {
            _service = service;
        }

        [HttpPost("/addtaginpost")]
        public async Task<TagInPost> AddTagInPost(TagInPostDTO taginpost)
        {
            return await _service.AddTagInPost(taginpost);
        }
           
        [HttpDelete("/deletetaginpost")]
        public async Task DeleteTagInPost(int TagId, int PostId)
        {
            await _service.DeleteTagInPost(TagId, PostId);
        }
    }
}