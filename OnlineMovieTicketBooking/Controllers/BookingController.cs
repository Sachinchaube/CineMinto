using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OnlineMovieTicketBooking.Data;
using OnlineMovieTicketBooking.Models;
using OnlineMovieTicketBooking.Repositories.BookingRepo;
using OnlineMovieTicketBooking.ViewModels;

namespace OnlineMovieTicketBooking.Controllers
{
    public class BookingController : Controller
    {
        IBookingRepo _bookingRepo;
        UserManager<ApplicationUser> _userManager;
        IMapper _mapper;

        public BookingController(IBookingRepo bookingRepo, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _bookingRepo = bookingRepo;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> SelectSeats(int showScheduleId)
        {
            var show = await _bookingRepo.GetShowSchedule(showScheduleId);

            if (show == null || !show.ShowIsActive)
            {
                return NotFound();
            }

            var seats = await _bookingRepo.GetSeats(showScheduleId);
            ViewBag.Show = show;
            return View(seats);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(BookingVM bookingVM)
        {

            if (!ModelState.IsValid)
            {
                var seats_ = await _bookingRepo.GetSeats(bookingVM.ShowScheduleId);
                var show_ = await _bookingRepo.GetShowSchedule(bookingVM.ShowScheduleId);

                ViewBag.Show = show_;

                return View("SelectSeats", seats_);
            }

            var userId = _userManager.GetUserId(User); //User in controller class
            if (userId == null)
            {
                return Challenge();
            }
            var booking = _mapper.Map<BookingModel>(bookingVM);
            var bookingId = await _bookingRepo.CreateBooking(booking, bookingVM.SeatIds, userId);
            if (bookingId > 0)
            {
                return RedirectToAction("Payment", "Payment", new { bookingId = bookingId });
            }
            else
            {
                ModelState.AddModelError("", "Selected seats are no longer available.");
            }
            var seats = await _bookingRepo.GetSeats(bookingVM.ShowScheduleId);
            var show = await _bookingRepo.GetShowSchedule(bookingVM.ShowScheduleId);

            ViewBag.Show = show;

            return View("SelectSeats", seats);

        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Details(int bookingId)
        {
            var userId = _userManager.GetUserId(User);

            if (userId == null)
            {
                return Challenge();
            }

            var booking = await _bookingRepo.GetBookingById(bookingId, userId);

            if (booking == null)
            {
                return NotFound();
            }

            return View(booking);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> MyBookings()
        {
            var userId = _userManager.GetUserId(User);

            if (userId == null)
            {
                return Challenge();
            }

            var bookings = await _bookingRepo.GetBookingsByUser(userId);

            return View(bookings);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> AllBookings()
        {
            var bookings = await _bookingRepo.GetAllBookings();

            return View(bookings);
        }


    }

}

