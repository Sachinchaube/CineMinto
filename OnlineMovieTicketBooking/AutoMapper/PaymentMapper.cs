using AutoMapper;
using OnlineMovieTicketBooking.Models;
using OnlineMovieTicketBooking.ViewModels;

namespace OnlineMovieTicketBooking.AutoMapper
{
    public class PaymentMapper:Profile
    {
        public PaymentMapper()
        {
            CreateMap<PaymentModel, PaymentVM>();
            CreateMap<PaymentVM, PaymentModel>();
        }
    }
}
