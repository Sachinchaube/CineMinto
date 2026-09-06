using Microsoft.EntityFrameworkCore;
using OnlineMovieTicketBooking.DAL;
using OnlineMovieTicketBooking.Models;
using OnlineMovieTicketBooking.ViewModels;

namespace OnlineMovieTicketBooking.Repositories.MovieRepo
{
    public class MovieRepo:IMovieRepo
    {
        OnlineMovieTicketBookingDBContext _context;

        public MovieRepo(OnlineMovieTicketBookingDBContext context)
        {
            _context = context;
        }

        public async Task<int> CreateMovie(MovieModel movie)
        {
            try
            {
                _context.Movies.Add(movie);
                await _context.SaveChangesAsync();
                return 1;
            }
            catch (DbUpdateException)
            {
                return 0;
            }

        }

        public async Task<int> DeleteMovie(MovieModel movie)
        {
            try
            {
                _context.Movies.Remove(movie);
                await _context.SaveChangesAsync();
                return 1;
            }
            catch (DbUpdateException)
            {
                return 0;
            }
        }

        public async Task<List<MovieModel>> DisplayMovies()
        {
            return await _context.Movies.ToListAsync();
        }

        public async Task<MovieModel> GetMovieById(int movieId)
        {
            return await _context.Movies.Where(x => x.MovieId == movieId).FirstOrDefaultAsync();
        }

        public async Task<int> UpdateMovie(MovieModel movie)
        {
            try
            {
                _context.Movies.Update(movie);
                await _context.SaveChangesAsync();
                return 1;
            }
            catch (DbUpdateException)
            {
                return 0;
            }
            
        }

    }
}
