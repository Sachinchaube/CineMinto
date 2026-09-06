using OnlineMovieTicketBooking.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineMovieTicketBooking.ViewModels
{
    public class ShowScheduleVM
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

        [Required(ErrorMessage ="Enter regular seat price ")]
        public decimal RegularPrice { get; set; }

        [Required(ErrorMessage = "Enter Premium seat price ")]
        public decimal PremiumPrice { get; set; }

        [Required(ErrorMessage = "Enter Recliner seat price ")]
        public decimal ReclinerPrice { get; set; }
        public bool ShowIsActive { get; set; }

        public MovieModel? Movie { get; set; }
        public ScreenModel? Screen { get; set; }
    }
}
