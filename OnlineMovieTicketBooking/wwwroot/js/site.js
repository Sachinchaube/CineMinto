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

    // 5. Mento AI Cinema Assistant Engine
    const mentoLauncher = document.getElementById('mentoAiLauncher');
    const mentoModal = document.getElementById('mentoAiModal');
    const mentoClose = document.getElementById('mentoAiClose');
    const mentoReset = document.getElementById('mentoAiReset');
    const mentoBody = document.getElementById('mentoAiBody');
    const mentoForm = document.getElementById('mentoAiForm');
    const mentoInput = document.getElementById('mentoAiInput');

    if (mentoLauncher && mentoModal) {
        // Toggle Chat Window
        mentoLauncher.addEventListener('click', () => {
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

        // Reset conversation
        if (mentoReset) {
            mentoReset.addEventListener('click', () => {
                mentoBody.innerHTML = `
                    <div class="mento-msg mento-msg-bot">
                        <div class="mento-msg-bubble">
                            Conversation cleared. How else can I assist your movie experience?
                        </div>
                    </div>
                    <div id="mentoAiQuickPrompts" class="mento-quick-prompts">
                        <button type="button" class="mento-prompt-btn" data-query="What movies are currently showing?">Now Showing Movies</button>
                        <button type="button" class="mento-prompt-btn" data-query="How does ticket pricing and seating tiers work?">Ticket Pricing & Tiers</button>
                        <button type="button" class="mento-prompt-btn" data-query="How do I book tickets step by step?">How to Book</button>
                        <button type="button" class="mento-prompt-btn" data-query="What are your cancellation and refund policies?">Cancellation Policy</button>
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
            }, 450);
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

            msgDiv.appendChild(bubbleDiv);
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

        // Intelligent CineMento Knowledge Matching
        function generateBotResponse(input) {
            const text = input.toLowerCase();

            // 1. Movies / What's showing / Releases
            if (text.includes('movie') || text.includes('showing') || text.includes('release') || text.includes('catalog') || text.includes('film') || text.includes('watch')) {
                return {
                    html: `We have blockbuster titles currently running across our screens! You can explore all available movies, genres, and durations directly in our catalog.
                    <div class="mento-action-links">
                        <a href="/Movie" class="mento-action-link"><i class="bi bi-film"></i> View Movies Catalog</a>
                        <a href="/#explore-section" class="mento-action-link"><i class="bi bi-ticket-perforated"></i> Book Tickets</a>
                    </div>`
                };
            }

            // 2. Seating Tiers & Pricing
            if (text.includes('price') || text.includes('pricing') || text.includes('cost') || text.includes('tier') || text.includes('rate') || text.includes('recliner') || text.includes('premium') || text.includes('regular') || text.includes('seat')) {
                return {
                    html: `CineMento offers 3 distinct seating tiers tailored for your comfort:
                    <ul class="mb-2 ps-3 mt-1 small">
                        <li><strong style="color:#38bdf8;">Regular:</strong> Standard comfortable seating with high-definition audio.</li>
                        <li><strong style="color:#e5a65d;">Premium:</strong> Center-hall optimal viewing with extra legroom.</li>
                        <li><strong style="color:#ef4444;">Recliner:</strong> Plush motorized recliners with personal space and luxury comfort.</li>
                    </ul>
                    Pricing is configured dynamically per show schedule and displayed during seat selection.`
                };
            }

            // 3. How to Book Tickets
            if (text.includes('how to book') || text.includes('booking step') || text.includes('buy ticket') || text.includes('reserve')) {
                return {
                    html: `Booking tickets on CineMento is fast and easy:
                    <ol class="mb-2 ps-3 mt-1 small">
                        <li>Go to <strong>Home</strong> or <strong>Movies</strong> and click <strong>Book Tickets</strong>.</li>
                        <li>Select your preferred theatre and showtime slot.</li>
                        <li>Pick your desired seats on the interactive seating map.</li>
                        <li>Proceed to payment (UPI, Cards, Net Banking) to receive your instant confirmed pass!</li>
                    </ol>
                    <div class="mento-action-links">
                        <a href="/Movie" class="mento-action-link"><i class="bi bi-play-circle"></i> Browse Movies</a>
                    </div>`
                };
            }

            // 4. Booking Reference / Where is my ticket
            if (text.includes('my booking') || text.includes('status') || text.includes('ticket') || text.includes('reference') || text.includes('receipt') || text.includes('history')) {
                return {
                    html: `You can view all your confirmed reservations, seat numbers, and digital tickets anytime in your account.
                    <div class="mento-action-links">
                        <a href="/Booking/MyBookings" class="mento-action-link"><i class="bi bi-receipt"></i> Go to My Bookings</a>
                    </div>`
                };
            }

            // 5. Cancellation & Refund Policy
            if (text.includes('cancel') || text.includes('refund') || text.includes('reschedule') || text.includes('return')) {
                return {
                    html: `<strong>Cancellation & Refund Policy:</strong>
                    <p class="small mb-1 mt-1">Tickets can be cancelled up to <strong>2 hours before showtime</strong>. Refunds are automatically processed back to your original payment method within 3–5 business days.</p>`
                };
            }

            // 6. Theatres & Screens / Locations
            if (text.includes('theatre') || text.includes('theater') || text.includes('location') || text.includes('screen') || text.includes('audi') || text.includes('city')) {
                return {
                    html: `CineMento operates premium multiplexes equipped with 4K laser projection and Dolby Atmos surround sound. Available screens and showtimes are listed under each movie.`
                };
            }

            // 7. Food & Beverages
            if (text.includes('food') || text.includes('snack') || text.includes('popcorn') || text.includes('drink') || text.includes('beverage') || text.includes('eat')) {
                return {
                    html: `We offer gourmet popcorn, freshly brewed beverages, nachos, and hot snacks at all theatre concession counters. Outside food and beverages are not permitted inside the auditoriums.`
                };
            }

            // 8. Greetings & General Assistance
            if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('help') || text.includes('who are you')) {
                return {
                    html: `Hello! I am <strong>Mento AI</strong>. I can help you discover movies, look up showtimes, guide you through seat booking, or answer pricing and refund questions. What would you like to know?`
                };
            }

            // Default fallback
            return {
                html: `I can help you with movies, showtimes, seat tiers, or booking questions! You can also explore our catalog directly:
                <div class="mento-action-links">
                    <a href="/Movie" class="mento-action-link"><i class="bi bi-film"></i> Now Showing Movies</a>
                    <a href="/Booking/MyBookings" class="mento-action-link"><i class="bi bi-ticket-detailed"></i> My Bookings</a>
                </div>`
            };
        }
    }
});

