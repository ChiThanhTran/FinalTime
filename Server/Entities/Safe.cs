using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Server.Enum;
namespace Server.Entities
{
    [Table("Safe")]
    public class Safe 
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required]
        public int UserId { get; set; }

        [Required]
        public int PostId { get; set; }

        public ESafe IsSafe { get;set;}
        public virtual User User { get; set; }
        public virtual Post Post { get; set; }
    }
}