namespace Server.DTO
{
    public class ReplyCommentDTO
    {
        public int UserId { get; set; }
     
        public int CommentId { get; set; }

        public string Text { get; set; }
        
        public DateTime CreateAt { get;set;} 
    }
}