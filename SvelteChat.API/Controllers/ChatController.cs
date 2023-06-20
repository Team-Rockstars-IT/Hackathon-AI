using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SvelteChat.API.Models;
using System.Net.Http.Headers;
using System.Text;

namespace YourAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly HttpClient httpClient;
        private const string BaseUrl = "https://api.openai.com/v1/engines/davinci/completions";
        private const string ApiKey = "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";

        public ChatController()
        {
            httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", ApiKey);
        }

        [HttpPost("send-message")]
        public async Task<IActionResult> SendMessage([FromBody] ChatMessageRequest request)
        {
            try
            {
                var completionText = await CompleteMessage(request.Message);
                return Ok(new ChatMessageResponse { Message = completionText });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        private async Task<string> CompleteMessage(string message)
        {
            var requestBody = new
            {
                prompt = message,
                max_tokens = 50,
                temperature = 0.7
            };

            var content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");
            var response = await httpClient.PostAsync(BaseUrl, content);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                dynamic responseObject = JsonConvert.DeserializeObject(responseContent);

                var completionText = responseObject.choices[0].text.Value.Trim();
                return completionText;
            }

            throw new Exception($"Request failed with status code {response.StatusCode}");
        }

    }
}