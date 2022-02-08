using Microsoft.AspNetCore.Mvc;

namespace ITCinemaFrontend.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
