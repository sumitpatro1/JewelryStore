﻿using Azure.Storage.Blobs.Models;
using JewelryStore.Modals;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JewelryStore.Services
{
    public interface IDashboardService
    {
        Task<double> Calculate(float quantityInUnits, float pricePerUnit);
        Task<float> GetDiscountPercent();
    }
}
