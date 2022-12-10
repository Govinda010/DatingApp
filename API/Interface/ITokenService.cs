using API.Enitites;

namespace API.Interface
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}