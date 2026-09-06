// CineMento Interactive Client Scripts

document.addEventListener('DOMContentLoaded', function () {
    // 1. Navbar scroll blur shadow effect
    const navbar = document.querySelector('.cinema-navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 2. Movie Search & Filter on Home Page
    const searchInput = document.getElementById('movieSearchInput');
    const movieCards = document.querySelectorAll('.movie-search-card, .movie-item-wrapper');
    const emptyState = document.getElementById('noSearchResults') || document.getElementById('noMoviesFound');

    function filterMovies() {
        const query = (searchInput ? searchInput.value.trim().toLowerCase() : '');
        let visibleCount = 0;

        movieCards.forEach(card => {
            const title = (card.getAttribute('data-title') || '').toLowerCase();
            const genre = (card.getAttribute('data-genre') || '').toLowerCase();
            const language = (card.getAttribute('data-language') || '').toLowerCase();

            const matchesSearch = !query || title.includes(query) || genre.includes(query) || language.includes(query);

            if (matchesSearch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (emptyState) {
            emptyState.classList.toggle('d-none', visibleCount > 0);
            emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterMovies);
    }

    // 3. Seat Selection Interactive Pricing Calculator
    const seatInputs = document.querySelectorAll('input[name="SeatIds"], .seat-checkbox');
    const selectedSeatsBox = document.getElementById('selectedSeatsContainer') || document.getElementById('selectedSeatsList');
    const seatCountDisplay = document.getElementById('seatCountText') || document.getElementById('selectedSeatCount');
    const totalPriceDisplay = document.getElementById('totalPriceText') || document.getElementById('totalSeatPrice');
    const submitSeatsBtn = document.getElementById('btnSubmitSeats') || document.getElementById('proceedPaymentBtn');

    if (seatInputs.length > 0) {
        function recalculateSeats() {
            const selected = Array.from(document.querySelectorAll('input[name="SeatIds"]:checked, .seat-checkbox:checked'));
            const count = selected.length;
            let totalPrice = 0;

            if (selectedSeatsBox) {
                selectedSeatsBox.innerHTML = '';
            }

            if (count === 0) {
                if (selectedSeatsBox) {
                    selectedSeatsBox.innerHTML = '<span class="text-muted small">No seats selected yet</span>';
                }
                if (seatCountDisplay) seatCountDisplay.textContent = '0';
                if (totalPriceDisplay) totalPriceDisplay.textContent = '0';
                if (submitSeatsBtn) {
                    submitSeatsBtn.disabled = true;
                    submitSeatsBtn.classList.add('disabled');
                }
                return;
            }

            selected.forEach(seat => {
                const seatNum = seat.getAttribute('data-seat-num') || seat.getAttribute('data-seat-label') || 'Seat';
                const price = parseFloat(seat.getAttribute('data-price') || '0');
                totalPrice += price;

                if (selectedSeatsBox) {
                    const badge = document.createElement('span');
                    badge.className = 'badge bg-warning bg-opacity-20 text-warning border border-warning border-opacity-30 px-2 py-1 me-1 mb-1 font-monospace';
                    badge.textContent = seatNum;
                    selectedSeatsBox.appendChild(badge);
                }
            });

            if (seatCountDisplay) seatCountDisplay.textContent = count.toString();
            if (totalPriceDisplay) totalPriceDisplay.textContent = totalPrice.toFixed(0);

            if (submitSeatsBtn) {
                submitSeatsBtn.disabled = false;
                submitSeatsBtn.classList.remove('disabled');
            }
        }

        seatInputs.forEach(input => {
            input.addEventListener('change', recalculateSeats);
        });

        // Initial Calculation
        recalculateSeats();
    }

    // 4. Poster Live URL Preview for Admin Movie Create/Edit
    const posterInput = document.getElementById('posterUrlInput');
    const posterImg = document.getElementById('posterPreviewImg');
    const posterPlaceholder = document.getElementById('posterPlaceholder');

    if (posterInput && posterImg) {
        function refreshPosterPreview() {
            const url = posterInput.value.trim();
            if (url) {
                posterImg.src = url;
                posterImg.style.display = 'block';
                if (posterPlaceholder) posterPlaceholder.style.display = 'none';
            } else {
                posterImg.style.display = 'none';
                if (posterPlaceholder) posterPlaceholder.style.display = 'flex';
            }
        }

        posterImg.onerror = function () {
            this.style.display = 'none';
            if (posterPlaceholder) posterPlaceholder.style.display = 'flex';
        };

        posterInput.addEventListener('input', refreshPosterPreview);
        refreshPosterPreview();
    }
});
