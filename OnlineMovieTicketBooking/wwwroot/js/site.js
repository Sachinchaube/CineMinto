// MovieNest Interactive Client Scripts

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
    const genreChips = document.querySelectorAll('.genre-chip');
    const movieCards = document.querySelectorAll('.movie-item-wrapper');
    const emptyState = document.getElementById('noMoviesFound');

    let currentGenre = 'all';
    let currentSearch = '';

    function filterMovies() {
        let visibleCount = 0;
        movieCards.forEach(card => {
            const title = (card.getAttribute('data-title') || '').toLowerCase();
            const genre = (card.getAttribute('data-genre') || '').toLowerCase();
            const language = (card.getAttribute('data-language') || '').toLowerCase();

            const matchesSearch = title.includes(currentSearch) || genre.includes(currentSearch) || language.includes(currentSearch);
            const matchesGenre = currentGenre === 'all' || genre.includes(currentGenre);

            if (matchesSearch && matchesGenre) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (emptyState) {
            emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            currentSearch = e.target.value.trim().toLowerCase();
            filterMovies();
        });
    }

    if (genreChips.length > 0) {
        genreChips.forEach(chip => {
            chip.addEventListener('click', function () {
                genreChips.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                currentGenre = this.getAttribute('data-genre-filter') || 'all';
                filterMovies();
            });
        });
    }

    // 3. Seat Selection Interactive Pricing Calculator
    const seatCheckboxes = document.querySelectorAll('.seat-checkbox');
    const selectedSeatsContainer = document.getElementById('selectedSeatsList');
    const selectedCountEl = document.getElementById('selectedSeatCount');
    const totalPriceEl = document.getElementById('totalSeatPrice');
    const proceedBtn = document.getElementById('proceedPaymentBtn');

    if (seatCheckboxes.length > 0 && selectedCountEl && totalPriceEl) {
        function updateSeatSummary() {
            const checkedSeats = Array.from(document.querySelectorAll('.seat-checkbox:checked'));
            const count = checkedSeats.length;
            let total = 0;

            if (selectedSeatsContainer) {
                selectedSeatsContainer.innerHTML = '';
            }

            if (count === 0) {
                if (selectedSeatsContainer) {
                    selectedSeatsContainer.innerHTML = '<span class="text-muted small">No seats selected yet</span>';
                }
                selectedCountEl.textContent = '0';
                totalPriceEl.textContent = '₹0';
                if (proceedBtn) {
                    proceedBtn.disabled = true;
                    proceedBtn.classList.add('opacity-50');
                }
                return;
            }

            checkedSeats.forEach(seat => {
                const label = seat.getAttribute('data-seat-label') || 'Seat';
                const price = parseFloat(seat.getAttribute('data-price') || '0');
                total += price;

                if (selectedSeatsContainer) {
                    const chip = document.createElement('span');
                    chip.className = 'seat-chip';
                    chip.textContent = label;
                    selectedSeatsContainer.appendChild(chip);
                }
            });

            selectedCountEl.textContent = count.toString();
            totalPriceEl.textContent = '₹' + total.toFixed(2);

            if (proceedBtn) {
                proceedBtn.disabled = false;
                proceedBtn.classList.remove('opacity-50');
            }
        }

        seatCheckboxes.forEach(cb => {
            cb.addEventListener('change', updateSeatSummary);
        });

        // Initialize state
        updateSeatSummary();
    }

    // 4. Poster Live URL Preview for Admin Movie Create/Edit
    const posterUrlInput = document.getElementById('posterUrlInput');
    const posterPreviewImg = document.getElementById('posterPreviewImg');
    const posterPlaceholder = document.getElementById('posterPlaceholder');

    if (posterUrlInput && posterPreviewImg) {
        function updatePoster() {
            const url = posterUrlInput.value.trim();
            if (url) {
                posterPreviewImg.src = url;
                posterPreviewImg.style.display = 'block';
                if (posterPlaceholder) posterPlaceholder.style.display = 'none';
            } else {
                posterPreviewImg.style.display = 'none';
                if (posterPlaceholder) posterPlaceholder.style.display = 'flex';
            }
        }

        posterPreviewImg.onerror = function () {
            this.style.display = 'none';
            if (posterPlaceholder) posterPlaceholder.style.display = 'flex';
        };

        posterUrlInput.addEventListener('input', updatePoster);
        updatePoster();
    }
});
