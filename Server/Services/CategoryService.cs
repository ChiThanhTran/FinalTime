using Microsoft.EntityFrameworkCore;
using Server.DB;
using Server.DTO;
using Server.Entities;
using Server.Interfaces;

namespace Server.Services
{
    public class CategoryService : ICategoryService
    {
        private MyDBContext _context;

        public CategoryService(MyDBContext context)
        {
            _context = context;
        }

        public async Task<Category> AddCategory(CategoryDTO category)
        {
            var foundCategory = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryName.ToLower() == category.CategoryName.ToLower());
            if (foundCategory == null)
            {
                var item = new Category
                {
                    CategoryName = category.CategoryName,
                    CategoryBio = category.CategoryBio
                };

                var addingItem = await _context.Categories.AddAsync(item);

                await _context.SaveChangesAsync();

                return addingItem.Entity;
            }
            return null;
        }

        public async Task<List<Category>> GetAllCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category> GetCategoryById(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category != null)
            {
                return category;
            }
            return null;
        }
        public async Task<Category> UpdateCategory(int id, CategoryDTO category)
        {
            var _category = await _context.Categories.FindAsync(id);
            if (_category != null)
            {
                _category.CategoryName = category.CategoryName;
                _category.CategoryBio = category.CategoryBio;
                _context.Categories.Update(_category);
                await _context.SaveChangesAsync();
                return _category;
            }
            return null;
        }
        public async Task DeleteCategory(int id)
        {
            var _category = await _context.Categories.FindAsync(id);
            if (_category != null)
            {
                _context.Categories.Remove(_category);

                await _context.SaveChangesAsync();
            }
        }
    }
}