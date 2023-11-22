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

export function isMainnet(){
   return process.env.NEXT_PUBLIC_CHAIN != "SEPOLIA"
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

export function ordinals(num: number): string {
   const ordinals = [
      'zeroth',
      'first',
      'second',
      'third',
      'fourth',
      'fifth',
      'sixth',
      'seventh',
      'eighth',
      'ninth',
      'tenth',
      'eleventh',
      'twelfth',
      'thirteenth',
      'fourteenth',
      'fifteenth',
      'sixteenth',
      'seventeenth',
      'eighteenth',
      'nineteenth',
      'twentieth',
      'twenty-first',
      'twenty-second',
      'twenty-third',
      'twenty-fourth',
      'twenty-fifth',
      'twenty-sixth',
      'twenty-seventh',
      'twenty-eighth',
      'twenty-ninth',
      'thirtieth',
      'thirty-first',
      'thirty-second',
      'thirty-third',
      'thirty-fourth',
      'thirty-fifth',
      'thirty-sixth',
      'thirty-seventh',
      'thirty-eighth',
      'thirty-ninth',
      'fortieth',
      'forty-first',
      'forty-second',
      'forty-third',
      'forty-fourth',
      'forty-fifth',
      'forty-sixth',
      'forty-seventh',
      'forty-eighth',
      'forty-ninth',
      'fiftieth',
      'fifty-first',
      'fifty-second',
      'fifty-third',
      'fifty-fourth',
      'fifty-fifth',
      'fifty-sixth',
      'fifty-seventh',
      'fifty-eighth',
      'fifty-ninth',
      'sixtieth',
      'sixty-first',
      'sixty-second',
      'sixty-third',
      'sixty-fourth',
      'sixty-fifth',
      'sixty-sixth',
      'sixty-seventh',
      'sixty-eighth',
      'sixty-ninth',
      'seventieth',
      'seventy-first',
      'seventy-second',
      'seventy-third',
      'seventy-fourth',
      'seventy-fifth',
      'seventy-sixth',
      'seventy-seventh',
      'seventy-eighth',
      'seventy-ninth',
      'eightieth',
      'eighty-first',
      'eighty-second',
      'eighty-third',
      'eighty-fourth',
      'eighty-fifth',
      'eighty-sixth',
      'eighty-seventh',
      'eighty-eighth',
      'eighty-ninth',
      'ninetieth',
      'ninety-first',
      'ninety-second',
      'ninety-third',
      'ninety-fourth',
      'ninety-fifth',
      'ninety-sixth',
      'ninety-seventh',
      'ninety-eighth',
      'ninety-ninth',
      'one hundredth',
   ]

   const capitalizedOrdinals = ordinals.map((word) => {
      return word.replace(/\b\w/g, (letter) => letter.toUpperCase())
   })

   return capitalizedOrdinals[num]
}
