using AutoMapper;
using OnlineMovieTicketBooking.Models;
using OnlineMovieTicketBooking.ViewModels;

namespace OnlineMovieTicketBooking.AutoMapper
{
    public class MovieMapper:Profile
    {
        public MovieMapper()
        {
            CreateMap<MovieVM, MovieModel>();
            CreateMap<MovieModel, MovieVM>();
        }
    }
}
