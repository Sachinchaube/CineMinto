using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineMovieTicketBooking.Models
{
    public class ShowScheduleModel
    {
        [Key]
        public int ShowScheduleId { get; set; }

        [ForeignKey("Movie")]
        public int MovieId { get; set; }

        [ForeignKey("Screen")]
        public int ScreenId { get; set; }

        [Required(ErrorMessage = "Show Date is Required")]
        [DataType(DataType.Date)]
        public DateOnly ShowDate { get; set; }

        [Required(ErrorMessage = "Show start time is Required")]
        [DataType(DataType.Time)]
        public TimeOnly ShowStartTime { get; set; }

        public TimeOnly ShowEndTime { get; set; } //calculated in repo 
        public bool ShowIsActive { get; set; }

        public MovieModel? Movie { get; set; }
        public ScreenModel? Screen { get; set; }
        public List<ShowSeatPriceModel>? ShowSeatPrices { get; set; }
        public List<BookingModel>? Bookings { get; set; }
        public List<BookingSeatModel>? BookingSeats { get; set; }
    }
}
