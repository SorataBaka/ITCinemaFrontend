using Microsoft.AspNetCore.Mvc;

namespace ITCinemaFrontend.Controllers
{
    public class MyTickets : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
