using OnlineMovieTicketBooking.Models;
using System.ComponentModel.DataAnnotations;

namespace OnlineMovieTicketBooking.ViewModels
{
    public class PaymentVM
    {
        public int BookingId { get; set; }
        public decimal Amount { get; set; }

        [Required(ErrorMessage = "Payment method is required")]
        public PaymentMethod PaymentMethod { get; set; }
    }
}
