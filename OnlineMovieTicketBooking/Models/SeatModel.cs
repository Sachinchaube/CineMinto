using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineMovieTicketBooking.Models
{
    public class SeatModel  //auto created when screen is created in controller
    {
        [Key]
        public int SeatId { get; set; }

        [ForeignKey("Screen")]
        public int ScreenId { get; set; }

        [Required(ErrorMessage = "Row number is required")]
        public string? RowNum { get; set; }

        [Required(ErrorMessage = "Seat number is required")]
        public int SeatNum { get; set; }

        [Required(ErrorMessage = "Enter valid seat type (Regular/Premium/Recliner)")]
        public SeatType SeatType { get; set; }

        [Required(ErrorMessage = "Tell whether the seat is active or not")]
        public bool SeatIsActive { get; set; }

        public ScreenModel? Screen { get; set; }
    }

    public enum SeatType
    {
        Regular = 1,
        Premium = 2,
        Recliner = 3

    }
}
