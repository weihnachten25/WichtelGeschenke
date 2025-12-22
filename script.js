/**
 * Bier Reminder Application
 * Handles form submission and toast notifications
 */

// ============================================
// Configuration
// ============================================
const CONFIG = {
  API_URL: 'https://ygbwmqpviakzwgjjwuuw.supabase.co/functions/v1/schedule_reminders',
  TOAST_DURATION: 5000,
  TOAST_ANIMATION_DELAY: 10,
  TOAST_REMOVE_DELAY: 300,
  MIN_BEER_COUNT: 1,
  MAX_BEER_COUNT: 20
};

// ============================================
// DOM Elements
// ============================================
const elements = {
  form: document.getElementById('reminderForm'),
  startBtn: document.getElementById('startBtn'),
  buttonText: document.getElementById('buttonText'),
  beerCountInput: document.getElementById('beerCount'),
  emailInput: document.getElementById('email')
};

// ============================================
// Toast Notification System
// ============================================
class ToastManager {
  constructor() {
    this.currentToast = null;
  }

  /**
   * Shows a toast notification
   * @param {string} message - The message to display
   * @param {string} type - The type of toast ('success' or 'error')
   */
  show(message, type = 'success') {
    // Remove existing toast if any
    if (this.currentToast) {
      this.remove();
    }

    const toast = this.createToastElement(message, type);
    document.body.appendChild(toast);
    this.currentToast = toast;

    // Trigger animation
    setTimeout(() => {
      toast.classList.add('show');
    }, CONFIG.TOAST_ANIMATION_DELAY);

    // Auto remove after duration
    setTimeout(() => {
      this.remove();
    }, CONFIG.TOAST_DURATION);
  }

  /**
   * Creates a toast DOM element
   * @param {string} message - The message to display
   * @param {string} type - The type of toast
   * @returns {HTMLElement} The toast element
   */
  createToastElement(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '✅' : '❌';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
    `;

    return toast;
  }

  /**
   * Removes the current toast
   */
  remove() {
    if (this.currentToast) {
      this.currentToast.classList.remove('show');
      setTimeout(() => {
        if (this.currentToast && this.currentToast.parentNode) {
          this.currentToast.remove();
        }
        this.currentToast = null;
      }, CONFIG.TOAST_REMOVE_DELAY);
    }
  }
}

// Initialize toast manager
const toastManager = new ToastManager();

// ============================================
// Form Validation
// ============================================
class FormValidator {
  /**
   * Validates the beer count input
   * @param {number} beerCount - The beer count to validate
   * @returns {Object} Validation result with isValid and error message
   */
  validateBeerCount(beerCount) {
    if (!beerCount || isNaN(beerCount)) {
      return {
        isValid: false,
        message: 'Bitte gib eine gültige Anzahl an Bieren ein!'
      };
    }

    if (beerCount < CONFIG.MIN_BEER_COUNT) {
      return {
        isValid: false,
        message: `Bitte gib mindestens ${CONFIG.MIN_BEER_COUNT} Bier an!`
      };
    }

    if (beerCount > CONFIG.MAX_BEER_COUNT) {
      return {
        isValid: false,
        message: `Bitte gib maximal ${CONFIG.MAX_BEER_COUNT} Biere an!`
      };
    }

    return { isValid: true };
  }

  /**
   * Validates the email input
   * @param {string} email - The email to validate
   * @returns {Object} Validation result with isValid and error message
   */
  validateEmail(email) {
    if (!email || typeof email !== 'string') {
      return {
        isValid: false,
        message: 'Bitte gib eine Email-Adresse ein!'
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        message: 'Bitte gib eine gültige Email-Adresse ein!'
      };
    }

    return { isValid: true };
  }

  /**
   * Validates the entire form
   * @param {number} beerCount - The beer count
   * @param {string} email - The email address
   * @returns {Object} Validation result
   */
  validateForm(beerCount, email) {
    const beerCountValidation = this.validateBeerCount(beerCount);
    if (!beerCountValidation.isValid) {
      return {
        isValid: false,
        message: beerCountValidation.message,
        focusElement: elements.beerCountInput
      };
    }

    const emailValidation = this.validateEmail(email);
    if (!emailValidation.isValid) {
      return {
        isValid: false,
        message: emailValidation.message,
        focusElement: elements.emailInput
      };
    }

    return { isValid: true };
  }
}

// Initialize form validator
const formValidator = new FormValidator();

// ============================================
// UI State Management
// ============================================
class UIStateManager {
  /**
   * Sets the button to loading state
   */
  setLoading() {
    elements.startBtn.disabled = true;
    elements.buttonText.innerHTML = '<span class="loading"></span>Wird gestartet...';
  }

  /**
   * Resets the button to normal state
   */
  reset() {
    elements.startBtn.disabled = false;
    elements.buttonText.textContent = 'START';
  }
}

// Initialize UI state manager
const uiStateManager = new UIStateManager();

// ============================================
// API Service
// ============================================
class ApiService {
  /**
   * Sends a request to schedule reminders
   * @param {number} beerCount - Number of beers
   * @param {string} email - Email address
   * @returns {Promise<Response>} The fetch response
   */
  async scheduleReminders(beerCount, email) {
    try {
      const response = await fetch(CONFIG.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          beer_count: beerCount,
          email: email
        })
      });

      return response;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}

// Initialize API service
const apiService = new ApiService();

// ============================================
// Form Handler
// ============================================
class FormHandler {
  /**
   * Handles form submission
   * @param {Event} event - The submit event
   */
  async handleSubmit(event) {
    event.preventDefault();

    const beerCount = parseInt(elements.beerCountInput.value, 10);
    const email = elements.emailInput.value.trim();

    // Validate form
    const validation = formValidator.validateForm(beerCount, email);
    if (!validation.isValid) {
      toastManager.show(validation.message, 'error');
      if (validation.focusElement) {
        validation.focusElement.focus();
      }
      return;
    }

    // Set loading state
    uiStateManager.setLoading();

    try {
      const response = await apiService.scheduleReminders(beerCount, email);

      if (response.ok) {
        // Try to parse response, but don't fail if it's empty
        try {
          await response.json();
        } catch (e) {
          // Response might not have JSON body, that's okay
        }

        toastManager.show('Reminder gestartet! Viel Spaß beim Trinken 🍺', 'success');
        
        // Reset form after success
        elements.form.reset();
      } else {
        const errorText = await response.text().catch(() => 'Unbekannter Fehler');
        toastManager.show('Fehler beim Starten des Reminders. Bitte versuche es erneut.', 'error');
        console.error('API Error:', response.status, errorText);
      }
    } catch (error) {
      toastManager.show('Netzwerkfehler. Bitte überprüfe deine Internetverbindung.', 'error');
      console.error('Network error:', error);
    } finally {
      // Always reset UI state
      uiStateManager.reset();
    }
  }
}

// Initialize form handler
const formHandler = new FormHandler();

// ============================================
// Event Listeners
// ============================================
function initializeEventListeners() {
  // Form submission
  elements.form.addEventListener('submit', (e) => {
    formHandler.handleSubmit(e);
  });

  // Enter key support for better UX
  const inputs = [elements.beerCountInput, elements.emailInput];
  inputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        elements.form.dispatchEvent(new Event('submit'));
      }
    });
  });
}

// ============================================
// Initialization
// ============================================
function init() {
  // Check if all required elements exist
  const requiredElements = [
    elements.form,
    elements.startBtn,
    elements.buttonText,
    elements.beerCountInput,
    elements.emailInput
  ];

  const missingElements = requiredElements.filter(el => !el);
  if (missingElements.length > 0) {
    console.error('Missing required DOM elements:', missingElements);
    return;
  }

  // Initialize event listeners
  initializeEventListeners();

  // Focus first input for better UX
  elements.beerCountInput.focus();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM is already loaded
  init();
}

