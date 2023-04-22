using Server.Enum;
namespace Server.DTO
{
    public class LikePostDTO
    {
        public int UserId { get; set; }

        public int PostId { get; set; }

        public ELikePost IsLikePost { get; set; }
    }
}