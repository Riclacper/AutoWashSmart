import { useState } from 'react';
import { CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { CustomerList } from '../components/CustomerList.jsx';
import { Field } from '../components/Field.jsx';
import {
  isValidDocument,
  isValidEmail,
  isValidPhone,
  isValidPlate,
  normalizePlate,
} from '../utils/validators.js';

function createEmptyVehicle() {
  return { plate: '', brand: '', model: '', color: '', category: 'Hatch' };
}

function createEmptyForm() {
  return {
    name: '',
    cpf: '',
    email: '',
    phone: '',
    authorized: [{ name: '', relation: '' }],
    vehicles: [createEmptyVehicle()],
  };
}

export function ClientView({ state, addCustomer }) {
  const [form, setForm] = useState(createEmptyForm);
  const [feedback, setFeedback] = useState(null);

  function updateVehicle(index, field, value) {
    setForm((current) => ({
      ...current,
      vehicles: current.vehicles.map((vehicle, vehicleIndex) =>
        vehicleIndex === index ? { ...vehicle, [field]: value } : vehicle,
      ),
    }));
  }

  function updateAuthorized(index, field, value) {
    setForm((current) => ({
      ...current,
      authorized: current.authorized.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function validateForm() {
    if (!form.name.trim()) return 'Informe o nome do cliente.';
    if (!isValidDocument(form.cpf)) return 'Informe um CPF ou CNPJ válido.';
    if (!isValidEmail(form.email)) return 'Informe um e-mail válido.';
    if (!isValidPhone(form.phone)) return 'Informe um telefone com DDD válido.';

    const plates = new Set();
    for (const vehicle of form.vehicles) {
      if (!vehicle.brand.trim() || !vehicle.model.trim() || !vehicle.color.trim()) {
        return 'Preencha marca, modelo e cor de todos os veículos.';
      }
      if (!isValidPlate(vehicle.plate)) return `A placa ${vehicle.plate || 'vazia'} é inválida.`;

      const normalizedPlate = normalizePlate(vehicle.plate);
      if (plates.has(normalizedPlate)) return 'Não repita a mesma placa no cadastro.';
      plates.add(normalizedPlate);
    }

    return null;
  }

  function submit(event) {
    event.preventDefault();
    const validationMessage = validateForm();
    if (validationMessage) {
      setFeedback({ type: 'error', message: validationMessage });
      return;
    }

    const result = addCustomer({
      ...form,
      authorized: form.authorized
        .filter((item) => item.name.trim())
        .map((item) => ({ name: item.name.trim(), relation: item.relation.trim() })),
      plan: 'Smart Plus',
    });

    setFeedback({ type: result.ok ? 'success' : 'error', message: result.message });
    if (result.ok) setForm(createEmptyForm());
  }

  return (
    <section className="screen split-screen">
      <div>
        <div className="screen-heading">
          <span className="eyebrow">Área do cliente</span>
          <h2>Cadastro inteligente</h2>
        </div>

        {feedback && (
          <div
            className={feedback.type === 'success' ? 'approval-panel approved' : 'approval-panel'}
          >
            <strong>
              {feedback.type === 'success' ? 'Cadastro concluído' : 'Revise os dados'}
            </strong>
            <p>{feedback.message}</p>
          </div>
        )}

        <form className="form-panel" onSubmit={submit}>
          <div className="form-grid">
            <Field
              label="Nome"
              value={form.name}
              onChange={(value) => setForm({ ...form, name: value })}
              required
            />
            <Field
              label="CPF/CNPJ"
              value={form.cpf}
              onChange={(value) => setForm({ ...form, cpf: value })}
              required
            />
            <Field
              label="E-mail"
              type="email"
              value={form.email}
              onChange={(value) => setForm({ ...form, email: value })}
              required
            />
            <Field
              label="Telefone"
              value={form.phone}
              onChange={(value) => setForm({ ...form, phone: value })}
              required
            />
          </div>

          <h3>Pessoas autorizadas</h3>
          {form.authorized.map((item, index) => (
            <div className="form-grid compact" key={index}>
              <Field
                label="Nome"
                value={item.name}
                onChange={(value) => updateAuthorized(index, 'name', value)}
              />
              <Field
                label="Parentesco"
                value={item.relation}
                onChange={(value) => updateAuthorized(index, 'relation', value)}
              />
            </div>
          ))}
          {form.authorized.length < 3 && (
            <button
              type="button"
              className="text-action"
              onClick={() =>
                setForm({
                  ...form,
                  authorized: [...form.authorized, { name: '', relation: '' }],
                })
              }
            >
              <Plus size={17} /> Adicionar autorizado
            </button>
          )}

          <h3>Veículos</h3>
          {form.vehicles.map((vehicle, index) => (
            <div className="form-panel" key={`vehicle-${index}`} style={{ marginBottom: 16 }}>
              <div className="form-grid">
                <Field
                  label="Placa"
                  value={vehicle.plate}
                  onChange={(value) => updateVehicle(index, 'plate', value)}
                  required
                />
                <Field
                  label="Marca"
                  value={vehicle.brand}
                  onChange={(value) => updateVehicle(index, 'brand', value)}
                  required
                />
                <Field
                  label="Modelo"
                  value={vehicle.model}
                  onChange={(value) => updateVehicle(index, 'model', value)}
                  required
                />
                <Field
                  label="Cor"
                  value={vehicle.color}
                  onChange={(value) => updateVehicle(index, 'color', value)}
                  required
                />
                <label className="field">
                  <span>Categoria</span>
                  <select
                    value={vehicle.category}
                    onChange={(event) => updateVehicle(index, 'category', event.target.value)}
                  >
                    <option>Hatch</option>
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Pick-up</option>
                  </select>
                </label>
              </div>
              {form.vehicles.length > 1 && (
                <button
                  type="button"
                  className="text-action compact-action"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      vehicles: current.vehicles.filter(
                        (_, vehicleIndex) => vehicleIndex !== index,
                      ),
                    }))
                  }
                >
                  <Trash2 size={16} /> Remover veículo
                </button>
              )}
            </div>
          ))}

          {form.vehicles.length < 5 && (
            <button
              type="button"
              className="text-action"
              onClick={() =>
                setForm((current) => ({
                  ...current,
                  vehicles: [...current.vehicles, createEmptyVehicle()],
                }))
              }
            >
              <Plus size={17} /> Adicionar veículo
            </button>
          )}

          <button className="primary-action" type="submit">
            Salvar cadastro <CheckCircle2 size={18} />
          </button>
        </form>
      </div>
      <CustomerList customers={state.customers} />
    </section>
  );
}
