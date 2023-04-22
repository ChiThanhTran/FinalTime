using System.Text.Json.Serialization;
using Server.Enum;

namespace Server.DTO
{
    public class PostDTO
    {      
        public string PostTitle { get; set; }
       
        public DateTime PostDay { get; set; }

        public string? Specification { get; set; }

        public string? Description { get; set; }

        public int CategoryId { get; set; }

        public int UserId { get; set; }

        public Status Status { get; set; }

        public string? TitleImage { get; set;}
        public string View { get; set;}
      
    }
}