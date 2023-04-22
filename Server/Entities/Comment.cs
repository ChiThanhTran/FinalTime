using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entities
{
    [Table("Comment")]
    public class Comment 
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int PostId { get; set; }

        [Required]
        public string? Text { get; set; }
        
        public DateTime CreateAt { get;set;} 
        public virtual Post? Post { get; set; }
        public virtual User? User { get; set; }
        public ICollection<ReplyComment>? ReplyComments { get; set; }
        public ICollection<LikeComment>? LikeComments { get; set; }
    }
}