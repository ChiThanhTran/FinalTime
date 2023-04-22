using Microsoft.EntityFrameworkCore;
using Server.DB;
using Server.DTO;
using Server.Entities;
using Server.Interfaces;

namespace Server.Services
{
    public class TagInPostService : ITagInPostService
    {
        private MyDBContext _context;

        public TagInPostService(MyDBContext context)
        {
            _context = context;
        }

        public async Task<TagInPost> AddTagInPost(TagInPostDTO taginpost)
        {           
            var foundPost = await _context.Posts.FindAsync(taginpost.PostId);
            var foundTag = await _context.Tags.FindAsync(taginpost.TagId);
            if (foundPost != null && foundTag != null)
            {
                var item = new TagInPost
                {                   
                    PostId = foundPost.Id,
                    TagId = foundTag.Id,
                };             
                var validate = await _context.TagInPosts.FirstOrDefaultAsync(u => u.TagId == taginpost.TagId && u.PostId == taginpost.PostId);
                if (validate == null){
                    var addingItem = await _context.TagInPosts.AddAsync(item);
                    await _context.SaveChangesAsync();
                    return addingItem.Entity;
                }
            }
            return null;
        }
    
        public async Task DeleteTagInPost(int TagId, int PostId)
        {      
            var _taginpost = await _context.TagInPosts.FirstOrDefaultAsync(u => u.TagId == TagId && u.PostId == PostId);
            if (_taginpost != null)
            {
                _context.TagInPosts.Remove(_taginpost);

                await _context.SaveChangesAsync();
            }
        }
    }
}