using Microsoft.EntityFrameworkCore;
using Server.DB;
using Server.DTO;
using Server.Entities;
using Server.Interfaces;

namespace Server.Services
{
    public class TagService : ITagService
    {
        private MyDBContext _context;

        public TagService(MyDBContext context)
        {
            _context = context;
        }

        public async Task<Tag> AddTag(TagDTO tag)
        {
            var foundTag = await _context.Tags.FirstOrDefaultAsync(x => x.TagName.ToLower() == tag.TagName.ToLower());
            if (foundTag == null)
            {
                var item = new Tag
                {
                    TagName = tag.TagName,
                };

                var addingItem = await _context.Tags.AddAsync(item);

                await _context.SaveChangesAsync();

                return addingItem.Entity;
            }
            return null;
        }

        public async Task<List<Tag>> GetAllTags()
        {
            return await _context.Tags.ToListAsync();
        }

        public async Task<Tag> GetTagById(int id)
        {
            var tag = await _context.Tags.FindAsync(id);
            if (tag != null)
            {
                return tag;
            }
            return null;
        }
        public async Task<Tag> UpdateTag(int id, TagDTO tag)
        {
            var _tag = await _context.Tags.FindAsync(id);
            if (_tag != null)
            {
                _tag.TagName = tag.TagName;
                _context.Tags.Update(_tag);
                await _context.SaveChangesAsync();
                return _tag;
            }
            return null;
        }
        public async Task DeleteTag(int id)
        {
            var _tag = await _context.Tags.FindAsync(id);
            if (_tag != null)
            {
                _context.Tags.Remove(_tag);

                await _context.SaveChangesAsync();
            }
        }
    }
}