using Microsoft.EntityFrameworkCore;
using ReadLater5.Core.Services;
using ReadLater5.Database;
using ReadLater5.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReadLater5.Infrastructure.Services
{
    public class CategoryService : ICategoryService
    {
        private DataContext _dataContext;

        public CategoryService(DataContext readLaterDataContext)
        {
            _dataContext = readLaterDataContext;
        }

        public async Task AddCategory(Category category)
        {
            await _dataContext
                .AddAsync(category);

            _dataContext
                .SaveChanges();
        }

        public void EditCategory(Category category)
        {
            _dataContext
                .Update(category);

            _dataContext
                .SaveChanges();
        }

        public async Task<List<Category>> GetCategories()
        {
            return await _dataContext
                .Categories
                .ToListAsync();
        }

        public async Task<Category> GetCategory(int Id)
        {
            return await _dataContext
                .Categories
                .FirstOrDefaultAsync(c => c.ID == Id);
        }

        public void DeleteCategory(Category category)
        {
            _dataContext.Categories.Remove(category);
            _dataContext.SaveChanges();
        }
    }
}
