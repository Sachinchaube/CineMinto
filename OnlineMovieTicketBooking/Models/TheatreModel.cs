using System.ComponentModel.DataAnnotations;

namespace OnlineMovieTicketBooking.Models
{
    public class TheatreModel
    {
        [Key]
        public int TheatreId { get; set; }

        [Required(ErrorMessage = "Theatre name is required")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Length of {0} should be between {2} and {1}")]
        public string? TheaName { get; set; }

        [Required(ErrorMessage ="Enter the complete theatre address")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Length of Theatre Address should be between {2} and {1}")]
        public string? TheaAddress { get; set; }

        [Required(ErrorMessage ="Enter the name of city in which theatre is located")]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Length of city should be between {2} and {1}")]
        public string? TheaCIty { get; set; }

        [Required(ErrorMessage ="Tell whether the theatre is active or not")]
        public bool TheaIsActive { get; set; }
        public List<ScreenModel>? Screens { get; set; }


    }
}
