const CARS = [
  { id:'f488', make:'Ferrari', model:'488 GTB', year:2019, horsepower:661, transmission:'Automatic', seats:2, pricePerDay:1200, location:'London, UK', description:'A razor-sharp V8 supercar with breathtaking performance.', images:['https://images.unsplash.com/photo-1517677208171-0bc6725a3e60','https://images.unsplash.com/photo-1511396980085-0e2b464bb7bf'] },
  { id:'huracan', make:'Lamborghini', model:'Huracán EVO', year:2020, horsepower:630, transmission:'Automatic', seats:2, pricePerDay:1400, location:'Manchester, UK', description:'NA V10 symphony with razor-edge styling.', images:['https://images.unsplash.com/photo-1517940310602-65f1d6d0b2c4'] },
  { id:'720s', make:'McLaren', model:'720S', year:2021, horsepower:710, transmission:'Automatic', seats:2, pricePerDay:1500, location:'Birmingham, UK', description:'Monocage carbon chassis with absurd pace.', images:['https://images.unsplash.com/photo-1606665744305-3f9f88311cd4'] },
  { id:'911ts', make:'Porsche', model:'911 Turbo S', year:2022, horsepower:640, transmission:'Automatic', seats:4, pricePerDay:900, location:'London, UK', description:'Everyday-usable missile with AWD traction.', images:['https://images.unsplash.com/photo-1555215695-3004980ad54e'] },
  { id:'r8v10', make:'Audi', model:'R8 V10', year:2018, horsepower:562, transmission:'Automatic', seats:2, pricePerDay:700, location:'Leeds, UK', description:'Howling V10 and rock-solid dynamics.', images:['https://images.unsplash.com/photo-1553440569-bcc63803a83d'] }
]
function qs(s, el=document){ return el.querySelector(s) }
function qsa(s, el=document){ return [...el.querySelectorAll(s)] }
function params(){ return Object.fromEntries(new URLSearchParams(location.search).entries()) }
function currency(n){ return '£' + n.toLocaleString() }
function carCard(c){
  return `<article class="card">
    <div class="media" style="background:url('${c.images[0]}&w=1200&q=60') center/cover"></div>
    <div class="body">
      <div class="row"><h3>${c.make} ${c.model}</h3><div class="price">${currency(c.pricePerDay)}/day</div></div>
      <div class="meta">${c.year} • ${c.horsepower} hp • ${c.seats} seats • ${c.location}</div>
      <div class="mt-3 flex">
        <a class="btn" href="car.html?id=${encodeURIComponent(c.id)}">View</a>
        <span class="tag">Instant book</span>
      </div>
    </div>
  </article>`
}
window.renderFeatured = (sel, count=3) => {
  const el = qs(sel); if(!el) return
  CARS.slice(0,count).forEach(c => el.insertAdjacentHTML('beforeend', carCard(c)))
}
window.initBrowse = () => {
  const grid = qs('#results-grid'); const f = qs('#filters')
  const p = new URLSearchParams(location.search)
  qsa('input,select', f).forEach(i => { if (p.has(i.name)) i.value = p.get(i.name) || '' })
  const render = () => {
    grid.innerHTML = ''
    const q = (qs('#q').value || '').toLowerCase()
    const make = qs('#make').value
    const seats = qs('#seats').value
    const min = parseInt(qs('#minPrice').value || 0, 10)
    const max = parseInt(qs('#maxPrice').value || 1e7, 10)
    let list = CARS.filter(c =>
      (!q || [c.make,c.model,c.description,c.location].join(' ').toLowerCase().includes(q)) &&
      (!make || c.make === make) &&
      (!seats || String(c.seats) === seats) &&
      c.pricePerDay >= min && c.pricePerDay <= max
    )
    if(!list.length){ grid.innerHTML = '<p class="meta">No cars match those filters.</p>'; return }
    list.forEach(c => grid.insertAdjacentHTML('beforeend', carCard(c)))
  }
  f.addEventListener('submit', e => { e.preventDefault(); render() })
  render()
}
window.renderCarPage = () => {
  const { id } = params(); const c = CARS.find(x=>x.id===id) || CARS[0]
  const root = qs('#car-root')
  root.innerHTML = `
    <nav aria-label="Breadcrumbs" class="meta"><a href="browse.html">Browse</a> › ${c.make} ${c.model}</nav>
    <section class="section">
      <div class="gallery">
        <div class="main" style="background:url('${c.images[0]}&w=1600&q=60') center/cover" role="img" aria-label="${c.make} ${c.model}"></div>
        <div class="thumbs">
          ${c.images.slice(1).map(u => `<div class="main" style="background:url('${u}&w=800&q=60') center/cover; aspect-ratio: 16/9; border-radius:12px"></div>`).join('')}
        </div>
      </div>
      <div class="split mt-6">
        <article class="box">
          <h1 style="margin:0">${c.make} ${c.model}</h1>
          <p class="meta">${c.year} • ${c.horsepower} hp • ${c.seats} seats • ${c.transmission}</p>
          <p class="mt-3">${c.description}</p>
          <div class="mt-3 flex">
            <span class="badge"><span>📍</span>${c.location}</span>
            <span class="badge"><span>🛡️</span>Insurance options</span>
            <span class="badge"><span>✅</span>Verified host</span>
          </div>
          <h3 class="mt-6">Specifications</h3>
          <table class="table">
            <tr><th>Make</th><td>${c.make}</td></tr>
            <tr><th>Model</th><td>${c.model}</td></tr>
            <tr><th>Year</th><td>${c.year}</td></tr>
            <tr><th>Horsepower</th><td>${c.horsepower} hp</td></tr>
            <tr><th>Transmission</th><td>${c.transmission}</td></tr>
            <tr><th>Seats</th><td>${c.seats}</td></tr>
          </table>
        </article>
        <aside class="box booking-widget" aria-label="Booking widget">
          <div class="row" style="align-items:baseline; margin-bottom:10px">
            <div class="price">${currency(c.pricePerDay)} <span class="meta">/ day</span></div>
          </div>
          <div class="row">
            <div>
              <label class="label" for="start">Start date</label>
              <input id="start" type="date" class="input" />
            </div>
            <div>
              <label class="label" for="end">End date</label>
              <input id="end" type="date" class="input" />
            </div>
          </div>
          <button class="btn primary mt-4" id="book-btn">Request booking</button>
          <p class="meta mt-3">No payment taken in this prototype.</p>
        </aside>
      </div>
    </section>`
  qs('#book-btn').addEventListener('click', () => {
    const start = qs('#start').value; const end = qs('#end').value
    const url = new URL('booking.html', location.href)
    url.searchParams.set('id', c.id)
    if(start) url.searchParams.set('start', start)
    if(end) url.searchParams.set('end', end)
    location.href = url.toString()
  })
}
window.renderBookingPage = () => {
  const { id, start, end } = params(); const c = CARS.find(x=>x.id===id) || CARS[0]
  const startDate = start || new Date().toISOString().slice(0,10)
  const endDate = end || new Date(Date.now()+86400000).toISOString().slice(0,10)
  const days = Math.max(1, Math.ceil((new Date(endDate)-new Date(startDate))/86400000))
  const total = c.pricePerDay * days
  const root = qs('#booking-root')
  root.innerHTML = `
    <h1>Confirm booking</h1>
    <div class="split mt-4">
      <article class="box">
        <div class="flex">
          <div style="width:180px; aspect-ratio:16/9; border-radius:10px; background:url('${c.images[0]}&w=800&q=60') center/cover"></div>
          <div>
            <h3 style="margin:0 0 4px 0">${c.make} ${c.model}</h3>
            <p class="meta">${c.year} • ${c.horsepower} hp • ${c.seats} seats</p>
            <p class="meta">Location: ${c.location}</p>
          </div>
        </div>
        <h3 class="mt-4">Trip details</h3>
        <table class="table">
          <tr><th>Start</th><td>${startDate}</td></tr>
          <tr><th>End</th><td>${endDate}</td></tr>
          <tr><th>Days</th><td>${days}</td></tr>
        </table>
      </article>
      <aside class="box">
        <h3 style="margin-top:0">Price breakdown</h3>
        <table class="table">
          <tr><th>Daily rate</th><td>${currency(c.pricePerDay)}</td></tr>
          <tr><th>Subtotal (${days} days)</th><td>${currency(c.pricePerDay*days)}</td></tr>
          <tr><th>Service fee</th><td>£0</td></tr>
          <tr><th>Total</th><td><strong>${currency(total)}</strong></td></tr>
        </table>
        <button class="btn primary mt-4" id="confirm-btn">Confirm request</button>
        <p class="meta mt-3">By continuing you agree to our Terms & Conditions.</p>
      </aside>
    </div>`
  qs('#confirm-btn').addEventListener('click', () => {
    alert('Request sent! (Prototype)')
    location.href = 'browse.html'
  })
}
