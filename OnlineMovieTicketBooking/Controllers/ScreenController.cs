using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using OnlineMovieTicketBooking.Models;
using OnlineMovieTicketBooking.Repositories.ScreenRepo;
using OnlineMovieTicketBooking.ViewModels;

namespace OnlineMovieTicketBooking.Controllers
{
    public class ScreenController : Controller
    {
        IScreenRepo _screenRepo;
        IMapper _mapper;

        public ScreenController(IScreenRepo screen, IMapper mapper)
        {
            _screenRepo = screen;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var screens = await _screenRepo.DisplayScreens();
            var screenVM = _mapper.Map<List<ScreenVM>>(screens);
            return View(screenVM);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Create()
        {
            ViewBag.TheatreId = new SelectList(await _screenRepo.GetTheatres(), "TheatreId", "TheaName");

            return View();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(ScreenVM screenVM)
        {
            if (!ModelState.IsValid)
            {
                return View(screenVM);
            }

            var screen = _mapper.Map<ScreenModel>(screenVM);

            if (await _screenRepo.CreateScreen(screen) > 0)
            {
                return RedirectToAction("Index");
            }
            else
            {
                return View(screenVM);
            }

        }

        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            var screen = await _screenRepo.GetScreenById(id);

            if (screen == null)
                return NotFound();

            var screenVM = _mapper.Map<ScreenVM>(screen);

            return View(screenVM);
        }


        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var screen = await _screenRepo.GetScreenById(id);
            if (screen == null)
            {
                return NotFound();
            }
            else
            {
                var screenVM = _mapper.Map<ScreenVM>(screen);
                return View(screenVM);
            }

        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Edit(ScreenVM screenVM)
        {
            if (!ModelState.IsValid)
            {
                return View(screenVM);
            }

            var screen = _mapper.Map<ScreenModel>(screenVM);

            if (await _screenRepo.UpdateScreen(screen) > 0)
            {
                return RedirectToAction("Index");
            }
            else
            {
                return View(screenVM);
            }

        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var screen = await _screenRepo.GetScreenById(id);
            if (screen == null)
            {
                return NotFound();
            }
            else
            {
                var screenVM = _mapper.Map<ScreenVM>(screen);
                return View(screenVM);
            }

        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Delete(ScreenVM screenVM)
        {
            var screen = _mapper.Map<ScreenModel>(screenVM);

            if (await _screenRepo.DeleteScreen(screen) > 0)
            {
                return RedirectToAction("Index");
            }
            else
            {
                return View(screenVM);
            }

        }

        [HttpGet]
        public async Task<IActionResult> Shows(int id)
        {
            var screen = await _screenRepo.GetScreenWithShows(id);

            if (screen == null)
            {
                return NotFound();
            }

            return View(screen);
        }
    }
}
