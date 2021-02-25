using System;
using System.Collections.Generic;
using System.Text;
using Dapper;
using System.Data;
using System.Threading.Tasks;
using JewelryStore.Modals;

namespace JewelryStore.Repositories
{
    public interface IUserCredentialsRepository
    {
        Task<UserCredentials> CreateLogin(string user_name);
        Task<string> GetEncryptedPass(string user_name);
    }
    public class UserCredentialsRepository : IUserCredentialsRepository
    {
        private readonly IDbConnection con;
        public UserCredentialsRepository(IDbConnection _con)
        {
            con = _con;
        }

        public async Task<UserCredentials> CreateLogin(string user_name)
        {
            var q = @"usp_create_login @user_name";
            var p = new
            {
                user_name
            };
            var val = await con.QueryAsync<UserCredentials>(q, p);
            var valEnum = val.GetEnumerator();
            return valEnum.MoveNext() ? valEnum.Current : null;
        }

        public async Task<string> GetEncryptedPass(string user_name)
        {
            var q = @"get_encrpted_pass @user_name";
            var p = new
            {
                user_name
            };
            var val = await con.QueryAsync<string>(q, p);
            var valEnum = val.GetEnumerator();
            return valEnum.MoveNext() ? valEnum.Current : null;
        }
    }
}
