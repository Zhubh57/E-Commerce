document.addEventListener('DOMContentLoaded', () => {
    
    // Custom Cursor Ring
    const cursorRing = document.createElement('div');
    cursorRing.classList.add('cursor-ring');
    document.body.appendChild(cursorRing);

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor follow
    function render() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
        requestAnimationFrame(render);
    }
    render();

    // Hover effects for custom cursor ring
    const interactiveElements = document.querySelectorAll('a, button, .cart-icon');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.style.width = '60px';
            cursorRing.style.height = '60px';
            cursorRing.style.backgroundColor = 'rgba(0, 255, 255, 0.1)';
            cursorRing.style.mixBlendMode = 'difference';
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.style.width = '40px';
            cursorRing.style.height = '40px';
            cursorRing.style.backgroundColor = 'transparent';
            cursorRing.style.mixBlendMode = 'normal';
        });
    });

    // Sticky Navbar Glass Effect adjustments on scroll
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Dummy "Add to Cart" functionality
    const cartCountEl = document.querySelector('.cart-count');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    let cartCount = 0;

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            cartCount++;
            cartCountEl.textContent = cartCount;
            
            // Pop effect text
            const btnText = this.textContent;
            this.textContent = 'ADDED!';
            this.style.background = 'var(--neon-pink)';
            this.style.color = 'white';
            this.style.borderColor = 'var(--neon-pink)';
            
            // Small ripple/pop animation on cart counter
            cartCountEl.style.transform = 'scale(1.5)';
            setTimeout(() => {
                cartCountEl.style.transform = 'scale(1)';
            }, 200);

            setTimeout(() => {
                this.textContent = btnText;
                this.style.background = '';
                this.style.color = '';
                this.style.borderColor = '';
            }, 2000);
        });
    });

    // Floating animation for hero image based on mouse movement
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            heroImage.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        // Reset when mouse leaves
        heroImage.addEventListener('mouseleave', () => {
            heroImage.style.transition = 'transform 0.5s ease';
            heroImage.style.transform = `perspective(1000px) rotateY(-15deg) rotateX(0)`;
        });
        heroImage.addEventListener('mouseenter', () => {
            heroImage.style.transition = 'none';
        });
    }
});
