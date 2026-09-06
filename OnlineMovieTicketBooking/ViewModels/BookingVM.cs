using OnlineMovieTicketBooking.Data;
using OnlineMovieTicketBooking.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineMovieTicketBooking.ViewModels
{
    public class BookingVM
    {
        [Key]
        public int BookingId { get; set; }

        [Required(ErrorMessage = "Show is required")]
        public int ShowScheduleId { get; set; }

        [Required(ErrorMessage = "Please select at least one seat")]
        public List<int> SeatIds { get; set; } = new List<int>();

        public decimal TotalAmount { get; set; }

        public ShowScheduleModel? ShowSchedule { get; set; }

        public List<BookingSeatModel>? BookingSeats { get; set; }
    }

}
