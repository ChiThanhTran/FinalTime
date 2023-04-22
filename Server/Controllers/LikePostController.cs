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
    public class LikePostController : ControllerBase
    {
        private ILikePostService _service;

        public LikePostController(ILikePostService service)
        {
            _service = service;
        }

        [HttpPost("/addlikepost")]
        public async Task<LikePost> AddLikePost(LikePostDTO likepost)
        {
            return await _service.AddLikePost(likepost);
        }
           
        [HttpDelete("/deletelikepost")]
        public async Task DeleteLikePost(int UserId, int PostId)
        {
            await _service.DeleteLikePost(UserId, PostId);
        }
    }
}