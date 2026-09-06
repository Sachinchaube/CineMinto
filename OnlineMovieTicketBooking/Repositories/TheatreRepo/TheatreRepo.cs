using Microsoft.EntityFrameworkCore;
using OnlineMovieTicketBooking.DAL;
using OnlineMovieTicketBooking.Models;

namespace OnlineMovieTicketBooking.Repositories.TheatreRepo
{
    public class TheatreRepo : ITheatreRepo
    {
        DAL.OnlineMovieTicketBookingDBContext _context;

        public TheatreRepo(DAL.OnlineMovieTicketBookingDBContext context)
        {
            _context = context;
        }

        public async Task<int> CreateTheatre(TheatreModel theatre)
        {
            try
            {
                _context.Theatres.Add(theatre);
                await _context.SaveChangesAsync();
                return 1;
            }
            catch (DbUpdateException)
            {
                return 0;
            }
            
        }

        public async Task<int> DeleteTheatre(TheatreModel theatre)
        {
            try
            {
                _context.Theatres.Remove(theatre);
                await _context.SaveChangesAsync();
                return 1;
            }
            catch (DbUpdateException)
            {
                return 0;
            }
            
        }

        public async Task<List<TheatreModel>> DisplayTheatres()
        {
            return await _context.Theatres.ToListAsync();
        }

        public async Task<TheatreModel> GetTheatreById(int theatreId)
        {
            return await _context.Theatres.Where(x=>x.TheatreId == theatreId).FirstOrDefaultAsync();
        }

        public async Task<int> UpdateTheatre(TheatreModel theatre)
        {
            try
            {
                _context.Theatres.Update(theatre);
                await _context.SaveChangesAsync();
                return 1;
            }
            catch (DbUpdateException)
            {
                return 0;
            }
        }

        public async Task<TheatreModel?> GetTheatreWithScreens(int theatreId)
        {
            return await _context.Theatres
                .Include(x => x.Screens)
                .FirstOrDefaultAsync(x => x.TheatreId == theatreId);
        }
    }
}
