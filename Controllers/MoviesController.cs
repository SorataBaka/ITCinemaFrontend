using Microsoft.AspNetCore.Mvc;

namespace ITCinemaFrontend.Controllers
{
    public class MoviesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult MovieDetails(string id) {
            return View("MovieDetail");
        }
        public IActionResult CreateMovie()
        {
            return View("CreateMovie");
        }
    }
}
