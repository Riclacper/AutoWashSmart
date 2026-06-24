import { Car, Phone, ShieldCheck, UserRound } from 'lucide-react';

export function ClientProfileView({ state }) {
  const customer = state.customers[0];
  const vehicles = customer?.vehicles || [];
  const authorized = customer?.authorized || [];

  return (
    <section className="screen">
      <div className="screen-heading">
        <span className="eyebrow">Meu cadastro</span>
        <h2>Dados do cliente</h2>
        <p>Visualizacao simulada dos dados vinculados ao perfil logado.</p>
      </div>
      <div className="profile-grid">
        <article className="profile-card">
          <UserRound size={24} />
          <h3>{customer?.name || 'Cliente demo'}</h3>
          <p>{customer?.email || 'cliente@autowash.local'}</p>
          <p><Phone size={16} /> {customer?.phone || '(81) 99999-0000'}</p>
        </article>
        <article className="profile-card">
          <ShieldCheck size={24} />
          <h3>Autorizados</h3>
          {authorized.length ? (
            authorized.map((person) => <p key={person.name}>{person.name} - {person.relation}</p>)
          ) : (
            <p>Nenhuma pessoa autorizada.</p>
          )}
        </article>
      </div>
      <div className="profile-card vehicle-profile">
        <Car size={24} />
        <h3>Veiculos cadastrados</h3>
        {vehicles.map((vehicle) => (
          <p key={vehicle.plate}>
            <strong>{vehicle.plate}</strong>
            <span>{vehicle.brand} {vehicle.model} - {vehicle.color} - {vehicle.category}</span>
          </p>
        ))}
      </div>
    </section>
  );
}
