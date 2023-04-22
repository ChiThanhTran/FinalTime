using Microsoft.AspNetCore.Mvc;
using Server.DTO;
using Server.Entities;
using Server.Models;

namespace Server.Interfaces
{
    public interface ISafeService
    {
        Task<Safe> AddSafe(SafeDTO safe);

        Task DeleteSafe(int UserId, int PostId);
    }
}