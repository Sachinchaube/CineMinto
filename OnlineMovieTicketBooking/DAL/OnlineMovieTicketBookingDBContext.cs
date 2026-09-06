using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OnlineMovieTicketBooking.Data;
using OnlineMovieTicketBooking.Models;

namespace OnlineMovieTicketBooking.DAL
{
    public class OnlineMovieTicketBookingDBContext: IdentityDbContext<ApplicationUser>
    {
        public OnlineMovieTicketBookingDBContext(DbContextOptions<OnlineMovieTicketBookingDBContext> options): base(options)
        {
            
        }
        public DbSet<MovieModel> Movies { get; set; }
        public DbSet<TheatreModel> Theatres { get; set; }
        public DbSet<BookingSeatModel> BookingSeats { get; set; }
        public DbSet<BookingModel> Bookings { get; set; }
        public DbSet<PaymentModel> Payments { get; set; }
        public DbSet<ScreenModel> Screens { get; set; }
        public DbSet<SeatModel> Seats { get; set; }
        public DbSet<ShowScheduleModel> ShowSchedules { get; set; }
        public DbSet<ShowSeatPriceModel> ShowSeatPrices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Decimal precision
            modelBuilder.Entity<BookingModel>()
                .Property(x => x.TotalAmount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<BookingSeatModel>()
                .Property(x => x.Price)
                .HasPrecision(18, 2);

            modelBuilder.Entity<PaymentModel>()
                .Property(x => x.Amount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<ShowSeatPriceModel>()
                .Property(x => x.ShowSeatPrice)
                .HasPrecision(18, 2);

            // Theatre 1:N Screens
            modelBuilder.Entity<ScreenModel>()
                .HasOne(s => s.Theatre)
                .WithMany(t => t.Screens)
                .HasForeignKey(s => s.TheatreId)
                .OnDelete(DeleteBehavior.Restrict);

            //Screen 1:N Seats
            modelBuilder.Entity<SeatModel>()
                .HasOne(se => se.Screen)
                .WithMany(s => s.Seats)
                .HasForeignKey(se => se.ScreenId)
                .OnDelete(DeleteBehavior.Restrict);

            // Movie 1 : N ShowSchedule
            modelBuilder.Entity<ShowScheduleModel>()
                .HasOne(s => s.Movie)
                .WithMany(m => m.ShowSchedules)
                .HasForeignKey(s => s.MovieId)
                .OnDelete(DeleteBehavior.Restrict);

            // Screen 1 : N ShowSchedule
            modelBuilder.Entity<ShowScheduleModel>()
                .HasOne(s => s.Screen)
                .WithMany(sc => sc.Schedules)
                .HasForeignKey(s => s.ScreenId)
                .OnDelete(DeleteBehavior.Restrict);

            // ShowSchedule 1 : N ShowSeatPrice
            modelBuilder.Entity<ShowSeatPriceModel>()
                .HasOne(p => p.ShowSchedule)
                .WithMany(s => s.ShowSeatPrices)
                .HasForeignKey(p => p.ShowScheduleId)
                .OnDelete(DeleteBehavior.Cascade);

            // ShowSchedule 1 : N Booking
            modelBuilder.Entity<BookingModel>()
                .HasOne(s => s.ShowSchedule)
                .WithMany(b => b.Bookings)
                .HasForeignKey(s => s.ShowScheduleId)
                .OnDelete(DeleteBehavior.Restrict);

            // ShowSchedul 1 : N BookingSeats
            modelBuilder.Entity<BookingSeatModel>()
                .HasOne(bs => bs.ShowSchedule)
                .WithMany(s => s.BookingSeats)
                .HasForeignKey(bs => bs.ShowScheduleId)
                .OnDelete(DeleteBehavior.Restrict);

            // Booking 1 : N BookingSeat
            modelBuilder.Entity<BookingSeatModel>()
                .HasOne(bs => bs.Booking)
                .WithMany(b => b.BookingSeats)
                .HasForeignKey(bs => bs.BookingId)
                .OnDelete(DeleteBehavior.Cascade);

            // Seat 1 : N BookingSeat
            modelBuilder.Entity<BookingSeatModel>()
                .HasOne(bs => bs.Seat)
                .WithMany()
                .HasForeignKey(bs => bs.SeatId)
                .OnDelete(DeleteBehavior.Restrict);

            // Booking 1 : 1 Payment
            modelBuilder.Entity<PaymentModel>()
                .HasOne(p => p.Booking)
                .WithOne(b => b.Payment)
                .HasForeignKey<PaymentModel>(p => p.BookingId)
                .OnDelete(DeleteBehavior.Cascade);

            // One price for one SeatType in one Show
            modelBuilder.Entity<ShowSeatPriceModel>()
                .HasIndex(x => new { x.ShowScheduleId, x.SeatType })
                .IsUnique();

            // Same seat cannot be booked more than once for the same show
            modelBuilder.Entity<BookingSeatModel>()
                .HasIndex(x => new { x.ShowScheduleId, x.SeatId })
                .IsUnique();

            // Same seat cannot be duplicated in same Screen
            modelBuilder.Entity<SeatModel>()
                .HasIndex(x => new { x.ScreenId, x.RowNum, x.SeatNum })
                .IsUnique();

            // One payment per booking
            modelBuilder.Entity<PaymentModel>()
                .HasIndex(x => new { x.BookingId })
                .IsUnique();

            // One unique TransactionId per Payment
            modelBuilder.Entity<PaymentModel>()
                .HasIndex(x => x.TransactionId)
                .IsUnique();

            // one unique booking reference per booking
            modelBuilder.Entity<BookingModel>()
                .HasIndex(x => x.BookingReference)
                .IsUnique();
        }
    }

}
