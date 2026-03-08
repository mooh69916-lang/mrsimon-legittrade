// Admin-editable data file
const ADMIN_WHATSAPP = '2344098877'; // remove + and use international format

// Expanded list of plans (display uses Kina: `K`)
const PLANS = [
  { code: 'INV10A', name: 'Starter', amount: 100, ret: 1000 },
  { code: 'INV20B', name: 'Basic', amount: 200, ret: 2000 },
  { code: 'INV50C', name: 'Growth', amount: 300, ret: 3000 },
  { code: 'INV100D', name: 'Premium', amount: 400, ret: 4000 },
  { code: 'INV200E', name: 'Silver', amount: 500, ret: 5000 },
  { code: 'INV500F', name: 'Gold', amount: 600, ret: 7000 },
  { code: 'INV1000G', name: 'Platinum', amount: 700, ret: 8000 },
  { code: 'INV2000H', name: 'Diamond', amount: 10000, ret: 40000 },
  { code: 'INV5000I', name: 'Executive', amount: 5000, ret: 15000 },
  { code: 'INV10000J', name: 'VIP', amount: 10000, ret: 100000 }
];

// Lookup table used by dashboard
const CODES = {
  INV10A: { amount: 100, profit: 900, total: 1000 },
  INV20B: { amount: 200, profit: 1800, total: 2000 },
  INV50C: { amount: 300, profit: 2700, total: 3000 },
  INV100D: { amount: 400, profit: 3600, total: 4000 },
  INV200E: { amount: 500, profit: 4500, total: 5000 },
  INV500F: { amount: 600, profit: 6400, total: 7000 },
  INV1000G: { amount: 700, profit: 7300, total: 8000 },
  INV2000H: { amount: 10000, profit: 30000, total: 40000 },
  INV5000I: { amount: 5000, profit: 10000, total: 15000 },
  INV10000J: { amount: 10000, profit: 90000, total: 100000 }
};

// small list of names/cities for fake notifications
const FAKE_NAMES = ['Emmanuel','John','Aisha','Grace','Tunde','Sade','Michael','Rita','Samuel','Lily'];
const FAKE_CITIES = ['Port Moresby','Lae','Madang','Goroka','Kokopo','Vanimo'];

// Helper to format Kina amounts as `K 1,000`
function formatK(n){
  const s = Number(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `K ${s}`;
}
