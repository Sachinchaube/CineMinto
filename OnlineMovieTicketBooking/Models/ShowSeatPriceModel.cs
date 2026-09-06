using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineMovieTicketBooking.Models
{
    public class ShowSeatPriceModel
    {

        [Key]
        public int ShowSeatPriceId { get; set; }

        [ForeignKey("ShowSchedule")]
        public int ShowScheduleId { get; set; }
        public SeatType SeatType { get; set; }

        [Required]
        public decimal ShowSeatPrice { get; set; } //price based on unique pair or showscheduleid and seattype in dbcontext file

        public ShowScheduleModel? ShowSchedule { get; set; }

    }
}
