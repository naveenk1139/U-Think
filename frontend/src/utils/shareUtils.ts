export const getShareUrl = (): string => {
  const productionDomain = import.meta.env.VITE_PUBLIC_SITE_URL;
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (productionDomain && !isLocalhost) {
    const cleanEnvUrl = productionDomain.replace(/\/$/, '');
    return `${cleanEnvUrl}${window.location.pathname}${window.location.search}${window.location.hash}`;
  }
  
  // Fallback if VITE_PUBLIC_SITE_URL is not set
  return window.location.href;
};

export const shareToWhatsApp = (customMessage?: string) => {
  const shareUrl = getShareUrl();
  const defaultMessage = `Explore U-THINK – AI Powered Education & Career Guidance`;
  const message = customMessage ? `${customMessage}\n${shareUrl}` : `${defaultMessage}\n${shareUrl}`;
  
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
};
