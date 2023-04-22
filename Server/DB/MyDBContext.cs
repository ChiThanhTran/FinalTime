using Microsoft.EntityFrameworkCore;
using Server.Entities;
using Server.Enum;

namespace Server.DB
{
    public class MyDBContext : DbContext
    {
        public MyDBContext(DbContextOptions<MyDBContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Tag> Tags { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<ReplyComment> ReplyComments { get; set; }

        public DbSet<Safe> Safes { get; set; }

        public DbSet<LikePost> LikePosts { get; set; }

        public DbSet<LikeComment> LikeComments { get; set; }

        public DbSet<LikeReplyComment> LikeReplyComments { get; set; }

        public DbSet<TagInPost> TagInPosts {get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //User
            builder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Name = "Thanh",
                    DateOfBirth = new DateTime(1999, 01, 12),
                    Gender = Gender.Male,
                    Type = Roles.Admin,
                    Username = "thanh123",
                    Password = "thanh321",
                    Location = "Ha Noi",
                    Email = "tranchithanh1809@gmail.com",
                    Phone = "0376959875",
                    Bio = "ToTheStar",
                    Follower = 1,
                    Following = 10,
                    Image = "3",
                    BackgroundImage = "3"

                },
                new User
                {
                    Id = 2,
                    Name = "Long",
                    DateOfBirth = new DateTime(1999, 07, 12),
                    Gender = Gender.Male,
                    Type = Roles.Admin,
                    Username = "long123",
                    Password = "long321",
                    Location = "Ha Noi",
                    Email = "longkute123@gmail.com",
                    Phone = "0832536799",
                    Bio = "Kutelata",
                    Follower = 3,
                    Following = 10,
                    Image = "4",
                    BackgroundImage = "4"
                },
                new User
                {
                    Id = 3,
                    Name = "Dat",
                    DateOfBirth = new DateTime(1999, 09, 09),
                    Gender = Gender.Male,
                    Type = Roles.Admin,
                    Username = "dat123",
                    Password = "dat321",
                    Location = "Ha Noi",
                    Email = "nmdat0909@gmail.com",
                    Phone = "0345613499",
                    Bio = "DatKhongChin",
                    Follower = 9,
                    Following = 9,
                    Image = "9",
                    BackgroundImage = "9"
                }
            );

            //Category
            builder.Entity<Category>().HasData(
                new Category
                {
                    Id = 1,
                    CategoryName = "The Thao",
                    CategoryBio = "The Thao trong nuoc va quoc te"
                },
                new Category
                {
                    Id = 2,
                    CategoryName = "Khoa hoc Cong nghe",
                    CategoryBio = "Tri thuc, phat minh, xu huong, ly thuyet trong tat ca linh vuc khoa hoc co ban"
                },
                new Category
                {
                    Id = 3,
                    CategoryName = "Game",
                    CategoryBio = "phan tich game cho cac game thu"
                }
            );
            //Post
            builder.Entity<Post>()
                .HasOne(c => c.Category)
                .WithMany(a => a.Posts)
                .HasForeignKey(c => c.CategoryId)
                .IsRequired();

            builder.Entity<Post>()
                .HasOne(c => c.User)
                .WithMany(a => a.Posts)
                .HasForeignKey(c => c.UserId)
                .IsRequired();
            builder.Entity<Post>().HasData(
                new Post
                {
                    Id = 1,
                    PostTitle = "Messi co phai vi dai nhat lich su",
                    Specification = "chac chan la nhu the...",
                    PostDay = new DateTime(2023, 1, 1),
                    Description = "cung tim hieu cau tra loi trong bai viet nay",
                    Status = Status.Accepted,
                    TitleImage = "1",
                    View = "1000",
                    CategoryId = 1,
                    UserId = 1,
                },
                new Post
                {
                    Id = 2,
                    PostTitle = "Ky nguyen tri tue nhan tao lieu da toi",
                    Specification = "co le...",
                    PostDay = new DateTime(2023, 2, 2),
                    Description = "lieu nhung gi trong phim anh co tro thanh su thuc",
                    Status = Status.Accepted,
                    TitleImage = "2",
                    View = "2000",
                    CategoryId = 2,
                    UserId = 2,
                },
                new Post
                {
                    Id = 3,
                    PostTitle = "CS2 co lam Valorant bien mat?",
                    Specification = "CS2 se phat hanh...",
                    PostDay = new DateTime(2023, 3, 3),
                    Description = "voi hang ta cap nhat, lieu co le",
                    Status = Status.Accepted,
                    TitleImage = "3",
                    View = "3000",
                    CategoryId = 3,
                    UserId = 3,
                }

            );
            //Tag
            builder.Entity<Tag>().HasData(
                new Tag
                {
                    Id = 1,
                    TagName = "Bong Da",
                },
                new Tag
                {
                    Id = 2,
                    TagName = "Tri tue nhan tao",
                },
                new Tag
                {
                    Id = 3,
                    TagName = "CSGO",
                }
            );
            //TagInPost
            builder.Entity<TagInPost>()
                .HasOne(c => c.Tag)
                .WithMany(a => a.TagInPosts)
                .HasForeignKey(c => c.TagId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder.Entity<TagInPost>()
                .HasOne(c => c.Post)
                .WithMany(a => a.TagInPosts)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
            builder.Entity<TagInPost>().HasData(
                new TagInPost
                {
                    TagId = 1,
                    PostId = 1,
                },
                new TagInPost
                {
                    TagId = 2,
                    PostId = 2,
                },
                new TagInPost
                {
                    TagId = 3,
                    PostId = 3,
                }
            );
            //Comment
            builder.Entity<Comment>()
                .HasOne(c => c.Post)
                .WithMany(a => a.Comments)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany(a => a.Comments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
            builder.Entity<Comment>().HasData(
                new Comment
                {
                    Id = 1,
                    UserId = 1,
                    PostId = 1,
                    Text = "Bai viet hay",
                    CreateAt = new DateTime(2023, 1, 2),
                },
                new Comment
                {
                    Id = 2,
                    UserId = 2,
                    PostId = 2,
                    Text = "Bai viet k hay",
                    CreateAt = new DateTime(2023, 2, 3),
                },
                new Comment
                {
                    Id = 3,
                    UserId = 3,
                    PostId = 3,
                    Text = "Bai viet rat hay",
                    CreateAt = new DateTime(2023, 3, 4),
                }
            );
            //ReplyComment
            builder.Entity<ReplyComment>()
                .HasOne(c => c.Comment)
                .WithMany(a => a.ReplyComments)
                .HasForeignKey(c => c.CommentId)
                .IsRequired();

            builder.Entity<ReplyComment>()
                .HasOne(c => c.User)
                .WithMany(a => a.ReplyComments)
                .HasForeignKey(c => c.UserId)
                .IsRequired();
            builder.Entity<ReplyComment>().HasData(
                new ReplyComment
                {
                    Id = 1,
                    UserId = 1,
                    CommentId = 1,
                    Text = "toi dong y",
                    CreateAt = new DateTime(2023, 1, 3),
                },
                new ReplyComment
                {
                    Id = 2,
                    UserId = 2,
                    CommentId = 2,
                    Text = "dung vay",
                    CreateAt = new DateTime(2023, 2, 4),
                },
                new ReplyComment
                {
                    Id = 3,
                    UserId = 3,
                    CommentId = 3,
                    Text = "chuan",
                    CreateAt = new DateTime(2023, 3, 5),
                }
            );
            //Safe
            builder.Entity<Safe>().HasAlternateKey(c => c.Id);
            builder.Entity<Safe>()
                .HasOne(c => c.Post)
                .WithMany(a => a.Safes)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder.Entity<Safe>()
                .HasOne(c => c.User)
                .WithMany(a => a.Safes)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
            builder.Entity<Safe>().HasData(
                new Safe
                {
                    UserId = 1,
                    PostId = 1,
                    IsSafe = ESafe.Yes,

                },
                new Safe
                {
                    UserId = 2,
                    PostId = 2,
                    IsSafe = ESafe.Yes,
                },
                new Safe
                {
                    UserId = 3,
                    PostId = 3,
                    IsSafe = ESafe.Yes,
                }
            );
            //LikePost
            builder.Entity<LikePost>().HasAlternateKey(c => c.Id);
            builder.Entity<LikePost>()
                .HasOne(c => c.Post)
                .WithMany(a => a.LikePosts)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder.Entity<LikePost>()
                .HasOne(c => c.User)
                .WithMany(a => a.LikePosts)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
            builder.Entity<LikePost>().HasData(
                new LikePost
                {
                    UserId = 1,
                    PostId = 1,
                    IsLikePost = ELikePost.Yes,

                },
                new LikePost
                {
                    UserId = 2,
                    PostId = 2,
                    IsLikePost = ELikePost.Yes,
                },
                new LikePost
                {
                    UserId = 3,
                    PostId = 3,
                    IsLikePost = ELikePost.Yes,
                }
            );
            //LikeComment
            builder.Entity<LikeComment>().HasAlternateKey(c => c.Id);
            builder.Entity<LikeComment>()
                .HasOne(c => c.Comment)
                .WithMany(a => a.LikeComments)
                .HasForeignKey(c => c.CommentId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder.Entity<LikeComment>()
                .HasOne(c => c.User)
                .WithMany(a => a.LikeComments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
            builder.Entity<LikeComment>().HasData(
                new LikeComment
                {
                    UserId = 1,
                    CommentId = 1,
                    IsLikeComment = ELikeComment.Yes,

                },
                new LikeComment
                {
                    UserId = 2,
                    CommentId = 2,
                    IsLikeComment = ELikeComment.Yes,
                },
                new LikeComment
                {
                    UserId = 3,
                    CommentId = 3,
                    IsLikeComment = ELikeComment.Yes,
                }
            );
            //LikeReplyComment
            builder.Entity<LikeReplyComment>().HasAlternateKey(c => c.Id);
            builder.Entity<LikeReplyComment>()
                .HasOne(c => c.ReplyComment)
                .WithMany(a => a.LikeReplyComments)
                .HasForeignKey(c => c.ReplyCommentId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder.Entity<LikeReplyComment>()
                .HasOne(c => c.User)
                .WithMany(a => a.LikeReplyComments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
            builder.Entity<LikeReplyComment>().HasData(
                new LikeReplyComment
                {
                    UserId = 1,
                    ReplyCommentId = 1,
                    IsLikeReplyComment = ELikeReplyComment.Yes,

                },
                new LikeReplyComment
                {
                    UserId = 2,
                    ReplyCommentId = 2,
                    IsLikeReplyComment = ELikeReplyComment.Yes,
                },
                new LikeReplyComment
                {
                    UserId = 3,
                    ReplyCommentId = 3,
                    IsLikeReplyComment = ELikeReplyComment.Yes,
                }
            );




        }
    }
}