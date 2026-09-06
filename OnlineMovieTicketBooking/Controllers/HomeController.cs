using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineMovieTicketBooking.DAL;
using OnlineMovieTicketBooking.Models;
using System.Diagnostics;

namespace OnlineMovieTicketBooking.Controllers
{
    public class HomeController : Controller
    {
        OnlineMovieTicketBookingDBContext _context;

        public HomeController(OnlineMovieTicketBookingDBContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var movies = await _context.Movies
                .Where(x => x.MovIsActive)
                .Include(x => x.ShowSchedules)
                    .ThenInclude(x => x.Screen)
                        .ThenInclude(x => x.Theatre)
                .ToListAsync();

            return View(movies);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}