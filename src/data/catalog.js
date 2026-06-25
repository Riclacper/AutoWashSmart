import aromatizadorImage from '../assets/products/aromatizador.png';
import ceraImage from '../assets/products/cera.png';
import limpaVidroImage from '../assets/products/limpa-vidro.png';
import microfibraImage from '../assets/products/microfibra.png';
import shampooImage from '../assets/products/shampoo.png';
import siliconeImage from '../assets/products/silicone.png';

export const serviceOptions = [
  { name: 'Express', price: 39.9, duration: '12 min', detail: 'Lavagem externa com secagem rápida' },
  { name: 'Premium', price: 69.9, duration: '20 min', detail: 'Espuma ativa, cera líquida e acabamento' },
  { name: 'SUV Care', price: 89.9, duration: '25 min', detail: 'Lavagem completa para veículos maiores' },
];

export const selfServiceOptions = [
  { minutes: 10, price: 15 },
  { minutes: 20, price: 25 },
  { minutes: 30, price: 35 },
];

export const washSteps = ['Entrada', 'Pré-lavagem', 'Espuma', 'Enxágue', 'Secagem', 'Finalização'];

export const products = [
  { name: 'Shampoo', price: 18.9, image: shampooImage, imageAlt: 'Frasco de shampoo automotivo' },
  { name: 'Cera', price: 24.9, image: ceraImage, imageAlt: 'Pote de cera automotiva' },
  { name: 'Microfibra', price: 14.9, image: microfibraImage, imageAlt: 'Toalha de microfibra automotivo' },
  { name: 'Aromatizador', price: 12.9, image: aromatizadorImage, imageAlt: 'Aromatizador automotivo' },
  { name: 'Silicone', price: 19.9, image: siliconeImage, imageAlt: 'Frasco de silicone automotivo' },
  { name: 'Limpa vidro', price: 16.9, image: limpaVidroImage, imageAlt: 'Frasco de limpa vidro automotivo' },
];

export function demoCustomer() {
  return {
    id: 'demo',
    name: 'Marina Costa',
    cpf: '529.982.247-25',
    email: 'marina@autowash.local',
    phone: '(81) 99999-0000',
    plan: 'Smart Plus',
    qrToken: 'QR-AWS2026',
    faceLabel: 'Marina Costa',
    authorized: [{ name: 'Rafael Costa', relation: 'Família' }],
    vehicles: [
      {
        id: 'vehicle-demo',
        plate: 'AWS2026',
        brand: 'Toyota',
        model: 'Corolla',
        color: 'Prata',
        category: 'Sedan',
      },
    ],
  };
}

export const demoState = {
  customers: [
    demoCustomer(),
    {
      id: 'demo-fleet',
      name: 'Recife Prime Rent',
      cpf: '12.345.678/0001-90',
      email: 'operacao@recifeprime.local',
      phone: '(81) 3333-2026',
      plan: 'Frota',
      qrToken: 'QR-RPR4E22',
      faceLabel: 'Lucas Menezes',
      authorized: [
        { name: 'Lucas Menezes', relation: 'Gestor' },
        { name: 'Ana Barros', relation: 'Operação' },
      ],
      vehicles: [
        {
          id: 'vehicle-rpr-1',
          plate: 'RPR4E22',
          brand: 'Jeep',
          model: 'Compass',
          color: 'Preto',
          category: 'SUV',
        },
        {
          id: 'vehicle-rpr-2',
          plate: 'RPR8A10',
          brand: 'Fiat',
          model: 'Toro',
          color: 'Branco',
          category: 'Pick-up',
        },
      ],
    },
    {
      id: 'demo-premium',
      name: 'Bruno Almeida',
      cpf: '111.444.777-35',
      email: 'bruno@autowash.local',
      phone: '(81) 98888-1010',
      plan: 'Avulso',
      qrToken: 'QR-BRA1D45',
      faceLabel: 'Bruno Almeida',
      authorized: [],
      vehicles: [
        {
          id: 'vehicle-bruno',
          plate: 'BRA1D45',
          brand: 'Honda',
          model: 'Civic',
          color: 'Cinza',
          category: 'Sedan',
        },
      ],
    },
  ],
  washes: [
    { id: 'wash-001', type: 'wash', customerId: 'demo', customerName: 'Marina Costa', vehiclePlate: 'AWS2026', identificationMethod: 'Placa', service: 'Premium', price: 69.9, paymentStatus: 'Aprovado', status: 'Concluída', entry: '08:12', exit: '08:34', day: 'Seg', createdAt: 1001 },
    { id: 'wash-002', type: 'wash', customerId: 'demo-fleet', customerName: 'Recife Prime Rent', vehiclePlate: 'RPR4E22', identificationMethod: 'QR Code', service: 'Express', price: 39.9, paymentStatus: 'Aprovado', status: 'Concluída', entry: '09:05', exit: '09:18', day: 'Seg', createdAt: 1002 },
    { id: 'wash-003', type: 'wash', customerId: 'demo-fleet', customerName: 'Recife Prime Rent', vehiclePlate: 'RPR8A10', identificationMethod: 'Facial', service: 'SUV Care', price: 89.9, paymentStatus: 'Aprovado', status: 'Concluída', entry: '10:20', exit: '10:47', day: 'Ter', createdAt: 1003 },
    { id: 'wash-004', type: 'wash', customerId: 'demo-premium', customerName: 'Bruno Almeida', vehiclePlate: 'BRA1D45', identificationMethod: 'Placa', service: 'Premium', price: 69.9, paymentStatus: 'Aprovado', status: 'Concluída', entry: '13:14', exit: '13:36', day: 'Qua', createdAt: 1004 },
    { id: 'wash-005', type: 'wash', customerId: 'demo', customerName: 'Marina Costa', vehiclePlate: 'AWS2026', identificationMethod: 'QR Code', service: 'Express', price: 39.9, paymentStatus: 'Aprovado', status: 'Concluída', entry: '15:02', exit: '15:15', day: 'Qui', createdAt: 1005 },
    { id: 'wash-006', type: 'wash', customerId: 'demo-fleet', customerName: 'Recife Prime Rent', vehiclePlate: 'RPR4E22', identificationMethod: 'Facial', service: 'SUV Care', price: 89.9, paymentStatus: 'Aprovado', status: 'Concluída', entry: '16:40', exit: '17:06', day: 'Sex', createdAt: 1006 },
  ],
  selfServiceSessions: [
    {
      id: 'self-001',
      type: 'self-service',
      customerId: 'demo',
      customerName: 'Marina Costa',
      vehiclePlate: 'AWS2026',
      identificationMethod: 'QR Code',
      minutes: 20,
      price: 25,
      status: 'Concluído',
      startedAt: '2026-06-25T11:00:00.000Z',
      completedAt: '2026-06-25T11:20:00.000Z',
      day: 'Qui',
      createdAt: 1006.5,
    },
  ],
  sales: [
    { id: 'sale-001', type: 'sale', customerId: 'demo', name: 'Microfibra', price: 14.9, time: '08:36', day: 'Seg', createdAt: 1007 },
    { id: 'sale-002', type: 'sale', customerId: 'demo-fleet', name: 'Cera', price: 24.9, time: '10:51', day: 'Ter', createdAt: 1008 },
    { id: 'sale-003', type: 'sale', customerId: 'demo-premium', name: 'Aromatizador', price: 12.9, time: '13:39', day: 'Qua', createdAt: 1009 },
    { id: 'sale-004', type: 'sale', customerId: 'demo-fleet', name: 'Limpa vidro', price: 16.9, time: '17:10', day: 'Sex', createdAt: 1010 },
  ],
};
