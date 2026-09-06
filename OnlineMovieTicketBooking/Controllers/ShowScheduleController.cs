using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using OnlineMovieTicketBooking.Models;
using OnlineMovieTicketBooking.Repositories.ShowScheduleRepo;
using OnlineMovieTicketBooking.ViewModels;

namespace OnlineMovieTicketBooking.Controllers
{
    public class ShowScheduleController : Controller
    {
        IShowScheduleRepo _showScheduleRepo;
        IMapper _mapper;

        public ShowScheduleController(IShowScheduleRepo showScheduleRepo, IMapper mapper)
        {
            _showScheduleRepo = showScheduleRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var showSchedules = await _showScheduleRepo.DisplayShowSchedules();
            var showScheduleVM = _mapper.Map<List<ShowScheduleVM>>(showSchedules);
            foreach (var item in showScheduleVM)
            {
                var show = showSchedules.First(x => x.ShowScheduleId == item.ShowScheduleId);

                item.RegularPrice = show.ShowSeatPrices
                    ?.FirstOrDefault(x => x.SeatType == SeatType.Regular)?.ShowSeatPrice ?? 0;

                item.PremiumPrice = show.ShowSeatPrices
                    ?.FirstOrDefault(x => x.SeatType == SeatType.Premium)?.ShowSeatPrice ?? 0;

                item.ReclinerPrice = show.ShowSeatPrices
                    ?.FirstOrDefault(x => x.SeatType == SeatType.Recliner)?.ShowSeatPrice ?? 0;
            }
            return View(showScheduleVM);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Create()
        {
            await LoadDropdowns();
            return View();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(ShowScheduleVM showScheduleVM)
        {
            if (!ModelState.IsValid)
            {
                await LoadDropdowns();
                return View(showScheduleVM);
            }

            var showSchedule = _mapper.Map<ShowScheduleModel>(showScheduleVM);

            if (await _showScheduleRepo.CreateShowSchedule(showSchedule, showScheduleVM.RegularPrice, showScheduleVM.PremiumPrice, showScheduleVM.ReclinerPrice) > 0)
            {
                return RedirectToAction("Index");
            }
            else
            {
                await LoadDropdowns();
                return View(showScheduleVM);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            var showSchedule = await _showScheduleRepo.GetShowScheduleById(id);

            if (showSchedule == null)
                return NotFound();

            var showScheduleVM = _mapper.Map<ShowScheduleVM>(showSchedule);

            return View(showScheduleVM);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var showSchedule = await _showScheduleRepo.GetShowScheduleById(id);

            if (showSchedule == null)
            {
                return NotFound();
            }
            else
            {
                var showScheduleVM = _mapper.Map<ShowScheduleVM>(showSchedule);
                showScheduleVM.RegularPrice = showSchedule.ShowSeatPrices
                    ?.FirstOrDefault(x => x.SeatType == SeatType.Regular)?.ShowSeatPrice ?? 0;

                showScheduleVM.PremiumPrice = showSchedule.ShowSeatPrices
                    ?.FirstOrDefault(x => x.SeatType == SeatType.Premium)?.ShowSeatPrice ?? 0;

                showScheduleVM.ReclinerPrice = showSchedule.ShowSeatPrices
                    ?.FirstOrDefault(x => x.SeatType == SeatType.Recliner)?.ShowSeatPrice ?? 0;
                return View(showScheduleVM);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Edit(ShowScheduleVM showScheduleVM)
        {
            if (!ModelState.IsValid)
            {
                return View(showScheduleVM);
            }

            var showSchedule = _mapper.Map<ShowScheduleModel>(showScheduleVM);

            if (await _showScheduleRepo.UpdateShowSchedule(showSchedule, showScheduleVM.RegularPrice, showScheduleVM.PremiumPrice, showScheduleVM.ReclinerPrice) > 0)
            {
                return RedirectToAction("Index");
            }
            else
            {
                return View(showScheduleVM);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var showSchedule = await _showScheduleRepo.GetShowScheduleById(id);

            if (showSchedule == null)
            {
                return NotFound();
            }
            else
            {
                var showScheduleVM = _mapper.Map<ShowScheduleVM>(showSchedule);
                return View(showScheduleVM);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Delete(ShowScheduleVM showScheduleVM)
        {
            var showSchedule = _mapper.Map<ShowScheduleModel>(showScheduleVM);

            if (await _showScheduleRepo.DeleteShowSchedule(showSchedule) > 0)
            {
                return RedirectToAction("Index");
            }
            else
            {
                return View(showScheduleVM);
            }
        }

        private async Task LoadDropdowns()
        {
            var movies = await _showScheduleRepo.GetMovies();
            var screens = await _showScheduleRepo.GetScreens();

            ViewBag.Movies = new SelectList(movies, "MovieId", "MovTitle");
            ViewBag.Screens = new SelectList(screens, "ScreenId", "ScreenName");
        }
    }
}
