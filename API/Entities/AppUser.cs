using API.Extensions;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{   
    /// <summary>
    /// Model Class for the AppUser having filed
    /// Id and Username
    /// </summary>
    public class AppUser : IdentityUser<int>
    {
        public DateOnly DateOfBirth { get; set; } 
        public DateTime Created { get; set; }= DateTime.UtcNow;
        public string KnownAs { get; set; }
        public DateTime LastActive { get; set; }= DateTime.UtcNow;
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public List<Photo> Photos { get; set; } = new();

        /*
        public  int GetAge()
        {
            return DateOfBirth.CalculateAge();
        }*/

        public List<UserLike> LikedByUsers { get; set; }
        public List<UserLike> LikedUsers { get; set; }

        public List<Message> MessagesSent { get; set; }
        public List<Message> MessagesReceived { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }


    }
} 