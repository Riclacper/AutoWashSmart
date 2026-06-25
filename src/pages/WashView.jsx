import { Car, CreditCard } from 'lucide-react';
import { serviceOptions, washSteps } from '../data/catalog.js';

export function WashView({ selectedService, setSelectedService, washProgress, isWashing, startWash, checkout }) {
  const activeStep = Math.min(Math.floor(washProgress / 20), washSteps.length - 1);

  return (
    <section className="screen">
      <div className="screen-heading">
        <span className="eyebrow">Lavagem automatizada</span>
        <h2>Fluxo visual em tempo real</h2>
      </div>
      <div className="service-strip">
        {serviceOptions.map((service) => (
          <button
            key={service.name}
            className={selectedService.name === service.name ? 'service-option selected' : 'service-option'}
            onClick={() => setSelectedService(service)}
            disabled={isWashing}
          >
            <strong>{service.name}</strong>
            <span>R$ {service.price.toFixed(2)}</span>
            <small>{service.duration}</small>
          </button>
        ))}
      </div>
      <div className="wash-stage">
        <div className="wash-animation">
          <Car size={76} />
          <div className="spray spray-one" />
          <div className="spray spray-two" />
        </div>
        <div className="progress-track">
          <span style={{ width: `${washProgress}%` }} />
        </div>
        <div className="step-grid">
          {washSteps.map((step, index) => (
            <div className={index <= activeStep ? 'step active' : 'step'} key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
        <button className="primary-action" onClick={startWash} disabled={isWashing}>
          {isWashing ? 'Lavagem em andamento' : 'Iniciar lavagem'}
        </button>
      </div>
      {checkout && <CheckoutPanel checkout={checkout} />}
    </section>
  );
}

function CheckoutPanel({ checkout }) {
  return (
    <article className="checkout-panel">
      <CreditCard size={26} />
      <div>
        <h3>Pagamento aprovado</h3>
        <p>{checkout.service} - R$ {checkout.price.toFixed(2)}</p>
      </div>
      <div className="checkout-times">
        <span>Entrada: {checkout.entry}</span>
        <span>Saída: {checkout.exit}</span>
      </div>
    </article>
  );
}
