// Pricing data
const pricingData = [
    { ram: '1 GB', price: 1000, popular: false },
    { ram: '2 GB', price: 2000, popular: false },
    { ram: '3 GB', price: 3000, popular: false },
    { ram: '4 GB', price: 4000, popular: true },
    { ram: '5 GB', price: 5000, popular: false },
    { ram: '6 GB', price: 6000, popular: false },
    { ram: '7 GB', price: 7000, popular: false },
    { ram: '8 GB', price: 8000, popular: true },
    { ram: '9 GB', price: 9000, popular: false },
    { ram: '10 GB', price: 10000, popular: false },
    { ram: 'Unlimited', price: 12000, popular: true }
];

// Format currency to Indonesian Rupiah
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Generate pricing cards
function generatePricingCards() {
    const pricingGrid = document.getElementById('pricingGrid');
    
    pricingData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = `pricing-card ${item.popular ? 'popular' : ''}`;
        
        card.innerHTML = `
            ${item.popular ? '<div class="card-badge">POPULER</div>' : ''}
            <div class="ram-size">${item.ram}</div>
            <div class="price">
                <span class="price-currency">Rp</span> ${item.price.toLocaleString('id-ID')}
            </div>
            <button class="contact-btn" onclick="contactAdmin('${item.ram}', ${item.price})">
                Hubungi Admin
            </button>
        `;
        
        pricingGrid.appendChild(card);
    });
}

// Contact admin function
function contactAdmin(ram, price) {
    // Format harga ke format Rupiah yang sederhana
    const formattedPrice = `Rp ${price.toLocaleString('id-ID')}`;
    const message = `Min, mau beli panel dengan RAM ${ram} dan harga ${formattedPrice}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/62895326426758?text=${encodedMessage}`;
    
    console.log('Membuka WhatsApp dengan pesan:', message);
    console.log('URL WhatsApp:', whatsappUrl);
    
    // Add click animation
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        window.open(whatsappUrl, '_blank');
    }, 150);
}

// Add scroll animations
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    // Observe pricing cards
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    generatePricingCards();
    
    // Add delay for smooth animation
    setTimeout(() => {
        addScrollAnimations();
    }, 100);
});

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});