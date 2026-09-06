using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineMovieTicketBooking.Models
{
    public class PaymentModel
    {
        [Key]
        public int PaymentId { get; set; }

        [Required(ErrorMessage = "Booking is required")]
        [ForeignKey("Booking")]
        public int BookingId { get; set; }

        [Required(ErrorMessage = "Payment amount is required")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than 0")]
        public decimal Amount { get; set; }  //autocalculated booking.TotalAmount in repo

        [Required(ErrorMessage = "Payment method is required")]
        public PaymentMethod PaymentMethod { get; set; }

        [Required(ErrorMessage = "Payment status is required")]
        public PaymentStatus PaymentStatus { get; set; }

        public string? TransactionId { get; set; } //will auto generated and set to unique in dbcontext

        [Required(ErrorMessage = "Payment date is required")]
        public DateTime PaymentDate { get; set; } //system date will set in repo

        public BookingModel? Booking { get; set; }
    }

    public enum PaymentMethod
    {
        UPI = 1,
        Card = 2,
        NetBanking = 3
    }

    public enum PaymentStatus
    {
        Pending = 1,
        Success = 2,
        Failed = 3,
        Refunded = 4
    }
}
