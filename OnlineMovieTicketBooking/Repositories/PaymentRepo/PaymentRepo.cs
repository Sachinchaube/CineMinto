using Microsoft.EntityFrameworkCore;
using OnlineMovieTicketBooking.DAL;
using OnlineMovieTicketBooking.Models;

namespace OnlineMovieTicketBooking.Repositories.PaymentRepo
{
    public class PaymentRepo:IPaymentRepo
    {
        OnlineMovieTicketBookingDBContext _context;

        public PaymentRepo(OnlineMovieTicketBookingDBContext context)
        {
            _context = context;
        }

        public async Task<BookingModel?> GetBooking(int bookingId, string userId)
        {
            return await _context.Bookings
                .Include(x => x.ShowSchedule)
                    .ThenInclude(x => x.Movie)
                .Include(x => x.ShowSchedule)
                    .ThenInclude(x => x.Screen)
                .Include(x => x.BookingSeats)
                    .ThenInclude(x => x.Seat)
                .Where(x => x.BookingId == bookingId && x.UserId == userId).FirstOrDefaultAsync();
        }

        public async Task<int> CreatePayment(PaymentModel payment)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var booking = await _context.Bookings.Where(x => x.BookingId == payment.BookingId).FirstOrDefaultAsync();
                if (booking == null)
                    return 0;

                payment.Amount = booking.TotalAmount;
                payment.PaymentStatus = PaymentStatus.Success;
                payment.TransactionId = "TXN-" + DateTime.Now.ToString("yyyyMMddHHmmssfff");
                payment.PaymentDate = DateTime.Now;
                booking.BookingStatus = BookingStatus.Confirmed;

                _context.Payments.Add(payment);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return payment.PaymentId;
            }
            catch (DbUpdateException)
            {
                await transaction.RollbackAsync();
                return 0;
            }
        }

        public async Task<PaymentModel?> GetPaymentByBookingId(int bookingId)
        {
            return await _context.Payments
                .Include(x => x.Booking)
                .Where(x => x.BookingId == bookingId).FirstOrDefaultAsync();
        }

    }
}
