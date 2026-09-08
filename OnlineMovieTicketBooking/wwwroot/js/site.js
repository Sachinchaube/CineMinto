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

        // Keyboard Shortcut: Escape to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mentoModal.style.display === 'flex') {
                mentoModal.style.display = 'none';
            }
        });

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

        // Fast Topic Navigation Chips at top
        document.querySelectorAll('.mento-topic-chip').forEach(chip => {
            chip.addEventListener('click', function () {
                const topic = this.getAttribute('data-topic');
                const topicMap = {
                    'movies': 'What movies are currently showing?',
                    'pricing': 'How does seating tiers and pricing work?',
                    'booking': 'How do I book tickets step by step?',
                    'passes': 'Where can I find my booking history and tickets?',
                    'snacks': 'What snacks and food are available at the theatre?',
                    'payments': 'What payment methods do you accept?',
                    'refunds': 'What is your cancellation and refund policy?',
                    'theatres': 'Tell me about your theatres, screens and audio technology'
                };
                const query = topicMap[topic] || 'Tell me more about ' + topic;
                processUserQuery(query);
            });
        });

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
                appendBotMessageWithFollowups(replyData.html, replyData.followups || []);
            }, 350);
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

        function appendBotMessageWithFollowups(htmlContent, followups = []) {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'mento-msg mento-msg-bot';

            const bubbleDiv = document.createElement('div');
            bubbleDiv.className = 'mento-msg-bubble';
            bubbleDiv.innerHTML = htmlContent;

            // Append Followup Chips if provided
            if (followups && followups.length > 0) {
                const followupContainer = document.createElement('div');
                followupContainer.className = 'mento-followup-container';
                followups.forEach(prompt => {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'mento-followup-chip';
                    btn.innerHTML = `<i class="bi bi-chevron-right text-warning"></i> ${prompt}`;
                    btn.addEventListener('click', () => {
                        processUserQuery(prompt);
                    });
                    followupContainer.appendChild(btn);
                });
                bubbleDiv.appendChild(followupContainer);
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

        // Helper: Extract current movie titles from DOM if available
        function getLiveMoviesFromDOM() {
            const titles = [];
            document.querySelectorAll('.movie-search-card, .movie-item-wrapper, .movie-card-clean').forEach(card => {
                const title = card.getAttribute('data-title') || card.querySelector('.movie-clean-title, h5, h6')?.textContent?.trim();
                const genre = card.getAttribute('data-genre') || card.querySelector('.badge')?.textContent?.trim() || 'Featured';
                if (title && !titles.some(m => m.title.toLowerCase() === title.toLowerCase())) {
                    titles.push({ title, genre });
                }
            });
            return titles;
        }

        // Intelligent CineMento Knowledge & Intent Engine
        function generateBotResponse(input) {
            const text = input.toLowerCase();

            // 1. Live Movies / Showing / Catalog / Search
            if (text.includes('movie') || text.includes('showing') || text.includes('release') || text.includes('catalog') || text.includes('film') || text.includes('watch') || text.includes('cinema') || text.includes('search')) {
                const domMovies = getLiveMoviesFromDOM();
                let movieListHtml = '';
                if (domMovies.length > 0) {
                    const preview = domMovies.slice(0, 3);
                    movieListHtml = preview.map(m => `
                        <div class="d-flex align-items-center justify-content-between py-1 border-bottom border-secondary border-opacity-25 small">
                            <span class="text-light fw-medium"><i class="bi bi-play-circle text-warning me-1"></i> ${m.title}</span>
                            <span class="badge bg-warning bg-opacity-20 text-warning font-monospace" style="font-size: 0.65rem;">${m.genre}</span>
                        </div>
                    `).join('');
                }

                return {
                    html: `
                        <div>Explore our current blockbuster lineup in 4K Laser Projection:</div>
                        <div class="mento-card-item">
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <span class="fw-bold text-white small"><i class="bi bi-camera-reels text-warning me-1"></i> Featured Schedule</span>
                                <span class="badge bg-warning bg-opacity-20 text-warning border border-warning border-opacity-30 small" style="font-size: 0.65rem;">Now Playing</span>
                            </div>
                            ${movieListHtml ? `<div class="mb-2 mt-2">${movieListHtml}</div>` : `<div class="text-secondary small">Browse high-definition titles, runtimes, and auditoriums across CineMento.</div>`}
                        </div>
                        <div class="mento-action-links">
                            <a href="/Movie" class="mento-action-link"><i class="bi bi-film"></i> Browse Movie Catalog</a>
                            <a href="/#explore-section" class="mento-action-link"><i class="bi bi-ticket-perforated"></i> Book Tickets</a>
                        </div>
                    `,
                    followups: [
                        'How does ticket pricing and seating work?',
                        'How do I book tickets step by step?',
                        'What are your cancellation policies?'
                    ]
                };
            }

            // 2. Seating Tiers & Pricing Breakdown
            if (text.includes('price') || text.includes('pricing') || text.includes('cost') || text.includes('tier') || text.includes('rate') || text.includes('recliner') || text.includes('premium') || text.includes('regular') || text.includes('seat')) {
                return {
                    html: `
                        <div>CineMento provides three tailored seating tiers:</div>
                        <div class="mento-card-item">
                            <div class="d-flex align-items-center justify-content-between">
                                <strong class="text-white"><i class="bi bi-circle text-warning me-1"></i> Regular Tier</strong>
                                <span class="badge bg-warning bg-opacity-15 text-warning font-monospace small">Standard</span>
                            </div>
                            <div class="text-secondary small mt-1">Ergonomic seating with Dolby surround audio clarity.</div>
                        </div>
                        <div class="mento-card-item">
                            <div class="d-flex align-items-center justify-content-between">
                                <strong class="text-white"><i class="bi bi-star text-warning me-1"></i> Premium Tier</strong>
                                <span class="badge bg-warning bg-opacity-20 text-warning font-monospace small">Center Prime</span>
                            </div>
                            <div class="text-secondary small mt-1">Center auditorium direct line-of-sight with expanded legroom.</div>
                        </div>
                        <div class="mento-card-item">
                            <div class="d-flex align-items-center justify-content-between">
                                <strong class="text-white"><i class="bi bi-gem text-warning me-1"></i> Recliner Tier</strong>
                                <span class="badge bg-warning bg-opacity-25 text-warning font-monospace small">Motorized Luxury</span>
                            </div>
                            <div class="text-secondary small mt-1">Plush motorized recliners with personal service & ultra-soft cushioning.</div>
                        </div>
                        <div class="mt-2 small text-secondary">Specific rates are calculated live on the interactive seat layout during booking.</div>
                    `,
                    followups: [
                        'How do I book tickets step by step?',
                        'What payment methods do you accept?',
                        'What movies are currently showing?'
                    ]
                };
            }

            // 3. Guided Step-by-Step Booking
            if (text.includes('how to book') || text.includes('booking step') || text.includes('buy ticket') || text.includes('reserve') || text.includes('step') || text.includes('procedure')) {
                return {
                    html: `
                        <div>Simple 4-step booking process:</div>
                        <div class="mento-card-item small">
                            <div class="mb-1 text-light"><strong>1. Select Movie:</strong> Click on your preferred movie from the Movies page or Home.</div>
                            <div class="mb-1 text-light"><strong>2. Choose Showtime:</strong> Pick your theatre and preferred showtime slot.</div>
                            <div class="mb-1 text-light"><strong>3. Select Seats:</strong> Click on your favorite available seats on the live seat map.</div>
                            <div class="text-light"><strong>4. Confirm & Pay:</strong> Complete checkout via UPI or Card to receive your digital pass!</div>
                        </div>
                        <div class="mento-action-links">
                            <a href="/Movie" class="mento-action-link"><i class="bi bi-play-circle"></i> Start Booking</a>
                        </div>
                    `,
                    followups: [
                        'What payment methods do you accept?',
                        'Where can I view my booking history and tickets?',
                        'What is your cancellation and refund policy?'
                    ]
                };
            }

            // 4. Ticket History, Passes & Receipts
            if (text.includes('my booking') || text.includes('status') || text.includes('ticket') || text.includes('pass') || text.includes('receipt') || text.includes('history') || text.includes('download')) {
                return {
                    html: `
                        <div>Access all your confirmed bookings, digital QR passes, and seat numbers:</div>
                        <div class="mento-card-item">
                            <div class="text-light small fw-semibold"><i class="bi bi-qr-code text-warning me-1"></i> Paperless Digital Admission</div>
                            <div class="text-secondary small">Present your digital ticket QR code directly from your phone at the auditorium entrance.</div>
                        </div>
                        <div class="mento-action-links">
                            <a href="/Booking/MyBookings" class="mento-action-link"><i class="bi bi-receipt"></i> Go to My Bookings</a>
                        </div>
                    `,
                    followups: [
                        'What is your cancellation and refund policy?',
                        'What snacks and food are available at the theatre?',
                        'What movies are currently showing?'
                    ]
                };
            }

            // 5. Cancellation & Refunds
            if (text.includes('cancel') || text.includes('refund') || text.includes('reschedule') || text.includes('return') || text.includes('money')) {
                return {
                    html: `
                        <div class="mento-card-item">
                            <div class="text-warning fw-bold small mb-1"><i class="bi bi-shield-check me-1"></i> Cancellation & Refund Policy</div>
                            <ul class="mb-0 ps-3 text-secondary small">
                                <li>Tickets can be cancelled up to <strong>2 hours prior to showtime</strong>.</li>
                                <li>Refunds are initiated instantly and credited to your original payment method within <strong>3–5 business days</strong>.</li>
                                <li>Active bookings can be managed from your account dashboard.</li>
                            </ul>
                        </div>
                        <div class="mento-action-links">
                            <a href="/Booking/MyBookings" class="mento-action-link"><i class="bi bi-receipt"></i> Manage Bookings</a>
                        </div>
                    `,
                    followups: [
                        'Where can I view my booking history and tickets?',
                        'What payment methods do you accept?',
                        'How do I book tickets step by step?'
                    ]
                };
            }

            // 6. Food, Snacks & Concessions
            if (text.includes('food') || text.includes('snack') || text.includes('popcorn') || text.includes('drink') || text.includes('beverage') || text.includes('eat') || text.includes('dining') || text.includes('nachos') || text.includes('canteen')) {
                return {
                    html: `
                        <div class="mento-card-item">
                            <div class="text-warning fw-bold small mb-1"><i class="bi bi-cup-straw me-1"></i> Gourmet Concessions Bar</div>
                            <div class="text-secondary small">Enjoy our signature butter & caramel popcorn, artisanal nachos with hot cheese sauce, fresh pizza slices, and cold beverages at all lobby counters before showtime and during intermissions.</div>
                        </div>
                    `,
                    followups: [
                        'What movies are currently showing?',
                        'How does seating tiers and pricing work?',
                        'How do I book tickets step by step?'
                    ]
                };
            }

            // 7. Payment Methods & Security
            if (text.includes('pay') || text.includes('upi') || text.includes('card') || text.includes('gpay') || text.includes('phonepe') || text.includes('netbanking') || text.includes('wallet')) {
                return {
                    html: `
                        <div class="mento-card-item">
                            <div class="text-warning fw-bold small mb-1"><i class="bi bi-credit-card me-1"></i> Supported Payment Methods</div>
                            <div class="text-secondary small mb-2">We support 100% secure, encrypted instant checkout via:</div>
                            <ul class="mb-0 ps-3 text-secondary small">
                                <li><strong>UPI:</strong> Google Pay, PhonePe, Paytm, BHIM & all bank UPI apps.</li>
                                <li><strong>Cards:</strong> Visa, MasterCard, RuPay Debit & Credit Cards.</li>
                                <li><strong>Net Banking:</strong> All major commercial banks.</li>
                            </ul>
                        </div>
                    `,
                    followups: [
                        'How do I book tickets step by step?',
                        'What is your cancellation and refund policy?',
                        'What movies are currently showing?'
                    ]
                };
            }

            // 8. Theatres, Screens & Sound Experience
            if (text.includes('theatre') || text.includes('theater') || text.includes('screen') || text.includes('sound') || text.includes('dolby') || text.includes('atmos') || text.includes('laser') || text.includes('audi') || text.includes('location')) {
                return {
                    html: `
                        <div class="mento-card-item">
                            <div class="text-warning fw-bold small mb-1"><i class="bi bi-soundwave me-1"></i> Premium Cinema Technology</div>
                            <ul class="mb-0 ps-3 text-secondary small">
                                <li><strong>Audio:</strong> Dolby Atmos 7.1.4 multi-dimensional surround sound.</li>
                                <li><strong>Visuals:</strong> High-luminance 4K RGB Laser projection for sharp contrast.</li>
                                <li><strong>Auditoriums:</strong> Acoustically treated auditoriums with climate control.</li>
                            </ul>
                        </div>
                    `,
                    followups: [
                        'What movies are currently showing?',
                        'How does seating tiers and pricing work?',
                        'What snacks and food are available at the theatre?'
                    ]
                };
            }

            // 9. Discounts, Offers & Promo Codes
            if (text.includes('discount') || text.includes('offer') || text.includes('coupon') || text.includes('promo') || text.includes('deal') || text.includes('student')) {
                return {
                    html: `
                        <div class="mento-card-item">
                            <div class="text-warning fw-bold small mb-1"><i class="bi bi-tag me-1"></i> Offers & Concessions</div>
                            <div class="text-secondary small">Special festival promo codes and bank discounts can be applied directly on the payment checkout page. Keep an eye out for weekend matinee specials!</div>
                        </div>
                    `,
                    followups: [
                        'What movies are currently showing?',
                        'How do I book tickets step by step?',
                        'What payment methods do you accept?'
                    ]
                };
            }

            // 10. Greetings & Assistant Introduction
            if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('help') || text.includes('who are you') || text.includes('mento') || text.includes('about')) {
                return {
                    html: `
                        <div>Hello! I am <strong>Mento AI</strong>, your cinema assistant.</div>
                        <div class="mt-1 small text-secondary">I can guide you through current movie listings, show schedules, seat categories, payments, or booking management. How may I assist you today?</div>
                        <div class="mento-action-links">
                            <a href="/Movie" class="mento-action-link"><i class="bi bi-film"></i> Browse Movies</a>
                            <a href="/Booking/MyBookings" class="mento-action-link"><i class="bi bi-ticket-detailed"></i> My Bookings</a>
                        </div>
                    `,
                    followups: [
                        'What movies are currently showing?',
                        'How does seating tiers and pricing work?',
                        'How do I book tickets step by step?'
                    ]
                };
            }

            // 11. Default Fallback with Helpful Actions
            return {
                html: `
                    <div>I can help you discover movies, understand seat tiers, check showtimes, or guide your booking:</div>
                    <div class="mento-action-links">
                        <a href="/Movie" class="mento-action-link"><i class="bi bi-film"></i> Now Showing Movies</a>
                        <a href="/Booking/MyBookings" class="mento-action-link"><i class="bi bi-ticket-detailed"></i> My Bookings</a>
                    </div>
                `,
                followups: [
                    'What movies are currently showing?',
                    'How does seating tiers and pricing work?',
                    'How do I book tickets step by step?',
                    'What is your cancellation and refund policy?'
                ]
            };
        }
    }
});




