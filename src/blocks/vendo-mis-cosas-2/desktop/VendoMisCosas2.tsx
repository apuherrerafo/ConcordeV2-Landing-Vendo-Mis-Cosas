"use client";

/**
 * Bloque Vendo Mis Cosas: landing de venta de artículos (v1, 17/11/2026, de mi-garaje-lab · models/vendo-mis-cosas, 9a0fa2b).
 * Misma estructura que Valoriza: LandingShell (marco del Index), Button, GlassButton (GLASS_CSS) y Vidrio de Concorde.
 * Solo cambia el contenido de la columna principal y el prefijo CSS (.vm-).
 * Contenido: deck de campaña LFP + prototipo del formulario multicategoría + propuesta v4 (fuentes en VENDO-MIS-COSAS.md del lab).
 * Regla de color: naranjas SOLO de --vmc-color-orange-* (600 sobre claro, 400 sobre oscuro).
 * Sin backend ni cifras: costo de publicar, modalidad y plazos siguen sin confirmar y no se muestran.
 * Los vehículos siguen su propio recorrido (Valorizar → Publicar); esta landing es para artículos.
 */
import type { JSX } from "react";
import { useRouter } from "next/navigation";

import Button from "@/src/components/Button";
import GlassButton, { GLASS_CSS } from "@/src/components/GlassButton";
import OfferCard from "@/src/components/OfferCard";
import { Vidrio, type Sec } from "@/src/components/Vidrio";
import LandingShell from "@/src/blocks/landing-shell/desktop/LandingShell";
export { VENDO_MIS_COSAS_WIDTH, VENDO_MIS_COSAS_HEIGHT, VENDO_MIS_COSAS_MOBILE_WIDTH, VENDO_MIS_COSAS_MOBILE_HEIGHT } from "./dimensions";

// PENDIENTE: el flujo «Publicar un artículo» aún no está en Concorde; mientras tanto el CTA lleva a Mi Garaje,
// donde la propuesta v4 ubica «Publicar». Cambiar esta constante cuando exista la ruta.
const PUBLICAR = "/blocks/mi-garaje/m/vmc";
const VALUAR = "/blocks/mi-garaje/m/vmc-valuar";
const IMG = "/vendo-mis-cosas";
const WHATSAPP_PEOPLE = "https://cdn.vmcsubastas.com/services/assets/landing-subascars/whatsapp-people.png";

const PERKS: { icon: Sec; title: string; text: string }[] = [
  { icon: "articulos", title: "Tus artículos", text: "Tecnología, hogar y más" },
  { icon: "precio", title: "Tu expectativa", text: "Tú defines desde dónde negociar" },
  { icon: "negociaciones", title: "Recibe propuestas", text: "Aceptas, contrapropones o rechazas" },
];

// Muestra visual del catálogo: no representa publicaciones, precios ni disponibilidad reales.
const CATALOG_ARTICLES = [
  { name: "Nintendo Switch Lite", image: `${IMG}/catalogo/nintendo-switch-lite.png`, alt: "Nintendo Switch Lite" },
  { name: "PS5", image: `${IMG}/catalogo/ps5.png`, alt: "PS5" },
  { name: "Refrigerador LG", image: `${IMG}/catalogo/refrigerador-lg.png`, alt: "Refrigerador LG" },
  { name: "Televisor Samsung", image: `${IMG}/catalogo/televisor-samsung.png`, alt: "Televisor Samsung" },
  { name: "Lavadora LG", image: `${IMG}/catalogo/lavadora-lg.png`, alt: "Lavadora LG" },
  { name: "Cocina Bosch", image: `${IMG}/catalogo/cocina-bosch.png`, alt: "Cocina Bosch" },
  { name: "Macbook Pro", image: `${IMG}/catalogo/macbook-pro.png`, alt: "Macbook Pro" },
  { name: "iPhone 17", image: `${IMG}/catalogo/iphone-17.png`, alt: "iPhone 17" },
];

// Accesos ya aprobados para el bloque que sigue al catálogo.
const USES = [
  { id: "articulos", img: `${IMG}/publica.jpg`, href: PUBLICAR, title: "¿Dejaste de usarlo?", text: <>Publícalo en VMC y<br />recibe propuestas</>, cta: "Publicar", variant: "primary" as const },
  { id: "carro", img: `${IMG}/vende-carro.jpg`, href: VALUAR, title: <>¿Lo que buscabas era<br />vender tu carro?</>, text: <>Entonces valoriza, publícalo<br />y recibe propuestas</>, cta: "Publicar", variant: "secondary" as const },
];

const FAQ: [string, string][] = [
  ["¿Qué es Vendo Mis Cosas?", "Es el espacio de VMC donde puedes publicar lo que quieres vender y recibir propuestas. También puedes explorar el catálogo y hacer propuestas por los artículos que te interesen."],
  ["¿Qué puedo vender?", "Puedes publicar artículos de tecnología, electrodomésticos, muebles, herramientas, instrumentos musicales y más."],
  ["¿Cómo publico un artículo?", "Haz clic en «¡Publica ahora!» en el banner principal de esta página. Sube las fotos, agrega un título y una descripción, elige la categoría e indica tu expectativa de venta. Luego envía tu publicación a revisión. La revisión toma hasta 1 día hábil. Una vez aprobada, tu publicación aparecerá en el catálogo y podrás recibir propuestas."],
  ["¿Cuánto cuesta publicar un artículo?", "Publicar un artículo cuesta 10 SubasCoins. Es un solo pago hasta que lo vendas."],
  ["¿Quién decide la expectativa de venta?", "Tú eliges tu expectativa de venta. Si recibes una propuesta, puedes aceptarla, hacer una contrapropuesta o rechazarla."],
  ["¿Dónde veo mis publicaciones?", "Entra a Mi Garaje y abre «Mis publicaciones». Ahí puedes revisar el estado de cada artículo."],
  ["¿Dónde encuentro artículos para comprar?", "En el menú de VMC, entra a «Vendo Mis Cosas». Explora el catálogo de esta página y abre el detalle del artículo que te interese."],
  ["¿Cómo envío una propuesta y cuánto dura la negociación?", "Abre el detalle del artículo, selecciona «Negociar» e indica cuánto estás dispuesto a pagar. Tú y el vendedor pueden intercambiar propuestas en hasta 5 rondas. Cada propuesta o contrapropuesta tiene 24 horas para recibir respuesta. Si vence sin respuesta, la negociación termina."],
  ["¿Cómo se coordinan el pago y la entrega?", "Una vez que llegan a un acuerdo y se habilita SubasChat, comprador y vendedor pueden usar ese chat para coordinar directamente el pago y la entrega del artículo."],
  ["¿También puedo publicar mi carro aquí?", "Si quieres vender tu carro, entra a «Vendo mi carro» desde el menú de VMC. Ahí puedes usar AVT gratis para consultar su valor estimado y publicar tu carro con la expectativa de venta que elijas."],
];

// Contenido: un solo componente para escritorio y móvil (el shell lo monta en ambos lienzos).
function VendoBody({ id }: { id: "d" | "m" }): JSX.Element {
  const router = useRouter();
  const publicar = () => router.push(PUBLICAR);
  return (
    <div className="vm">
      {/* ── Hero ── */}
      <section className="vm-hero" aria-label="Vendo Mis Cosas">
        <div className="vm-hero__photo"><img src={`${IMG}/hero.jpg`} alt="" fetchPriority="high" /></div>
        <div className="vm-hero__copy">
          <h1>¡Llegó el momento<br /><em>de dejar ir y vender!</em></h1>
          <p>¡Todo cambia y VMC también lo hace! Ahora también puedes<br />recibir propuestas por todo eso que ya no usas o que necesitas vender</p>
          <div className="vm-hero__actions">
            <Button variant="primary" className="vm-hero__cta" onClick={publicar}>¡Publica ahora!</Button>
          </div>
        </div>
      </section>
      <div className="vm-proof">
        <p className="vm-proof__brand"><strong>Vendo Mis Cosas</strong><span>Tus artículos, tu expectativa, tu decisión</span></p>
        <ul aria-label="Cómo vendes en VMC">
          {PERKS.map((p) => (
            <li key={p.title}><Vidrio s={p.icon} size={32} /><div><strong>{p.title}</strong><span>{p.text}</span></div></li>
          ))}
        </ul>
      </div>

      {/* ── Catálogo de V2: misma anatomía de fecha + grilla del catálogo Negociable. ── */}
      <section className="vm-catalog" aria-labelledby="vm-catalog-date">
        <header className="vm-catalog__header">
          <h2 id="vm-catalog-date">VIE. 27 NOV.</h2>
        </header>
        <div className="vm-catalog__grid">
          {CATALOG_ARTICLES.map((article) => (
            <div className="vm-catalog__item" key={article.name}>
              <OfferCard
                variant="negotiable"
                name={article.name}
                year=""
                imageSrc={article.image}
                imageAlt={article.alt}
                elevated
                interactive={false}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Después del catálogo: bloque de categorías aprobado para Vendo Mis Cosas. ── */}
      <section className="vm-use" aria-label="Vende en VMC">
        <ul className="vm-use__opts">
          {USES.map((u) => (
            <li key={u.id}>
              <div>
                <img src={u.img} alt="" loading="lazy" />
                <span><strong>{u.title}</strong>{u.text}</span>
                <Button variant={u.variant} onClick={() => router.push(u.href)}>{u.cta}</Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="vm-whatsapp" aria-label="Canal oficial de WhatsApp">
        <i className="vm-whatsapp__glow vm-whatsapp__glow--left" aria-hidden />
        <i className="vm-whatsapp__glow vm-whatsapp__glow--right" aria-hidden />
        <i className="vm-whatsapp__glow vm-whatsapp__glow--orange" aria-hidden />
        <h2>¡Entérate primero de las <span>próximas ofertas!</span></h2>
        <a
          className="vm-whatsapp__cta"
          href="https://www.whatsapp.com/channel/0029Vb7eNWVBfxo0fKQeEa0y"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="¡Únete a nuestro canal oficial de WhatsApp!"
        >
          ¡Únete a nuestro canal oficial de WhatsApp!
        </a>
        <img src={WHATSAPP_PEOPLE} alt="Personas revisando nuevas ofertas en VMC" width={189} height={282} />
      </section>

      {/* ── Preguntas frecuentes ── */}
      <section className="vm-card vm-faq" aria-label="Preguntas frecuentes">
        <h2 className="vm-title">Preguntas frecuentes</h2>
        {/* name compartido: acordeón exclusivo nativo; un grupo por copia escritorio/móvil. */}
        <div className="vm-faq__list">
          {FAQ.map(([q, a], i) => (
            <details key={q} name={`vm-faq-${id}`}>
              <summary><span>{i + 1}. {q}</span><i aria-hidden /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        {/* Datos estructurados FAQPage: ayudan a buscadores y respuestas de IA a citar el contenido. */}
        {id === "d" ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
        }) }} /> : null}
      </section>

      <section className="vm-help" aria-label="Centro de Ayuda">
        <div>
          <h2>Centro de Ayuda</h2>
          <p>Respuestas rápidas a todas tus dudas</p>
        </div>
        <GlassButton href="https://www.vmcsubastas.com/centro-de-ayuda">Ir al Centro de Ayuda</GlassButton>
      </section>

      <style>{GLASS_CSS + VM_CSS}</style>
    </div>
  );
}

const VM_CSS = `
.vm { --ink: #191C1C; --muted: #6B6878; --v900: #1C0B4F; --v800: #2E0F70; --v700: #3B1782; --v500: #8460E5; --lav: #F5F0FF; --line: #ECE6FB; --peach: var(--vmc-color-orange-600, #ED8936); --orange: var(--vmc-color-orange-600, #ED8936);
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%; padding: 16px 16px 64px; box-sizing: border-box; display: grid; gap: 16px; background: #fff; font-family: var(--vmc-font-display); color: var(--ink); }
.vm *, .vm *::before, .vm *::after { box-sizing: border-box; }
.vm ::selection { background: #E8DDFF; color: #22005C; }
.vm h1, .vm h2, .vm h3 { text-wrap: balance; }
.vm em { font-style: normal; }

/* Hero: anatomía .hp del Index, bajo (como el banner de Subascars, un poco más alto por la franja). */
.vm-hero { position: relative; isolation: isolate; height: 320px; overflow: hidden; border-radius: 20px; color: #fff; background: var(--v800);
  box-shadow: 0 24px 48px -28px rgba(34,0,92,0.55); }
.vm-hero__photo { position: absolute; top: 0; right: 0; bottom: 0; width: 62%;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 52%); mask-image: linear-gradient(90deg, transparent 0%, #000 52%); }
.vm-hero__photo img { width: 100%; height: 100%; object-fit: cover; object-position: 30% 40%; display: block; }
.vm-hero::after { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
  background: radial-gradient(60% 80% at 0% 100%, rgba(237,137,54,0.28), transparent 60%); }
.vm-hero__copy { position: absolute; top: 0; bottom: 36px; left: 36px; width: 57%; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 14px; }
.vm-hero h1 { margin: 0; max-width: 17ch; font-size: clamp(34px, 4.2vw, 44px); line-height: 1.04; font-weight: 800; letter-spacing: -0.035em; }
.vm-hero h1 em { color: var(--orange); text-shadow: 0 2px 10px rgba(28, 11, 79, 0.72); }
.vm-hero p { width: 112%; margin: 0; max-width: 52ch; font-size: 14px; line-height: 21px; font-weight: 500; color: #E8DDFF; text-shadow: 0 1px 8px rgba(28, 11, 79, 0.84); }
.vm-hero__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.vm-hero__actions .vm-hero__cta { height: 44px; padding: 0 28px; font-size: 14px; line-height: 20px; }

/* Franja de vidrio montada sobre el borde del hero (como «Formato de publicación» en Subascars). */
.vm-proof { position: relative; z-index: 2; display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 8px; margin: -52px 28px 0; padding: 12px 8px 12px 20px;
  border-radius: 16px; border: 1px solid rgba(255,255,255,0.9); background: rgba(255,255,255,0.82);
  -webkit-backdrop-filter: blur(16px) saturate(150%); backdrop-filter: blur(16px) saturate(150%); box-shadow: 0 16px 32px -18px rgba(59,23,130,0.4); }
.vm-proof__brand { margin: 0; padding-right: 20px; border-right: 1px solid #E4DCF8; }
.vm-proof__brand strong { display: block; font-size: 17px; line-height: 22px; font-weight: 800; letter-spacing: -0.02em; color: var(--v700); }
.vm-proof__brand span { display: block; font-size: 12px; line-height: 16px; font-weight: 600; color: var(--orange); }
.vm-proof ul { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 0; padding: 0; list-style: none; }
.vm-proof li { display: flex; align-items: center; gap: 12px; padding: 0 16px; min-width: 0; }
.vm-proof li + li { border-left: 1px solid #E4DCF8; }
.vm-proof strong { display: block; font-size: 15px; line-height: 20px; font-weight: 800; color: var(--v700); }
.vm-proof span { display: block; font-size: 12px; line-height: 16px; color: var(--muted); }

/* Catálogo V2: agrupación por fecha y tarjetas OfferCard del catálogo Negociable. */
.vm-catalog { padding: 28px; border: 1px solid var(--line); border-radius: 20px; background: #fff; }
.vm-catalog__header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
.vm-catalog__header h2 { margin: 0; color: var(--v700); font-size: 14px; line-height: 20px; font-weight: 800; letter-spacing: 0.02em; }
.vm-catalog__grid { container-type: inline-size; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; align-items: start; }
.vm-catalog__item { display: flex; justify-content: center; min-width: 0; min-height: 232px; }
/* OfferCard conserva su CSS Concorde. Solo el contenedor ajusta su escala al espacio disponible. */
.vm-catalog__item > .pcard { zoom: clamp(1, calc((100cqw - 48px) / 680px), 1.25); }
/* En Vendo Mis Cosas el catálogo demuestra artículos: se muestra solo el nombre.
   El propio OfferCard conserva el truncado de Negociable cuando el nombre no cabe. */
.vm-catalog .pcard__year { display: none; }

/* Tarjetas blancas del cuerpo (mismo lenguaje de Subascars: bloques blancos sobre el lienzo). */
.vm-card { border-radius: 20px; background: #fff; border: 1px solid var(--line); box-shadow: 0 12px 28px -24px rgba(59,23,130,0.35); padding: 24px; }
.vm-label { margin: 0; font-size: 12px; line-height: 16px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--v700); }

/* ¿Cómo funciona? */
.vm-steps { width: 100%; display: grid; gap: 18px; padding: 26px 24px 22px; scroll-margin-top: 80px; }
.vm-steps .vm-label { position: relative; width: max-content; padding: 8px 12px; font-size: 12px; line-height: 16px; font-weight: 600; color: var(--v700); }
.vm-steps .vm-label::before, .vm-steps .vm-label::after { content: ""; position: absolute; width: 10px; height: 10px; background: center / contain no-repeat; }
.vm-steps .vm-label::before { top: 0; left: 0; background-image: url("https://www.vmcsubastas.com/producto/valoriza/icons/corner-bracket-top-left.svg"); }
.vm-steps .vm-label::after { right: 0; bottom: 0; background-image: url("https://www.vmcsubastas.com/producto/valoriza/icons/corner-bracket-bottom-right.svg"); }
.vm-steps ol { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin: 0; padding: 0; list-style: none; counter-reset: none; }
.vm-steps li { display: grid; grid-template-rows: 36px minmax(0, 52px); place-items: center; min-height: 132px; gap: 10px; padding: 16px 12px; border: 1px solid #DED4F2; border-radius: 14px; text-align: center; background: #fff; box-shadow: 0 10px 18px -16px rgba(53,19,117,0.6); }
.vm-steps li span { display: grid; gap: 2px; font-size: 14px; line-height: 18px; font-weight: 800; color: var(--v700); }
.vm-steps li small { font-size: 11px; line-height: 14px; font-weight: 700; color: var(--muted); }

/* Bloques centrados: píldora, titular, bajada, cifras. */
.vm-center { display: grid; justify-items: center; text-align: center; gap: 16px; padding: 68px 32px 56px; border: 1px solid var(--line); border-radius: 20px; box-shadow: none; background: #fff; }
.vm-pill { margin: 0; padding: 5px 16px; border: 1px solid transparent; border-radius: 999px; font-size: 12px; line-height: 18px; font-weight: 700; background: linear-gradient(#fff, #fff) padding-box, linear-gradient(100deg, #F2A25C 0%, #DE858C 42%, #8C70E3 100%) border-box; }
.vm-pill span { background: linear-gradient(100deg, #DB8B52 0%, #C77E9A 48%, #8065D2 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
.vm-center .vm-pill:not(:first-child) { margin-top: 48px; }
.vm-title { margin: 0; max-width: 22ch; font-size: 36px; line-height: 1.15; font-weight: 800; letter-spacing: -0.035em; color: var(--v700); }
.vm-title span { color: var(--v500); }
.vm-center .vm-title { max-width: 26ch; background: linear-gradient(100deg, #6E4BD7 0%, #735BE3 50%, #3AB7D1 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
.vm-center .vm-title span { color: inherit; }
.vm-lead { margin: 0; max-width: 68ch; font-size: 15px; line-height: 23px; color: var(--v700); }
.vm-lead b { color: var(--v700); }
.vm-stats { display: grid; grid-template-columns: 150px 36px 150px; align-items: center; column-gap: 26px; margin: 18px 0 10px; }
.vm-stats div { display: grid; justify-items: center; gap: 5px; min-width: 0; }
.vm-stats__plus { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 12px; border: 1px solid #DDCFF7; background: #fff; box-shadow: 0 8px 18px -14px rgba(59,23,130,0.55); font-size: 20px; line-height: 1; color: var(--v500); }
.vm-stats dt { font-size: 30px; line-height: 36px; font-weight: 800; letter-spacing: -0.03em; background: linear-gradient(100deg, #6E4BD7 0%, #735BE3 50%, #3AB7D1 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
.vm-stats dd { margin: 0; font-size: 13px; line-height: 18px; font-weight: 600; color: #756298; }

/* Lo que debes saber: tarjeta con checklist + pantalla real (en lugar del video de Subascars). */
.vm-know { display: grid; grid-template-columns: 400px 216px; align-items: stretch; gap: 24px; width: 100%; max-width: 640px; margin: 16px 0 8px; text-align: left; }
.vm-know__card { display: flex; flex-direction: column; overflow: hidden; border: 0; border-radius: 16px; background: #fff; box-shadow: 0 0 16px 4px rgba(0,0,0,0.1); }
.vm-know__card header { padding: 16px; color: #fff; font-size: 20px; line-height: 28px; font-weight: 800; letter-spacing: -0.02em;
  background: linear-gradient(174deg, #8460E5 0%, #3B1782 100%); }
.vm-know__card header small { display: block; font-size: 12px; line-height: 16px; font-weight: 400; color: #fff; letter-spacing: 0; }
.vm-know__card > div { display: grid; flex: 1; gap: 12px; padding: 16px; }
.vm-know__card .vm-label { color: #99A1AF; font-size: 10px; line-height: 15px; font-weight: 700; }
.vm-know__card ul { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.vm-know__card li { display: grid; grid-template-columns: 24px minmax(0, 1fr); align-items: center; gap: 6px; padding: 8px 16px; border: 1px solid transparent; border-radius: 999px; font-size: 12px; line-height: 16px; font-weight: 600; color: var(--v700); }
.vm-know__card li::before { content: ""; width: 24px; height: 24px; border-radius: 50%;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='white'/%3E%3Cpath d='m7.5 12 3 3 6-7' fill='none' stroke='%23ED8936' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / 16px auto no-repeat, linear-gradient(135deg, #ED8936 0%, #ED8936 40%, #8460E5 100%); }
/* Reserva visual para el video explicativo: conserva la posición de Valoriza sin fingir que ya existe un video reproducible. */
.vm-video { position: relative; justify-self: center; width: 216px; aspect-ratio: 9 / 16; overflow: hidden; border-radius: 18px; border: 1px solid #CDBDF5; background: #111; box-shadow: none; }
.vm-video::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(28,11,79,0.04) 45%, rgba(0,0,0,0.52)); }
.vm-video img { width: 100%; height: 100%; object-fit: cover; display: block; }
.vm-video__play { position: absolute; z-index: 1; top: 50%; left: 50%; display: grid; place-items: center; width: 58px; height: 58px; margin: -29px; border-radius: 50%; color: var(--v700); background: rgba(255,255,255,0.94); box-shadow: 0 12px 28px rgba(28,11,79,0.38); }
.vm-video__play svg { margin-left: 3px; }
.vm-video__controls { position: absolute; z-index: 1; right: 14px; bottom: 14px; left: 14px; display: grid; grid-template-columns: 1fr auto auto auto; align-items: center; gap: 10px; }
.vm-video__controls i { height: 4px; border-radius: 99px; background: linear-gradient(90deg, #fff 42%, rgba(255,255,255,0.45) 42%); }
.vm-video__controls b { display: block; width: 14px; height: 14px; border: 2px solid #fff; border-radius: 2px; opacity: 0.9; }
.vm-video__controls b:nth-of-type(2) { border-radius: 50%; }
.vm-video__controls b:nth-of-type(3) { width: 3px; height: 14px; border: 0; border-radius: 99px; background: #fff; box-shadow: 6px 0 #fff; }

/* Dos recorridos: artículos y carro. */
.vm-use { display: grid; gap: 12px; width: 100%; }
.vm-use__opts { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); grid-auto-rows: 184px; gap: 12px; margin: 0; padding: 0; list-style: none; text-align: left; }
.vm-use__opts li { position: relative; isolation: isolate; overflow: hidden; border: 1px solid #DDCFF7; border-radius: 18px; background: linear-gradient(120deg, #FFFFFF 0%, var(--lav) 60%, #EFE7FF 100%); box-shadow: 0 12px 20px -18px rgba(59,23,130,0.45); }
.vm-use__opts li > div { display: grid; grid-template-rows: auto 1fr; justify-items: start; height: 100%; padding: 22px 24px; color: var(--muted); font-size: 14px; line-height: 20px; }
.vm-use__opts span { display: grid; grid-template-rows: 46px auto; row-gap: 6px; max-width: 52%; }
.vm-use__opts .pvbtn, .vm-use__opts .psec { align-self: end; margin: 0; height: 40px; padding: 0 28px; font-size: 14px; }
.vm-use__opts li:nth-child(2) span { max-width: 54%; }
.vm-center .vm-use__opts .pvbtn { width: auto; }
.vm-use__opts strong { align-self: start; font-size: 18px; line-height: 23px; font-weight: 800; letter-spacing: -0.02em; color: var(--v700); }
.vm-use__opts li:first-child strong { align-self: center; }
.vm-use__opts img { position: absolute; z-index: -1; top: 0; right: 0; width: 100%; height: 100%; object-fit: cover; object-position: 100% 30%; display: block; }

/* Franja del canal: composición y medidas del banner de próximas ofertas de Valoriza. */
.vm-whatsapp { position: relative; isolation: isolate; justify-self: stretch; width: 100%; height: 120px; overflow: hidden; border-radius: 16px;
  background: linear-gradient(141deg, #340091 33%, #8460E5 92%, #ED8936 100%); }
.vm-whatsapp__glow { position: absolute; z-index: 0; display: block; border-radius: 999px; pointer-events: none; }
.vm-whatsapp__glow--left { left: -140px; top: -160px; width: 320px; height: 320px; background: rgba(95,62,216,0.55); filter: blur(35px); }
.vm-whatsapp__glow--right { right: -94px; top: -120px; width: 320px; height: 320px; background: rgba(132,96,229,0.5); filter: blur(40px); }
.vm-whatsapp__glow--orange { left: -171px; top: -88px; width: 320px; height: 320px; background: rgba(237,137,54,0.3); filter: blur(60px); }
.vm-whatsapp h2 { position: absolute; z-index: 4; top: 14px; left: 20px; width: 429px; margin: 0; color: #fff; font-size: 20px; line-height: 24px; font-weight: 800; letter-spacing: -0.025em; }
.vm-whatsapp h2 span { background: linear-gradient(166deg, #ED8936 0%, #ED8936 25%, #8460E5 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
.vm-whatsapp__cta { position: absolute; z-index: 4; top: 60px; left: 20px; display: inline-flex; align-items: center; justify-content: center; width: 340px; height: 40px; padding: 0 24px; border: 0; border-radius: 9999px;
  color: #fff; font-size: 14px; line-height: 21px; font-weight: 600; text-decoration: none; white-space: nowrap;
  background: linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0) 100%);
  -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px); box-shadow: 0 8px 24px rgba(0,0,0,0.1), inset 0 1px 6px rgba(255,255,255,0.45); }
.vm-whatsapp__cta::before { content: ""; position: absolute; inset: 0; padding: 1.5px; border-radius: inherit; pointer-events: none;
  background: linear-gradient(162deg, #FFFFFF 0%, #F4AC59 22.1%, #8460E5 74.5%, #FFFFFF 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
.vm-whatsapp__cta:hover { opacity: 0.92; }
.vm-whatsapp__cta:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.vm-whatsapp > img { position: absolute; z-index: 3; top: -74px; right: 23px; width: 189px; height: 282px; object-fit: cover; object-position: center; }

/* Preguntas frecuentes: título centrado y tarjetas numeradas (como Subascars), <details> nativo. */
.vm-faq { display: grid; gap: 20px; padding: 32px 24px; }
.vm-faq .vm-title { justify-self: center; text-align: center; background: linear-gradient(100deg, #7B52DF 0%, #7557DC 38%, #5F91DB 68%, #45B7CE 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
.vm-faq__list { display: grid; gap: 8px; }
.vm-faq details { border-radius: 14px; background: #fff; border: 1px solid var(--line); box-shadow: 0 6px 16px -14px rgba(59,23,130,0.4); transition: background-color 240ms var(--ease), border-color 240ms var(--ease); }
.vm-faq details:hover { border-color: #CDBDF5; }
.vm-faq details[open] { background: var(--lav); border-color: #CDBDF5; }
.vm-faq summary { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 56px; padding: 0 14px 0 20px;
  cursor: pointer; list-style: none; font-size: 15px; line-height: 21px; font-weight: 700; color: var(--v700); border-radius: 14px; }
.vm-faq summary::-webkit-details-marker { display: none; }
.vm-faq summary:focus-visible { outline: 2px solid var(--v500); outline-offset: 2px; }
.vm-faq summary i { position: relative; flex: none; width: 26px; height: 26px; border-radius: 50%; background: #fff; border: 1px solid var(--line); transition: background-color 240ms var(--ease); }
.vm-faq summary i::before, .vm-faq summary i::after { content: ""; position: absolute; top: 50%; left: 50%; width: 10px; height: 2px; margin: -1px 0 0 -5px; border-radius: 2px; background: var(--v500); transition: transform 280ms var(--ease), background-color 240ms; }
.vm-faq summary i::after { transform: rotate(90deg); }
.vm-faq details[open] summary i { background: var(--v700); border-color: var(--v700); }
.vm-faq details[open] summary i::before, .vm-faq details[open] summary i::after { background: #fff; }
.vm-faq details[open] summary i::after { transform: rotate(0deg); }
.vm-faq details p { margin: 0; padding: 0 20px 18px; max-width: 70ch; font-size: 14px; line-height: 22px; color: var(--muted); }
@supports (interpolate-size: allow-keywords) {
  @media (prefers-reduced-motion: no-preference) {
    .vm-faq { interpolate-size: allow-keywords; }
    .vm-faq details::details-content { block-size: 0; overflow: clip; opacity: 0;
      transition: block-size 320ms var(--ease), opacity 240ms ease, content-visibility 320ms allow-discrete; }
    .vm-faq details[open]::details-content { block-size: auto; opacity: 1; }
  }
}

/* Centro de Ayuda: banner final con el degradado de la marca. */
.vm-help { display: flex; align-items: center; justify-content: space-between; gap: 16px; height: 120px; padding: 0 24px; overflow: hidden; border-radius: 16px; color: #fff;
  background: linear-gradient(90deg, #B27128 0%, #99524D 15%, #7D3B85 30%, #5A35C2 50%, #3B1782 72%, #22005C 100%); box-shadow: 0 0 16px 4px rgba(0,0,0,0.1); }
.vm-help h2 { margin: 0; font-size: 20px; line-height: 26px; font-weight: 800; }
.vm-help p { margin: 2px 0 0; font-size: 13px; line-height: 18px; color: #E8DDFF; }
.vm-help .hib-glass { height: 40px; padding-inline: 20px; white-space: nowrap; }

.vm-dock { display: none; }

@media (max-width: 1023px) {
  .vm { padding: 14px 14px 104px; gap: 12px; }
  .vm-hero { height: auto; display: flex; flex-direction: column; border-radius: 18px; }
  .vm-hero__photo { position: relative; width: 100%; height: 200px; -webkit-mask-image: linear-gradient(180deg, #000 60%, transparent 100%); mask-image: linear-gradient(180deg, #000 60%, transparent 100%); }
  .vm-hero__photo img { object-position: 62% 35%; }
  .vm-hero__copy { position: relative; left: 0; bottom: 0; width: 100%; padding: 0 20px 64px; margin-top: -28px; gap: 12px; }
  .vm-hero h1 { font-size: 34px; }
  .vm-hero__actions { width: 100%; }
  .vm-hero__actions > * { flex: 1 1 100%; }
  .vm-hero__actions .pvbtn { white-space: nowrap; padding-inline: 16px; }
  .vm-proof { grid-template-columns: minmax(0, 1fr); margin: -52px 12px 0; padding: 14px 4px 6px; }
  .vm-proof__brand { padding: 0 12px 10px; border-right: 0; border-bottom: 1px solid #E4DCF8; }
  .vm-proof ul { grid-template-columns: minmax(0, 1fr); }
  .vm-proof li { padding: 10px 12px; }
  .vm-proof li + li { border-left: 0; border-top: 1px solid #E4DCF8; }
  .vm-catalog { padding: 20px 16px; }
  .vm-catalog__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .vm-catalog__item { min-height: 232px; }
  .vm-catalog__item > .pcard { zoom: 1; }
  .vm-card { padding: 20px 16px; }
  .vm-steps ol { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .vm-steps { gap: 16px; padding: 22px 16px 18px; }
  .vm-steps li { min-height: 126px; gap: 8px; padding: 12px; }
  .vm-center { padding: 48px 16px 40px; }
  .vm-title { font-size: 26px; }
  .vm-stats { grid-template-columns: 112px 30px 112px; column-gap: 12px; }
  .vm-stats__plus { width: 30px; height: 30px; font-size: 17px; }
  .vm-stats dt { font-size: 26px; }
  .vm-know { grid-template-columns: minmax(0, 1fr); }
  .vm-video { width: min(100%, 244px); }
  .vm-center .pvbtn { width: 100%; }
  .vm-use__opts { grid-template-columns: minmax(0, 1fr); grid-auto-rows: 168px; gap: 10px; }
  .vm-use__opts li > div { padding: 16px; }
  .vm-use__opts span, .vm-use__opts li:nth-child(2) span { max-width: 50%; font-size: 13px; line-height: 18px; }
  .vm-use__opts li:nth-child(2) span { max-width: 58%; }
  .vm-use__opts li:nth-child(2) img { transform: translateX(14%); }
  .vm-use__opts strong { font-size: 16px; line-height: 21px; }
  .vm-whatsapp { width: 100%; height: 200px; }
  .vm-whatsapp__glow--left { left: -18%; top: -67%; width: 41%; height: auto; aspect-ratio: 1; filter: blur(35px); }
  .vm-whatsapp__glow--right { display: none; }
  .vm-whatsapp__glow--orange { left: -22%; top: -37%; width: 41%; height: auto; aspect-ratio: 1; filter: blur(60px); }
  .vm-whatsapp h2 { top: 20px; left: 20px; width: 46%; font-size: 18px; line-height: 21px; }
  .vm-whatsapp__cta { top: auto; bottom: 16px; left: 16px; right: 16px; width: auto; height: 44px; padding: 0 12px; font-size: 14px; }
  .vm-whatsapp > img { top: 0; left: auto; right: 0; width: 66%; height: 100%; object-position: 88% 0; }
  .vm-faq { padding: 24px 12px; }
  .vm-faq summary { padding: 0 12px 0 16px; }
  .vm-faq details p { padding: 0 16px 16px; }
  .vm-help { flex-direction: column; align-items: flex-start; padding: 20px; }
  .vm-help .hib-glass { width: 100%; justify-content: center; }
  .vm-dock { display: block; position: fixed; left: 12px; right: 12px; bottom: max(12px, env(safe-area-inset-bottom)); z-index: 40; padding: 8px; border-radius: 999px;
    background: rgba(255,255,255,0.86); border: 1px solid rgba(255,255,255,0.9); box-shadow: 0 18px 36px -16px rgba(34,0,92,0.45);
    -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
    transform: translateY(calc(100% + 24px)); opacity: 0; transition: transform 420ms var(--ease), opacity 240ms ease; }
  .vm-dock[data-on] { transform: none; opacity: 1; }
  .vm-dock .pvbtn { width: 100%; white-space: nowrap; }
}
@media (prefers-reduced-motion: reduce) {
  .vm-dock { transition: none; }
}
`;

// Marco = LandingShell (el del Index: Header, Sidebar y drawer en celular).
export default function VendoMisCosas(): JSX.Element {
  return <LandingShell body={(id) => <VendoBody id={id} />} />;
}
