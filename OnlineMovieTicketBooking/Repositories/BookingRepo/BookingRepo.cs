using Microsoft.EntityFrameworkCore;
using OnlineMovieTicketBooking.DAL;
using OnlineMovieTicketBooking.Models;
using OnlineMovieTicketBooking.ViewModels;

namespace OnlineMovieTicketBooking.Repositories.BookingRepo
{
    public class BookingRepo : IBookingRepo
    {
        OnlineMovieTicketBookingDBContext _context;

        public BookingRepo(OnlineMovieTicketBookingDBContext context)
        {
            _context = context;
        }

        public async Task<ShowScheduleModel?> GetShowSchedule(int showScheduleId)
        {
            return await _context.ShowSchedules
                .Include(x => x.Movie)
                .Include(x => x.Screen)
                .Include(x => x.ShowSeatPrices)
                .Where(x => x.ShowScheduleId == showScheduleId).FirstOrDefaultAsync();
        }
        public async Task<List<SeatVM>> GetSeats(int showScheduleId)
        {
            var show = await _context.ShowSchedules.Where(x=>x.ShowScheduleId == showScheduleId).FirstOrDefaultAsync();
            if (show == null)
                return new List<SeatVM>();

            var bookedSeatIds = await _context.BookingSeats.Where(x => x.ShowScheduleId == showScheduleId)
                .Select(x => x.SeatId).ToListAsync();

            var seats = await _context.Seats.Where(x => x.ScreenId == show.ScreenId && x.SeatIsActive).ToListAsync();
            return seats.Select(x => new SeatVM
            {
                SeatId = x.SeatId,
                RowNum = x.RowNum,
                SeatNum = x.SeatNum,
                SeatType = x.SeatType,
                SeatIsActive = x.SeatIsActive,
                IsBooked = bookedSeatIds.Contains(x.SeatId)

            }).ToList();
        }

        public async Task<int> CreateBooking(BookingModel booking, List<int> seatIds, string userId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var show = await _context.ShowSchedules.Where(x => x.ShowScheduleId == booking.ShowScheduleId).FirstOrDefaultAsync();
                if (show == null || !show.ShowIsActive)
                {
                    return 0;
                }

                var prices = await _context.ShowSeatPrices
                    .Where(x => x.ShowScheduleId == booking.ShowScheduleId)
                    .ToListAsync();

                //storing valid physical seats provided by user on basis on unique seatid and screenid pair
                var seats = await _context.Seats.Where(x => seatIds.Contains(x.SeatId) && x.ScreenId == show.ScreenId && x.SeatIsActive).ToListAsync();
                if (seats.Count != seatIds.Count)
                {
                    return 0;
                }

                var alreadyBooked = await _context.BookingSeats.
                    Where(x => x.ShowScheduleId == show.ShowScheduleId && seatIds.
                    Contains(x.SeatId)).FirstOrDefaultAsync();
                if (alreadyBooked!=null)
                {
                    return 0;
                }

                booking.UserId = userId;
                booking.BookingReference = "BK-" + DateTime.Now.ToString("yyyyMMddHHmmssfff");
                booking.BookingDate = DateTime.Now;
                booking.BookingStatus = BookingStatus.Pending;

                List<BookingSeatModel> bookingSeats = new List<BookingSeatModel>();
                foreach (var seat in seats)
                {
                    var price = prices.FirstOrDefault(x => x.SeatType == seat.SeatType);
                    if (price == null)
                    {
                        return 0;
                    }
                    bookingSeats.Add(new BookingSeatModel
                    {
                        ShowScheduleId = show.ShowScheduleId,
                        SeatId = seat.SeatId,
                        Price = price.ShowSeatPrice
                    });
                }
                booking.TotalAmount = bookingSeats.Sum(x => x.Price);
                _context.Bookings.Add(booking);
                await _context.SaveChangesAsync();
                foreach(var bookingSeat in bookingSeats)
                {
                    bookingSeat.BookingId = booking.BookingId;
                }

                await _context.BookingSeats.AddRangeAsync(bookingSeats);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return booking.BookingId;
            }
            catch(DbUpdateException)
            {
                await transaction.RollbackAsync();
                return 0;
            }
        }

        public async Task<BookingModel?> GetBookingById(int bookingId, string userId)
        {
            return await _context.Bookings
                .Include(x=>x.ShowSchedule)
                    .ThenInclude(x=>x.Movie)
                .Include(x=>x.ShowSchedule)
                    .ThenInclude(x=>x.Screen)
                .Where(x=>x.BookingId ==  bookingId && x.UserId == userId).FirstOrDefaultAsync();
        }
        public async Task<List<BookingModel>> GetBookingsByShow(int showScheduleId)
        {
            return await _context.Bookings
                .Include(x => x.User)
                .Include(x => x.BookingSeats)
                    .ThenInclude(x => x.Seat)
                .Where(x => x.ShowScheduleId == showScheduleId)
                .ToListAsync();
        }

        public async Task<List<BookingModel>> GetBookingsByUser(string userId)
        {
            return await _context.Bookings
                .Include(x => x.ShowSchedule)
                    .ThenInclude(x => x.Movie)
                .Include(x => x.ShowSchedule)
                    .ThenInclude(x => x.Screen)
                .Include(x => x.BookingSeats)
                    .ThenInclude(x => x.Seat)
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }

        public async Task<List<BookingModel>> GetAllBookings()
        {
            return await _context.Bookings
                .Include(x => x.User)
                .Include(x => x.ShowSchedule)
                    .ThenInclude(x => x.Movie)
                .Include(x => x.ShowSchedule)
                    .ThenInclude(x => x.Screen)
                .Include(x => x.BookingSeats)
                    .ThenInclude(x => x.Seat)
                .Include(x => x.Payment)
                .ToListAsync();
        }

        //public async Task<int> CancelBooking(int bookingId, string userId)
        //{
        //    try
        //    {
        //        var booking = await GetBookingById(bookingId, userId);
        //        if (booking == null)
        //        {
        //            return 0;
        //        }
        //        if(booking.BookingStatus == BookingStatus.Cancelled)
        //        {
        //            return 0;
        //        }
        //        DateTime showBookedDate = booking.ShowSchedule!.ShowDate.ToDateTime(booking.ShowSchedule.ShowStartTime);
        //        if (showBookedDate <= DateTime.Now.AddHours(24))
        //        {
        //            return 0;
        //        }
        //        booking.BookingStatus = BookingStatus.Cancelled;

        //        return await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        return 0;
        //    }
        //}

    }
}
