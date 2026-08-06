export const formatDateDisplay = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const dayName = days[date.getDay()];
  const dayNum = date.getDate();
  const monthName = months[date.getMonth()];
  const yearShort = date.getFullYear().toString().slice(-2);
  
  return `${dayName}, ${dayNum} ${monthName}'${yearShort}`;
};

export const formatCarouselDate = (dateString: string): { dayName: string; dayNum: number; monthName: string } => {
  const date = new Date(dateString);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return {
    dayName: days[date.getDay()],
    dayNum: date.getDate(),
    monthName: months[date.getMonth()],
  };
};

export const generateDateRange = (startDateStr: string, count: number = 7): string[] => {
  const result: string[] = [];
  const start = new Date(startDateStr);
  if (isNaN(start.getTime())) {
    const today = new Date('2026-08-05');
    for (let i = -1; i < count - 1; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      result.push(d.toISOString().split('T')[0]);
    }
    return result;
  }
  
  for (let i = -2; i < count - 2; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    result.push(d.toISOString().split('T')[0]);
  }
  return result;
};
