using OnlineMovieTicketBooking.Models;
using OnlineMovieTicketBooking.ViewModels;

namespace OnlineMovieTicketBooking.Repositories.BookingRepo
{
    public interface IBookingRepo
    {
        Task<ShowScheduleModel?> GetShowSchedule(int showScheduleId);
        Task<List<SeatVM>> GetSeats(int showScheduleId);
        Task<int> CreateBooking(BookingModel booking, List<int> seatIds, string userId);
        Task<BookingModel?> GetBookingById(int bookingId, string userId);
        Task<List<BookingModel>> GetBookingsByShow(int showScheduleId);
        Task<List<BookingModel>> GetBookingsByUser(string userId);
        Task<List<BookingModel>> GetAllBookings();
        //Task<int> CancelBooking(int bookingId, string userId);
    }
}
