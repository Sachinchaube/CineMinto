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
                            Welcome to CineMento! I am <strong>Mento AI</strong>, your cinema assistant. How can I help you today?
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
            }, 400);
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

        // Intelligent CineMento Knowledge Engine
        function generateBotResponse(input) {
            const text = input.toLowerCase();

            // 1. Movies / Now Showing / Watch / Catalog
            if (text.includes('movie') || text.includes('showing') || text.includes('release') || text.includes('catalog') || text.includes('film') || text.includes('watch') || text.includes('cinema')) {
                return {
                    html: `
                        <div>Explore current blockbuster titles showing across our screens:</div>
                        <div class="mento-card-item">
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <span class="fw-bold text-white small"><i class="bi bi-film text-warning me-1"></i> Now Showing Movies</span>
                                <span class="badge bg-warning bg-opacity-20 text-warning border border-warning border-opacity-30 small" style="font-size: 0.65rem;">Active</span>
                            </div>
                            <div class="text-secondary small">Check movie ratings, runtimes, genres, and live theatre schedules.</div>
                        </div>
                        <div class="mento-action-links">
                            <a href="/Movie" class="mento-action-link"><i class="bi bi-film"></i> View Movies Catalog</a>
                            <a href="/#explore-section" class="mento-action-link"><i class="bi bi-ticket-perforated"></i> Book Tickets</a>
                        </div>
                    `
                };
            }

            // 2. Seating Tiers & Pricing
            if (text.includes('price') || text.includes('pricing') || text.includes('cost') || text.includes('tier') || text.includes('rate') || text.includes('recliner') || text.includes('premium') || text.includes('regular') || text.includes('seat')) {
                return {
                    html: `
                        <div>CineMento provides three comfortable seating tiers:</div>
                        <div class="mento-card-item">
                            <div class="d-flex align-items-center justify-content-between">
                                <strong class="text-white"><i class="bi bi-circle me-1 text-warning"></i> Regular Tier</strong>
                                <span class="badge bg-warning bg-opacity-15 text-warning font-monospace small">Standard</span>
                            </div>
                            <div class="text-secondary small mt-1">Standard comfortable seats with Dolby surround sound.</div>
                        </div>
                        <div class="mento-card-item">
                            <div class="d-flex align-items-center justify-content-between">
                                <strong class="text-white"><i class="bi bi-star me-1 text-warning"></i> Premium Tier</strong>
                                <span class="badge bg-warning bg-opacity-20 text-warning font-monospace small">Prime</span>
                            </div>
                            <div class="text-secondary small mt-1">Center auditorium viewing with extra legroom.</div>
                        </div>
                        <div class="mento-card-item">
                            <div class="d-flex align-items-center justify-content-between">
                                <strong class="text-white"><i class="bi bi-gem me-1 text-warning"></i> Recliner Tier</strong>
                                <span class="badge bg-warning bg-opacity-25 text-warning font-monospace small">Recliner</span>
                            </div>
                            <div class="text-secondary small mt-1">Motorized plush recliners with personal armrests.</div>
                        </div>
                        <div class="mt-2 small text-secondary">Prices are displayed live during seat selection.</div>
                    `
                };
            }

            // 3. Guided Step-by-Step Booking
            if (text.includes('how to book') || text.includes('booking step') || text.includes('buy ticket') || text.includes('reserve') || text.includes('step')) {
                return {
                    html: `
                        <div>Simple 4-step booking process:</div>
                        <div class="mento-card-item small">
                            <div class="mb-1 text-light"><strong>1. Select Movie:</strong> Choose your movie from Home or Movies page.</div>
                            <div class="mb-1 text-light"><strong>2. Pick Showtime:</strong> Select your preferred theatre and time slot.</div>
                            <div class="mb-1 text-light"><strong>3. Choose Seats:</strong> Click your preferred seats on the layout map.</div>
                            <div class="text-light"><strong>4. Confirm & Pay:</strong> Complete checkout to get your confirmed tickets!</div>
                        </div>
                        <div class="mento-action-links">
                            <a href="/Movie" class="mento-action-link"><i class="bi bi-play-circle"></i> Browse Movies</a>
                        </div>
                    `
                };
            }

            // 4. Ticket History & Pass Lookup
            if (text.includes('my booking') || text.includes('status') || text.includes('ticket') || text.includes('pass') || text.includes('receipt') || text.includes('history')) {
                return {
                    html: `
                        <div>You can check all your booked movies, seats, and digital passes anytime in your account.</div>
                        <div class="mento-action-links">
                            <a href="/Booking/MyBookings" class="mento-action-link"><i class="bi bi-receipt"></i> Go to My Bookings</a>
                        </div>
                    `
                };
            }

            // 5. Cancellation & Refunds
            if (text.includes('cancel') || text.includes('refund') || text.includes('reschedule') || text.includes('return')) {
                return {
                    html: `
                        <div class="mento-card-item">
                            <div class="text-warning fw-bold small mb-1"><i class="bi bi-shield-check me-1"></i> Cancellation & Refund Policy</div>
                            <ul class="mb-0 ps-3 text-secondary small">
                                <li>Tickets can be cancelled up to <strong>2 hours before showtime</strong>.</li>
                                <li>Refunds are automatically processed to your original payment method within <strong>3-5 business days</strong>.</li>
                            </ul>
                        </div>
                        <div class="mento-action-links">
                            <a href="/Booking/MyBookings" class="mento-action-link"><i class="bi bi-receipt"></i> My Bookings</a>
                        </div>
                    `
                };
            }

            // 6. Food & Concessions
            if (text.includes('food') || text.includes('snack') || text.includes('popcorn') || text.includes('drink') || text.includes('beverage') || text.includes('eat') || text.includes('dining')) {
                return {
                    html: `
                        <div class="mento-card-item">
                            <div class="text-warning fw-bold small mb-1"><i class="bi bi-cup-straw me-1"></i> Concessions & Snacks</div>
                            <div class="text-secondary small">Popcorn, nachos, cold drinks, and snacks are available at all theatre concession counters before and during intervals.</div>
                        </div>
                    `
                };
            }

            // 7. Technology & Sound Experience
            if (text.includes('sound') || text.includes('dolby') || text.includes('atmos') || text.includes('screen') || text.includes('laser') || text.includes('audi') || text.includes('theatre') || text.includes('theater')) {
                return {
                    html: `
                        <div class="mento-card-item">
                            <div class="text-warning fw-bold small mb-1"><i class="bi bi-soundwave me-1"></i> Cinema Experience</div>
                            <div class="text-secondary small">All auditoriums feature 4K projection screens and Dolby Atmos surround sound for an immersive experience.</div>
                        </div>
                    `
                };
            }

            // 8. Greetings & Introduction
            if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('help') || text.includes('who are you') || text.includes('mento')) {
                return {
                    html: `
                        <div>Hello! I am <strong>Mento AI</strong>, your cinema assistant.</div>
                        <div class="mt-1 small text-secondary">I can help you explore movies, show schedules, seat tiers, or booking details. What would you like to know?</div>
                        <div class="mento-action-links">
                            <a href="/Movie" class="mento-action-link"><i class="bi bi-film"></i> Browse Movies</a>
                            <a href="/Booking/MyBookings" class="mento-action-link"><i class="bi bi-ticket-detailed"></i> My Bookings</a>
                        </div>
                    `
                };
            }

            // 9. Default Fallback
            return {
                html: `
                    <div>I can assist you with movie showtimes, seat selections, or booking questions:</div>
                    <div class="mento-action-links">
                        <a href="/Movie" class="mento-action-link"><i class="bi bi-film"></i> Now Showing</a>
                        <a href="/Booking/MyBookings" class="mento-action-link"><i class="bi bi-ticket-detailed"></i> My Bookings</a>
                    </div>
                `
            };
        }
    }
});



