using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphMailAPI.Models;
using GraphMailAPI.Tools;
using MySql.Data.MySqlClient;
using System.Net.Mail;
using NET = System.Net;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GraphMailAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private string server = @"server=localhost;userid=root;password=;database=mail";
        private string hostEmail = "bestforest4@gmail.com";
        private string hostPassword = "<PASSWORD>";
        private string smtpHost = "smtp.gmail.com";
        private int port = 587;

        // GET: api/<EmailController>
        /// <summary>
        /// Get a list of emails sent information
        /// </summary>
        /// <returns>List of email data</returns>
        [HttpGet]
        public IEnumerable<Email> Get()
        {
            List<Email> emailList = new List<Email>();
            using var con = new MySqlConnection(this.server);
            try
            {
                con.Open();
                string query = "SELECT * FROM mail";
                var cmd = new MySqlCommand(query, con);
                using MySqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    emailList.Add(new Email
                    {
                        id = rdr.GetInt64(0),
                        name= rdr.GetString(1),
                        email = rdr.GetString(2),
                        subject = rdr.GetString(3),
                        message = rdr.GetString(4)
                    });
                }
                con.Close();
                return emailList;
            }
            catch(Exception ex)
            {
                con.Close();
                return null;
            }
        }

        /// <summary>
        /// Get a specific type of message
        /// </summary>
        /// <param name="id">The id number of the message</param>
        /// <returns>The specific email type</returns>
        [HttpGet("{id}")]
        public Email Get(int id)
        {
            Email val = null;
            using var con = new MySqlConnection(this.server);
            con.Open();
            string query = "SELECT * FROM mail WHERE id = @Id";
            var cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@Id", id);
            using MySqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                val = new Email()
                {
                    id = rdr.GetInt64(0),
                    name = rdr.GetString(1),
                    email = rdr.GetString(2),
                    subject = rdr.GetString(3),
                    message = rdr.GetString(4)
                };
            }
            return val;
        }


        // POST api/<EmailController>/SendMail
        /// <summary>
        /// POST: Send email and updates the database
        /// </summary>
        /// <param name="request">The body of the request</param>
        [HttpPost("SendMail")]
        public void Post([FromBody] Email request)
        {
            using var con = new MySqlConnection(this.server);

            try
            {
                sendEmail(request);
                createEntry(con, request);
                
            }catch(Exception ex)
            {
                con.Close();
            }
        }


        /// <summary>
        /// Send email
        /// </summary>
        /// <param name="request">Email details</param>
        private void sendEmail(Email request)
        {
            try
            {
                MailMessage mailMessage = new MailMessage(this.hostEmail, request.email, request.subject, request.message);
                mailMessage.From = new MailAddress(this.hostEmail, "Test Mail");
                SmtpClient smtpClient = new SmtpClient()
                {
                    Host = this.smtpHost,
                    Port = this.port,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NET.NetworkCredential(this.hostEmail, this.hostPassword)
                };
                smtpClient.Send(mailMessage);
            }catch(Exception ex)
            {

            }
        }

        /// <summary>
        /// Create a post entry and insert the data to the database
        /// </summary>
        /// <param name="con">MySql Connection</param>
        /// <param name="request">Email request details</param>
        private void createEntry(MySqlConnection con, Email request)
        {
            con.Open();
            string sql = "INSERT INTO mail(name, email, subject, message) VALUES(@Name, @Email, @Subject, @Message)";
            using var cmd = new MySqlCommand(sql, con);

            cmd.Parameters.AddWithValue("@Name", request.name);
            cmd.Parameters.AddWithValue("@Email", request.email);
            cmd.Parameters.AddWithValue("@Subject", request.subject);
            cmd.Parameters.AddWithValue("@Message", request.message);

            cmd.ExecuteNonQuery();
            con.Close();
        }
    }
}
