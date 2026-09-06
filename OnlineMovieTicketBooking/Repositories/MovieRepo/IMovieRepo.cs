using OnlineMovieTicketBooking.Models;

namespace OnlineMovieTicketBooking.Repositories.MovieRepo
{
    public interface IMovieRepo
    {
        Task<int> CreateMovie(MovieModel movie);
        Task<List<MovieModel>> DisplayMovies();
        Task<int> UpdateMovie(MovieModel movie);
        Task<int> DeleteMovie(MovieModel movie);
        Task<MovieModel> GetMovieById(int movieId);
    }
}
