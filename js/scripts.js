// Deadline banner control
let deadline = new Date("2024-03-22");  // set your deadline here
let now = new Date();

if (now >= deadline) {
  const banner = document.getElementById("announcement-banner");
  if (banner) {
    banner.style.display = "none";
  }
}

// Modern form handling
function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target.closest('form');
  const submitBtn = event.target;
  const originalText = submitBtn.innerHTML;
  
  // Validate form
  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }
  
  // Show loading state
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Submitting...';
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
    showFormError(form, 'There was an error submitting your application. Please try again.');
  })
  .finally(() => {
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
  
  return false;
}

// Show success message
function showFormSuccess(form) {
  const modal = form.closest('.modal');
  const modalBody = modal.querySelector('.modal-body');
  
  modalBody.innerHTML = `
    <div class="text-center py-5">
      <div class="mb-4">
        <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
      </div>
      <h3 class="text-success mb-3">Application Submitted Successfully!</h3>
      <p class="lead mb-4">Thank you for your application. The faculty advisor will review your submission.</p>
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
    </div>
  `;
}

// Show error message
function showFormError(form, message) {
  const existingAlert = form.querySelector('.alert');
  if (existingAlert) {
    existingAlert.remove();
  }
  
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert alert-danger alert-dismissible fade show';
  alertDiv.innerHTML = `
    <strong>Error:</strong> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  form.insertBefore(alertDiv, form.firstChild);
}

// Enhanced form validation
function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('is-invalid');
      isValid = false;
    } else {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
    }
  });
  
  return isValid;
}

// Email validation for CSUF domains
function validateCSUFEmail(email) {
  const csufPattern = /@(csu\.)?fullerton\.edu$/i;
  return csufPattern.test(email);
}

// Real-time validation for email fields
document.addEventListener('DOMContentLoaded', function() {
  const emailFields = document.querySelectorAll('input[type="email"]');
  
  emailFields.forEach(field => {
    field.addEventListener('blur', function() {
      if (this.id === 'email' && this.value && !validateCSUFEmail(this.value)) {
        this.setCustomValidity('Please use your CSUF email address (@csu.fullerton.edu or @fullerton.edu)');
        this.classList.add('is-invalid');
      } else {
        this.setCustomValidity('');
        this.classList.remove('is-invalid');
        if (this.value) this.classList.add('is-valid');
      }
    });
    
    field.addEventListener('input', function() {
      if (this.classList.contains('is-invalid')) {
        this.classList.remove('is-invalid');
      }
    });
  });
  
  // Add validation styling to all form fields
  const allFormFields = document.querySelectorAll('.form-control');
  allFormFields.forEach(field => {
    field.addEventListener('blur', function() {
      if (this.hasAttribute('required') && !this.value.trim()) {
        this.classList.add('is-invalid');
      } else if (this.value.trim()) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
      }
    });
    
    field.addEventListener('input', function() {
      if (this.classList.contains('is-invalid') && this.value.trim()) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
      }
    });
  });
});
