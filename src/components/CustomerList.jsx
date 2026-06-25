import { Car } from 'lucide-react';
import { demoCustomer } from '../data/catalog.js';

export function CustomerList({ customers }) {
  const list = customers.length ? customers : [demoCustomer()];

  return (
    <aside className="side-panel">
      <h3>Histórico</h3>
      {list.map((customer) => (
        <article className="customer-card" key={customer.id}>
          <div>
            <strong>{customer.name}</strong>
            <small>{customer.email}</small>
          </div>
          <span className="pill">{customer.plan}</span>
          {customer.vehicles.map((vehicle) => (
            <div className="vehicle-row" key={vehicle.plate}>
              <Car size={18} />
              <span>{vehicle.plate}</span>
              <small>{vehicle.model}</small>
            </div>
          ))}
        </article>
      ))}
    </aside>
  );
}
