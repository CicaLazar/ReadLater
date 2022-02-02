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
    public class BookmarksController : ControllerBase
    {

        private readonly IBookmarkService _bookmarkService;

        public BookmarksController(IBookmarkService bookmarkService)
        {
            _bookmarkService = bookmarkService;
        }


        [HttpGet]
        [Route("getall")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(
                await _bookmarkService
                    .GetBookmarks()
            );
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Add(Bookmark bookmark)
        {
            await _bookmarkService
                .AddBookmark(bookmark);

            return Ok(
                new
                {
                    message = "Category added successfully"
                }
            );
        }

        [HttpPost]
        [Route("edit")]
        public IActionResult Edit(Bookmark bookmark)
        {
            _bookmarkService
                .EditBookmark(bookmark);

            return Ok(
                new
                {
                    message = "Bookmark updated successfully"
                }
            );
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(
                await _bookmarkService.GetBookmark(id)
            );
        }

        [HttpPost]
        [Route("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            var bookmark = await _bookmarkService
                .GetBookmark(id);

            _bookmarkService
                .DeleteBookmark(bookmark);

            return Ok(
                new
                {
                    message = "Vookmark deleted successfully"
                }
            );
        }
    }
}
