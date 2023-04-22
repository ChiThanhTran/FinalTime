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
    public class LikeCommentController : ControllerBase
    {
        private ILikeCommentService _service;

        public LikeCommentController(ILikeCommentService service)
        {
            _service = service;
        }

        [HttpPost("/addlikecomment")]
        public async Task<LikeComment> AddLikeComment(LikeCommentDTO likecomment)
        {
            return await _service.AddLikeComment(likecomment);
        }
           
        [HttpDelete("/deletelikecomment")]
        public async Task DeleteLikeComment(int UserId, int CommentId)
        {
            await _service.DeleteLikeComment(UserId, CommentId);
        }
    }
}