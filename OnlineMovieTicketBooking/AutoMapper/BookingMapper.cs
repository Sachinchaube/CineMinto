using AutoMapper;
using OnlineMovieTicketBooking.Models;
using OnlineMovieTicketBooking.ViewModels;

namespace OnlineMovieTicketBooking.AutoMapper
{
    public class BookingMapper:Profile
    {
        public BookingMapper()
        {
            CreateMap<BookingVM, BookingModel>();
            CreateMap<BookingModel, BookingVM>();
        }
        
    }
}
