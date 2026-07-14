/* ==========================================================================
   COMMON SITE CHROME — shared by index.html and project-details.html
   Preloader, header/nav, mobile menu, scroll reveal, stat counters,
   back-to-top, cursor glow, background particles, button ripple, and 
   right-click protection.
   ========================================================================== */
(function () {
    'use strict';

    // --------------------------------------------------------------
    // DISABLE RIGHT CLICK (Allowed only when Admin Mode is active)
    // --------------------------------------------------------------
    document.addEventListener('contextmenu', function (e) {
        var adminBar = document.getElementById('admin-bar');
        // If the admin bar exists and is active, let right-click function normally
        if (adminBar && adminBar.classList.contains('active')) {
            return;
        }
        e.preventDefault();
    }, false);

    // --------------------------------------------------------------
    // LAZY LOAD (shared by project thumbnails and gallery images)
    // --------------------------------------------------------------
    function lazyLoadImages() {
        var images = document.querySelectorAll('.lazy-img');
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var img = entry.target;
                        var src = img.getAttribute('data-src');
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            }, { rootMargin: '100px' });
            images.forEach(function (img) { observer.observe(img); });
        } else {
            images.forEach(function (img) {
                var src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
            });
        }
    }
    window.lazyLoadImages = lazyLoadImages;

    // --------------------------------------------------------------
    // PRELOADER
    // --------------------------------------------------------------
    window.addEventListener('load', function () {
        var preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(function () { preloader.style.display = 'none'; }, 500);
        }
    });

    // --------------------------------------------------------------
    // SCROLL PROGRESS BAR
    // --------------------------------------------------------------
    var progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', function () {
            var scrollTop = window.scrollY;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        });
    }

    // --------------------------------------------------------------
    // HEADER SCROLL EFFECT + NAV ACTIVE STATE
    // --------------------------------------------------------------
    var header = document.getElementById('main-header');
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a');

    function updateHeaderAndNav() {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        var current = '';
        sections.forEach(function (section) {
            var sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(function (link) {
            link.classList.remove('active');
            var href = link.getAttribute('href') || '';
            if (current && href === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateHeaderAndNav);
    window.addEventListener('load', updateHeaderAndNav);

    // --------------------------------------------------------------
    // MOBILE MENU TOGGLE
    // --------------------------------------------------------------
    var menuToggle = document.getElementById('menu-toggle');
    var navLinksContainer = document.getElementById('nav-links');
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', function () {
            navLinksContainer.classList.toggle('active');
            var icon = menuToggle.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
        navLinksContainer.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinksContainer.classList.remove('active');
                var icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }

    // --------------------------------------------------------------
    // SCROLL REVEAL
    // --------------------------------------------------------------
    var revealObserver;
    function initRevealObserver() {
        var revealElements = document.querySelectorAll('.reveal');
        if ('IntersectionObserver' in window) {
            revealObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            revealElements.forEach(function (el) { revealObserver.observe(el); });
            window.revealObserver = revealObserver;
        } else {
            revealElements.forEach(function (el) { el.classList.add('active'); });
        }
    }
    initRevealObserver();

    // --------------------------------------------------------------
    // STAT COUNTER (only present on index.html's About section)
    // --------------------------------------------------------------
    var statNumbers = document.querySelectorAll('.stat-number');
    var countersAnimated = false;

    function animateCounters() {
        if (countersAnimated || !statNumbers.length) return;
        var triggerPoint = window.scrollY + window.innerHeight;
        var statsSection = document.getElementById('about');
        if (statsSection && triggerPoint > statsSection.offsetTop + 100) {
            countersAnimated = true;
            statNumbers.forEach(function (el) {
                var target = parseInt(el.getAttribute('data-count'), 10);
                if (isNaN(target)) return;
                var current = 0;
                var step = Math.max(1, Math.floor(target / 40));
                var interval = setInterval(function () {
                    current += step;
                    if (current >= target) {
                        el.textContent = target + (target === 28 ? '+' : '');
                        clearInterval(interval);
                    } else {
                        el.textContent = current + '+';
                    }
                }, 30);
            });
        }
    }
    window.addEventListener('scroll', animateCounters);
    window.addEventListener('load', function () { setTimeout(animateCounters, 300); });

    // --------------------------------------------------------------
    // BACK TO TOP
    // --------------------------------------------------------------
    var backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 600) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --------------------------------------------------------------
    // CUSTOM MOUSE GLOW
    // --------------------------------------------------------------
    var glow = document.getElementById('custom-glow');
    if (glow) {
        document.addEventListener('mousemove', function (e) {
            glow.style.display = 'block';
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
        document.addEventListener('mouseleave', function () {
            glow.style.display = 'none';
        });
    }

    // --------------------------------------------------------------
    // BACKGROUND PARTICLES
    // --------------------------------------------------------------
    var canvas = document.getElementById('particles-canvas');
    if (canvas) {
        var ctx = canvas.getContext('2d');
        var width, height, particles = [];

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', function () {
            resizeCanvas();
            initParticles();
        });
        resizeCanvas();

        function Particle() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        Particle.prototype.update = function () {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;
        };
        Particle.prototype.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(192, 132, 252, ' + this.opacity + ')';
            ctx.fill();
        };

        function initParticles() {
            particles = [];
            var count = Math.min(80, Math.floor((width * height) / 15000));
            for (var i = 0; i < count; i++) particles.push(new Particle());
        }
        initParticles();

        function drawLines() {
            for (var i = 0; i < particles.length; i++) {
                for (var j = i + 1; j < particles.length; j++) {
                    var dx = particles[i].x - particles[j].x;
                    var dy = particles[i].y - particles[j].y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = 'rgba(192, 132, 252, ' + (0.08 * (1 - dist / 150)) + ')';
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(function (p) { p.update(); p.draw(); });
            drawLines();
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // --------------------------------------------------------------
    // RIPPLE EFFECT ON BUTTONS PRESENT AT LOAD TIME
    // --------------------------------------------------------------
    function attachRipple(btn) {
        btn.addEventListener('click', function (e) {
            var rect = btn.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            var size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            btn.appendChild(ripple);
            setTimeout(function () { ripple.remove(); }, 600);
        });
    }
    document.querySelectorAll('.btn').forEach(attachRipple);
    window.attachRipple = attachRipple;

})();