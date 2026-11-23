const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Google Apps Script web-app endpoint supplied for Growth Bridge Advisory.
const GOOGLE_SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbzcMOxyJfsUSU2xP2t6iWDK1Bstly-bjsSPmkgreI0_2VXMxrOT0Ki3vE6gv91lk6jE4w/exec";

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitButton = contactForm.querySelector('button[type="submit"]');
const buttonLabel = submitButton.querySelector(".button-label");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Simple honeypot: silently ignore automated submissions that fill this field.
  if (contactForm.elements.website.value.trim()) {
    formStatus.textContent = "Thank you. Your enquiry has been received.";
    formStatus.className = "form-status success";
    contactForm.reset();
    return;
  }

  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const payload = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    company: String(formData.get("company") || "").trim(),
    service: String(formData.get("service") || "").trim(),
    message: String(formData.get("message") || "").trim(),
    source: "Growth Bridge Advisory website"
  };

  if (!payload.name || !payload.email || !payload.message) {
    formStatus.textContent = "Please complete your name, email and requirement.";
    formStatus.className = "form-status error";
    return;
  }

  submitButton.disabled = true;
  buttonLabel.textContent = "Sending…";
  formStatus.textContent = "Sending your enquiry…";
  formStatus.className = "form-status pending";

  try {
    // text/plain keeps this a simple cross-origin request and avoids a CORS preflight.
    // Apps Script ContentService responses are redirected and are opaque to no-cors fetch.
    await fetch(GOOGLE_SHEETS_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    formStatus.textContent = "Your enquiry request has been sent. Thank you for contacting Growth Bridge Advisory. We’ll be in touch.";
    formStatus.className = "form-status success";
    contactForm.reset();
  } catch (error) {
    formStatus.textContent = "We couldn’t send your enquiry. Please try again or email ritusingh@growthbridgeadvisory.com.";
    formStatus.className = "form-status error";
  } finally {
    submitButton.disabled = false;
    buttonLabel.textContent = "Send enquiry";
  }
});
