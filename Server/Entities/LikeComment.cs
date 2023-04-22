using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Server.Enum;
namespace Server.Entities
{
    [Table("LikeComment")]
    public class LikeComment 
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public int UserId { get; set; }

        [Required]
        public int CommentId { get; set; }

        public ELikeComment IsLikeComment { get; set; }
        public virtual User? User { get; set; }
        public virtual Comment? Comment { get; set; }
    }
}