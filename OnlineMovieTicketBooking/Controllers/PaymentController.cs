using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OnlineMovieTicketBooking.Data;
using OnlineMovieTicketBooking.Models;
using OnlineMovieTicketBooking.Repositories.PaymentRepo;
using OnlineMovieTicketBooking.ViewModels;

namespace OnlineMovieTicketBooking.Controllers
{
    public class PaymentController : Controller
    {
        IPaymentRepo _paymentRepo;
        UserManager<ApplicationUser> _userManager;
        IMapper _mapper;

        public PaymentController(IPaymentRepo paymentRepo, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _paymentRepo = paymentRepo;
            _userManager = userManager;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Payment(int bookingId)
        {
            var user = _userManager.GetUserId(User);
            if (user == null)
            {
                return Challenge();
            }

            var booking = await _paymentRepo.GetBooking(bookingId, user);
            if (booking == null)
            {
                return NotFound();
            }

            var payment = new PaymentVM { BookingId = bookingId , Amount = booking.TotalAmount};
            return View(payment);
        }


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Payment(PaymentVM paymentVM)
        {
            if(!ModelState.IsValid) 
            { 
                return View(paymentVM); 
            }

            var payment = _mapper.Map<PaymentModel>(paymentVM);
            var paymentId = await _paymentRepo.CreatePayment(payment);
            if ( paymentId > 0)
            {
                return RedirectToAction("Details", "booking", new{bookingId= payment.BookingId});
            }
            else
            {
                ModelState.AddModelError("", "Payment Failed.");
                return View(paymentVM);
            }
        }
    }
}
