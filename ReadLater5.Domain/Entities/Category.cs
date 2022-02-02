using System.ComponentModel.DataAnnotations;

namespace ReadLater5.Domain.Entities
{
    public class Category
    {
        [Key]
        public int ID { get; set; }

        [StringLength(maximumLength: 50)]
        public string Name { get; set; }
    }
}
