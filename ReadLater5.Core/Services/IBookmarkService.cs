using ReadLater5.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReadLater5.Core.Services
{
    public interface IBookmarkService
    {
        Task AddBookmark(Bookmark bookmark);
        Task<List<Bookmark>> GetBookmarks();
        Task<Bookmark> GetBookmark(int Id);
        void DeleteBookmark(Bookmark bookmark);
        void EditBookmark(Bookmark bookmark);
    }
}
