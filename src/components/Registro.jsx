import React, { useState } from 'react';
import { User, Mail, Building2, Globe, CreditCard, ChevronDown, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

const categorias = ['Estudiante', 'Profesional', 'Internacional'];
const modalidades = ['Transferencia bancaria', 'Tarjeta de crédito/débito', 'PayPal', 'Depósito en efectivo'];
const paises = [
  'México', 'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica',
  'Cuba', 'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'Nicaragua',
  'Panamá', 'Paraguay', 'Perú', 'República Dominicana', 'Uruguay', 'Venezuela',
  'España', 'Estados Unidos', 'Otro',
];

// Input reutilizable — tema claro
const Field = ({ label, icon: Icon, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#374151' }}>
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <Icon size={16} style={{ color: error ? '#ef4444' : '#6B7280' }} />
      </div>
      {children}
    </div>
    {error && (
      <div className="flex items-center gap-1.5">
        <AlertCircle size={12} style={{ color: '#ef4444' }} />
        <span className="text-xs" style={{ color: '#ef4444' }}>{error}</span>
      </div>
    )}
  </div>
);

const getInputStyle = (hasError) => ({
  background: '#F8F9FA',
  border: `1px solid ${hasError ? '#ef4444' : '#E5E7EB'}`,
  color: '#0A2A43',
  outline: 'none',
  width: '100%',
  paddingLeft: '2.75rem',
  paddingRight: '1rem',
  paddingTop: '0.875rem',
  paddingBottom: '0.875rem',
  borderRadius: '0.75rem',
  fontSize: '0.875rem',
  fontWeight: '500',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
});

// Componente Registro
const Registro = () => {
  const initialForm = {
    nombre: '',
    apellido: '',
    email: '',
    institucion: '',
    pais: '',
    categoria: '',
    modalidadPago: '',
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!form.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
    if (!form.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Ingresa un correo válido';
    }
    if (!form.institucion.trim()) newErrors.institucion = 'La institución es requerida';
    if (!form.pais) newErrors.pais = 'Selecciona un país';
    if (!form.categoria) newErrors.categoria = 'Selecciona una categoría';
    if (!form.modalidadPago) newErrors.modalidadPago = 'Selecciona la modalidad de pago';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    // Simulación de envío con setTimeout 1.5s
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSuccess(false);
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = '#007AFF';
    e.target.style.boxShadow = '0 0 0 3px rgba(0,122,255,0.1)';
    e.target.style.background = '#FFFFFF';
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = '#E5E7EB';
    e.target.style.boxShadow = 'none';
    e.target.style.background = '#F8F9FA';
  };

  // Pantalla de éxito
  if (success) {
    return (
      <section
        id="registro"
        className="py-20 sm:py-28 relative overflow-hidden flex items-center"
        style={{ background: '#FFFFFF' }}
      >
        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
          <div
            className="mx-auto mb-6 w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(34,197,94,0.1)', border: '2px solid #22c55e' }}
          >
            <CheckCircle size={48} style={{ color: '#22c55e' }} />
          </div>
          <h2 className="text-3xl font-black mb-4" style={{ color: '#0A2A43' }}>¡Registro exitoso!</h2>
          <p className="mb-4 leading-relaxed" style={{ color: '#6B7280' }}>
            <strong style={{ color: '#0A2A43' }}>{form.nombre} {form.apellido}</strong>, tu solicitud de registro al{' '}
            <span style={{ color: '#FF6200' }}>IV Congreso Valladolid 2026</span> ha sido recibida.
          </p>
          <p className="text-sm mb-10" style={{ color: '#9CA3AF' }}>
            Te enviaremos los detalles de pago y confirmación a{' '}
            <strong style={{ color: '#374151' }}>{form.email}</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleReset}
              className="px-8 py-3.5 rounded-xl font-bold transition-all"
              style={{
                border: '1.5px solid #007AFF',
                color: '#007AFF',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#007AFF';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#007AFF';
              }}
            >
              Registrar otro participante
            </button>
            <a
              href="#cronograma"
              className="px-8 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-105"
              style={{ background: '#FF6200', boxShadow: '0 4px 14px rgba(255,98,0,0.3)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0002E9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FF6200';
              }}
            >
              Ver cronograma
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="registro"
      className="py-20 sm:py-28 relative overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      {/* Decoraciones sutiles */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.03] blur-3xl pointer-events-none"
        style={{ background: '#007AFF' }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-[0.03] blur-3xl pointer-events-none"
        style={{ background: '#FF6200' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(255,98,0,0.08)', color: '#FF6200', border: '1px solid rgba(255,98,0,0.25)' }}
          >
            Únete al congreso
          </span>
          <h2 className="text-3xl sm:text-4xl font-black section-underline" style={{ color: '#0A2A43' }}>
            Formulario de Registro
          </h2>
          <p className="mt-6" style={{ color: '#6B7280' }}>
            Completa el formulario para asegurar tu lugar en el IV Congreso Valladolid 2026.
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl p-6 sm:p-10 space-y-6"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          {/* Nombre + Apellido */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Nombre *" icon={User} error={errors.nombre}>
              <input
                type="text"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  ...getInputStyle(!!errors.nombre),
                  borderColor: errors.nombre ? '#ef4444' : '#E5E7EB',
                }}
              />
            </Field>
            <Field label="Apellido *" icon={User} error={errors.apellido}>
              <input
                type="text"
                placeholder="Tu apellido"
                value={form.apellido}
                onChange={(e) => handleChange('apellido', e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  ...getInputStyle(!!errors.apellido),
                  borderColor: errors.apellido ? '#ef4444' : '#E5E7EB',
                }}
              />
            </Field>
          </div>

          {/* Correo */}
          <Field label="Correo electrónico *" icon={Mail} error={errors.email}>
            <input
              type="email"
              placeholder="nombre@institución.edu.mx"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{
                ...getInputStyle(!!errors.email),
                borderColor: errors.email ? '#ef4444' : '#E5E7EB',
              }}
            />
          </Field>

          {/* Institución */}
          <Field label="Institución *" icon={Building2} error={errors.institucion}>
            <input
              type="text"
              placeholder="Universidad / Tecnológico / Empresa"
              value={form.institucion}
              onChange={(e) => handleChange('institucion', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{
                ...getInputStyle(!!errors.institucion),
                borderColor: errors.institucion ? '#ef4444' : '#E5E7EB',
              }}
            />
          </Field>

          {/* País + Categoría */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="País *" icon={Globe} error={errors.pais}>
              <div className="relative">
                <select
                  value={form.pais}
                  onChange={(e) => handleChange('pais', e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="appearance-none cursor-pointer"
                  style={{
                    ...getInputStyle(!!errors.pais),
                    borderColor: errors.pais ? '#ef4444' : '#E5E7EB',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="" disabled style={{ background: '#FFFFFF', color: '#9CA3AF' }}>Selecciona tu país</option>
                  {paises.map((p) => (
                    <option key={p} value={p} style={{ background: '#FFFFFF', color: '#0A2A43' }}>{p}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#6B7280' }} />
              </div>
            </Field>

            <Field label="Categoría *" icon={User} error={errors.categoria}>
              <div className="relative">
                <select
                  value={form.categoria}
                  onChange={(e) => handleChange('categoria', e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="appearance-none cursor-pointer"
                  style={{
                    ...getInputStyle(!!errors.categoria),
                    borderColor: errors.categoria ? '#ef4444' : '#E5E7EB',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="" disabled style={{ background: '#FFFFFF', color: '#9CA3AF' }}>Selecciona categoría</option>
                  {categorias.map((c) => (
                    <option key={c} value={c} style={{ background: '#FFFFFF', color: '#0A2A43' }}>{c}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#6B7280' }} />
              </div>
            </Field>
          </div>

          {/* Modalidad de pago */}
          <Field label="Modalidad de pago *" icon={CreditCard} error={errors.modalidadPago}>
            <div className="grid grid-cols-2 gap-3 mt-1">
              {modalidades.map((m) => (
                <label
                  key={m}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200"
                  style={{
                    background: form.modalidadPago === m ? 'rgba(244,168,0,0.08)' : '#F8F9FA',
                    border: `1px solid ${form.modalidadPago === m ? '#F4A800' : '#E5E7EB'}`,
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      border: `2px solid ${form.modalidadPago === m ? '#F4A800' : '#D1D5DB'}`,
                    }}
                  >
                    {form.modalidadPago === m && (
                      <div className="w-2 h-2 rounded-full" style={{ background: '#F4A800' }} />
                    )}
                  </div>
                  <input
                    type="radio"
                    name="modalidadPago"
                    value={m}
                    checked={form.modalidadPago === m}
                    onChange={(e) => handleChange('modalidadPago', e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-xs font-medium" style={{ color: '#374151' }}>{m}</span>
                </label>
              ))}
            </div>
            {errors.modalidadPago && (
              <div className="flex items-center gap-1.5 mt-1">
                <AlertCircle size={12} style={{ color: '#ef4444' }} />
                <span className="text-xs" style={{ color: '#ef4444' }}>{errors.modalidadPago}</span>
              </div>
            )}
          </Field>

          {/* Aviso */}
          <p className="text-xs text-center" style={{ color: '#9CA3AF' }}>
            Al enviar, aceptas los términos y condiciones del IV Congreso Valladolid 2026.
          </p>

          {/* Botón enviar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-black text-white text-base transition-all duration-300 flex items-center justify-center gap-3"
            style={{
              background: loading ? 'rgba(255,98,0,0.5)' : '#FF6200',
              boxShadow: loading ? 'none' : '0 6px 20px rgba(255,98,0,0.35)',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = '#0002E9';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,2,233,0.35)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = '#FF6200';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,98,0,0.35)';
                e.currentTarget.style.transform = 'none';
              }
            }}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Enviando registro...</span>
              </>
            ) : (
              'Enviar registro'
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Registro;
