using Microsoft.AspNetCore.Mvc;
using Server.DTO;
using Server.Entities;
using Server.Models;

namespace Server.Interfaces
{
    public interface IPostService
    {
        Task<Post> AddPost(PostDTO post);

        Task<List<Post>> GetAllPosts();

        Task<Post> GetPostById(int id);

        Task<List<Post>> GetAllPostByStatus(int status);

        Task<List<Post>> GetAllPostByCategory(int categoryid);

        Task<Post> UpdatePost(int id, PostDTO post);

        Task DeletePost(int id);

        
    }
}