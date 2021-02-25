using JewelryStore;
using JewelryStore.Controllers;
using JewelryStore.Repositories;
using JewelryStore.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace JewelryStoreUnitTestProject
{
    public class DashboardUnitTest
    {
        public DashboardUnitTest()
        {
        }

        [Fact]
        public async Task GetDiscount_Positive()
        {
            //Arrange
            var _configRepoServiceMock = new Mock<IConfigRepository>();
            var _httpContextAccessoreMock = new Mock<IHttpContextAccessor>();
            _configRepoServiceMock.Setup(s => s.GetConfig(It.IsAny<JewelryStore.Common.Constants.ConfigParams>()))
                .ReturnsAsync((JewelryStore.Common.Constants.ConfigParams param) => { return "3"; });

            //Act
            var _dashboardServiceMock = new DashboardService(
                _configRepoServiceMock.Object,
                _httpContextAccessoreMock.Object);
            var ctrl = new DashboardController(_dashboardServiceMock);
            var result = await ctrl.GetDiscountPercent();

            //Assert
            Assert.NotNull(result);
            Assert.Equal(200, (result as OkObjectResult).StatusCode);
        }

        [Fact]
        public async Task GetDiscount_Negative()
        {
            //Arrange
            var _configRepoServiceMock = new Mock<IConfigRepository>();
            var _httpContextAccessoreMock = new Mock<IHttpContextAccessor>();
            _configRepoServiceMock.Setup(s => s.GetConfig(It.IsAny<JewelryStore.Common.Constants.ConfigParams>()))
                .ReturnsAsync((JewelryStore.Common.Constants.ConfigParams param) => { return null; });

            //Act
            var _dashboardServiceMock = new DashboardService(
                _configRepoServiceMock.Object,
                _httpContextAccessoreMock.Object);
            var ctrl = new DashboardController(_dashboardServiceMock);
            var result = await ctrl.GetDiscountPercent();

            //Assert
            Assert.NotNull(result);
            Assert.Equal(500, (result as ObjectResult).StatusCode);
        }
    }
}
