using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Authorization;
using System;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Identity.Web;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Linq;
using System.Data.SqlClient;
using System.Data;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using JewelryStore.Common.Helpers;
using JewelryStore.Auth;
using JewelryStore.Services;
using JewelryStore.Repositories;
using Microsoft.AspNetCore.Http;

namespace JewelryStore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // In production/go-live, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration => configuration.RootPath = "ClientApp/dist");

            // MVC Configuration
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddMvc(options => {
                options.EnableEndpointRouting = false;
                options.Conventions.Add(new RouteTokenTransformerConvention(
                             new SlugifyParameterTransformerHelper()));
            });
            services.AddApiVersioning();
            services.AddControllers();
            services.AddCors();

            // Auth Configuration
            services.AddJwt(Configuration);

            //DI Container
            services.AddScoped<IUserCredentialsService, UserCredentialsService>();
            services.AddScoped<IUserCredentialsRepository, UserCredentialsRepository>();
            services.AddScoped<IDashboardService, DashboardService>();
            services.AddScoped<IConfigRepository, ConfigRepository>();
            services.AddScoped<ICypherHelper, CypherHelper>();
            
            services.AddHttpContextAccessor();
            //services.AddScoped(s => s.GetService<HttpContext>().User);
            services.AddScoped<IDbConnection>(_ =>
            {
                var cnnStr = Configuration.GetConnectionString("dbConn");
                return new SqlConnection(cnnStr);
                //conn.Open();
                //return conn;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");

                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseMvc();
            app.UseCors(o => o.WithOrigins("*").AllowAnyMethod());
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
