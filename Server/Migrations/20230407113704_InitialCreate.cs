using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryBio = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tag",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TagName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tag", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Bio = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Follower = table.Column<int>(type: "int", nullable: false),
                    Following = table.Column<int>(type: "int", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BackgroundImage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Post",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PostTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostDay = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Specification = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    TitleImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    View = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Post", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Post_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Post_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    PostId = table.Column<int>(type: "int", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comment_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Comment_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LikePost",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    PostId = table.Column<int>(type: "int", nullable: false),
                    IsLikePost = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LikePost", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LikePost_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LikePost_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Safe",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    PostId = table.Column<int>(type: "int", nullable: false),
                    IsSafe = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Safe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Safe_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Safe_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TagInPost",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TagId = table.Column<int>(type: "int", nullable: false),
                    PostId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagInPost", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TagInPost_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TagInPost_Tag_TagId",
                        column: x => x.TagId,
                        principalTable: "Tag",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LikeComment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CommentId = table.Column<int>(type: "int", nullable: false),
                    IsLikeComment = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LikeComment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LikeComment_Comment_CommentId",
                        column: x => x.CommentId,
                        principalTable: "Comment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LikeComment_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ReplyComment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CommentId = table.Column<int>(type: "int", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReplyComment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReplyComment_Comment_CommentId",
                        column: x => x.CommentId,
                        principalTable: "Comment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReplyComment_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LikeReplyComment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ReplyCommentId = table.Column<int>(type: "int", nullable: false),
                    IsLikeReplyComment = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LikeReplyComment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LikeReplyComment_ReplyComment_ReplyCommentId",
                        column: x => x.ReplyCommentId,
                        principalTable: "ReplyComment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LikeReplyComment_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "Id", "CategoryBio", "CategoryName" },
                values: new object[,]
                {
                    { 1, "The Thao trong nuoc va quoc te", "The Thao" },
                    { 2, "Tri thuc, phat minh, xu huong, ly thuyet trong tat ca linh vuc khoa hoc co ban", "Khoa hoc Cong nghe" },
                    { 3, "phan tich game cho cac game thu", "Game" }
                });

            migrationBuilder.InsertData(
                table: "Tag",
                columns: new[] { "Id", "TagName" },
                values: new object[,]
                {
                    { 1, "Bong Da" },
                    { 2, "Tri tue nhan tao" },
                    { 3, "CSGO" }
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "BackgroundImage", "Bio", "DateOfBirth", "Email", "Follower", "Following", "Gender", "Image", "Location", "Name", "Password", "Phone", "Type", "Username" },
                values: new object[,]
                {
                    { 1, "3", "ToTheStar", new DateTime(1999, 1, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), "tranchithanh1809@gmail.com", 1, 10, 0, "3", "Ha Noi", "Thanh", "thanh321", "0376959875", 0, "thanh123" },
                    { 2, "4", "Kutelata", new DateTime(1999, 7, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), "longkute123@gmail.com", 3, 10, 0, "4", "Ha Noi", "Long", "long321", "0832536799", 0, "long123" },
                    { 3, "9", "DatKhongChin", new DateTime(1999, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), "nmdat0909@gmail.com", 9, 9, 0, "9", "Ha Noi", "Dat", "dat321", "0345613499", 0, "dat123" }
                });

            migrationBuilder.InsertData(
                table: "Post",
                columns: new[] { "Id", "CategoryId", "Description", "PostDay", "PostTitle", "Specification", "Status", "TitleImage", "UserId", "View" },
                values: new object[] { 1, 1, "cung tim hieu cau tra loi trong bai viet nay", new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Messi co phai vi dai nhat lich su", "chac chan la nhu the...", 0, "1", 1, "1000" });

            migrationBuilder.InsertData(
                table: "Post",
                columns: new[] { "Id", "CategoryId", "Description", "PostDay", "PostTitle", "Specification", "Status", "TitleImage", "UserId", "View" },
                values: new object[] { 2, 2, "lieu nhung gi trong phim anh co tro thanh su thuc", new DateTime(2023, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Ky nguyen tri tue nhan tao lieu da toi", "co le...", 0, "2", 2, "2000" });

            migrationBuilder.InsertData(
                table: "Post",
                columns: new[] { "Id", "CategoryId", "Description", "PostDay", "PostTitle", "Specification", "Status", "TitleImage", "UserId", "View" },
                values: new object[] { 3, 3, "voi hang ta cap nhat, lieu co le", new DateTime(2023, 3, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "CS2 co lam Valorant bien mat?", "CS2 se phat hanh...", 0, "3", 3, "3000" });

            migrationBuilder.InsertData(
                table: "Comment",
                columns: new[] { "Id", "CreateAt", "PostId", "Text", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "Bai viet hay", 1 },
                    { 2, new DateTime(2023, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "Bai viet k hay", 2 },
                    { 3, new DateTime(2023, 3, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "Bai viet rat hay", 3 }
                });

            migrationBuilder.InsertData(
                table: "LikePost",
                columns: new[] { "Id", "IsLikePost", "PostId", "UserId" },
                values: new object[,]
                {
                    { new Guid("43857b37-660a-4069-b2cb-5306b603b3f9"), 0, 2, 2 },
                    { new Guid("6958596d-14fb-49b5-90b8-edc17a487ffa"), 0, 1, 1 },
                    { new Guid("a306a3dc-0b42-4578-bc22-a778125f2707"), 0, 3, 3 }
                });

            migrationBuilder.InsertData(
                table: "Safe",
                columns: new[] { "Id", "IsSafe", "PostId", "UserId" },
                values: new object[,]
                {
                    { new Guid("18bf7cbf-8591-4526-9871-0eb025862a3f"), 0, 1, 1 },
                    { new Guid("28e7928e-9b09-4b91-8305-23ee2af84872"), 0, 2, 2 },
                    { new Guid("4bbc5590-d9dc-486b-80a4-2799c16c8608"), 0, 3, 3 }
                });

            migrationBuilder.InsertData(
                table: "TagInPost",
                columns: new[] { "Id", "PostId", "TagId" },
                values: new object[,]
                {
                    { new Guid("845c579e-c67a-40e9-a40a-2b042e4cde2a"), 3, 3 },
                    { new Guid("86753597-b4d5-4074-8c7e-299263eab7a0"), 2, 2 },
                    { new Guid("b0694b78-9776-45f9-85dc-826d1d1b7a8e"), 1, 1 }
                });

            migrationBuilder.InsertData(
                table: "LikeComment",
                columns: new[] { "Id", "CommentId", "IsLikeComment", "UserId" },
                values: new object[,]
                {
                    { new Guid("0deea64c-7376-4bd2-a095-8d733443ff27"), 2, 0, 2 },
                    { new Guid("7a127437-a6ac-46ec-aa37-aa2b8dbecb74"), 1, 0, 1 },
                    { new Guid("d3cb588d-3221-4ff7-b56d-3ef28fbf6655"), 3, 0, 3 }
                });

            migrationBuilder.InsertData(
                table: "ReplyComment",
                columns: new[] { "Id", "CommentId", "CreateAt", "Text", "UserId" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2023, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "toi dong y", 1 },
                    { 2, 2, new DateTime(2023, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), "dung vay", 2 },
                    { 3, 3, new DateTime(2023, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "chuan", 3 }
                });

            migrationBuilder.InsertData(
                table: "LikeReplyComment",
                columns: new[] { "Id", "IsLikeReplyComment", "ReplyCommentId", "UserId" },
                values: new object[] { new Guid("2e41f43a-2c80-4323-a4ad-c856dbeb460c"), 0, 1, 1 });

            migrationBuilder.InsertData(
                table: "LikeReplyComment",
                columns: new[] { "Id", "IsLikeReplyComment", "ReplyCommentId", "UserId" },
                values: new object[] { new Guid("4652507d-d176-4f31-a089-dec904773ef1"), 0, 3, 3 });

            migrationBuilder.InsertData(
                table: "LikeReplyComment",
                columns: new[] { "Id", "IsLikeReplyComment", "ReplyCommentId", "UserId" },
                values: new object[] { new Guid("72608c83-2ca7-4bc3-9c43-b3ea309941e3"), 0, 2, 2 });

            migrationBuilder.CreateIndex(
                name: "IX_Comment_PostId",
                table: "Comment",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_UserId",
                table: "Comment",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LikeComment_CommentId",
                table: "LikeComment",
                column: "CommentId");

            migrationBuilder.CreateIndex(
                name: "IX_LikeComment_UserId",
                table: "LikeComment",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LikePost_PostId",
                table: "LikePost",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_LikePost_UserId",
                table: "LikePost",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LikeReplyComment_ReplyCommentId",
                table: "LikeReplyComment",
                column: "ReplyCommentId");

            migrationBuilder.CreateIndex(
                name: "IX_LikeReplyComment_UserId",
                table: "LikeReplyComment",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Post_CategoryId",
                table: "Post",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Post_UserId",
                table: "Post",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ReplyComment_CommentId",
                table: "ReplyComment",
                column: "CommentId");

            migrationBuilder.CreateIndex(
                name: "IX_ReplyComment_UserId",
                table: "ReplyComment",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Safe_PostId",
                table: "Safe",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Safe_UserId",
                table: "Safe",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TagInPost_PostId",
                table: "TagInPost",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_TagInPost_TagId",
                table: "TagInPost",
                column: "TagId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LikeComment");

            migrationBuilder.DropTable(
                name: "LikePost");

            migrationBuilder.DropTable(
                name: "LikeReplyComment");

            migrationBuilder.DropTable(
                name: "Safe");

            migrationBuilder.DropTable(
                name: "TagInPost");

            migrationBuilder.DropTable(
                name: "ReplyComment");

            migrationBuilder.DropTable(
                name: "Tag");

            migrationBuilder.DropTable(
                name: "Comment");

            migrationBuilder.DropTable(
                name: "Post");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
