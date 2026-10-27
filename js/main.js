// Draw-in animation for the hero "steadying line" (crisis -> calm).
// Respects prefers-reduced-motion via the CSS override in styles.css.
function animatePath(el, delay) {
  const len = el.getTotalLength();
  el.style.strokeDasharray = len;
  el.style.strokeDashoffset = len;
  el.getBoundingClientRect(); // force reflow
  el.style.transition = `stroke-dashoffset 1.4s ease ${delay}s`;
  requestAnimationFrame(() => {
    el.style.strokeDashoffset = '0';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // ---- Hero animation (home page only) ----
  const crisis = document.getElementById('crisisPath');
  const calm = document.getElementById('calmPath');
  if (crisis && calm) {
    animatePath(crisis, 0.1);
    animatePath(calm, 0.9);
  }

  // ---- Supervisor section (volunteer form): reveal only when "Yes" ----
  const supervisorFields = document.getElementById('supervisor-fields');
  if (supervisorFields) {
    document.querySelectorAll('input[name="supervisor"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        supervisorFields.hidden = radio.value !== 'Yes';
      });
    });
  }

  // ---- Required checkbox groups: at least one must be ticked ----
  function validateGroups(form) {
    let firstInvalid = null;
    form.querySelectorAll('fieldset[data-required-group]').forEach((group) => {
      const ok = group.querySelector('input[type="checkbox"]:checked');
      const msg = group.querySelector('.group-msg');
      group.classList.toggle('group-error', !ok);
      if (msg) msg.hidden = !!ok;
      if (!ok && !firstInvalid) firstInvalid = group;
    });
    return firstInvalid;
  }

  document.querySelectorAll('fieldset[data-required-group]').forEach((group) => {
    group.addEventListener('change', () => {
      if (group.querySelector('input[type="checkbox"]:checked')) {
        group.classList.remove('group-error');
        const msg = group.querySelector('.group-msg');
        if (msg) msg.hidden = true;
      }
    });
  });

  // ---- Netlify Forms (contact + volunteer) — submitted without a page reload ----
  // Netlify detects each form at deploy time because the HTML contains a
  // <form data-netlify="true"> with a matching hidden "form-name" field.
  // Turn on email notifications under Site settings → Forms → Notifications.
  document.querySelectorAll('form[data-netlify="true"]').forEach((form) => {
    const status = form.querySelector('.form-status');
    const button = form.querySelector('button[type="submit"]');
    const originalLabel = button ? button.textContent : '';
    const isVolunteer = form.id === 'volunteer-form';

    function setStatus(message, kind) {
      if (!status) return;
      status.textContent = message;
      status.classList.remove('is-success', 'is-error');
      if (kind) status.classList.add(kind);
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const badGroup = validateGroups(form);
      if (badGroup) {
        badGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const firstBox = badGroup.querySelector('input');
        if (firstBox) firstBox.focus({ preventScroll: true });
        return;
      }

      if (button) {
        button.disabled = true;
        button.textContent = 'Sending…';
      }
      setStatus('', null);

      // URLSearchParams keeps repeated keys, so multi-select checkbox
      // groups (same name, several values) are all submitted.
      const body = new URLSearchParams(new FormData(form)).toString();

      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body
        });
        if (!response.ok) throw new Error('Form submission failed');

        form.reset();
        if (supervisorFields) supervisorFields.hidden = true;
        if (button) {
          button.disabled = false;
          button.textContent = originalLabel;
        }
        setStatus(
          isVolunteer
            ? "Thank you — your application has been received. We'll be in touch by WhatsApp, phone or email."
            : "Thanks — we've received your message and will reply within one business day.",
          'is-success'
        );
        if (status) status.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch (err) {
        if (button) {
          button.disabled = false;
          button.textContent = originalLabel;
        }
        setStatus(
          'Something went wrong sending that — please try again, or email crisisofcare@gmail.com directly.',
          'is-error'
        );
      }
    });
  });
});
