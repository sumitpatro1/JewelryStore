using System;
using System.Collections.Generic;
using System.Text;
using Dapper;
using System.Data;
using System.Threading.Tasks;
using JewelryStore.Common.Constants;

namespace JewelryStore.Repositories
{
    public interface IConfigRepository
    {
        Task<string> GetConfig(ConfigParams configParam);
    }
    public class ConfigRepository : IConfigRepository
    {
        private readonly IDbConnection con;
        public ConfigRepository(IDbConnection _con)
        {
            con = _con;
        }

        public async Task<string> GetConfig(ConfigParams configParam)
        {
            var q = @"select top 1 config_value from dbo.config where config_name = @config_name";
            var p = new
            {
                config_name = configParam.ToString()
            };
            var val = await con.QueryAsync<string>(q, p);
            var valEnum = val.GetEnumerator();
            return valEnum.MoveNext() ? valEnum.Current : null;
        }
    }
}
