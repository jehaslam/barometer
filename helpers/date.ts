
// Example utility functions
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getCurrentDate(): string {
  return formatDate(new Date());
}

// Default export
export default {
  formatDate,
  getCurrentDate,
};
