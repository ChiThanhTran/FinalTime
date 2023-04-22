using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Server.Entities
{
    [Table("TagInPost")]
    
    public class TagInPost 
    {   
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public int TagId { get; set; }

        [Required]
        public int PostId { get; set; }

        public virtual Tag? Tag { get; set; }
        public virtual Post? Post { get; set; }
    }
}