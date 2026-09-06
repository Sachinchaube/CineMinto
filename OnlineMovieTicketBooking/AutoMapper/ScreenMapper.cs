using AutoMapper;
using OnlineMovieTicketBooking.Models;
using OnlineMovieTicketBooking.ViewModels;
namespace OnlineMovieTicketBooking.AutoMapper
{
    public class ScreenMapper:Profile
    {
        public ScreenMapper()
        {
            CreateMap<ScreenVM, ScreenModel>();
            CreateMap<ScreenModel, ScreenVM>();
        }
    }
}
