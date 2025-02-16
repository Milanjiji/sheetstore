// A utility function for formatting dates (works in both SSR and client-side)
export const formatDate = (date, locale = 'en-US') => {
    if (!date) return '';
    return new Date(date).toLocaleDateString(locale);
  };
  
  // An SSR-compatible API client
  export const fetchData = async (url) => {
    const res = await fetch(url);
    return res.json();
  };