using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Server.Enum;

namespace Server.Entities
{
    [Table("Post")]
    public class Post
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        [Required]
        public string PostTitle { get; set; }

        [Required]
        public DateTime PostDay { get; set; }

        [Required]
        public string? Specification { get; set; }

        [Required]
        public string? Description { get; set; }

        public int CategoryId { get; set; }

        public int UserId { get; set; }

        public Status Status { get; set; }
        
        public string? TitleImage { get; set; }
        public string View { get; set;}
        public virtual Category Category { get; set; }
        public virtual User User { get; set; }

        public ICollection<Comment> Comments { get; set; }
        public ICollection<LikePost> LikePosts { get; set; }
        public ICollection<Safe> Safes { get; set; }
        public ICollection<TagInPost> TagInPosts { get; set; }
        
    }
}