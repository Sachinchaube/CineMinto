using AutoMapper;
using OnlineMovieTicketBooking.Data;
using OnlineMovieTicketBooking.ViewModels;

namespace OnlineMovieTicketBooking.AutoMapper
{
    public class AccountMapper:Profile
    {
        public AccountMapper()
        {
            CreateMap<RegisterVM, ApplicationUser>();
            CreateMap<ApplicationUser, RegisterVM>();
            CreateMap<LoginVM, ApplicationUser>();
            CreateMap<ApplicationUser, LoginVM>();
        }
    }
}
