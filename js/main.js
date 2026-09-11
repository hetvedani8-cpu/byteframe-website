/**
 * Byteframe - AI Automation Agency
 * Core JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initHeroAgentSimulation();
  initServiceCardGlow();
  initRoiCalculator();
  initContactForm();
  initNewsletterForm();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. Sticky Header with Scroll Detection
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('open');
      toggleBtn.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* --------------------------------------------------------------------------
   3. Hero Agent Live Simulation Stream
   -------------------------------------------------------------------------- */
function initHeroAgentSimulation() {
  const agentNodes = document.querySelectorAll('.agent-node');
  if (!agentNodes.length) return;

  const simulationEvents = [
    {
      name: 'Lead Triage Agent',
      status: 'SUCCESS',
      statusClass: 'success',
      log: 'Qualified 18 inbound enterprise leads & synced with Salesforce CRM in 1.4s',
      progress: '100%'
    },
    {
      name: 'Document Intelligence',
      status: 'PROCESSING',
      statusClass: 'processing',
      log: 'Parsing 84 invoices with OCR vectorization & cross-checking ERP ledgers...',
      progress: '78%'
    },
    {
      name: 'Autonomous Support Swarm',
      status: 'SUCCESS',
      statusClass: 'success',
      log: 'Resolved Tier-2 customer inquiry with custom RAG knowledge engine',
      progress: '100%'
    },
    {
      name: 'Financial Audit Bot',
      status: 'PROCESSING',
      statusClass: 'processing',
      log: 'Reconciling multi-currency Stripe balances across 3 banking APIs...',
      progress: '64%'
    },
    {
      name: 'Contract Extraction Agent',
      status: 'SUCCESS',
      statusClass: 'success',
      log: 'Indexed 12 master service agreements and flagged 0 liability risks',
      progress: '100%'
    }
  ];

  let currentIndex = 0;

  setInterval(() => {
    // Select one node to update dynamically
    const targetNode = agentNodes[currentIndex % agentNodes.length];
    const eventData = simulationEvents[(currentIndex + 2) % simulationEvents.length];

    if (targetNode) {
      targetNode.style.opacity = '0.4';
      targetNode.style.transform = 'translateY(2px)';

      setTimeout(() => {
        const nameEl = targetNode.querySelector('.agent-name');
        const badgeEl = targetNode.querySelector('.agent-status-badge');
        const logEl = targetNode.querySelector('.agent-log');
        const progressEl = targetNode.querySelector('.agent-progress-fill');

        if (nameEl) nameEl.textContent = eventData.name;
        if (badgeEl) {
          badgeEl.textContent = eventData.status;
          badgeEl.className = `agent-status-badge ${eventData.statusClass}`;
        }
        if (logEl) logEl.textContent = eventData.log;
        if (progressEl) progressEl.style.width = eventData.progress;

        targetNode.style.opacity = '1';
        targetNode.style.transform = 'none';
      }, 300);
    }

    currentIndex++;
  }, 4200);
}

/* --------------------------------------------------------------------------
   4. Specular Hover Glow for Service Cards
   -------------------------------------------------------------------------- */
function initServiceCardGlow() {
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* --------------------------------------------------------------------------
   5. Interactive ROI Calculator
   -------------------------------------------------------------------------- */
function initRoiCalculator() {
  const teamSlider = document.getElementById('calcTeamSize');
  const hoursSlider = document.getElementById('calcHours');
  const wageSlider = document.getElementById('calcWage');

  const teamVal = document.getElementById('calcTeamVal');
  const hoursVal = document.getElementById('calcHoursVal');
  const wageVal = document.getElementById('calcWageVal');

  const savingsTotal = document.getElementById('calcSavingsTotal');
  const hoursSavedEl = document.getElementById('calcHoursSaved');
  const roiMultiplierEl = document.getElementById('calcRoiMultiplier');

  if (!teamSlider || !hoursSlider || !wageSlider) return;

  function calculate() {
    const team = parseInt(teamSlider.value, 10);
    const hours = parseInt(hoursSlider.value, 10);
    const wage = parseInt(wageSlider.value, 10);

    // Update displayed slider values
    teamVal.textContent = `${team} People`;
    hoursVal.textContent = `${hours} hrs / week`;
    wageVal.textContent = `$${wage} / hr`;

    // Calculation logic:
    // Automation potential: 72% of repetitive tasks eliminated
    const automationRate = 0.72;
    const weeklyHoursSaved = team * hours * automationRate;
    const annualHoursSaved = Math.round(weeklyHoursSaved * 50); // 50 work weeks
    const annualDollarSavings = Math.round(annualHoursSaved * wage);

    // Estimated agency deployment cost amortized factor
    const estimatedCost = Math.max(18000, team * 1400);
    const roiMultiplier = Math.max(2.4, (annualDollarSavings / estimatedCost)).toFixed(1);

    // Format dollar value
    savingsTotal.textContent = `$${annualDollarSavings.toLocaleString()}`;
    hoursSavedEl.textContent = `${annualHoursSaved.toLocaleString()} hrs`;
    roiMultiplierEl.textContent = `${roiMultiplier}x ROI`;
  }

  teamSlider.addEventListener('input', calculate);
  hoursSlider.addEventListener('input', calculate);
  wageSlider.addEventListener('input', calculate);

  // Initial calculation
  calculate();
}

/* --------------------------------------------------------------------------
   6. Contact Form Validation & Feedback
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('auditForm');
  const feedback = document.getElementById('formFeedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.form-submit-btn');
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const companyInput = document.getElementById('contactCompany');

    // Simple validation
    if (!nameInput.value.trim() || !emailInput.value.trim() || !companyInput.value.trim()) {
      showFeedback('Please fill out all required fields marked with *.', 'error');
      return;
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showFeedback('Please provide a valid corporate email address.', 'error');
      return;
    }

    // Simulate submission loading state
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 0.8s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Analyzing Requirements...
    `;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalBtnHtml;
      submitBtn.disabled = false;
      showFeedback('✓ Thank you! Your AI Automation Audit request has been received. Our lead engineer will contact you within 4 business hours.', 'success');
      form.reset();
    }, 1200);
  });

  function showFeedback(msg, type) {
    feedback.textContent = msg;
    feedback.className = `form-feedback ${type}`;
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* --------------------------------------------------------------------------
   7. Newsletter Subscription Form
   -------------------------------------------------------------------------- */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.newsletter-input');
    const btn = form.querySelector('.newsletter-btn');
    
    if (!input.value.trim() || !input.value.includes('@')) {
      input.style.borderColor = '#ef4444';
      return;
    }

    const originalText = btn.textContent;
    btn.textContent = 'Subscribed!';
    btn.style.background = '#10b981';
    input.value = '';
    input.disabled = true;

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      input.disabled = false;
    }, 3000);
  });
}

/* --------------------------------------------------------------------------
   8. Smooth Scroll for Anchor Links
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
