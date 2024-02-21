export function formatDate(dateString) {
  // Input validation
  if (!dateString || isNaN(Date.parse(dateString))) {
    console.error('Invalid dateString:', dateString);
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

function formatDateNow(dateString) {
    var d = new Date(dateString),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('/');
}
formatDateNow()
console.log(formatDateNow);
