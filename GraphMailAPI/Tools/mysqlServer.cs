using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphMailAPI.Tools
{
    public class mysqlServer
    {
        private string username;
        private string password;
        private string database;
        private string server;
        public mysqlServer(string server, string username, string password, string database)
        {
            this.username = username;
            this.server = server;
            this.password = password;
            this.database = database;
        }

        private string sqlRoot()
        {
            return string.Format("server={0};userid={1};password={2};database={3}", server, username, password, database);
        }

        public MySqlDataReader Select(string query)
        {
            string root = sqlRoot();

            using var con = new MySqlConnection(@root);
            try
            {
                con.Open();
                var command = new MySqlCommand(query, con);
                
                using MySqlDataReader rdr = command.ExecuteReader();
                con.Close();
                return rdr;
            }catch(Exception ex)
            {
                con.Close();   
                return null;
            }
        }

        public bool action(string query)
        {
            using var con = new MySqlConnection(sqlRoot());
            try
            {
                con.Open();
                using var command = new MySqlCommand(query, con);
                command.ExecuteNonQuery();
                con.Close();
            }catch(Exception ex)
            {
                con.Close();
                return false;
            }
            return true;
        }
    }
}
