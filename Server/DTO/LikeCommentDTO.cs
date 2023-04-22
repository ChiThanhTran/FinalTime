using Server.Enum;
namespace Server.DTO
{
    public class LikeCommentDTO
    {
        public int UserId { get; set; }

        public int CommentId { get; set; }

        public ELikeComment IsLikeComment { get; set; }
    }
}