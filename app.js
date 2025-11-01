// Application State
let appState = {
  currentPage: 'home',
  walletConnected: false,
  walletAddress: null,
  user: null,
  currentStep: 1
};

// Navigation
function navigateTo(page) {
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('active'));
  
  // Show selected page
  const targetPage = document.getElementById(`page-${page}`);
  if (targetPage) {
    targetPage.classList.add('active');
    appState.currentPage = page;
    
    // Update nav active state
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
    });
    const activeNav = document.getElementById(`nav-${page}`);
    if (activeNav) {
      activeNav.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Load page-specific content
    if (page === 'marketplace') {
      loadMarketplace();
    } else if (page === 'contact') {
      loadFAQ();
    }
  }
}

// Wallet Connection
function toggleWallet() {
  const button = document.getElementById('wallet-button');
  const lockIcon = document.getElementById('lock-icon');
  
  if (!appState.walletConnected) {
    // Simulate wallet connection
    setTimeout(() => {
      appState.walletConnected = true;
      appState.walletAddress = '0x' + Math.random().toString(16).substr(2, 8).toUpperCase();
      button.textContent = appState.walletAddress;
      lockIcon.textContent = '';
      showNotification('Wallet connected successfully!', 'success');
    }, 1000);
  } else {
    // Disconnect
    appState.walletConnected = false;
    appState.walletAddress = null;
    button.textContent = 'Connect Wallet';
    lockIcon.textContent = '🔒';
    showNotification('Wallet disconnected', 'success');
  }
}

// Notifications
function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = `notification ${type} show`;
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Animate Stats Counter
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

// Initialize Stats Animation
function initializeStats() {
  const stats = [
    { id: 'stat-mwh', value: 15000 },
    { id: 'stat-co2', value: 50000 },
    { id: 'stat-partners', value: 200 }
  ];
  
  stats.forEach(stat => {
    const element = document.getElementById(stat.id);
    if (element) {
      animateCounter(element, stat.value);
    }
  });
}

// Marketplace Data
const marketplaceData = [
  {
    project: "Sunrise Solar Farm",
    region: "California, USA",
    price: 18.50,
    tons: 1200,
    verified: true,
    energy: 5400
  },
  {
    project: "Delhi Green Initiative",
    region: "Delhi, India",
    price: 12.00,
    tons: 800,
    verified: true,
    energy: 3200
  },
  {
    project: "Sahara Solar Park",
    region: "Morocco",
    price: 15.75,
    tons: 2500,
    verified: true,
    energy: 8900
  },
  {
    project: "Texas Energy Co-op",
    region: "Texas, USA",
    price: 17.00,
    tons: 3100,
    verified: true,
    energy: 11200
  }
];

// Load Marketplace
function loadMarketplace() {
  const grid = document.getElementById('marketplace-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  marketplaceData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'credit-card';
    card.innerHTML = `
      <div class="credit-header">
        <h3 class="credit-title">${item.project}</h3>
        <p class="credit-region">📍 ${item.region}</p>
      </div>
      <div class="credit-body">
        <div class="credit-info">
          <span class="info-label">Price per Ton</span>
          <span class="info-value">$${item.price.toFixed(2)}</span>
        </div>
        <div class="credit-info">
          <span class="info-label">Available</span>
          <span class="info-value">${item.tons} tons</span>
        </div>
        <div class="credit-info">
          <span class="info-label">Energy Generated</span>
          <span class="info-value">${item.energy.toLocaleString()} kWh</span>
        </div>
        <div style="margin-top: 16px;">
          ${item.verified ? '<span class="verified-badge">✓ Verra Verified</span>' : ''}
        </div>
        <button class="btn btn-green" style="width: 100%; margin-top: 16px;" onclick="purchaseCredit('${item.project}')">
          View Details
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Purchase Credit
function purchaseCredit(projectName) {
  if (!appState.walletConnected) {
    showNotification('Please connect your wallet first', 'error');
    return;
  }
  showNotification(`Opening details for ${projectName}...`, 'success');
}

// Form Navigation - Panel Owner
function nextStep(step) {
  // Hide current step
  document.getElementById(`panel-step-${appState.currentStep}`).style.display = 'none';
  
  // Update progress
  document.getElementById(`step-${appState.currentStep}`).classList.remove('active');
  document.getElementById(`step-${appState.currentStep}`).classList.add('completed');
  document.getElementById(`step-${step}`).classList.add('active');
  
  // Show next step
  document.getElementById(`panel-step-${step}`).style.display = 'block';
  appState.currentStep = step;
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevStep(step) {
  // Hide current step
  document.getElementById(`panel-step-${appState.currentStep}`).style.display = 'none';
  
  // Update progress
  document.getElementById(`step-${appState.currentStep}`).classList.remove('active');
  document.getElementById(`step-${step}`).classList.add('active');
  
  // Show previous step
  document.getElementById(`panel-step-${step}`).style.display = 'block';
  appState.currentStep = step;
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completePanelOnboarding() {
  showNotification('Panel owner registration successful! Welcome to SolaNX!', 'success');
  setTimeout(() => {
    navigateTo('dashboard');
  }, 1500);
}

// Form Navigation - Investor
function nextInvestorStep(step) {
  const currentStep = step - 1;
  document.getElementById(`investor-form-step-${currentStep}`).style.display = 'none';
  document.getElementById(`investor-step-${currentStep}`).classList.remove('active');
  document.getElementById(`investor-step-${currentStep}`).classList.add('completed');
  document.getElementById(`investor-step-${step}`).classList.add('active');
  document.getElementById(`investor-form-step-${step}`).style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevInvestorStep(step) {
  const currentStep = step + 1;
  document.getElementById(`investor-form-step-${currentStep}`).style.display = 'none';
  document.getElementById(`investor-step-${currentStep}`).classList.remove('active');
  document.getElementById(`investor-step-${step}`).classList.add('active');
  document.getElementById(`investor-form-step-${step}`).style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completeInvestorOnboarding() {
  showNotification('Investment confirmed! Welcome to SolaNX!', 'success');
  setTimeout(() => {
    navigateTo('dashboard');
  }, 1500);
}

// Contact Form
function handleContactSubmit(event) {
  event.preventDefault();
  showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
  event.target.reset();
}

// FAQ Data
const faqData = [
  {
    question: "What is tokenization and how does it work?",
    answer: "Tokenization converts verified solar energy into digital tokens on the blockchain, making energy production tradeable globally"
  },
  {
    question: "How are carbon credits verified?",
    answer: "Our IoT devices monitor energy production in real-time, and verified data is submitted to Verra for certification"
  },
  {
    question: "What returns can investors expect?",
    answer: "Returns vary by project but typically range from 8-15% annually based on solar productivity and credit trading margins"
  },
  {
    question: "What is the IoT setup process?",
    answer: "Installation takes 15 minutes: mount device on panel, connect to Wi-Fi, scan QR code to pair with your account"
  },
  {
    question: "Can I trade carbon credits internationally?",
    answer: "Yes, all credits are on-chain and tradeable globally via our marketplace"
  },
  {
    question: "Is my data private and secure?",
    answer: "We use military-grade encryption and GDPR compliance. IoT data is anchored on blockchain for immutability"
  }
];

// Load FAQ
function loadFAQ() {
  const container = document.getElementById('faq-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  faqData.forEach(item => {
    const faqItem = document.createElement('div');
    faqItem.style.marginTop = '20px';
    faqItem.innerHTML = `
      <p style="font-weight: 600; margin-bottom: 8px; color: var(--solanx-green);">Q: ${item.question}</p>
      <p style="color: var(--color-text-secondary); line-height: 1.6;">A: ${item.answer}</p>
    `;
    container.appendChild(faqItem);
  });
}

// Mobile Menu
function toggleMobileMenu() {
  const menu = document.querySelector('.nav-links');
  if (menu.style.display === 'flex') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
    menu.style.position = 'absolute';
    menu.style.top = '70px';
    menu.style.right = '0';
    menu.style.background = 'var(--color-surface)';
    menu.style.padding = '20px';
    menu.style.boxShadow = 'var(--shadow-lg)';
    menu.style.borderRadius = 'var(--radius-lg)';
    menu.style.width = '250px';
  }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  initializeStats();
  
  // Add scroll animation observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe feature cards and stats
  document.querySelectorAll('.feature-card, .stat-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});