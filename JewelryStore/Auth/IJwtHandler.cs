using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace JewelryStore.Auth
{
    public interface IJwtHandler
    {
        JsonWebToken Create(List<Claim> claims);
        JsonWebToken Create(List<Claim> claims, long expiresUnixSeconds);
    }
}