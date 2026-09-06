using OnlineMovieTicketBooking.Models;

namespace OnlineMovieTicketBooking.Repositories.TheatreRepo
{
    public interface ITheatreRepo
    {
        Task<int> CreateTheatre(TheatreModel theatre);
        Task<List<TheatreModel>> DisplayTheatres();
        Task<int> UpdateTheatre(TheatreModel theatre);
        Task<int> DeleteTheatre(TheatreModel theatre);
        Task<TheatreModel> GetTheatreById(int theatreId);
        Task<TheatreModel?> GetTheatreWithScreens(int theatreId);

    }
}
