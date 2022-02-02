using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReadLater5.Core.Services;
using ReadLater5.Domain.Entities;
using System.Threading.Tasks;

namespace ReadLater5.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : ControllerBase
    {

        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }


        [HttpGet]
        [Route("getall")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(
                await _categoryService
                    .GetCategories()
            );
        }


        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Add(Category category)
        {
            await _categoryService
                .AddCategory(category);

            return Ok(
                new
                {
                    message = "Category added successfully"
                }
            );
        }

        [HttpPost]
        [Route("edit")]
        public IActionResult Edit(Category category)
        {
            _categoryService
                .EditCategory(category);

            return Ok(
                new
                {
                    message = "Category updated successfully"
                }
            );
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(
                await _categoryService.GetCategory(id)
            );
        }

        [HttpPost]
        [Route("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _categoryService
                .GetCategory(id);

            _categoryService
                .DeleteCategory(category);

            return Ok(
                new
                {
                    message = "Category deleted successfully"
                }
            );
        }
    }
}
