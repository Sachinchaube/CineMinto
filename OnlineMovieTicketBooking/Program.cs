using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnlineMovieTicketBooking.AutoMapper;
using OnlineMovieTicketBooking.DAL;
using OnlineMovieTicketBooking.Data;
using OnlineMovieTicketBooking.Repositories.BookingRepo;
using OnlineMovieTicketBooking.Repositories.MovieRepo;
using OnlineMovieTicketBooking.Repositories.PaymentRepo;
using OnlineMovieTicketBooking.Repositories.ScreenRepo;
using OnlineMovieTicketBooking.Repositories.ShowScheduleRepo;
using OnlineMovieTicketBooking.Repositories.TheatreRepo;

namespace OnlineMovieTicketBooking
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            builder.Services.AddDbContext<DAL.OnlineMovieTicketBookingDBContext>(x=> x.UseSqlServer(builder.Configuration.GetConnectionString("local"))) ;

 
            builder.Services.AddTransient<ITheatreRepo, TheatreRepo>();
            builder.Services.AddTransient<IMovieRepo, MovieRepo>();
            builder.Services.AddTransient<IScreenRepo, ScreenRepo>();
            builder.Services.AddTransient<IBookingRepo, BookingRepo>();
            builder.Services.AddTransient<IShowScheduleRepo, ShowScheduleRepo>();
            builder.Services.AddTransient<IPaymentRepo, PaymentRepo>();
            builder.Services.AddAutoMapper(typeof(AccountMapper));

            // ASP.NET core Identity
            IdentityBuilder identityBuilder = builder.Services.AddDefaultIdentity<ApplicationUser>(option =>
            {
                option.SignIn.RequireConfirmedAccount = false;
                option.Password.RequireDigit = true;
                option.Password.RequireLowercase = true;
                option.Password.RequireUppercase = true;
                option.Password.RequireNonAlphanumeric = true;
                option.Password.RequiredLength = 8;

            })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<OnlineMovieTicketBookingDBContext>()
            .AddDefaultTokenProviders(); //add identity token generation festure

            builder.Services.ConfigureApplicationCookie(options =>
            {
                options.LoginPath = "/Account/Login";
                options.AccessDeniedPath = "/Account/AccessDenied";
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapStaticAssets();
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}")
                .WithStaticAssets();
            
            // running the seeder on startup
            using (var scope = app.Services.CreateScope())
            {
                var serviceProvider = scope.ServiceProvider;
                try
                {
                    await DBSeed.SeedRolesAndAdminAsync(serviceProvider);
                }
                catch (Exception ex)
                {
                    var logger = serviceProvider.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while seeding the database.");
                }
            }

            await app.RunAsync();
        }
    }
}
