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
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace JewelryStore.Services
{
    public class UserCredentialsService : IUserCredentialsService
    {
        private readonly IUserCredentialsRepository _userCredentialsRepository;
        private readonly IConfiguration _configuration;
        private readonly ICypherHelper _cypherHelper;
        public UserCredentialsService(IUserCredentialsRepository userCredentialsRepository
            , IConfiguration configuration
            , ICypherHelper cypherHelper)
        {
            _userCredentialsRepository = userCredentialsRepository;
            _configuration = configuration;
            _cypherHelper = cypherHelper;
        }

        public async Task<UserCredentials> InsertUserCredentials(UserCredentials userCred)
        {
            try
            {
                var savedEncryptedPass = await _userCredentialsRepository.GetEncryptedPass(userCred.user_name);
                var encryptedPass = await _cypherHelper.Encrypt(userCred.password);
                if(savedEncryptedPass == encryptedPass)
                {
                    return await _userCredentialsRepository.CreateLogin(userCred.user_name);
                }
                else
                {
                    userCred = null;
                }
                return userCred;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
