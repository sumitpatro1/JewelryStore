using JewelryStore.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JewelryStore.Modals
{
    public class UserCredentials
    {
        public string session_id { get; set; }
        public string user_name { get; set; }
        public string password { get; set; }
        public DateTime? date_created_utc { get; set; }
        public UserRoles user_role { get; set; }
        public JsonWebToken token { get; set; }
    }

    public enum UserRoles
    {
        Regular,
        Priviledged
    }
}
