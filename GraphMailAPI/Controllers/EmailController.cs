using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphMailAPI.Models;
using GraphMailAPI.Tools;
using MySql.Data.MySqlClient;
using System.Net.Mail;
using NET = System.Net;
using Microsoft.AspNetCore.Cors;
using System.Net.Mime;
using System.IO;
using System;
using System.Drawing;
using System.Text;



// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GraphMailAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private string server = @"server=localhost;userid=root;password=;database=mail";
        private string hostEmail = "<Email>";
        private string hostPassword = "<Password>";
        private string smtpHost = "smtp.gmail.com";
        private int port = 587;

        // GET: api/<EmailController>
        /// <summary>
        /// Get a list of emails sent information
        /// </summary>
        /// <returns>List of email data</returns>
        [HttpGet]
        [EnableCors("MyPolicy")]
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
                    Email email = new Email()
                    {
                        id = rdr.GetInt64("id"),
                        name = rdr.GetString("name"),
                        email = rdr.GetString("email"),
                        subject = rdr.GetString("subject"),
                        message = rdr.GetString("message")
                    };
                    byte[] img = (byte[])rdr.GetValue(5);
                    email.image = Convert.ToBase64String(img);
                    emailList.Add(email);
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
        [EnableCors("MyPolicy")]
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
        [EnableCors("MyPolicy")]
        public void Post([FromBody] Email request)
        {
            using var con = new MySqlConnection(server);
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
            //Get Image
            try
            {
                MailMessage mailMessage = new MailMessage(hostEmail, request.email, request.subject, request.message);
                mailMessage.From = new MailAddress(hostEmail, "Test Mail");
                SmtpClient smtpClient = new SmtpClient()
                {
                    Host = smtpHost,
                    Port = port,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NET.NetworkCredential(hostEmail, hostPassword)
                };
                mailMessage.Attachments.Add(imageAttachment(request.image));
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
            string sql = "INSERT INTO mail(name, email, subject, message, image) VALUES (@Name, @Email, @Subject, @Message, @Image)";
            using var cmd = new MySqlCommand(sql, con);

            cmd.Parameters.AddWithValue("@Name", request.name);
            cmd.Parameters.AddWithValue("@Email", request.email);
            cmd.Parameters.AddWithValue("@Subject", request.subject);
            cmd.Parameters.AddWithValue("@Message", request.message);
            cmd.Parameters.AddWithValue("@Image", ConvertToMemory(request.image).ToArray());
            cmd.ExecuteNonQuery();
            con.Close();
        }

        /// <summary>
        /// Returns an attachment variable with an image
        /// </summary>
        /// <param name="base64">the base64 image that will be attached to the email</param>
        /// <returns>The attachment value</returns>
        private static Attachment imageAttachment(string base64)
        {
            MemoryStream ms = ConvertToMemory(base64);
            return new Attachment(ms, "graph.png");
        }

        /// <summary>
        /// Converts the base64 image into a memorystream
        /// </summary>
        /// <param name="base64">The base64 image</param>
        /// <returns>The memory stream created from the base64 image</returns>
        private static MemoryStream ConvertToMemory(string base64)
        {
            byte[] img = Convert.FromBase64String(base64);
            return new MemoryStream(img, 0, img.Length);
        }
    }
}
