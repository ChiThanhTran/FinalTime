using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Server.Enum;

namespace Server.DTO
{
    public class UserDTO
    {
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

        
        public string? UserName { get; set; }
      
        public string? Password { get; set; }

        public string? Phone { get; set; }

        public string? Bio { get; set; }

        public string? Location { get; set; }

        [JsonIgnore]
        public int Follower { get; set; }

        [JsonIgnore]
        public int Following { get; set; }

        public string? Image { get; set; }

        public string? BackgroundImage { get; set; }
    }
}