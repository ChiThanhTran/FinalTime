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
    public class PostController : ControllerBase
    {
        private IPostService _service;

        public PostController(IPostService service)
        {
            _service = service;
        }

        [HttpPost("/addpost")]
        public async Task<Post> AddPost(PostDTO post)
        {
            return await _service.AddPost(post);
        }

        // [AllowAnonymous]
        [HttpGet("/getallposts")]
        public async Task<List<Post>> GetAllPosts()
        {
            return await _service.GetAllPosts();
        }
        [HttpGet("/getallpostbystatus")]
        public async Task<List<Post>> GetAllPostByStatus(int status)
        {
            return await _service.GetAllPostByStatus(status);
        }
        [HttpGet("/getallpostbycategory")]
        public async Task<List<Post>> GetAllPostByCategory(int categoryid)
        {
            return await _service.GetAllPostByCategory(categoryid);
        }

        // [AllowAnonymous]
        [HttpGet("/getpost/{id:int}")]
        public async Task<Post> GetPostById(int id)
        {
            return await _service.GetPostById(id);
        }
        
        [HttpPut("/updatepost/{id:int}")]
        public async Task<Post> UpdatePost(int id, PostDTO post)
        {
            return await _service.UpdatePost(id, post);
        }
        [HttpDelete("/deletepost/{id:int}")]
        public async Task DeletePost(int id)
        {
            await _service.DeletePost(id);
        }
    }
}