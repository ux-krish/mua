export function initBooking() {
  const form = document.getElementById('booking-form');
  const nameInput = document.getElementById('client-name');
  const phoneInput = document.getElementById('client-phone');
  const dateInput = document.getElementById('event-date');
  const occasionSelect = document.getElementById('event-occasion');
  const messageInput = document.getElementById('client-message');
  const successBanner = document.getElementById('form-success-banner');
  const waDirectBtn = document.getElementById('btn-wa-direct');

  // WhatsApp Direct Button with pre-filled message
  if (waDirectBtn) {
    waDirectBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = encodeURIComponent("Hi Aanya! I would love to enquire about bridal/makeup bookings and check your date availability.");
      window.open(`https://wa.me/91XXXXXXXXXX?text=${text}`, '_blank', 'noopener,noreferrer');
    });
  }

  if (!form) return;

  // Validation helpers
  function setError(input, message) {
    const group = input.closest('.form-group');
    const feedback = group ? group.querySelector('.form-feedback') : null;
    if (group) {
      group.classList.add('has-error');
      group.classList.remove('has-success');
    }
    if (feedback) {
      feedback.innerHTML = `<svg class="lucide lucide-circle-alert" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg><span>${message}</span>`;
      feedback.classList.add('is-visible');
    }
  }

  function clearError(input) {
    const group = input.closest('.form-group');
    const feedback = group ? group.querySelector('.form-feedback') : null;
    if (group) {
      group.classList.remove('has-error');
      group.classList.add('has-success');
    }
    if (feedback) {
      feedback.innerHTML = '';
      feedback.classList.remove('is-visible');
    }
  }

  [nameInput, phoneInput, dateInput, occasionSelect].forEach(input => {
    if (input) {
      input.addEventListener('input', () => clearError(input));
      input.addEventListener('change', () => clearError(input));
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      setError(nameInput, 'Please share your name so Aanya knows who to address.');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validate Phone / Contact
    if (!phoneInput.value.trim() || phoneInput.value.trim().length < 8) {
      setError(phoneInput, 'Please enter a valid phone or WhatsApp number.');
      isValid = false;
    } else {
      clearError(phoneInput);
    }

    // Validate Date
    if (!dateInput.value) {
      setError(dateInput, 'Add a date so Aanya can verify calendar availability.');
      isValid = false;
    } else {
      clearError(dateInput);
    }

    // Validate Occasion
    if (!occasionSelect.value) {
      setError(occasionSelect, 'Please select your event occasion or service.');
      isValid = false;
    } else {
      clearError(occasionSelect);
    }

    if (isValid) {
      // Build WhatsApp message and open or show confirmation
      const formattedDate = dateInput.value;
      const occasionText = occasionSelect.options[occasionSelect.selectedIndex].text;
      const customMessage = messageInput.value.trim() ? `\n\nNotes: ${messageInput.value.trim()}` : '';

      const waMessage = encodeURIComponent(
        `*New Booking Enquiry — Luxe by Aanya*\n\n` +
        `• *Name:* ${nameInput.value.trim()}\n` +
        `• *Contact:* ${phoneInput.value.trim()}\n` +
        `• *Date:* ${formattedDate}\n` +
        `• *Occasion:* ${occasionText}` +
        customMessage
      );

      if (successBanner) {
        successBanner.classList.add('is-active');
        successBanner.innerHTML = `
          <strong>Thank you, ${nameInput.value.trim()}!</strong><br>
          Your enquiry has been formatted. Opening WhatsApp to connect directly with Aanya's studio...
        `;
      }

      setTimeout(() => {
        window.open(`https://wa.me/919876543210?text=${waMessage}`, '_blank', 'noopener,noreferrer');
      }, 1000);

      form.reset();
    }
  });
}
