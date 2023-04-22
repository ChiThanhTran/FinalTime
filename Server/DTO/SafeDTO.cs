using Server.Enum;
namespace Server.DTO
{
    public class SafeDTO
    {
        public int UserId { get; set; }

        public int PostId { get; set; }

        public ESafe IsSafe { get;set;}
    }
}