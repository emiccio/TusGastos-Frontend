# DESIGN.md — GestionAndo
> Guia de diseno vigente (alineada al estado actual de la landing)
> Personal Finance Tracker · SaaS · WhatsApp-first · LATAM
> Stack: Next.js + Tailwind CSS + shadcn/ui

---

## 1. Posicionamiento y patron de landing

**Categoria:** Personal Finance Tracker  
**Patron:** Dark Hero-Centric + Educational Flow + Trust + Final CTA

### Estructura real publicada

| # | Seccion | Objetivo |
|---|---------|----------|
| 1 | **Navbar fija** | Marca + navegacion ancla + CTA rapida |
| 2 | **Hero (dark)** | Mensaje fuerte + mockup conversacional de WhatsApp |
| 3 | **Como funciona** | Explicar flujo en 3 pasos simples |
| 4 | **Features (dark)** | Mostrar capacidades diferenciales del producto |
| 5 | **FAQ** | Resolver objeciones antes de conversion |
| 6 | **Social proof** | Prueba social con testimonios reales |
| 7 | **CTA final (dark)** | Cierre de conversion hacia WhatsApp |
| 8 | **Footer** | Links legales y presencia de marca |

**Principio rector:** rapidez y cero friccion. La promesa es "controlar gastos desde WhatsApp en segundos" sin planillas ni procesos complejos.

---

## 2. Direccion visual actual

**Estilo vigente:** Dark fintech cercano (no bancario corporativo)

- Bloques oscuros protagonistas (`#09090b`) en Hero, Features y CTA.
- Acento verde WhatsApp como codigo de accion y reconocimiento.
- Superficies claras de respiro en secciones informativas (How it works, FAQ, Social Proof, Footer).
- Alto contraste en titulares y CTAs para lectura rapida.
- Formas muy redondeadas en cards clave (`rounded-[2rem]` a `rounded-[2.5rem]`).

---

## 3. Paleta de color vigente

### Tokens base (tailwind.config.js)

| Token | Hex | Uso |
|------|-----|-----|
| `brand` | `#25D366` | Acento principal, iconos y estados activos |
| `brand-dark` | `#1DA851` | Hover o variacion de CTA verde |
| `brand-light` | `#E8F5E9` | Fondos suaves y bordes leves |
| `slate-text` | `#2D3748` | Texto principal en zonas claras |
| `slate-muted` | `#718096` | Texto secundario |
| `surface-base` | `#FFFDF9` | Fondo base global |
| `surface-card` | `#F8F9FA` | Cards claras |
| `data-amber` | `#F59E0B` | Rating/metricas destacadas |
| `data-red` | `#EF4444` | Alerta o contraejemplo |
| `data-blue` | `#3B82F6` | Variante informativa |

### Neutrales usados en landing

| Color | Hex aprox | Uso |
|-------|-----------|-----|
| `zinc-950` | `#09090b` | Fondos oscuros principales |
| `zinc-400/500` | `#a1a1aa/#71717a` | Texto secundario en dark |
| `white` | `#ffffff` | Titulares en dark y contenido de contraste |
| `gray-50` | `#F9FAFB` | Fondo FAQ / superficies claras |

---

## 4. Tipografia

### Fuentes implementadas

| Rol | Fuente | Implementacion |
|-----|--------|----------------|
| Headings | Plus Jakarta Sans | `--font-jakarta` via `next/font/google` |
| Body/UI | DM Sans | `--font-dm-sans` via `next/font/google` |

### Jerarquia observada en landing

| Elemento | Clase/tamano frecuente |
|----------|-------------------------|
| Hero H1 | `text-5xl md:text-7xl` |
| Titulos de seccion | `text-3xl md:text-4xl` |
| Titulos de feature | `text-2xl md:text-3xl` |
| Body principal | `text-lg` |
| Metadata/chips | `text-sm` a `text-[10px]` |

---

## 5. Radio, bordes y sombras

### Radio dominante

| Uso | Valor/clase |
|-----|-------------|
| Componentes UI base | `rounded-lg` |
| Cards de contenido | `rounded-card` (16px) |
| Cards premium landing | `rounded-[2rem]` / `rounded-[2.5rem]` |
| Badges/chips | `rounded-full` |

### Sombras y profundidad

| Token/clase | Uso |
|-------------|-----|
| `shadow-card` | Estado base de tarjetas |
| `shadow-card-hover` | Hover en piezas destacadas |
| `shadow-2xl` + tintes | Mockups y bloques hero |

---

## 6. Movimiento e interaccion

- Transiciones cortas (150-300ms) en hover y color.
- Escala leve en CTA principal (`hover:scale-105` / `active:scale-95` segun componente).
- Micro elevacion en cards de testimonios (`hover:-translate-y-1`).
- Glows radiales decorativos en secciones dark para atmosfera visual.

---

## 7. Voz y copy actual

### Tono

- Cercano, directo, rioplatense.
- Segunda persona ("mandas", "controlas", "ves").
- Producto-persona: Lulu como asistente.

### Mensajes clave presentes

- "Controla tu plata enviando un WhatsApp"
- "No hace falta ni escribir"
- "Tres pasos simples"
- "Empeza gratis ahora"

### CTAs vigentes

- Primario: `Empeza gratis ahora`
- Navbar: `Comenzar gratis`
- Final: `Empezar ahora`

---

## 8. Componentes visuales clave de la landing

- `Navbar`: fija, blur oscuro y CTA al extremo derecho.
- `Hero`: badge de disponibilidad + mockup de chat WhatsApp.
- `HowItWorks`: tres pasos con iconografia Lucide.
- `Features`: grilla de cards dark con distintas jerarquias.
- `Faq`: cards claras en 2 columnas (desktop).
- `SocialProof`: testimonios con avatar e iconografia de estrellas.
- `Cta`: bloque de cierre en dark con boton grande.
- `Footer`: legal + links de marca/redes.

---

## 9. Alcance de esta guia

Este documento refleja **solo** la identidad de la landing de marketing publicada en `src/app/page.tsx` y componentes `src/components/landing/*`.

No define en detalle el lenguaje completo del producto autenticado (dashboard interno), aunque ambos comparten tipografia y color de marca.

---

## 10. Checklist de consistencia para marketing

- [x] Nombre de marca: **GestionAndo**
- [x] Color acento primario: **WhatsApp Green** (`#25D366`)
- [x] Tipografias: **Plus Jakarta Sans** + **DM Sans**
- [x] Direccion visual: mezcla de secciones **dark + light**
- [x] Tono verbal: cercano, simple, accionable
- [x] CTA central: iniciar por WhatsApp

---

## 11. Referencias de implementacion (fuente de verdad)

- `src/app/page.tsx`
- `src/components/landing/navbar.tsx`
- `src/components/landing/hero.tsx`
- `src/components/landing/how-it-works.tsx`
- `src/components/landing/features.tsx`
- `src/components/landing/faq.tsx`
- `src/components/landing/social-proof.tsx`
- `src/components/landing/cta.tsx`
- `src/components/landing/footer.tsx`
- `tailwind.config.js`

---
