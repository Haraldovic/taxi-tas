import {directionsURL,composeMessage,whatsappURL,validateBooking,berlinTimestamp} from './booking.mjs';

const siteBase = new URL('../', import.meta.url);

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-navigation');
function closeMenu(returnFocus = false) {
  if(!menuButton || !navigation) return;
  const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded','false');
  menuButton.setAttribute('aria-label','Menü öffnen');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-is-open');
  if(returnFocus && wasOpen) menuButton.focus();
}
menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label',isOpen ? 'Menü schließen' : 'Menü öffnen');
  navigation.classList.toggle('is-open',isOpen);
  document.body.classList.toggle('menu-is-open',isOpen);
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape') closeMenu(true);
});
document.addEventListener('click',event=>{
  if(!event.target.closest('.header')) closeMenu();
});
navigation?.addEventListener('click',event=>{if(event.target.closest('a')) closeMenu();});
window.matchMedia('(min-width: 901px)').addEventListener('change',event=>{if(event.matches) closeMenu();});

function updateTypingState() {
  const active=document.activeElement;
  document.body.classList.toggle('is-typing',Boolean(active?.matches('input,textarea,select,[contenteditable="true"]')));
}
document.addEventListener('focusin',updateTypingState);
document.addEventListener('focusout',()=>setTimeout(updateTypingState,0));

document.querySelectorAll('[data-whatsapp]').forEach(link=>link.href = whatsappURL('Guten Tag Taxi Taş, ich möchte eine Fahrt anfragen.'));

document.querySelectorAll('[data-quick-form]').forEach(form=>{
  form.addEventListener('submit', event=>{
    event.preventDefault();
    const data = new FormData(form);
    const origin = String(data.get('origin')||'').trim();
    const destination = String(data.get('destination')||'').trim();
    if(!origin || !destination) {
      const field=form.querySelector(!origin?'[name="origin"]':'[name="destination"]');
      field.setCustomValidity('Bitte eine Adresse oder einen Ort eingeben.'); field.reportValidity(); return;
    }
    // Keep addresses out of URLs and history when moving to the request page.
    try { sessionStorage.setItem('taxi-request',JSON.stringify({origin,destination})); } catch {
      window.location.href=whatsappURL(composeMessage({origin,destination,when:'now',passengers:'Bitte abstimmen'}));return;
    }
    window.location.href=new URL('fahrt-anfragen/',siteBase).href;
  });
  form.addEventListener('input',e=>e.target.setCustomValidity?.(''));
  const mapLink = form.querySelector('[data-quick-route]');
  mapLink?.addEventListener('click',event=>{
    const origin=form.querySelector('[name="origin"]');
    const destination=form.querySelector('[name="destination"]');
    if(!origin.value.trim()||!destination.value.trim()) {
      event.preventDefault(); (origin.value.trim()?destination:origin).focus();
      form.reportValidity();return;
    }
    mapLink.href=directionsURL(origin.value,destination.value);
  });
});

const booking = document.querySelector('#booking-form');
if(booking) {
  const field = name=>booking.elements.namedItem(name);
  const scheduled = document.querySelector('#scheduled-fields');
  const returnFields = document.querySelector('#return-fields');
  const preview = document.querySelector('#message-preview');
  const error = document.querySelector('#form-error');
  const route = document.querySelector('#route-link');
  const params = new URLSearchParams(window.location.search);
  const requestedType=params.get('art');
  if(requestedType && [...field('type').options].some(o=>o.value===requestedType)) field('type').value=requestedType;
  try {
    const saved=JSON.parse(sessionStorage.getItem('taxi-request')||'null');
    if(saved) { field('origin').value=String(saved.origin||'').slice(0,200);field('destination').value=String(saved.destination||'').slice(0,200); }
    sessionStorage.removeItem('taxi-request');
  } catch {}
  field('date').min=berlinTimestamp().slice(0,10);
  function values() { return {...Object.fromEntries(new FormData(booking)),returnTrip:field('returnTrip').checked}; }
  function update() {
    const data=values();
    const isScheduled=data.when==='scheduled';
    scheduled.hidden=!isScheduled;
    field('date').required=isScheduled;field('time').required=isScheduled;
    returnFields.hidden=!data.returnTrip;
    preview.textContent=composeMessage({...data,origin:data.origin||'[Abholort]',destination:data.destination||'[Ziel]',date:data.date||'JJJJ-MM-TT',time:data.time||'--:--'});
    route.href=directionsURL(data.origin||'Hagen',data.destination||'Hagen');
    error.textContent='';
  }
  booking.addEventListener('input',update);booking.addEventListener('change',update);
  route.addEventListener('click',event=>{
    if(!field('origin').value.trim()||!field('destination').value.trim()) {event.preventDefault();error.textContent='Für die Route bitte zuerst Abholort und Ziel eingeben.'; (field('origin').value.trim()?field('destination'):field('origin')).focus();}
  });
  document.querySelector('#swap-addresses')?.addEventListener('click',()=>{
    const original=field('origin').value;field('origin').value=field('destination').value;field('destination').value=original;update();
  });
  document.querySelectorAll('[data-destination]').forEach(button=>button.addEventListener('click',()=>{field('destination').value=button.dataset.destination;update();field('origin').focus();}));
  booking.addEventListener('submit',event=>{
    event.preventDefault();const data=values();const problem=validateBooking(data);
    if(problem) {error.textContent=problem;error.focus();return;}
    window.location.href=whatsappURL(composeMessage(data));
  });
  document.querySelector('#copy-message')?.addEventListener('click',async event=>{
    const button=event.currentTarget;const status=document.querySelector('#copy-status');
    try {await navigator.clipboard.writeText(preview.textContent); status.textContent='Anfragetext kopiert.';}
    catch {status.textContent='Kopieren ist hier nicht verfügbar. Sie können den Text markieren und manuell kopieren.';}
    button.focus();
  });
  update();
}

document.querySelectorAll('[data-review-direction]').forEach(button=>button.addEventListener('click',()=>{
  const rail=document.querySelector('#review-rail');
  const gap=parseFloat(getComputedStyle(rail).columnGap)||0;
  rail.scrollBy({left:Number(button.dataset.reviewDirection)*(rail.querySelector('article').getBoundingClientRect().width+gap),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
}));
