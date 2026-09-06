using OnlineMovieTicketBooking.Models;

namespace OnlineMovieTicketBooking.Repositories.PaymentRepo
{
    public interface IPaymentRepo
    {
        Task<BookingModel?> GetBooking(int bookingId, string userId);
        Task<int> CreatePayment(PaymentModel payment);
        Task<PaymentModel?> GetPaymentByBookingId(int bookingId);
    }
}
