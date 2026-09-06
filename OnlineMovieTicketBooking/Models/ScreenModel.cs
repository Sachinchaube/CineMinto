using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineMovieTicketBooking.Models
{
    public class ScreenModel
    {
        [Key]
        public int ScreenId { get; set; }

        [ForeignKey("Theatre")]
        public int TheatreId { get; set; }

        [Required(ErrorMessage = "Screen name is required")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Length of {0} should be between {2} and {1}")]
        public string? ScreenName { get; set; }

        [Required(ErrorMessage = "Enter the total nuber of regular seats")]
        public int RegularSeats { get; set; }

        [Required(ErrorMessage = "Enter the total nuber of premium seats")]
        public int PremiumSeats { get; set; }

        [Required(ErrorMessage = "Enter the total nuber of recliner seats")]
        public int ReclinerSeats { get; set; }

        [Required(ErrorMessage ="Enter the total nuber of seats")]
        public int TotalSeats => RegularSeats + PremiumSeats + ReclinerSeats;

        [Required(ErrorMessage = "Tell whether the screen is active or not")]
        public bool ScreenIsActive { get; set; }

        public TheatreModel? Theatre { get; set; }
        public List<SeatModel>? Seats { get; set; }
        public List<ShowScheduleModel>? Schedules { get; set; }

    }
}
