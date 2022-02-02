using ReadLater5.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReadLater5.Core.Services
{
    public interface ICategoryService
    {
        Task AddCategory(Category category);
        Task<List<Category>> GetCategories();
        Task<Category> GetCategory(int Id);
        void DeleteCategory(Category category);
        void EditCategory(Category category);
    }
}
