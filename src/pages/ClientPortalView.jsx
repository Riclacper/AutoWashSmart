import { BadgeCheck, Car, CreditCard, QrCode, ShoppingBag, UserRound, Waves } from 'lucide-react';

const qrCells = new Set([
  0, 1, 2, 4, 5, 6,
  7, 9, 11, 13,
  14, 15, 16, 18, 20,
  22, 24, 25, 27,
  28, 30, 32, 33, 34,
  35, 37, 39, 41,
  42, 43, 44, 46, 48,
]);

export function ClientPortalView({ state }) {
  const customer = state.customers[0];
  const vehicle = customer?.vehicles[0];
  const washes = state.washes.slice(0, 4);
  const sales = state.sales.slice(0, 3);

  return (
    <section className="screen client-portal">
      <div className="screen-heading">
        <span className="eyebrow">Area do cliente</span>
        <h2>Minha AutoWash</h2>
        <p>Acompanhe plano, veiculos, lavagens e compras vinculadas ao seu cadastro.</p>
      </div>

      <div className="client-hero-card">
        <div>
          <span className="client-avatar"><UserRound size={28} /></span>
          <h3>{customer?.name || 'Cliente demo'}</h3>
          <p>{customer?.email || 'cliente@autowash.local'}</p>
        </div>
        <div className="client-plan">
          <BadgeCheck size={24} />
          <strong>{customer?.plan || 'Smart Plus'}</strong>
          <span>Plano ativo</span>
        </div>
      </div>

      <div className="client-grid">
        <article className="client-card">
          <Car size={24} />
          <h3>Veiculo principal</h3>
          <strong>{vehicle?.plate || 'AWS2026'}</strong>
          <p>{vehicle ? `${vehicle.brand} ${vehicle.model} - ${vehicle.color}` : 'Toyota Corolla - Prata'}</p>
        </article>
        <article className="client-card qr-card">
          <QrCode size={36} />
          <h3>QR Code de acesso</h3>
          <div className="fake-qr" aria-label="QR Code demonstrativo">
            {Array.from({ length: 49 }, (_, index) => (
              <span className={qrCells.has(index) ? 'filled' : ''} key={index} />
            ))}
          </div>
          <strong className="qr-token">AWS2026</strong>
          <p>Use no totem para liberar a entrada.</p>
        </article>
        <article className="client-card">
          <Waves size={24} />
          <h3>Ultimas lavagens</h3>
          {washes.map((wash) => (
            <p key={wash.id}><strong>{wash.service}</strong><span>R$ {wash.price.toFixed(2)}</span></p>
          ))}
        </article>
        <article className="client-card">
          <ShoppingBag size={24} />
          <h3>Compras recentes</h3>
          {sales.map((sale) => (
            <p key={sale.id}><strong>{sale.name}</strong><span>R$ {sale.price.toFixed(2)}</span></p>
          ))}
        </article>
        <article className="client-card">
          <CreditCard size={24} />
          <h3>Pagamentos</h3>
          <strong>Em dia</strong>
          <p>Recibos e cobrancas simuladas disponiveis para demonstracao.</p>
        </article>
      </div>
    </section>
  );
}
