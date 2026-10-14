export const PHONE = '4915251617901';
export function berlinTimestamp(date = new Date()) {
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date).filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
}
export function directionsURL(origin, destination) {
  return 'https://www.google.com/maps/dir/?' + new URLSearchParams({api:'1',origin:origin.trim(),destination:destination.trim(),travelmode:'driving'});
}
export function composeMessage(data) {
  const lines = ['Guten Tag Taxi Taş, ich möchte eine Fahrt anfragen.', '', `Fahrtart: ${data.type || 'Taxifahrt'}`, `Abholung: ${data.origin.trim()}`, `Ziel: ${data.destination.trim()}`];
  if(data.when === 'scheduled') {
    const [year,month,day] = data.date.split('-');
    lines.push(`Zeitpunkt: ${day}.${month}.${year} um ${data.time} Uhr`);
  } else lines.push('Zeitpunkt: nächstmöglich');
  lines.push(`Personen: ${data.passengers || '1'}`);
  if(data.returnTrip) lines.push(`Rückfahrt: ${data.returnDetails?.trim() || 'gewünscht – bitte abstimmen'}`);
  if(data.name?.trim()) lines.push(`Name: ${data.name.trim()}`);
  if(data.notes?.trim()) lines.push(`Hinweise: ${data.notes.trim()}`);
  lines.push('', 'Bitte bestätigen Sie mir die Verfügbarkeit und die Details der Fahrt. Vielen Dank!');
  return lines.join('\n');
}
export function whatsappURL(message) { return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`; }
export function validateBooking(data, now = new Date()) {
  if(!data.origin?.trim() || !data.destination?.trim()) return 'Bitte geben Sie Abholort und Ziel ein.';
  if(data.when === 'scheduled') {
    if(!data.date || !data.time) return 'Bitte wählen Sie Datum und Uhrzeit für Ihre Fahrt.';
    if(!/^\d{4}-\d{2}-\d{2}$/.test(data.date)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(data.time)) return 'Bitte wählen Sie ein gültiges Datum und eine gültige Uhrzeit.';
    const date = new Date(`${data.date}T12:00:00Z`);
    if(!Number.isFinite(date.getTime()) || date.toISOString().slice(0,10)!==data.date || `${data.date}T${data.time}` <= berlinTimestamp(now)) return 'Bitte wählen Sie einen Zeitpunkt in der Zukunft.';
  }
  return '';
}
