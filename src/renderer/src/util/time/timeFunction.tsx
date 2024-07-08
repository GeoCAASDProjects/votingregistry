 
  
  export function getNamedDate(dateStr) {
    // Given date string
  
    // Parse the date
    const date = new Date(dateStr);
  
    // Get the current year
    const currentYear = new Date().getFullYear();
  
    // Extract day and month
    const dayMonthFormatter = new Intl.DateTimeFormat('es', { month: 'long', day: 'numeric' });
    const formattedDayMonth = dayMonthFormatter.format(date);
  
    // Extract month and year
    const monthYearFormatter = new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric' });
    const formattedMonthYear = monthYearFormatter.format(date);
  
    // Determine the appropriate format
    const output = (date.getFullYear() === currentYear) ? formattedDayMonth : formattedMonthYear;
  
    return output;
  }