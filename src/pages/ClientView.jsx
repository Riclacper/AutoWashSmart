import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { CustomerList } from '../components/CustomerList.jsx';
import { Field } from '../components/Field.jsx';

const emptyForm = {
  name: '',
  cpf: '',
  email: '',
  phone: '',
  authorized: [{ name: '', relation: '' }],
  vehicles: [{ plate: '', brand: '', model: '', color: '', category: 'Hatch' }],
};

export function ClientView({ state, addCustomer }) {
  const [form, setForm] = useState(emptyForm);

  function updateVehicle(field, value) {
    setForm((current) => ({
      ...current,
      vehicles: [{ ...current.vehicles[0], [field]: value }],
    }));
  }

  function updateAuthorized(index, field, value) {
    setForm((current) => ({
      ...current,
      authorized: current.authorized.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      ),
    }));
  }

  function submit(event) {
    event.preventDefault();
    addCustomer({
      ...form,
      authorized: form.authorized.filter((item) => item.name.trim()),
      vehicles: form.vehicles.map((item) => ({ ...item, plate: item.plate.toUpperCase() })),
      plan: 'Smart Plus',
    });
    setForm(emptyForm);
  }

  return (
    <section className="screen split-screen">
      <div>
        <div className="screen-heading">
          <span className="eyebrow">Área do cliente</span>
          <h2>Cadastro inteligente</h2>
        </div>
        <form className="form-panel" onSubmit={submit}>
          <div className="form-grid">
            <Field label="Nome" value={form.name} onChange={(value) => setForm({ ...form, name: value })} required />
            <Field label="CPF" value={form.cpf} onChange={(value) => setForm({ ...form, cpf: value })} required />
            <Field label="E-mail" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required />
            <Field label="Telefone" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} required />
          </div>
          <h3>Pessoas autorizadas</h3>
          {form.authorized.map((item, index) => (
            <div className="form-grid compact" key={index}>
              <Field label="Nome" value={item.name} onChange={(value) => updateAuthorized(index, 'name', value)} />
              <Field label="Parentesco" value={item.relation} onChange={(value) => updateAuthorized(index, 'relation', value)} />
            </div>
          ))}
          {form.authorized.length < 3 && (
            <button
              type="button"
              className="text-action"
              onClick={() => setForm({ ...form, authorized: [...form.authorized, { name: '', relation: '' }] })}
            >
              Adicionar autorizado
            </button>
          )}
          <h3>Veículo</h3>
          <div className="form-grid">
            <Field label="Placa" value={form.vehicles[0].plate} onChange={(value) => updateVehicle('plate', value)} required />
            <Field label="Marca" value={form.vehicles[0].brand} onChange={(value) => updateVehicle('brand', value)} required />
            <Field label="Modelo" value={form.vehicles[0].model} onChange={(value) => updateVehicle('model', value)} required />
            <Field label="Cor" value={form.vehicles[0].color} onChange={(value) => updateVehicle('color', value)} required />
            <label className="field">
              <span>Categoria</span>
              <select value={form.vehicles[0].category} onChange={(event) => updateVehicle('category', event.target.value)}>
                <option>Hatch</option>
                <option>Sedan</option>
                <option>SUV</option>
                <option>Pick-up</option>
              </select>
            </label>
          </div>
          <button className="primary-action" type="submit">
            Salvar cadastro <CheckCircle2 size={18} />
          </button>
        </form>
      </div>
      <CustomerList customers={state.customers} />
    </section>
  );
}
