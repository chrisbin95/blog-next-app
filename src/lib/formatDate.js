export function formatDate(dateString) {
  // Input validation
  if (!dateString || isNaN(Date.parse(dateString))) {
    console.error('Invalid date string:', dateString);
    return 'Invalid Date';
  }

  const utcDate = new Date(`${dateString}T00:00:00Z`);
  
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  };

  return utcDate.toLocaleDateString('en-US', options);
}
