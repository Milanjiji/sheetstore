var formatDate = function formatDate(date) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
  if (!date) return '';
  return new Date(date).toLocaleDateString(locale);
};

export { formatDate };
