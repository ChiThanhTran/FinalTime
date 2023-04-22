using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Server.Enum;

namespace Server.Entities
{
    [Table("User")]
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public Gender Gender { get; set; }
        [Required]  
        public Roles Type { get; set; }

        [Required]
        public string Email { get; set; }
        
        public string? Phone { get; set; }

        public string? Bio { get; set; }

        [Required]
        public string? Username { get; set; }

        [Required]
        public string? Password { get; set; }

        public string? Location { get; set; }

        public int Follower { get; set; }

        public int Following { get; set; }

        public string? Image { get; set; }

        public string? BackgroundImage { get; set; }

        [JsonIgnore]
        public ICollection<Post> Posts { get; set; }

        [JsonIgnore]
        public ICollection<Comment> Comments { get; set; }

        [JsonIgnore]
        public ICollection<ReplyComment> ReplyComments { get; set; }

        [JsonIgnore]
        public ICollection<LikePost> LikePosts { get; set; }

        [JsonIgnore]
        public ICollection<LikeComment> LikeComments { get; set; }

        [JsonIgnore]
        public ICollection<LikeReplyComment> LikeReplyComments { get; set; }

        [JsonIgnore]
        public ICollection<Safe> Safes { get; set; }
    }
}