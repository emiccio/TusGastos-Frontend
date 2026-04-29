# DESIGN.md — ControlAndo
> Contrato de diseño · Fase 1 completada  
> Personal Finance Tracker · SaaS · WhatsApp-first · LATAM  
> Stack: Next.js + Tailwind CSS + shadcn/ui

---

## 1. Industria & Patrón de Landing

**Categoría:** Personal Finance Tracker  
**Patrón:** Hero-Centric + Problem/Solution + Social Proof

### Estructura de secciones

| # | Sección | Propósito |
|---|---------|-----------|
| 1 | **Hero** | Hook emocional + mockup del bot en WhatsApp |
| 2 | **Problema / Solución** | "¿A dónde se fue la plata?" |
| 3 | **Cómo funciona** | 3 pasos simples: WhatsApp → DB → Dashboard |
| 4 | **Dashboard Preview** | Gráficos y datos reales de ejemplo |
| 5 | **Social Proof** | Testimoniales / métricas de uso |
| 6 | **CTA final** | Empezá gratis (sin tarjeta de crédito) |

**Principio rector:** El mensaje central es la *inmediatez* — el usuario anota en segundos y ve el resultado al instante. El producto se siente como un amigo que ayuda con la plata, no como una institución financiera.

---

## 2. Estilo UI

**Estilo:** Soft UI Evolution · Cálido y cercano

- Sombras suaves, profundidad sutil, formas orgánicas
- Bordes redondeados generosos
- Espaciado amplio y respirado
- Tipografía amigable y directa
- Evitar el look frío/enterprise de apps bancarias

---

## 3. Paleta de Colores

### Colores principales

| Nombre | Hex | Uso |
|--------|-----|-----|
| **WhatsApp Green** | `#25D366` | Acento principal, CTA primario, íconos clave |
| **Green Dark** | `#1DA851` | Hover en CTA, estados activos |
| **Green Light** | `#E8F5E9` | Fondos suaves, badges de estado positivo |
| **Warm White** | `#FFFDF9` | Background base (más cálido que blanco puro) |
| **Gray Surface** | `#F8F9FA` | Cards, superficies secundarias |

### Colores de texto

| Nombre | Hex | Uso |
|--------|-----|-----|
| **Slate Dark** | `#2D3748` | Texto principal, headings |
| **Slate Mid** | `#718096` | Texto secundario, labels, placeholders |

### Colores semánticos (datos y gráficos)

| Nombre | Hex | Uso |
|--------|-----|-----|
| **Amber** | `#F59E0B` | Gráficos, datos destacados, warnings suaves |
| **Red** | `#EF4444` | Alertas, gastos altos, errores |
| **Blue** | `#3B82F6` | Categorías de gastos (variante) |

### Decisión clave
El verde WhatsApp (`#25D366`) como acento primario crea reconocimiento instantáneo — el usuario ya asocia ese verde con mensajes y confianza. El fondo warm white (`#FFFDF9`) evita la frialdad de las fintech enterprise.

---

## 4. Tipografía

### Fuentes

| Rol | Fuente | Peso | Uso |
|-----|--------|------|-----|
| **Headings** | Plus Jakarta Sans | 700 / 600 | H1, H2, H3, taglines |
| **Body** | DM Sans | 400 / 500 | Párrafos, UI, labels |

```
Google Fonts:
https://fonts.google.com/specimen/Plus+Jakarta+Sans
https://fonts.google.com/specimen/DM+Sans
```

### Escala tipográfica

| Elemento | Tamaño | Peso | Letter spacing |
|----------|--------|------|---------------|
| H1 | 56px / 3.5rem | 700 | -0.02em |
| H2 | 36px / 2.25rem | 600 | -0.02em |
| H3 | 24px / 1.5rem | 600 | -0.01em |
| Body | 16px / 1rem | 400 | 0 |
| Small | 14px / 0.875rem | 400 | 0 |
| Label | 12px / 0.75rem | 500 | 0.02em |

**H1 mobile:** 36px / 2.25rem (reducir en breakpoint `sm`)

---

## 5. Espaciado & Bordes

### Border radius

| Elemento | Valor |
|----------|-------|
| Cards grandes | `16px` / `rounded-2xl` |
| Cards medianas | `12px` / `rounded-xl` |
| Inputs, botones | `8px` / `rounded-lg` |
| Badges, chips | `99px` / `rounded-full` |

### Sombras

| Estado | Clase Tailwind | Uso |
|--------|---------------|-----|
| Base (card) | `shadow-sm` | Estado reposo |
| Hover | `shadow-md` | Al hacer hover |
| Elevado | `shadow-lg` | Modales, dropdowns |

> Las sombras nunca son negras puras — siempre tintadas con el color del elemento o con opacidad reducida.

### Espaciado base
Sistema de 4px. Unidades principales: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px.

---

## 6. Efectos & Interacciones

- **Transiciones:** 200–300ms `ease-out` en todos los hover states
- **Animaciones de entrada:** máximo 500ms, `ease-out`, una sola vez
- **Scroll animations:** usar `IntersectionObserver`, reducidas en `prefers-reduced-motion`
- **Hover en cards:** `translateY(-2px)` + `shadow-md`, transición 200ms
- **CTA principal:** `scale(1.02)` en hover, transición 150ms

---

## 7. Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#25D366',
          dark:    '#1DA851',
          light:   '#E8F5E9',
        },
        slate: {
          text:    '#2D3748',
          muted:   '#718096',
        },
        surface: {
          base:    '#FFFDF9',
          card:    '#F8F9FA',
        },
        data: {
          amber:   '#F59E0B',
          red:     '#EF4444',
          blue:    '#3B82F6',
        },
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        'card':  '16px',
        'card-md': '12px',
      },
      boxShadow: {
        'card':       '0 1px 3px 0 rgba(45, 55, 72, 0.08)',
        'card-hover': '0 4px 12px 0 rgba(45, 55, 72, 0.12)',
      },
    },
  },
}
```

---

## 8. Componentes shadcn/ui recomendados

| Componente | Uso en la landing |
|-----------|-----------------|
| `Button` | CTAs primarios y secundarios |
| `Card` | Feature cards, testimoniales |
| `Badge` | "Nuevo", "Gratis", categorías de gastos |
| `Avatar` | Testimoniales |
| `Separator` | Divisores de sección |
| `Tooltip` | Ayuda contextual en el dashboard preview |

---

## 9. Copy & UX Writing

### Voz de marca
- **Tono:** Amigo que sabe de plata, no asesor financiero
- **Persona:** Segunda persona, tuteo ("anotás", "ves", "controlás")
- **Lenguaje:** Español rioplatense / latinoamericano neutro
- **Evitar:** Tecnicismos financieros, lenguaje corporativo

### CTA guidelines
| ✕ Evitar | ✓ Usar |
|----------|--------|
| "Registrarse" | "Empezá gratis" |
| "Comenzar" | "Probalo ahora" |
| "Suscribirse" | "Quiero controlar mis gastos" |
| "Submit" | "Mandame el link" |

---

## 10. Anti-patrones — NO usar

| Anti-patrón | Razón |
|-------------|-------|
| Gradientes morado/rosa | Look genérico de AI/fintech, evita identidad propia |
| Dark mode como default | Aleja el tono cálido y cercano |
| Iconografía bancaria (candados, bóvedas) | Comunica rigidez, no accesibilidad |
| Cards anidadas dentro de cards | Aplana la jerarquía visual |
| Texto gris sobre fondo de color | Contraste insuficiente (falla WCAG AA) |
| Fuentes con serifa | Rompen el tono digital-friendly |
| Emojis como íconos de UI | Usar Lucide React / Heroicons (SVG) |
| Imágenes de stock genéricas | Preferir mockups del producto real |
| Animaciones infinitas sin control | Respetar `prefers-reduced-motion` |

---

## 11. Checklist pre-entrega (Fase 4)

- [ ] Sin emojis como íconos — usar Lucide React / Heroicons (SVG)
- [ ] `cursor-pointer` en todos los elementos clickeables
- [ ] Hover states con transición 200–300ms en todos los interactivos
- [ ] Contraste de texto: mínimo 4.5:1 (WCAG AA)
- [ ] Focus states visibles para navegación por teclado
- [ ] `prefers-reduced-motion` respetado en todas las animaciones
- [ ] Responsive testeado: 375px / 768px / 1024px / 1440px
- [ ] Imágenes con `alt` text descriptivo
- [ ] CTA principal visible above the fold en mobile (375px)
- [ ] Meta tags: title, description, og:image configurados
- [ ] Google Fonts cargadas con `display=swap`
- [ ] Sin imports no utilizados en producción

---

## 12. Notas de implementación (Next.js)

```
app/
  layout.tsx         ← Fuentes + metadata global
  page.tsx           ← Landing (server component)
  components/
    sections/
      Hero.tsx
      HowItWorks.tsx
      DashboardPreview.tsx
      Testimonials.tsx
      FinalCTA.tsx
    ui/              ← shadcn components
```

- Usar `next/font/google` para cargar Plus Jakarta Sans y DM Sans (evita layout shift)
- Imágenes del producto con `next/image` y `priority` en el hero
- Animaciones de scroll con `framer-motion` + respeto a `useReducedMotion()`

---
