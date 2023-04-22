using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entities
{
    [Table("ReplyComment")]
    public class ReplyComment 
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }

        [Required]
        public int CommentId { get; set; }

        [Required]
        public string Text { get; set; }
        public DateTime CreateAt { get;set;} 
        public virtual Comment Comment { get; set; }
        public virtual User User { get; set; }
        public ICollection<LikeReplyComment> LikeReplyComments { get; set; }
    }
}