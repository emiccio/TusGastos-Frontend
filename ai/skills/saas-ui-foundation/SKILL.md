# SaaS UI Foundation Skill

This skill defines the foundational design and technical guidelines for building modern SaaS interfaces.

All generated UI must follow these standards.

---

# Stack

Interfaces should be built using:

- Next.js
- React
- TailwindCSS
- shadcn/ui components
- Radix UI primitives

Do not generate plain HTML pages unless explicitly requested.

Prefer reusable React components.

---

# Design Philosophy

The interface should feel:

- modern
- clean
- professional
- efficient for daily use

The application is a financial/productivity tool used frequently, so usability and clarity must be prioritized.

Avoid overly experimental layouts.

---

# Layout Structure

Most pages follow this structure:

Sidebar Navigation

Top Header Bar

Main Content Area

Spacing must be consistent and predictable.

---

# Typography

Typography should be clear and readable.

Use strong hierarchy:

- page titles
- section titles
- body content
- numeric data

Financial values should be visually prominent.

---

# Color System

Use a consistent palette.

Typical financial semantics:

- green → positive balance
- red → expense
- neutral → informational data

Avoid overly vibrant or chaotic color palettes.

Use Tailwind tokens or CSS variables when appropriate.

---

# Component Usage

Prefer extending shadcn components instead of reinventing them.

Common components:

- Card
- Button
- Input
- Table
- Badge
- Dialog
- Tabs

Components should be composable and reusable.

---

# Motion

Use subtle animations:

- hover effects
- card transitions
- number counters

Avoid heavy animation systems.

---

# Accessibility

Ensure:

- readable font sizes
- keyboard accessible components
- sufficient color contrast

Financial data must be easy to read.