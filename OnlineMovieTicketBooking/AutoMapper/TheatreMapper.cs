using AutoMapper;
using OnlineMovieTicketBooking.Models;
using OnlineMovieTicketBooking.ViewModels;
namespace OnlineMovieTicketBooking.AutoMapper
{
    public class TheatreMapper:Profile
    {
        public TheatreMapper()
        {
            CreateMap<TheatreVM, TheatreModel>();
            CreateMap<TheatreModel, TheatreVM>();
        }
    }
}
