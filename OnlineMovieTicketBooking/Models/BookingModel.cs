using OnlineMovieTicketBooking.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineMovieTicketBooking.Models
{
    public class BookingModel
    {
        [Key]
        public int BookingId { get; set; }

        [Required(ErrorMessage = "User is required")]
        [ForeignKey("User")]
        public string UserId { get; set; } = string.Empty;   //will create in repository var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)

        [Required(ErrorMessage = "Show is required")]
        [ForeignKey("ShowSchedule")]
        public int ShowScheduleId { get; set; }

        [Required(ErrorMessage = "Booking reference is required")]
        public string BookingReference { get; set; } = string.Empty; //unique booking number user-facing will generate in repo booking.BookingReference = "BK-" + DateTime.Now.ToString("yyyyMMddHHmmssfff");

        public DateTime BookingDate { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Total amount must be greater than 0")]
        public decimal TotalAmount { get; set; }  //will get calculated in repository

        public BookingStatus BookingStatus { get; set; }

        public ApplicationUser? User { get; set; }

        public ShowScheduleModel? ShowSchedule { get; set; }

        public List<BookingSeatModel>? BookingSeats { get; set; }
        public PaymentModel? Payment { get; set; }
    }

    public enum BookingStatus
    {
        Pending = 1,
        Confirmed = 2,
        Cancelled = 3
    }
}
