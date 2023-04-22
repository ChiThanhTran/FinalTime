using Server.Enum;
namespace Server.DTO
{
    public class LikeReplyCommentDTO
    {
        public int UserId { get; set; }

        public int ReplyCommentId { get; set; }

        public ELikeReplyComment IsLikeReplyComment { get; set; }
    }
}