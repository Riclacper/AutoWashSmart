export const serviceOptions = [
  { name: 'Express', price: 39.9, duration: '12 min', detail: 'Lavagem externa com secagem rapida' },
  { name: 'Premium', price: 69.9, duration: '20 min', detail: 'Espuma ativa, cera liquida e acabamento' },
  { name: 'SUV Care', price: 89.9, duration: '25 min', detail: 'Lavagem completa para veiculos maiores' },
];

export const washSteps = ['Entrada', 'Pre-lavagem', 'Espuma', 'Enxague', 'Secagem', 'Finalizacao'];

export const products = [
  { name: 'Shampoo', price: 18.9 },
  { name: 'Cera', price: 24.9 },
  { name: 'Microfibra', price: 14.9 },
  { name: 'Aromatizador', price: 12.9 },
  { name: 'Silicone', price: 19.9 },
  { name: 'Limpa vidro', price: 16.9 },
];

export function demoCustomer() {
  return {
    id: 'demo',
    name: 'Cliente Demo',
    cpf: '000.000.000-00',
    email: 'demo@autowash.local',
    phone: '(81) 99999-0000',
    plan: 'Smart Plus',
    authorized: [{ name: 'Familiar autorizado', relation: 'Familia' }],
    vehicles: [{ plate: 'AWS2026', brand: 'Toyota', model: 'Corolla', color: 'Prata', category: 'Sedan' }],
  };
}
