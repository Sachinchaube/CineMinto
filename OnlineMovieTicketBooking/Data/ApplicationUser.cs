using Microsoft.AspNetCore.Identity;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;
namespace OnlineMovieTicketBooking.Data;
// Add profile data for application users by adding properties to the ApplicationUser class
public class ApplicationUser : IdentityUser
{
    [Required(ErrorMessage = "Full name is required")]
    [StringLength(20, MinimumLength = 1, ErrorMessage = "Length of {0} should be between {2} and {1}")]
    [DisplayName("Full Name")]
    public string? FullName { get; set; }
}
