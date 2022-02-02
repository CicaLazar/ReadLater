using Microsoft.EntityFrameworkCore;
using ReadLater5.Core.Services;
using ReadLater5.Core.Services.Util;
using ReadLater5.Database;
using ReadLater5.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReadLater5.Infrastructure.Services
{
    public class BookmarkService : IBookmarkService
    {
        private readonly DataContext _dataContext;
        private readonly IClock _clock;

        public BookmarkService(DataContext readLaterDataContext,
            IClock clock)
        {
            _dataContext = readLaterDataContext;
            _clock = clock;
        }

        public async Task AddBookmark(Bookmark bookmark)
        {
            bookmark.CreateDate = _clock.NowUtc;

            await _dataContext
                .AddAsync(bookmark);

            _dataContext
                .SaveChanges();
        }

        public void EditBookmark(Bookmark bookmark)
        {
            _dataContext
                .Update(bookmark);

            _dataContext
                .SaveChanges();
        }

        public async Task<List<Bookmark>> GetBookmarks()
        {
            return await _dataContext
                .Bookmarks
                .Include(x => x.Category)
                .ToListAsync();
        }

        public async Task<Bookmark> GetBookmark(int Id)
        {
            return await _dataContext
                .Bookmarks
                .FirstOrDefaultAsync(c => c.ID == Id);
        }

        public void DeleteBookmark(Bookmark bookmark)
        {
            _dataContext.Bookmarks.Remove(bookmark);
            _dataContext.SaveChanges();
        }
    }
}
