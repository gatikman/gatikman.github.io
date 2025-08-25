// Tiny GA4 helper for SPA tracking
export const GA_ID = import.meta.env.VITE_GA_ID;

function inject(tagId) {
  if (!tagId || typeof document === 'undefined') return;
  // Avoid duplicate injection
  if (document.getElementById('gtag-js')) return;
  const s = document.createElement('script');
  s.id = 'gtag-js';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  window.gtag('js', new Date());
  window.gtag('config', tagId, { anonymize_ip: true, send_page_view: false });
}

export function initAnalytics() {
  try { inject(GA_ID); } catch (_) { /* no-op */ }
}

export function trackPageView(path, title) {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) return;
  window.gtag('event', 'page_view', {
    page_title: title || document.title,
    page_location: window.location.href,
    page_path: path,
  });
}

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) return;
  window.gtag('event', name, params);
}

export function setUserProps(props = {}) {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) return;
  window.gtag('set', 'user_properties', props);
}
