# Rdcutz
 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/index.html b/index.html
new file mode 100644
index 0000000000000000000000000000000000000000..8957c489c89599d8dcdc1179ee2574ec3affa135
--- /dev/null
+++ b/index.html
@@ -0,0 +1,181 @@
+<!DOCTYPE html>
+<html lang="en">
+<head>
+  <meta charset="UTF-8" />
+  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
+  <title>RDCutz – Fresh Cuts. Clean Fades. Surrey, BC</title>
+  <meta name="description" content="Professional barber in Surrey, BC specializing in fades, line ups, and grooming. Book your appointment online." />
+  <link rel="preconnect" href="https://fonts.googleapis.com" />
+  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
+  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:wght@600;700&display=swap" rel="stylesheet" />
+  <style>
+    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
+    :root {
+      --gold: #C9A84C; --gold-lt: #E2C47A; --gold-dk: #9A7A2E; --black: #0A0A0A;
+      --surface: #111111; --surface2: #181818; --border: #2A2A2A; --white: #F5F5F0;
+      --muted: #888880; --radius: 6px;
+    }
+    html { scroll-behavior: smooth; }
+    body { background: var(--black); color: var(--white); font-family: 'Barlow', sans-serif; font-weight: 300; line-height: 1.6; overflow-x: hidden; }
+    h1,h2,h3,h4 { font-family: 'Playfair Display', serif; line-height: 1.1; }
+    a { color: inherit; text-decoration: none; }
+    button { cursor: pointer; border: none; font-family: inherit; }
+    ::-webkit-scrollbar { width: 4px; }
+    ::-webkit-scrollbar-track { background: var(--black); }
+    ::-webkit-scrollbar-thumb { background: var(--gold-dk); border-radius: 2px; }
+    .gold { color: var(--gold); }
+    .container { width: 100%; max-width: 1100px; margin: 0 auto; padding: 0 20px; }
+    .section-label { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
+    .divider { width: 48px; height: 2px; background: linear-gradient(90deg, var(--gold), transparent); margin: 16px 0 32px; }
+    .btn-primary { display: inline-flex; align-items: center; gap: 10px; padding: 16px 36px; background: var(--gold); color: var(--black); font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; border-radius: var(--radius); transition: background .2s, transform .15s; }
+    .btn-primary:hover { background: var(--gold-lt); transform: translateY(-1px); }
+    .btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; border: 1px solid var(--gold); color: var(--gold); font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; border-radius: var(--radius); background: transparent; transition: background .2s, color .2s; }
+    .btn-outline:hover { background: var(--gold); color: var(--black); }
+
+    nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; background: rgba(10,10,10,.92); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); }
+    .nav-logo { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 900; letter-spacing: 1px; }
+    .nav-logo span { color: var(--gold); }
+    .nav-links { display: flex; gap: 32px; list-style: none; }
+    .nav-links a { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); }
+    .nav-links a:hover, .nav-phone:hover { color: var(--gold); }
+    .nav-cta { display: flex; gap: 12px; align-items: center; }
+    .nav-phone { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; letter-spacing: 1px; color: var(--muted); }
+    .hamburger { display: none; flex-direction: column; gap: 5px; background: none; padding: 4px; }
+    .hamburger span { display: block; width: 24px; height: 2px; background: var(--white); border-radius: 2px; }
+    .mobile-menu { display: none; position: fixed; inset: 0; z-index: 99; background: var(--black); flex-direction: column; align-items: center; justify-content: center; gap: 40px; }
+    .mobile-menu.open { display: flex; }
+    .mobile-menu a { font-family: 'Playfair Display', serif; font-size: 36px; }
+
+    #home { min-height: 100svh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 120px 20px 60px; position: relative; overflow: hidden; }
+    .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 30%, rgba(201,168,76,.10) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 70%, rgba(201,168,76,.05) 0%, transparent 60%); pointer-events: none; }
+    .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 60px 60px; opacity: .3; pointer-events: none; }
+    .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(201,168,76,.12); border: 1px solid rgba(201,168,76,.3); border-radius: 50px; padding: 6px 16px; font-family: 'Barlow Condensed', sans-serif; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin-bottom: 28px; }
+    .hero-headline { font-size: clamp(42px, 9vw, 88px); font-weight: 900; line-height: 1; margin-bottom: 24px; max-width: 900px; }
+    .hero-headline em { font-style: normal; color: var(--gold); display: block; }
+    .hero-sub { font-size: clamp(16px, 2.5vw, 20px); color: var(--muted); max-width: 520px; margin-bottom: 40px; }
+    .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; margin-bottom: 60px; }
+    .hero-image-wrap { position: relative; width: 100%; max-width: 860px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); }
+    .hero-visual { width: 100%; height: 380px; background: linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%); display: flex; align-items: center; justify-content: center; }
+    .hero-visual svg { width: min(380px, 90%); opacity: .85; }
+    .hero-stats { position: absolute; bottom: -30px; left: 50%; transform: translateX(-50%); display: flex; gap: 1px; background: var(--border); border-radius: 10px; overflow: hidden; border: 1px solid var(--border); width: min(520px, 90vw); }
+    .stat { flex: 1; padding: 18px 12px; background: var(--surface); text-align: center; }
+    .stat-num { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: var(--gold); }
+    .stat-lbl { font-size: 11px; color: var(--muted); margin-top: 2px; }
+
+    section { padding: 100px 0; }
+    #services, #reviews, #contact { background: var(--surface); }
+    .services-grid, .reviews-grid { display: grid; margin-top: 40px; }
+    .services-grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
+    .service-card { background: var(--surface2); padding: 36px 28px; }
+    .service-name { font-family: 'Playfair Display', serif; font-size: 20px; margin-bottom: 8px; }
+    .service-detail { font-size: 13px; color: var(--muted); margin-bottom: 20px; }
+    .service-meta { display: flex; align-items: center; justify-content: space-between; }
+    .service-price { font-family: 'Barlow Condensed', sans-serif; font-size: 28px; font-weight: 700; color: var(--gold); }
+    .service-time { font-size: 12px; color: var(--muted); }
+
+    .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: auto auto; gap: 8px; margin-top: 40px; }
+    .gallery-item { background: var(--surface2); border-radius: 8px; overflow: hidden; aspect-ratio: 1; position: relative; border: 1px solid var(--border); }
+    .gallery-item:first-child { grid-column: span 2; aspect-ratio: 2/1; }
+    .gallery-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--surface) 0%, #1d1a14 100%); }
+    .gallery-note { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px 16px 14px; background: linear-gradient(to top, rgba(0,0,0,.8), transparent); font-size: 12px; color: var(--muted); }
+
+    .about-grid, .hours-wrap, .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-top: 40px; align-items: start; }
+    .about-img-box { background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; aspect-ratio: 4/5; display: flex; align-items: center; justify-content: center; }
+    .about-text p { color: var(--muted); line-height: 1.8; margin-bottom: 16px; }
+    .hours-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border); gap: 12px; }
+    .hours-time { color: var(--muted); text-align: right; font-size: 13px; }
+    .hours-map { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 32px; display: flex; flex-direction: column; gap: 24px; }
+    .contact-item { display: flex; gap: 16px; }
+    .contact-icon { width: 40px; height: 40px; background: rgba(201,168,76,.1); border: 1px solid rgba(201,168,76,.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
+    .contact-lbl { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); }
+
+    .form-input { width: 100%; padding: 13px 16px; background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; color: var(--white); }
+    .contact-form { display: flex; flex-direction: column; gap: 16px; }
+    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
+    .form-success { display: none; padding: 16px; background: rgba(201,168,76,.1); border: 1px solid rgba(201,168,76,.3); border-radius: 8px; color: var(--gold); font-size: 14px; }
+    .form-success.show { display: block; }
+
+    .modal-overlay { display: none; position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,.85); align-items: center; justify-content: center; padding: 20px; }
+    .modal-overlay.open { display: flex; }
+    .modal { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; width: 100%; max-width: 560px; padding: 28px; }
+
+    footer { padding: 40px 20px; border-top: 1px solid var(--border); text-align: center; }
+    .footer-logo { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 900; margin-bottom: 8px; }
+    .footer-logo span { color: var(--gold); }
+    .footer-loc { font-size: 13px; color: var(--muted); margin-bottom: 20px; }
+    .footer-links { display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px; }
+    .footer-links a { font-size: 12px; color: var(--muted); }
+    .footer-copy { font-size: 12px; color: #444; }
+
+    @media (max-width: 768px) {
+      .nav-links, .nav-cta .btn-primary, .nav-phone { display: none; }
+      .hamburger { display: flex; }
+      .about-grid, .hours-wrap, .contact-grid, .form-row { grid-template-columns: 1fr; }
+      .gallery-grid { grid-template-columns: 1fr 1fr; }
+    }
+  </style>
+</head>
+<body>
+  <nav>
+    <a href="#home" class="nav-logo">RD<span>Cutz</span></a>
+    <ul class="nav-links">
+      <li><a href="#about">About</a></li><li><a href="#services">Services</a></li><li><a href="#gallery">Gallery</a></li><li><a href="#reviews">Reviews</a></li><li><a href="#contact">Contact</a></li>
+    </ul>
+    <div class="nav-cta"><a href="tel:2369895770" class="nav-phone">📞 (236) 989-5770</a><button class="btn-primary" onclick="openBooking()" style="padding:10px 20px;font-size:12px;">Book Now</button></div>
+    <button class="hamburger" id="hamburger" aria-label="Menu" onclick="toggleMenu()"><span></span><span></span><span></span></button>
+  </nav>
+
+  <div class="mobile-menu" id="mobileMenu">
+    <a href="#home" onclick="toggleMenu()">Home</a><a href="#about" onclick="toggleMenu()">About</a><a href="#services" onclick="toggleMenu()">Services</a><a href="#gallery" onclick="toggleMenu()">Gallery</a><a href="#reviews" onclick="toggleMenu()">Reviews</a><a href="#contact" onclick="toggleMenu()">Contact</a>
+    <a href="tel:2369895770" style="color:var(--gold);font-size:22px;">📞 (236) 989-5770</a>
+    <button class="btn-primary" onclick="toggleMenu();openBooking();">Book Appointment</button>
+  </div>
+
+  <section id="home">
+    <div class="hero-bg"></div><div class="hero-grid"></div>
+    <div class="hero-badge">Now Booking in Surrey, BC</div>
+    <h1 class="hero-headline">Fresh Cuts.<br><em>Clean Fades.</em></h1>
+    <p class="hero-sub">Professional barber in Surrey specializing in fades, line ups, and grooming. Book your slot online — quick and easy.</p>
+    <div class="hero-actions"><button class="btn-primary" onclick="openBooking()">✂ Book My Appointment</button><a href="tel:2369895770" class="btn-outline">📞 Call Now</a></div>
+    <div class="hero-image-wrap"><div class="hero-visual"><svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="155" y="180" width="90" height="12" rx="4" fill="#C9A84C" opacity=".3"/><rect x="165" y="192" width="8" height="40" rx="3" fill="#C9A84C" opacity=".3"/><rect x="227" y="192" width="8" height="40" rx="3" fill="#C9A84C" opacity=".3"/><rect x="145" y="225" width="110" height="8" rx="3" fill="#C9A84C" opacity=".25"/><rect x="155" y="120" width="90" height="65" rx="6" fill="#1e1e1e" stroke="#C9A84C" stroke-width="1" opacity=".6"/><ellipse cx="200" cy="90" rx="30" ry="34" fill="#222"/></svg></div>
+      <div class="hero-stats"><div class="stat"><div class="stat-num">5★</div><div class="stat-lbl">Rated</div></div><div class="stat"><div class="stat-num">$30</div><div class="stat-lbl">Starts at</div></div><div class="stat"><div class="stat-num">4</div><div class="stat-lbl">Services</div></div></div>
+    </div>
+  </section>
+
+  <section id="about"><div class="container"><div class="section-label">About RDCutz</div><div class="about-grid"><div class="about-img-box">✂</div><div class="about-text"><h2>Precision Cuts.<br><span class="gold">Real Results.</span></h2><div class="divider"></div><p>RDCutz is Surrey's go-to spot for clean fades, sharp line ups, and premium grooming services.</p><p>Book online or call — we'll take care of the rest.</p><button class="btn-primary" onclick="openBooking()">Book Now</button></div></div></div></section>
+
+  <section id="services"><div class="container"><div class="section-label">What We Offer</div><h2 style="font-size:clamp(28px,4vw,44px);">Our <span class="gold">Services</span></h2><div class="divider"></div><div class="services-grid"><div class="service-card"><div class="service-name">Fade Haircut</div><div class="service-detail">Clean, blended fade tailored to your style.</div><div class="service-meta"><div><div class="service-price">$30</div><div class="service-time">⏱ 60 minutes</div></div><button class="btn-outline" onclick="openBooking('Fade Haircut')">Book</button></div></div><div class="service-card"><div class="service-name">Beard Line Up</div><div class="service-detail">Sharp, defined beard shaping.</div><div class="service-meta"><div><div class="service-price">$20</div><div class="service-time">⏱ 40 minutes</div></div><button class="btn-outline" onclick="openBooking('Beard Line Up')">Book</button></div></div></div></div></section>
+
+  <section id="gallery"><div class="container"><div class="section-label">The Work</div><h2 style="font-size:clamp(28px,4vw,44px);">Fresh <span class="gold">Gallery</span></h2><div class="divider"></div><div class="gallery-grid"><div class="gallery-item"><div class="gallery-placeholder">Featured Cut</div><div class="gallery-note">Low Fade + Line Up</div></div><div class="gallery-item"><div class="gallery-placeholder">Skin Fade</div></div><div class="gallery-item"><div class="gallery-placeholder">Beard Trim</div></div></div></div></section>
+
+  <section id="reviews"><div class="container"><div class="section-label">Client Love</div><h2 style="font-size:clamp(28px,4vw,44px);">What They're <span class="gold">Saying</span></h2><div class="divider"></div><div class="reviews-grid"><div class="service-card">★★★★★ Best fade I've ever had in Surrey.</div><div class="service-card">★★★★★ Booked online super easy.</div><div class="service-card">★★★★★ Fresh cuts every time.</div></div></div></section>
+
+  <section id="hours"><div class="container"><div class="section-label">We're Open</div><h2 style="font-size:clamp(28px,4vw,44px);">Business <span class="gold">Hours</span></h2><div class="divider"></div><div class="hours-wrap"><div><div class="hours-row"><div>Sunday</div><div class="hours-time">10:00 AM – 2:00 PM / 3:00 PM – 11:00 PM</div></div><div class="hours-row"><div>Monday</div><div class="hours-time">3:30 PM – 10:00 PM</div></div><div class="hours-row"><div>Tuesday</div><div class="hours-time">5:30 PM – 10:00 PM</div></div></div><div class="hours-map"><div class="contact-item"><div class="contact-icon">📍</div><div><div class="contact-lbl">Location</div><div>Surrey, British Columbia</div></div></div><button class="btn-primary" onclick="openBooking()">✂ Book Now</button></div></div></div></section>
+
+  <section id="contact"><div class="container"><div class="section-label">Get in Touch</div><h2 style="font-size:clamp(28px,4vw,44px);">Contact <span class="gold">Us</span></h2><div class="divider"></div><div class="contact-grid"><form class="contact-form" onsubmit="submitContact(event)"><div class="form-row"><input type="text" class="form-input" id="c-fname" placeholder="First name" required /><input type="text" class="form-input" id="c-lname" placeholder="Last name" /></div><input type="tel" class="form-input" id="c-phone" placeholder="(604) 000-0000" /><textarea class="form-input" id="c-msg" placeholder="Your message" required></textarea><button type="submit" class="btn-primary">Send Message</button><div class="form-success" id="contactSuccess">✅ Message sent! We'll be in touch soon.</div></form><div><p style="color:var(--muted)">Skip the wait — book your appointment online.</p><button class="btn-primary" onclick="openBooking()">✂ Book Online Now</button></div></div></div></section>
+
+  <footer>
+    <div class="footer-logo">RD<span>Cutz</span></div>
+    <div class="footer-loc">Surrey, British Columbia · (236) 989-5770</div>
+    <div class="footer-links"><a href="#home">Home</a><a href="#about">About</a><a href="#services">Services</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a></div>
+    <div class="footer-copy">© <span id="year"></span> RDCutz. All rights reserved.</div>
+  </footer>
+
+  <div class="modal-overlay" id="bookingModal" onclick="if(event.target===this) closeBooking()">
+    <div class="modal">
+      <h3 style="margin-bottom:10px">Book Appointment</h3>
+      <p style="color:var(--muted);margin-bottom:16px">Call or message to confirm your preferred slot.</p>
+      <button class="btn-primary" style="width:100%;justify-content:center" onclick="window.location.href='tel:2369895770'">📞 Call (236) 989-5770</button>
+      <button class="btn-outline" style="width:100%;justify-content:center;margin-top:10px" onclick="closeBooking()">Close</button>
+    </div>
+  </div>
+
+  <script>
+    function toggleMenu(){ document.getElementById('mobileMenu').classList.toggle('open'); }
+    function openBooking(){ document.getElementById('bookingModal').classList.add('open'); }
+    function closeBooking(){ document.getElementById('bookingModal').classList.remove('open'); }
+    function submitContact(event){ event.preventDefault(); document.getElementById('contactSuccess').classList.add('show'); event.target.reset(); }
+    document.getElementById('year').textContent = new Date().getFullYear();
+  </script>
+</body>
+</html>
 
EOF
)
