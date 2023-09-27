export function formatTimestampString(ts: string): string {
   const d = new Date(Number(ts) * 1000)
   const day = d.getDate()
   const month = d.getMonth()
   const year = d.getFullYear()
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
   ]
   return monthNames[month] + ' ' + day + ', ' + year
}

export function formatDate(d: Date): string {
   const day = d.getDate()
   const month = d.getMonth()
   const year = d.getFullYear()
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
   ]
   return monthNames[month] + ' ' + day + ', ' + year
}

export function shortenHex(hex: string | undefined) {
   return hex === undefined ? '' : hex.slice(0, 6) + '...' + hex.slice(-4)
}

export function formatTitle(id: string, title: string): string {
   return `#${id}: ${title}`
}

export function getUpdateNumFromID(id: string): string {
   return id.substring(id.indexOf('-') + 1)
}
