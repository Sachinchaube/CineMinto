using OnlineMovieTicketBooking.Models;

namespace OnlineMovieTicketBooking.ViewModels
{
    public class SeatVM
    {
        public int SeatId { get; set; }
        public string? RowNum { get; set; }
        public int SeatNum { get; set; }
        public SeatType SeatType { get; set; }
        public bool SeatIsActive { get; set; }
        public bool IsBooked { get; set; } // added to check in Booking repo 
    }
}
