using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineMovieTicketBooking.Models
{
    public class BookingSeatModel
    {
        [Key]
        public int BookingSeatId { get; set; }

        [ForeignKey("Booking")]
        public int BookingId { get; set; }

        [ForeignKey("ShowSchedule")]
        public int ShowScheduleId { get; set; }

        [ForeignKey("Seat")]
        public int SeatId { get; set; }

        // Price will be calculated automatically from ShowSeatPrices
        // at the time of booking and then saved here.
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
        public decimal Price { get; set; }

        public BookingModel? Booking { get; set; }

        public SeatModel? Seat { get; set; }
        public ShowScheduleModel? ShowSchedule { get; set; }
    }
}
