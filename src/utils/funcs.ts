export function formatTimestampString(ts: string): string {
   const d = new Date(Number(ts) * 1000);
   const day = d.getDate();
   const month = d.getMonth();
   const year = d.getFullYear();
   const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
   ];
   return monthNames[month - 1] + ' ' + day + ', ' + year;
}
