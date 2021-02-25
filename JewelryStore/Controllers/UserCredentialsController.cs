using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MODELS = JewelryStore.Modals;
using JewelryStore.Services;
using System.Security.Claims;
using JewelryStore.Common.Constants;
using JewelryStore.Auth;
using JewelryStore.Modals;

namespace JewelryStore.Controllers
{
    [ApiVersion("1.0")]
    [Route("jewelry_store/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class UserCredentialsController : ControllerBase
    {
        private readonly IUserCredentialsService _userCredentialsService;
        private readonly IJwtHandler _jwtHandler;
        public UserCredentialsController(IUserCredentialsService userCredentialsService
            , IJwtHandler jwtHandler)
        {
            _userCredentialsService = userCredentialsService;
            _jwtHandler = jwtHandler;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MODELS.UserCredentials userCredentials)
        {
            try
            {
                userCredentials = await _userCredentialsService.InsertUserCredentials(userCredentials);
                if (userCredentials != null && !String.IsNullOrEmpty(userCredentials.session_id))
                {
                    var claims = new List<Claim>()
                        {
                            new Claim(ClaimTypes.Name, userCredentials.user_name),
                            new Claim(ClaimTypes.Email, userCredentials.user_name),
                            new Claim(CustomClaimTypes.SessionId, userCredentials.session_id),
                            new Claim(CustomClaimTypes.Role, Enum.GetName(typeof(UserRoles), userCredentials.user_role))
                        };

                    //generate token
                    var token = _jwtHandler.Create(claims);

                    userCredentials.token = token;
                    return Ok(userCredentials);
                }
                else
                    return BadRequest();
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}

