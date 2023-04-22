using Microsoft.AspNetCore.Mvc;
using Server.DTO;
using Server.Entities;
using Server.Models;

namespace Server.Interfaces
{
    public interface ICategoryService
    {
        Task<Category> AddCategory(CategoryDTO category);

        Task<List<Category>> GetAllCategories();

        Task<Category> GetCategoryById(int id);

        Task<Category> UpdateCategory(int id, CategoryDTO category);

        Task DeleteCategory(int id);

        
    }
}