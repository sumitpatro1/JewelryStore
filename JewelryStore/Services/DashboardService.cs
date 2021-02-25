using JewelryStore.Common.Constants;
using JewelryStore.Common.Helpers;
using JewelryStore.Modals;
using JewelryStore.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace JewelryStore.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IConfigRepository _configRepository;
        private readonly IHttpContextAccessor _httpContext;
        public DashboardService(IConfigRepository configRepository
            , IHttpContextAccessor httpContext)
        {
            _configRepository = configRepository;
            _httpContext = httpContext;
        }

        public async Task<double> Calculate(float quantityInUnits, float pricePerUnit)
        {
            try
            { 
                var discountPercentString = await _configRepository.GetConfig(Common.Constants.ConfigParams.discount_percentage);
                float discountPercent;
                if (!float.TryParse(discountPercentString, out discountPercent))
                {
                    throw new Exception("Discount percentage was not found in config table");
                }
                if (_httpContext?.HttpContext?.User?.Claims?.FirstOrDefault(c => c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role")?.Value == UserRoles.Priviledged.ToString())
                    return (((double)pricePerUnit * quantityInUnits) / 100) * (100 - discountPercent);
                else 
                    return (double)pricePerUnit * quantityInUnits;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<float> GetDiscountPercent()
        {
            try
            {
                var discountPercentString = await _configRepository.GetConfig(Common.Constants.ConfigParams.discount_percentage);
                float discountPercent;
                if (!float.TryParse(discountPercentString, out discountPercent))
                {
                    throw new Exception("Discount percentage was not found in config table");
                }

                return discountPercent;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
