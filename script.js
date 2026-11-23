const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (toggle && nav) {
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
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Google Apps Script Web App endpoint supplied for Growth Bridge Advisory.
const GOOGLE_SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbzcMOxyJfsUSU2xP2t6iWDK1Bstly-bjsSPmkgreI0_2VXMxrOT0Ki3vE6gv91lk6jE4w/exec";

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const buttonLabel = submitButton?.querySelector(".button-label");
  const originalButtonLabel = buttonLabel?.textContent || "Send enquiry";

  function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
  }

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    // Honeypot: reject automated submissions without sending them to the sheet.
    const honeypot = contactForm.elements.website;
    if (honeypot && honeypot.value.trim()) {
      showStatus("We couldn't process this submission. Please refresh and try again.", "error");
      return;
    }

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

    if (!payload.name || !payload.email || !payload.service || !payload.message) {
      showStatus("Please complete your name, email, service and requirement.", "error");
      return;
    }

    if (submitButton) submitButton.disabled = true;
    if (buttonLabel) buttonLabel.textContent = "Submitting…";
    showStatus("Submitting your enquiry securely…", "pending");

    try {
      // IMPORTANT: Do not use no-cors here. It hides the server response and
      // can make a failed spreadsheet write look successful to the visitor.
      // This request expects the Apps Script doPost endpoint to return JSON
      // with { success: true } after appendRow() completes.
      const response = await fetch(GOOGLE_SHEETS_ENDPOINT, {
        method: "POST",
        mode: "cors",
        redirect: "follow",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`The enquiry service returned HTTP ${response.status}.`);
      }

      const result = await response.json();

      if (!result || result.success !== true) {
        throw new Error(result?.message || "The enquiry could not be saved.");
      }

      showStatus(
        `Thank you. Your enquiry has been saved successfully. Reference: ${result.submissionId || "received"}. We’ll be in touch.`,
        "success"
      );
      contactForm.reset();
    } catch (error) {
      console.error("Growth Bridge enquiry submission error:", error);
      showStatus(
        "We couldn't confirm that your enquiry was saved. Please try again, or email ritusingh@growthbridgeadvisory.com. If you already submitted once, please check with us before resubmitting.",
        "error"
      );
    } finally {
      if (submitButton) submitButton.disabled = false;
      if (buttonLabel) buttonLabel.textContent = originalButtonLabel;
    }
  });
}
