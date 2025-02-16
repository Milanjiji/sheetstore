
export const formatDate = (date, locale = 'en-US') => {
    if (!date) return '';
    return new Date(date).toLocaleDateString(locale);
  };
  
