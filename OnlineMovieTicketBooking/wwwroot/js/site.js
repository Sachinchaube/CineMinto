// CineMento Interactive Client Scripts

document.addEventListener('DOMContentLoaded', function () {
    // 0. Dynamic Hero Banner Autoplay Motion (Auto-changing after few seconds)
    const heroCarousel = document.getElementById('latestReleaseCarousel');
    if (heroCarousel) {
        if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
            const bsCarousel = bootstrap.Carousel.getOrCreateInstance(heroCarousel, {
                interval: 3500,
                ride: 'carousel',
                pause: false,
                wrap: true
            });
            bsCarousel.cycle();
        } else if (window.$ && $.fn.carousel) {
            $('#latestReleaseCarousel').carousel({
                interval: 3500,
                pause: false,
                wrap: true
            });
            $('#latestReleaseCarousel').carousel('cycle');
        }
    }

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
            const url = (posterInput.value || '').trim();
            if (url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/'))) {
                posterImg.src = url;
                posterImg.style.display = 'block';
                if (posterPlaceholder) posterPlaceholder.style.display = 'none';
            } else {
                posterImg.removeAttribute('src');
                posterImg.style.display = 'none';
                if (posterPlaceholder) posterPlaceholder.style.display = 'flex';
            }
        }

        posterImg.onerror = function () {
            this.style.display = 'none';
            this.removeAttribute('src');
            if (posterPlaceholder) posterPlaceholder.style.display = 'flex';
        };

        posterInput.addEventListener('input', refreshPosterPreview);
        posterInput.addEventListener('change', refreshPosterPreview);
        refreshPosterPreview();
    }

    // 5. Mento VIP Cinema Concierge Engine
    const mentoLauncher = document.getElementById('mentoAiLauncher');
    const mentoModal = document.getElementById('mentoAiModal');
    const mentoClose = document.getElementById('mentoAiClose');
    const mentoReset = document.getElementById('mentoAiReset');
    const mentoBody = document.getElementById('mentoAiBody');
    const mentoForm = document.getElementById('mentoAiForm');
    const mentoInput = document.getElementById('mentoAiInput');
    const mentoGreeting = document.getElementById('mentoAiGreeting');
    const mentoGreetingDismiss = document.getElementById('mentoGreetingDismiss');

    if (mentoLauncher && mentoModal) {
        // Dismiss Greeting Tooltip
        if (mentoGreetingDismiss) {
            mentoGreetingDismiss.addEventListener('click', (e) => {
                e.stopPropagation();
                if (mentoGreeting) mentoGreeting.style.display = 'none';
            });
        }

        if (mentoGreeting) {
            mentoGreeting.addEventListener('click', () => {
                mentoGreeting.style.display = 'none';
                mentoModal.style.display = 'flex';
                if (mentoInput) setTimeout(() => mentoInput.focus(), 200);
            });
        }

        // Toggle Chat Window
        mentoLauncher.addEventListener('click', () => {
            if (mentoGreeting) mentoGreeting.style.display = 'none';
            const isHidden = mentoModal.style.display === 'none' || !mentoModal.style.display;
            mentoModal.style.display = isHidden ? 'flex' : 'none';
            if (isHidden && mentoInput) {
                setTimeout(() => mentoInput.focus(), 200);
            }
        });

        if (mentoClose) {
            mentoClose.addEventListener('click', () => {
                mentoModal.style.display = 'none';
            });
        }

        // Helper: Get formatted current time
        function getCurrentTimeFormatted() {
            return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        // Reset conversation
        if (mentoReset) {
            mentoReset.addEventListener('click', () => {
                mentoBody.innerHTML = `
                    <div class="mento-msg mento-msg-bot">
                        <div class="mento-msg-bubble">
                            <div class="mento-welcome-badge">CINEMENTO VIP ASSISTANT</div>
                            Conversation refreshed. How may I assist your movie experience today?
                        </div>
                        <span class="mento-msg-time">${getCurrentTimeFormatted()}</span>
                    </div>
                    <div id="mentoAiQuickPrompts" class="mento-quick-prompts">
                        <button type="button" class="mento-prompt-btn" data-query="What movies are currently showing?">
                            <i class="bi bi-play-circle text-warning"></i> Now Showing Movies
                        </button>
                        <button type="button" class="mento-prompt-btn" data-query="How does ticket pricing and seating tiers work?">
                            <i class="bi bi-star text-warning"></i> Seating Tiers & Pricing
                        </button>
                        <button type="button" class="mento-prompt-btn" data-query="How do I book tickets step by step?">
                            <i class="bi bi-ticket-detailed text-warning"></i> Guided Booking Steps
                        </button>
                        <button type="button" class="mento-prompt-btn" data-query="Where can I view my booking history and tickets?">
                            <i class="bi bi-receipt text-warning"></i> My Ticket Passes
                        </button>
                        <button type="button" class="mento-prompt-btn" data-query="What are your cancellation and refund policies?">
                            <i class="bi bi-shield-check text-warning"></i> Cancellation Policy
                        </button>
                    </div>
                `;
                bindQuickPrompts();
            });
        }

        // Send User Message
        function handleUserSubmit() {
            const query = mentoInput.value.trim();
            if (!query) return;
            mentoInput.value = '';
            processUserQuery(query);
        }

        if (mentoForm) {
            mentoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                handleUserSubmit();
            });
        }

        // Process message and generate bot reply
        function processUserQuery(userText) {
            // Append User Bubble
            appendMessage(userText, 'user');

            // Show Typing Indicator
            showTypingIndicator();

            setTimeout(() => {
                removeTypingIndicator();
                const replyData = generateBotResponse(userText);
                appendMessage(replyData.html, 'bot', true);
            }, 500);
        }

        function appendMessage(content, sender, isHtml = false) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `mento-msg mento-msg-${sender}`;

            const bubbleDiv = document.createElement('div');
            bubbleDiv.className = 'mento-msg-bubble';

            if (isHtml) {
                bubbleDiv.innerHTML = content;
            } else {
                bubbleDiv.textContent = content;
            }

            const timeSpan = document.createElement('span');
            timeSpan.className = 'mento-msg-time';
            timeSpan.textContent = getCurrentTimeFormatted();

            msgDiv.appendChild(bubbleDiv);
            msgDiv.appendChild(timeSpan);
            mentoBody.appendChild(msgDiv);
            mentoBody.scrollTop = mentoBody.scrollHeight;
        }

        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.id = 'mentoTypingIndicator';
            typingDiv.className = 'mento-typing';
            typingDiv.innerHTML = `
                <div class="mento-typing-dot"></div>
                <div class="mento-typing-dot"></div>
                <div class="mento-typing-dot"></div>
            `;
            mentoBody.appendChild(typingDiv);
            mentoBody.scrollTop = mentoBody.scrollHeight;
        }

        function removeTypingIndicator() {
            const typing = document.getElementById('mentoTypingIndicator');
            if (typing) typing.remove();
        }

        // Bind quick prompt buttons
        function bindQuickPrompts() {
            document.querySelectorAll('.mento-prompt-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    const query = this.getAttribute('data-query');
                    if (query) {
                        processUserQuery(query);
                    }
                });
            });
        }
        bindQuickPrompts();

        // Intelligent CineMento Concierge Knowledge Engine
        function generateBotResponse(input) {
            const text = input.toLowerCase();

            // 1. Movies / Now Showing / Watch / Catalog
            if (text.includes('movie') || text.includes('showing') || text.includes('release') || text.includes('catalog') || text.includes('film') || text.includes('watch') || text.includes('cinema')) {
                return {
                    html: `
                        <div>Experience current Hollywood & Bollywood blockbusters in crystal-clear 4K Laser Projection!</div>
                        <div class="mento-card-item">
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <span class="fw-bold text-white small"><i class="bi bi-camera-reels text-warning me-1"></i> Live Schedule</span>
                                <span class="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 small" style="font-size: 0.65rem;">Now Playing</span>
                            </div>
                            <div class="text-secondary small">Discover genres, high-definition trailers, durations, and show timings across all auditoriums.</div>
                        </div>
                        <div class="mento-action-links">
                            <a href="/Movie" class="mento-action-link"><i class="bi bi-film"></i> Browse Movie Catalog</a>
                            <a href="/#explore-section" class="mento-action-link"><i class="bi bi-ticket-perforated"></i> Book Tickets Now</a>
                        </div>
                    `
                };
            }

            // 2. Seating Tiers & Pricing
            if (text.includes('price') || text.includes('pricing') || text.includes('cost') || text.includes('tier') || text.includes('rate') || text.includes('recliner') || text.includes('premium') || text.includes('regular') || text.includes('seat')) {
                return {
                    html: `
                        <div>CineMento provides three tailored seating categories:</div>
                        <div class="mento-card-item">
                            <div class="d-flex align-items-center justify-content-between">
                                <strong style="color: #38bdf8;"><i class="bi bi-check-circle me-1"></i> Regular Tier</strong>
                                <span class="badge bg-info bg-opacity-20 text-info font-monospace small">Dolby 7.1</span>
                            </div>
                            <div class="text-secondary small mt-1">Ergonomic seating with crystal surround audio.</div>
                        </div>
                        <div class="mento-card-item">
                            <div class="d-flex align-items-center justify-content-between">
                                <strong style="color: #e5a65d;"><i class="bi bi-star-fill me-1"></i> Premium Tier</strong>
                                <span class="badge bg-warning bg-opacity-20 text-warning font-monospace small">VIP Center</span>
                            </div>
                            <div class="text-secondary small mt-1">Optimal screen center angle with enhanced legroom.</div>
                        </div>
                        <div class="mento-card-item">
                            <div class="d-flex align-items-center justify-content-between">
                                <strong style="color: #f87171;"><i class="bi bi-award-fill me-1"></i> Recliner Tier</strong>
                                <span class="badge bg-danger bg-opacity-20 text-danger font-monospace small">Ultra Luxury</span>
                            </div>
                            <div class="text-secondary small mt-1">Motorized recliners with personal service & plush cushioning.</div>
                        </div>
                        <div class="mt-2 small text-muted">Exact prices are shown dynamically on the interactive seat map during booking.</div>
                    `
                };
            }

            // 3. Guided Step-by-Step Booking
            if (text.includes('how to book') || text.includes('booking step') || text.includes('buy ticket') || text.includes('reserve') || text.includes('step')) {
                return {
                    html: `
                        <div>Quick 4-step booking process:</div>
                        <div class="mento-card-item small">
                            <div class="mb-1 text-light"><strong>1. Select Movie:</strong> Click on any movie poster or title.</div>
                            <div class="mb-1 text-light"><strong>2. Choose Showtime:</strong> Pick your preferred theatre & timing slot.</div>
                            <div class="mb-1 text-light"><strong>3. Select Seats:</strong> Click your favorite seats on the live seat map.</div>
                            <div class="text-light"><strong>4. Confirm & Pay:</strong> Complete checkout via UPI, Card, or Net Banking for instant tickets!</div>
                        </div>
                        <div class="mento-action-links">
                            <a href="/Movie" class="mento-action-link"><i class="bi bi-play-circle"></i> Start Booking</a>
                        </div>
                    `
                };
            }

            // 4. Ticket History & Pass Lookup
            if (text.includes('my booking') || text.includes('status') || text.includes('ticket') || text.includes('pass') || text.includes('receipt') || text.includes('history')) {
                return {
                    html: `
                        <div>All your confirmed tickets, show times, QR passes, and seat numbers are accessible under your account.</div>
                        <div class="mento-card-item">
                            <div class="text-light small fw-semibold"><i class="bi bi-qr-code text-warning me-1"></i> Digital Pass Ready</div>
                            <div class="text-secondary small">Present your digital ticket at the auditorium entrance.</div>
                        </div>
                        <div class="mento-action-links">
                            <a href="/Booking/MyBookings" class="mento-action-link"><i class="bi bi-receipt"></i> View My Bookings</a>
                        </div>
                    `
                };
            }

            // 5. Cancellation & Refunds
            if (text.includes('cancel') || text.includes('refund') || text.includes('reschedule') || text.includes('return')) {
                return {
                    html: `
                        <div class="mento-card-item">
                            <div class="text-warning fw-bold small mb-1"><i class="bi bi-shield-check me-1"></i> Hassle-Free Cancellation Policy</div>
                            <ul class="mb-0 ps-3 text-secondary small">
                                <li>Tickets can be cancelled up to <strong>2 hours prior to showtime</strong>.</li>
                                <li>Instant credit initiation with bank settlement within <strong>3-5 business days</strong>.</li>
                                <li>Manage your active bookings directly in your dashboard.</li>
                            </ul>
                        </div>
                        <div class="mento-action-links">
                            <a href="/Booking/MyBookings" class="mento-action-link"><i class="bi bi-receipt"></i> Manage Bookings</a>
                        </div>
                    `
                };
            }

            // 6. Food & Concessions
            if (text.includes('food') || text.includes('snack') || text.includes('popcorn') || text.includes('drink') || text.includes('beverage') || text.includes('eat') || text.includes('dining')) {
                return {
                    html: `
                        <div class="mento-card-item">
                            <div class="text-warning fw-bold small mb-1"><i class="bi bi-cup-straw me-1"></i> Gourmet Cinema Concessions</div>
                            <div class="text-secondary small">Enjoy caramel & butter popcorn, hot nachos with cheese, artisanal pizzas, and cold-pressed beverages at our lobby concession bars.</div>
                        </div>
                    `
                };
            }

            // 7. Technology & Sound Experience
            if (text.includes('sound') || text.includes('dolby') || text.includes('atmos') || text.includes('screen') || text.includes('laser') || text.includes('audi') || text.includes('theatre') || text.includes('theater')) {
                return {
                    html: `
                        <div class="mento-card-item">
                            <div class="text-warning fw-bold small mb-1"><i class="bi bi-soundwave me-1"></i> Next-Gen Cinema Experience</div>
                            <div class="text-secondary small">Equipped with <strong>Dolby Atmos 7.1.4 3D audio</strong>, Barco 4K Laser projection, and acoustically tuned auditoriums for maximum immersion.</div>
                        </div>
                    `
                };
            }

            // 8. Greetings & Concierge Introduction
            if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('help') || text.includes('who are you') || text.includes('mento')) {
                return {
                    html: `
                        <div>Greetings! I am <strong>Mento Concierge</strong>, your VIP Cinema Guide for CineMento.</div>
                        <div class="mt-1 small text-secondary">I can guide you through movie selections, show schedules, seat tier features, or booking questions. How may I assist you?</div>
                        <div class="mento-action-links">
                            <a href="/Movie" class="mento-action-link"><i class="bi bi-film"></i> Explore Movies</a>
                            <a href="/Booking/MyBookings" class="mento-action-link"><i class="bi bi-ticket-detailed"></i> My Bookings</a>
                        </div>
                    `
                };
            }

            // 9. Default Fallback
            return {
                html: `
                    <div>I am here to ensure you have an effortless cinema experience. Explore movies or view your tickets:</div>
                    <div class="mento-action-links">
                        <a href="/Movie" class="mento-action-link"><i class="bi bi-film"></i> Now Showing</a>
                        <a href="/Booking/MyBookings" class="mento-action-link"><i class="bi bi-ticket-detailed"></i> My Bookings</a>
                    </div>
                `
            };
        }
    }
});


