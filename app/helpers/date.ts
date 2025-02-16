export function parseDate(dateStr: string): Date | null {
  const [month, day, year] = dateStr.split('/').map(num => parseInt(num, 10));
  
  // Adjust for 0-based month indexing in JavaScript's Date constructor
  if (isNaN(month) || isNaN(day) || isNaN(year)) {
    return null;  // Invalid date format
  }
  
  // Ensure the month is in the correct range (0-11 for JavaScript Date)
  const validMonth = month >= 1 && month <= 12 ? month - 1 : 0;

  return new Date(year, validMonth, day);
}

// Add default export
export default parseDate;
