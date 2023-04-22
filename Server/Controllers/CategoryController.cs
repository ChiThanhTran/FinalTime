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
    public class CategoryController : ControllerBase
    {
        private ICategoryService _service;

        public CategoryController(ICategoryService service)
        {
            _service = service;
        }

        [HttpPost("/addcategory")]
        public async Task<Category> AddCategory(CategoryDTO category)
        {
            return await _service.AddCategory(category);
        }

        // [AllowAnonymous]
        [HttpGet("/getallcategories")]
        public async Task<List<Category>> GetAllCategories()
        {
            return await _service.GetAllCategories();
        }

        // [AllowAnonymous]
        [HttpGet("/getcategory/{id:int}")]
        public async Task<Category> GetCategoryById(int id)
        {
            return await _service.GetCategoryById(id);
        }
        [HttpPut("/updatecategory/{id:int}")]
        public async Task<Category> UpdateCategory(int id, CategoryDTO category)
        {
            return await _service.UpdateCategory(id, category);
        }
        [HttpDelete("/deletecategory/{id:int}")]
        public async Task DeleteCategory(int id)
        {
            await _service.DeleteCategory(id);
        }
    }
}