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
    public class ReplyCommentController : ControllerBase
    {
        private IReplyCommentService _service;

        public ReplyCommentController(IReplyCommentService service)
        {
            _service = service;
        }

        [HttpPost("/addreplycomment")]
        public async Task<ReplyComment> AddReplyComment(ReplyCommentDTO replycomment)
        {
            return await _service.AddReplyComment(replycomment);
        }
       
        [HttpPut("/updatereplycomment/{id:int}")]
        public async Task<ReplyComment> UpdateReplyComment(int id, ReplyCommentDTO replycomment)
        {
            return await _service.UpdateReplyComment(id, replycomment);
        }
        [HttpDelete("/deletereplycomment/{id:int}")]
        public async Task DeleteReplyComment(int id)
        {
            await _service.DeleteReplyComment(id);
        }
    }
}