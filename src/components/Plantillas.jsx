import { useEffect, useId, useRef, useState } from 'react';
import {
  BookOpen,
  Download,
  Eye,
  FileText,
  Newspaper,
  PenLine,
  Presentation,
  X,
} from 'lucide-react';

import thumbResumen from '../assets/plantillas/thumbs/resumen.png';
import thumbArticulos from '../assets/plantillas/thumbs/articulos.png';
import thumbEnsayos from '../assets/plantillas/thumbs/ensayos.png';
import thumbCapitulo from '../assets/plantillas/thumbs/capitulo.png';
import thumbCartel from '../assets/plantillas/thumbs/cartel.png';

const plantillasBaseUrl = `${import.meta.env.BASE_URL}plantillas/`;

const plantillas = [
  {
    id: 'resumen',
    titulo: 'Plantilla del resumen',
    fileName: 'PLANTILLA DEL RESUMEN.pdf',
    format: 'PDF',
    descripcion:
      'Formato para elaborar el resumen del trabajo científico con extensión y estructura requeridas.',
    accent: '#007AFF',
    accentBg: 'rgba(0,122,255,0.08)',
    accentBorder: 'rgba(0,122,255,0.25)',
    icon: FileText,
    thumb: thumbResumen,
    embedPdf: true,
  },
  {
    id: 'articulos',
    titulo: 'Plantilla oficial para el envío de artículos científicos',
    fileName: 'Plantilla Oficial para el Envío de Artículos Científicos.pdf',
    format: 'PDF',
    descripcion:
      'Plantilla oficial para preparar y enviar artículos científicos al congreso.',
    accent: '#FF6200',
    accentBg: 'rgba(255,98,0,0.08)',
    accentBorder: 'rgba(255,98,0,0.25)',
    icon: Newspaper,
    thumb: thumbArticulos,
    embedPdf: true,
  },
  {
    id: 'ensayos',
    titulo: 'Plantilla oficial para el envío de ensayos científicos',
    fileName: 'Plantilla Oficial para el Envío de Ensayos Científicos.pdf',
    format: 'PDF',
    descripcion:
      'Plantilla oficial para preparar y enviar ensayos científicos al congreso.',
    accent: '#F4A800',
    accentBg: 'rgba(244,168,0,0.10)',
    accentBorder: 'rgba(244,168,0,0.30)',
    icon: PenLine,
    thumb: thumbEnsayos,
    embedPdf: true,
  },
  {
    id: 'capitulo',
    titulo: 'Lineamientos para elaborar un capítulo de libro',
    fileName: 'Lineamientos para Elaborar un Capítulo de Libro.pdf',
    format: 'PDF',
    descripcion:
      'Lineamientos para la elaboración de un capítulo de libro vinculado al congreso.',
    accent: '#0002E9',
    accentBg: 'rgba(0,2,233,0.06)',
    accentBorder: 'rgba(0,2,233,0.22)',
    icon: BookOpen,
    thumb: thumbCapitulo,
    embedPdf: true,
  },
  {
    id: 'cartel',
    titulo: 'Plantilla oficial para el congreso, modalidad carteles',
    fileName: 'PLANTILLA OFICIAL PARA EL CONGRESO, MODALIDAD CARTELES ACTUALIZADO 2.pdf',
    format: 'PDF',
    descripcion:
      'Plantilla para diseñar el cartel de presentación del congreso.',
    accent: '#2C0055',
    accentBg: 'rgba(44,0,85,0.08)',
    accentBorder: 'rgba(44,0,85,0.22)',
    icon: Presentation,
    thumb: thumbCartel,
    embedPdf: true,
  },
  // {
  //   id: 'cartel-pptx',
  //   titulo: 'Plantilla de cartel para congreso',
  //   fileName: 'PLANTILLA2_CARTEL_PARA_CONGRESO 02.pptx',
  //   format: 'PPTX',
  //   descripcion:
  //     'Plantilla en PowerPoint para diseñar el cartel de presentación del congreso.',
  //   accent: '#2C0055',
  //   accentBg: 'rgba(44,0,85,0.08)',
  //   accentBorder: 'rgba(44,0,85,0.22)',
  //   icon: Presentation,
  //   thumb: thumbCartel,
  //   embedPdf: false,
  // },
];

function fileUrl(fileName) {
  // encodeURIComponent convierte "," en "%2C"; Vite/Apache no resuelven ese path
  // y caen al index.html (por eso la vista previa mostraba el sitio).
  return `${plantillasBaseUrl}${encodeURIComponent(fileName).replace(/%2C/gi, ',')}`;
}

function PreviewModal({ plantilla, onClose }) {
  const titleId = useId();
  const closeRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  if (!plantilla) return null;

  const Icon = plantilla.icon;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        aria-label="Cerrar vista previa"
        onClick={onClose}
      />

      <div
        className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        style={{ maxHeight: 'min(92vh, 920px)' }}
      >
        <div
          className="flex items-start justify-between gap-3 border-b px-4 py-3 sm:px-5"
          style={{ borderColor: '#E5E7EB' }}
        >
          <div className="min-w-0 flex items-start gap-3">
            <div
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: plantilla.accentBg,
                border: `1px solid ${plantilla.accentBorder}`,
              }}
            >
              <Icon size={18} style={{ color: plantilla.accent }} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p
                id={titleId}
                className="truncate text-sm font-bold sm:text-base"
                style={{ color: '#0A2A43' }}
              >
                {plantilla.titulo}
              </p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider" style={{ color: plantilla.accent }}>
                Vista previa · {plantilla.format}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={fileUrl(plantilla.fileName)}
              download={plantilla.fileName}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-white transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: '#FF6200' }}
            >
              <Download size={14} aria-hidden="true" />
              Descargar
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors"
              style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', color: '#0A2A43' }}
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 bg-[#F3F4F6]">
          {plantilla.embedPdf ? (
            <iframe
              title={`Vista previa de ${plantilla.titulo}`}
              src={`${fileUrl(plantilla.fileName)}#toolbar=1&navpanes=0`}
              className="h-[70vh] w-full border-0 sm:h-[75vh]"
            />
          ) : (
            <div className="flex h-[70vh] flex-col items-center justify-center gap-4 p-4 sm:h-[75vh]">
              <img
                src={plantilla.thumb}
                alt={`Vista previa de ${plantilla.titulo}`}
                className="max-h-[85%] max-w-full rounded-lg object-contain shadow-md"
              />
              <p className="text-center text-sm" style={{ color: '#4B5563' }}>
                Vista previa visual del cartel. Descarga el archivo PPTX para editarlo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PlantillaCard({ plantilla, onPreview }) {
  const Icon = plantilla.icon;

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1"
      style={{
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
      }}
    >
      <div className="relative aspect-[3/4] overflow-hidden" style={{ background: '#F8F9FA' }}>
        <img
          src={plantilla.thumb}
          alt={`Miniatura de ${plantilla.titulo}`}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div
          className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider"
          style={{
            background: 'rgba(255,255,255,0.95)',
            color: plantilla.accent,
            border: `1px solid ${plantilla.accentBorder}`,
          }}
        >
          <Icon size={12} aria-hidden="true" />
          {plantilla.format}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start gap-3">
          <div
            className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{
              background: plantilla.accentBg,
              border: `1px solid ${plantilla.accentBorder}`,
            }}
          >
            <Icon size={18} style={{ color: plantilla.accent }} aria-hidden="true" />
          </div>
          <h3
            className="text-sm font-bold leading-snug sm:text-[15px]"
            style={{ color: '#0A2A43' }}
          >
            {plantilla.titulo}
          </h3>
        </div>

        <p className="mb-5 flex-1 text-sm leading-relaxed" style={{ color: '#4B5563' }}>
          {plantilla.descripcion}
        </p>

        <div className="mt-auto flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => onPreview(plantilla)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              color: plantilla.accent,
              background: plantilla.accentBg,
              border: `1px solid ${plantilla.accentBorder}`,
            }}
          >
            <Eye size={16} aria-hidden="true" />
            Vista previa
          </button>
          <a
            href={fileUrl(plantilla.fileName)}
            download={plantilla.fileName}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: '#FF6200',
              boxShadow: '0 4px 14px rgba(255,98,0,0.25)',
            }}
          >
            <Download size={16} aria-hidden="true" />
            Descargar
          </a>
        </div>
      </div>
    </article>
  );
}

const Plantillas = () => {
  const [preview, setPreview] = useState(null);

  return (
    <section
      id="plantillas"
      className="relative overflow-hidden py-20 sm:py-28"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 45%, #FFFFFF 100%)',
      }}
      aria-labelledby="plantillas-heading"
    >
      <div
        className="pointer-events-none absolute top-16 left-0 h-72 w-72 rounded-full opacity-[0.04] blur-3xl"
        style={{ background: '#007AFF' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-0 h-72 w-72 rounded-full opacity-[0.04] blur-3xl"
        style={{ background: '#FF6200' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span
            className="mb-4 inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest"
            style={{
              background: 'rgba(255,98,0,0.08)',
              color: '#FF6200',
              border: '1px solid rgba(255,98,0,0.25)',
            }}
          >
            Recursos para autores
          </span>
          <h2
            id="plantillas-heading"
            className="section-underline text-3xl font-black sm:text-4xl lg:text-5xl"
            style={{ color: '#0A2A43' }}
          >
            Plantillas
          </h2>
          <p
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: '#4B5563' }}
          >
            Consulta y descarga las plantillas oficiales para preparar tus envíos al IV Congreso RELATIC 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plantillas.map((plantilla) => (
            <PlantillaCard
              key={plantilla.id}
              plantilla={plantilla}
              onPreview={setPreview}
            />
          ))}
        </div>
      </div>

      {preview ? (
        <PreviewModal plantilla={preview} onClose={() => setPreview(null)} />
      ) : null}
    </section>
  );
};

export default Plantillas;
