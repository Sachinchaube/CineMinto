using AutoMapper;
using OnlineMovieTicketBooking.Models;
using OnlineMovieTicketBooking.ViewModels;
namespace OnlineMovieTicketBooking.AutoMapper
{
    public class ShowScheduleMapper:Profile
    {
        public ShowScheduleMapper()
        {
            CreateMap<ShowScheduleVM, ShowScheduleModel>();
            CreateMap<ShowScheduleModel, ShowScheduleVM>();
        }
    }
}
