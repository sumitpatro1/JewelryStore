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
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace JewelryStore.Controllers
{
    [ApiVersion("1.0")]
    [Route("jewelry_store/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;
        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet]
        [Route("calculate")]
        public async Task<IActionResult> Get(float quantityInUnits, float pricePerUnit)
        {
            try
            {
                var result = await _dashboardService.Calculate(quantityInUnits, pricePerUnit);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpGet]
        [Route("discount_percent")]
        public async Task<IActionResult> GetDiscountPercent()
        {
            try
            {
                var result = await _dashboardService.GetDiscountPercent();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}

