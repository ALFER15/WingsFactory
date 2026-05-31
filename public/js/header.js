document.addEventListener('DOMContentLoaded', () => {
    // Scroll shrink logic
    const header = document.getElementById('main-header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
      }, { passive: true });
    }

    // Store hours logic
    function checkStoreStatus() {
      // Always check using Mexico City time to avoid issues with user's local timezone
      const mxTime = new Date().toLocaleString("en-US", {timeZone: "America/Mexico_City"});
      const now = new Date(mxTime);
      const d = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
      const h = now.getHours();
      const m = now.getMinutes();
      const mins = h * 60 + m;

      let isOpen = false;

      // Late night closure (00:00 to 00:30) checking for Thu, Fri, Sat
      if (h === 0 && m < 30) {
        const prevDay = (d + 6) % 7;
        if (prevDay >= 4 && prevDay <= 6) { // Thu, Fri, Sat close at 00:30 the next day
          isOpen = true;
        }
      } else {
        // Normal daytime schedules
        if (d === 0) { // Sunday: 1:30 PM - 10:00 PM (810 - 1320 mins)
          if (mins >= 810 && mins < 1320) isOpen = true; 
        } else if (d >= 1 && d <= 3) { // Mon-Wed: 1:30 PM - 11:00 PM (810 - 1380 mins)
          if (mins >= 810 && mins < 1380) isOpen = true; 
        } else if (d >= 4 && d <= 6) { // Thu-Sat: 1:30 PM - 12:00 AM (810 - 1440 mins)
          if (mins >= 810 && mins < 1440) isOpen = true; 
        }
      }

      const statusBadge = document.getElementById('store-status');
      const statusText = document.getElementById('status-text');

      if (statusBadge && statusText) {
        if (isOpen) {
          statusBadge.classList.remove('is-closed');
          statusText.textContent = 'ABIERTO';
        } else {
          statusBadge.classList.add('is-closed');
          statusText.textContent = 'CERRADO';
        }
      }
    }

    checkStoreStatus();
    // Update every minute automatically
    setInterval(checkStoreStatus, 60000);
});
