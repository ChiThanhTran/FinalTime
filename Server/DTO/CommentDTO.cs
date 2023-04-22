namespace Server.DTO
{
    public class CommentDTO
    {
        public int UserId { get; set; }
     
        public int PostId { get; set; }

        public string Text { get; set; }
        
        public DateTime CreateAt { get;set;} 
    }
}