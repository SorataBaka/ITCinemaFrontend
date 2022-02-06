using Microsoft.AspNetCore.Mvc;

namespace ITCinemaFrontend.Controllers
{
    public class TheatresController : Controller
    {
        public IActionResult Index()
        {
            if (Request.QueryString.HasValue)
            {
                var query = System.Web.HttpUtility.ParseQueryString(Request.QueryString.Value);
                if(query.Get("id") == null)
                {
                    return View();
                }
                return View("TheaterDetail");
            }
            else
            {
                return View();
            }
        }
    }
}
