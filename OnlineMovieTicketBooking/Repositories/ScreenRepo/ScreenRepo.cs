using Microsoft.EntityFrameworkCore;
using OnlineMovieTicketBooking.DAL;
using OnlineMovieTicketBooking.Models;

namespace OnlineMovieTicketBooking.Repositories.ScreenRepo
{
    public class ScreenRepo : IScreenRepo
    {
        OnlineMovieTicketBookingDBContext _context;

        public ScreenRepo(OnlineMovieTicketBookingDBContext context)
        {
            _context = context;
        }


        public async Task<int> CreateScreen(ScreenModel screen)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                _context.Screens.Add(screen);
                await _context.SaveChangesAsync();
                await CreateSeats(screen);
                await transaction.CommitAsync();
                return 1;

            }
            catch
            {
                await transaction.RollbackAsync();
                return 0;
            }
        }

        public async Task<int> DeleteScreen(ScreenModel screen)
        {
            try
            {
                _context.Screens.Remove(screen);
                await _context.SaveChangesAsync();
                return 1;
            }
            catch (DbUpdateException)
            {
                return 0;
            }
        }

        public async Task<List<ScreenModel>> DisplayScreens()
        {
            return await _context.Screens.Include(x => x.Theatre).ToListAsync();
        }

        public async Task<ScreenModel> GetScreenById(int screenId)
        {
            return await _context.Screens.Where(x => x.ScreenId == screenId).FirstOrDefaultAsync();
        }

        public async Task<int> UpdateScreen(ScreenModel screen)
        {
            try
            {
                _context.Screens.Update(screen);
                await _context.SaveChangesAsync();
                return 1;
            }
            catch (DbUpdateException)
            {
                return 0;
            }
        }

        public async Task<int> CreateSeats(ScreenModel screen)
        {
            List<SeatModel> seats = new List<SeatModel>();
            for(int i = 1; i<=screen.RegularSeats; i++)
            {
                seats.Add(new SeatModel
                {
                    ScreenId = screen.ScreenId,
                    RowNum = "A",
                    SeatNum = i,
                    SeatType = SeatType.Regular,
                    SeatIsActive = true
                });
            }

            for (int i = 1; i <= screen.PremiumSeats; i++)
            {
                seats.Add(new SeatModel
                {
                    ScreenId = screen.ScreenId,
                    RowNum = "B",
                    SeatNum = i,
                    SeatType = SeatType.Premium,
                    SeatIsActive = true
                });
            }

            for (int i = 1; i <= screen.ReclinerSeats; i++)
            {
                seats.Add(new SeatModel
                {
                    ScreenId = screen.ScreenId,
                    RowNum = "C",
                    SeatNum = i,
                    SeatType = SeatType.Recliner,
                    SeatIsActive = true
                });
            }
            await _context.Seats.AddRangeAsync(seats);
            return await _context.SaveChangesAsync();
        }

        public async Task<List<TheatreModel>> GetTheatres()
        {
            return await _context.Theatres
                .Where(x => x.TheaIsActive)
                .ToListAsync();
        }

        public async Task<ScreenModel?> GetScreenWithShows(int screenId)
        {
            return await _context.Screens
                .Include(x => x.Theatre)
                .Include(x => x.Schedules.Where(x => x.ShowIsActive))
                    .ThenInclude(x => x.Movie)
                .FirstOrDefaultAsync(x => x.ScreenId == screenId);
        }
    }
}
