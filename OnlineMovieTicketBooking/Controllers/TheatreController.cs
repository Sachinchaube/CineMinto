using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineMovieTicketBooking.Models;
using OnlineMovieTicketBooking.Repositories.TheatreRepo;
using OnlineMovieTicketBooking.ViewModels;

namespace OnlineMovieTicketBooking.Controllers
{
    public class TheatreController : Controller
    {
        ITheatreRepo _theatreRepo;
        IMapper _mapper;
        public TheatreController(ITheatreRepo theatreRepo, IMapper mapper)
        {
            _theatreRepo = theatreRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var theatres = await _theatreRepo.DisplayTheatres();
            var theatreVM = _mapper.Map<List<TheatreVM>>(theatres);
            return View(theatreVM);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Create()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(TheatreVM theatreVM)
        {
            if (!ModelState.IsValid)
            {
                return View(theatreVM);
            }

            var theatre = _mapper.Map<TheatreModel>(theatreVM);

            if (await _theatreRepo.CreateTheatre(theatre) > 0)
            {
                return RedirectToAction("Index");
            }
            else
            {
                return View(theatreVM);
            }

        }

        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            var theatre = await _theatreRepo.GetTheatreById(id);

            if (theatre == null)
                return NotFound();

            var theatreVM = _mapper.Map<TheatreVM>(theatre);

            return View(theatreVM);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            TheatreModel theatre = await _theatreRepo.GetTheatreById(id);
            if (theatre == null)
            {
                return NotFound();
            }
            else
            {
                var theatreVM = _mapper.Map<TheatreVM>(theatre);
                return View(theatreVM);
            }

        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Edit(TheatreVM theatreVM)
        {
            if (!ModelState.IsValid)
            {
                return View(theatreVM);
            }

            var theatre = _mapper.Map<TheatreModel>(theatreVM);

            if (await _theatreRepo.UpdateTheatre(theatre) > 0)
            {
                return RedirectToAction("Index");
            }
            else
            {
                return View(theatreVM);
            }

        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            TheatreModel theatre = await _theatreRepo.GetTheatreById(id);
            if (theatre == null)
            {
                return NotFound();
            }
            else
            {
                var theatreVM = _mapper.Map<TheatreVM>(theatre);
                return View(theatreVM);
            }

        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Delete(TheatreVM theatreVM)
        {
            var theatre = _mapper.Map<TheatreModel>(theatreVM);

            if (await _theatreRepo.DeleteTheatre(theatre) > 0)
            {
                return RedirectToAction("Index");
            }
            else
            {
                return View(theatreVM);
            }

        }

        [HttpGet]
        public async Task<IActionResult> Screens(int id)
        {
            var theatre = await _theatreRepo.GetTheatreWithScreens(id);

            if (theatre == null)
            {
                return NotFound();
            }

            return View(theatre);
        }
    }
}