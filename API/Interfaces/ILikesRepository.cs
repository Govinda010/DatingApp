using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface ILikesRepository
{
    Task<UserLike> GetUserLike(int sourceUserId, int targetuserId);
    Task<AppUser> GetUserWithLikes(int userId);
    Task<IEnumerable<LikeDto>>GetUsersLikes(string predicate, int userId);
}
