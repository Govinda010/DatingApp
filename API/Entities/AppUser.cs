namespace API.Entities
{   
    /// <summary>
    /// Model Class for the AppUser having filed
    /// Id and Username
    /// </summary>
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }


    }
} 