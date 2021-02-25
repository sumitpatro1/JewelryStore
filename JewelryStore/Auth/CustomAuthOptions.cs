using Microsoft.AspNetCore.Authentication;
using System;
using System.Collections.Generic;
using System.Text;

namespace JewelryStore.Auth
{
    public class CustomAuthOptions :  AuthenticationSchemeOptions
    {
        public const string DefaultScheme = "Bearer";
        public string Scheme => DefaultScheme;
    }
}
