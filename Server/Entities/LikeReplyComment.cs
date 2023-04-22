using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Server.Enum;
namespace Server.Entities
{
    [Table("LikeReplyComment")]
    
    public class LikeReplyComment 
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required]
        public int UserId { get; set; }

        [Required]
        public int ReplyCommentId { get; set; }

        public ELikeReplyComment IsLikeReplyComment { get; set; }
        public virtual User User { get; set; }
        public virtual ReplyComment ReplyComment { get; set; }
    }
}