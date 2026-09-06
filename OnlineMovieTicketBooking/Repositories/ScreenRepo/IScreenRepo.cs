using OnlineMovieTicketBooking.Models;

namespace OnlineMovieTicketBooking.Repositories.ScreenRepo
{
    public interface IScreenRepo
    {
        Task<int> CreateScreen(ScreenModel screen);
        Task<List<ScreenModel>> DisplayScreens();
        Task<int> UpdateScreen(ScreenModel screen);
        Task<int> DeleteScreen(ScreenModel screen);
        Task<ScreenModel> GetScreenById(int screenId);
        Task<int> CreateSeats(ScreenModel screen);
        Task<List<TheatreModel>> GetTheatres();

        Task<ScreenModel?> GetScreenWithShows(int screenId);

    }
}
