// Deadline banner control: hides #announcement-banner once this date passes
const bannerDeadline = new Date("2024-03-22");  // set your deadline here

if (new Date() >= bannerDeadline) {
  const banner = document.getElementById("announcement-banner");
  if (banner) {
    banner.style.display = "none";
  }
}

const ADVISOR_EMAIL = 'dpadams@fullerton.edu';

// Modern form handling
function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const submitBtn = form.querySelector('[type="submit"]');
  const originalText = submitBtn.innerHTML;

  // Validate form
  form.querySelectorAll('input[type="email"]').forEach(checkEmailField);
  if (!form.checkValidity()) {
    form.querySelectorAll('.form-control, .form-select').forEach(updateFieldState);
    form.reportValidity();
    return false;
  }

  // Show loading state
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Submitting...';
  submitBtn.disabled = true;

  // Get form data
  const formData = new FormData(form);

  // Submit to Formspree
  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      showFormSuccess(form);
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    showFormError(form, `There was an error submitting your application. Please try again. If it keeps happening, email the faculty advisor at <a href="mailto:${ADVISOR_EMAIL}">${ADVISOR_EMAIL}</a>.`);
  })
  .finally(() => {
    // Reset button (it is gone from the page after a successful submit)
    if (submitBtn.isConnected) {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });

  return false;
}

// Show success message and keep keyboard focus inside the dialog
function showFormSuccess(form) {
  const modal = form.closest('.modal');
  const modalBody = modal.querySelector('.modal-body');

  modalBody.innerHTML = `
    <div class="text-center py-5">
      <div class="mb-4">
        <i class="fas fa-check-circle text-success" style="font-size: 4rem;" aria-hidden="true"></i>
      </div>
      <h3 class="text-success mb-3" id="${modal.id}-success" tabindex="-1">Application Submitted Successfully!</h3>
      <p class="lead mb-4">Thank you for your application. The faculty advisor will review your submission.</p>
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
    </div>
  `;

  modal.setAttribute('aria-labelledby', `${modal.id}-success`);
  document.getElementById(`${modal.id}-success`).focus();
}

// Show error message
function showFormError(form, message) {
  const existingAlert = form.querySelector('.alert');
  if (existingAlert) {
    existingAlert.remove();
  }

  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert alert-danger alert-dismissible fade show';
  alertDiv.setAttribute('role', 'alert');
  alertDiv.innerHTML = `
    <strong>Error:</strong> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  form.insertBefore(alertDiv, form.firstChild);
}

// Email validation for CSUF domains
function validateCSUFEmail(email) {
  const csufPattern = /@(csu\.)?fullerton\.edu$/i;
  return csufPattern.test(email);
}

function checkEmailField(field) {
  if (field.id === 'email' && field.value && !validateCSUFEmail(field.value)) {
    field.setCustomValidity('Please use your CSUF email address (@csu.fullerton.edu or @fullerton.edu)');
  } else {
    field.setCustomValidity('');
  }
}

// Mark a field valid/invalid for sighted users (color + icon) and screen readers (aria-invalid)
function updateFieldState(field) {
  if (!field.value.trim() && !field.required) {
    field.classList.remove('is-invalid', 'is-valid');
    field.removeAttribute('aria-invalid');
    return;
  }

  const valid = field.validity.valid;
  field.classList.toggle('is-invalid', !valid);
  field.classList.toggle('is-valid', valid);
  if (valid) {
    field.removeAttribute('aria-invalid');
  } else {
    field.setAttribute('aria-invalid', 'true');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('form.needs-validation').forEach(form => {
    form.addEventListener('submit', handleFormSubmit);

    form.addEventListener('reset', function() {
      form.querySelectorAll('.form-control, .form-select').forEach(field => {
        field.setCustomValidity('');
        field.classList.remove('is-invalid', 'is-valid');
        field.removeAttribute('aria-invalid');
      });
    });
  });

  document.querySelectorAll('input[type="email"]').forEach(field => {
    field.addEventListener('input', () => checkEmailField(field));
    field.addEventListener('blur', () => checkEmailField(field));
  });

  // Real-time validation styling for all form fields
  document.querySelectorAll('.form-control, .form-select').forEach(field => {
    field.addEventListener('blur', () => updateFieldState(field));

    const onChange = () => {
      if (field.classList.contains('is-invalid')) {
        updateFieldState(field);
      }
    };
    field.addEventListener('input', onChange);
    field.addEventListener('change', onChange);
  });
});
