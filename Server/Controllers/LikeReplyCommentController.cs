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
    public class LikeReplyCommentController : ControllerBase
    {
        private ILikeReplyCommentService _service;

        public LikeReplyCommentController(ILikeReplyCommentService service)
        {
            _service = service;
        }

        [HttpPost("/addlikereplycomment")]
        public async Task<LikeReplyComment> AddLikeReplyComment(LikeReplyCommentDTO likereplycomment)
        {
            return await _service.AddLikeReplyComment(likereplycomment);
        }
           
        [HttpDelete("/deletelikereplycomment")]
        public async Task DeleteLikeReplyComment(int UserId, int ReplyCommentId)
        {
            await _service.DeleteLikeReplyComment(UserId, ReplyCommentId);
        }
    }
}