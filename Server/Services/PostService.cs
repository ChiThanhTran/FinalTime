using Microsoft.EntityFrameworkCore;
using Server.DB;
using Server.DTO;
using Server.Entities;
using Server.Interfaces;
using Server.Models;

namespace Server.Services
{
    public class PostService : IPostService
    {
        private MyDBContext _context;

        public PostService(MyDBContext context)
        {
            _context = context;
        }

        public async Task<Post> AddPost(PostDTO post)
        {
            var foundPost = await _context.Posts.FirstOrDefaultAsync(x => x.PostTitle.ToLower() == post.PostTitle.ToLower());
            var foundCategory = await _context.Categories.FindAsync(post.CategoryId);
            var foundUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == post.UserId);
            if (foundPost == null && foundCategory != null && foundUser != null)
            {
                var item = new Post
                {
                    PostTitle = post.PostTitle,
                    PostDay = post.PostDay,
                    Specification = post.Specification,
                    Description = post.Description,
                    Status = Enum.Status.WaitingForAcceptance,
                    CategoryId = foundCategory.Id,
                    UserId = foundUser.Id,
                    TitleImage = post.TitleImage,
                    View = post.View,
                };

                var addingItem = await _context.Posts.AddAsync(item);

                await _context.SaveChangesAsync();

                return addingItem.Entity;
            }
            return null;
        }

        public async Task<List<Post>> GetAllPosts()
        {
            return await _context.Posts.ToListAsync();
        }
        public async Task<List<Post>> GetAllPostByStatus(int status)
        {
            return await _context.Posts.Where(x =>(int) x.Status == status).ToListAsync();
        }
        public async Task<List<Post>> GetAllPostByCategory(int categoryid)
        {
            return await _context.Posts.Where(x =>(int) x.CategoryId == categoryid).ToListAsync();
        }
        public async Task<Post> GetPostById(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post != null)
            {
                return post;
            }
            return null;
        }
        public async Task<Post> UpdatePost(int id, PostDTO post)
        {
            var _post = await _context.Posts.FindAsync(id);
            if (_post != null)
            {
                _post.PostTitle = post.PostTitle;
                _post.Specification = post.Specification;
                _post.Description = post.Description;
                _post.Status = post.Status;
                _post.TitleImage = post.TitleImage;
                _post.View = post.View;
                _context.Posts.Update(_post);
                await _context.SaveChangesAsync();
                return _post;
            }
            return null;
        }
        public async Task DeletePost(int id)
        {
            var _post = await _context.Posts.FindAsync(id);
            if (_post != null)
            {
                _context.Posts.Remove(_post);

                await _context.SaveChangesAsync();
            }
        }
    }
}