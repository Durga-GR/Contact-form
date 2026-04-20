// Email regex: standard RFC 5322-inspired pattern
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const form = document.getElementById('contact-form');
const successBanner = document.getElementById('success-banner');

// Field config: { input, errorEl, validate fn }
const fields = [
  {
    input: document.getElementById('name'),
    errorEl: document.getElementById('name-error'),
    validate(value) {
      if (!value) return 'Name is required.';
      if (value.length < 2) return 'Name must be at least 2 characters.';
      return null;
    },
  },
  {
    input: document.getElementById('email'),
    errorEl: document.getElementById('email-error'),
    validate(value) {
      if (!value) return 'Email is required.';
      if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email address.';
      return null;
    },
  },
  {
    input: document.getElementById('message'),
    errorEl: document.getElementById('message-error'),
    validate(value) {
      if (!value) return 'Message is required.';
      if (value.length < 10) return 'Message must be at least 10 characters.';
      return null;
    },
  },
];

/**
 * Validate a single field. Returns true if valid.
 */
function validateField({ input, errorEl, validate }) {
  const value = input.value.trim();
  const error = validate(value);

  if (error) {
    errorEl.textContent = error;
    input.classList.add('invalid');
    input.classList.remove('valid');
    return false;
  }

  errorEl.textContent = '';
  input.classList.remove('invalid');
  input.classList.add('valid');
  return true;
}

// Live validation: clear error as user types once a field has been touched
fields.forEach((field) => {
  field.input.addEventListener('input', () => {
    if (field.input.classList.contains('invalid') || field.input.classList.contains('valid')) {
      validateField(field);
    }
  });

  // Validate on blur so users get feedback when they leave a field
  field.input.addEventListener('blur', () => {
    validateField(field);
  });
});

// Form submit handler
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate all fields and collect results
  const allValid = fields.map(validateField).every(Boolean);

  if (!allValid) {
    // Focus the first invalid field
    const firstInvalid = fields.find((f) => f.input.classList.contains('invalid'));
    if (firstInvalid) firstInvalid.input.focus();
    return;
  }

  // All valid — show success, reset form
  successBanner.classList.remove('hidden');
  form.reset();

  // Remove valid styling after reset
  fields.forEach(({ input, errorEl }) => {
    input.classList.remove('valid', 'invalid');
    errorEl.textContent = '';
  });

  // Scroll banner into view
  successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Auto-hide banner after 5 seconds
  setTimeout(() => successBanner.classList.add('hidden'), 5000);
});
