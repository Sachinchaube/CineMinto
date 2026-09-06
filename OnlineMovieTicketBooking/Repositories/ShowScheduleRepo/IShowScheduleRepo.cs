using OnlineMovieTicketBooking.Models;

namespace OnlineMovieTicketBooking.Repositories.ShowScheduleRepo
{
    public interface IShowScheduleRepo
    {
        Task<int> CreateShowSchedule(ShowScheduleModel showSchedule, decimal regularPrice, decimal premiumPrice, decimal reclinerPrice);
        Task<List<ShowScheduleModel>> DisplayShowSchedules();
        Task<int> UpdateShowSchedule(ShowScheduleModel showSchedule, decimal regularPrice, decimal premiumPrice, decimal reclinerPrice);
        Task<int> DeleteShowSchedule(ShowScheduleModel showSchedule);
        Task<ShowScheduleModel> GetShowScheduleById(int showScheduleId);
        Task<List<MovieModel>> GetMovies();
        Task<List<ScreenModel>> GetScreens();
    }
}
