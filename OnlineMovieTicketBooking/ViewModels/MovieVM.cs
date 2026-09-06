using OnlineMovieTicketBooking.Models;
using System.ComponentModel.DataAnnotations;

namespace OnlineMovieTicketBooking.ViewModels
{
    public class MovieVM
    {
        [Key]
        public int MovieId { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Length of {0} should be between {2} and {1}")]
        public string? MovTitle { get; set; }

        [StringLength(1000, ErrorMessage = "Description cannot exceed {1} characters")]
        public string? MovDescription { get; set; }

        [Required(ErrorMessage = "Genre is required")]
        [StringLength(30, ErrorMessage = "Length of {0} should not exceed {1}")]
        public string? MovGenre { get; set; }

        [Required(ErrorMessage = "Language is required")]
        [StringLength(30, ErrorMessage = "Length of {0} should not exceed {1}")]
        public string? MovLanguage { get; set; }

        [Required(ErrorMessage = "Movie Duration (in minutes) required")]
        public int MovDuration { get; set; }

        [Required(ErrorMessage = "Release Date is Required")]
        [DataType(DataType.Date)]
        public DateOnly MovRelDate { get; set; }

        [StringLength(300)]
        [DataType(DataType.ImageUrl)]
        public string? MovPosterUrl { get; set; }

        [Required(ErrorMessage = "Tell if the movie is currently active or not (true / false)")]
        public bool MovIsActive { get; set; }

        public List<ShowScheduleModel>? ShowSchedules { get; set; }
    }
}
