# DESIGN SYSTEM: INDUSTRIAL AESTHETICS ENGINEER

## 1. Overview & Creative North Star: "The Sovereign Schematic"
This design system rejects the "friendly" ubiquity of modern web design in favor of **Kinetic Brutalism**. We are not building a storefront; we are engineering a high-end command interface for the acquisition of digital assets. 

**Creative North Star: The Sovereign Schematic.** 
The interface should feel like a redacted military blueprint or a high-end industrial terminal. It is cold, authoritative, and expensive. We achieve this through "Absolute Grid Logic"—where every element feels locked into a structural coordinate system—and "Aggressive Weighting," using heavy borders and massive typography to command attention.

### Breaking the Template
- **Intentional Asymmetry:** While the grid is rigid, border weights are not. Use 3px weights on the top and left of a container, with 0px or 1px on the bottom/right to create a "false-extrude" effect.
- **Data as Ornament:** Metadata (coordinates, timestamps, version numbers) is not hidden; it is used as a primary decorative element to reinforce the technical atmosphere.
- **Structural Brutalism:** We explicitly forbid `border-radius`. Every corner is a sharp 90-degree intersection.

---

## 2. Colors & Surface Logic
The palette is dominated by **Absolute Black (#000000)** and **Stark White**, punctured by the high-velocity **Kinetic Red (#FF3E00)**. 

### Surface Hierarchy & Nesting
Depth is not created through shadows, but through **Tonal Layering** and **Glassmorphism**.
- **Base Level:** `surface_dim` (#131313) or Absolute Black (#000000).
- **In-Fill Level:** `surface_container_low` (#1b1b1b) for secondary modules.
- **Command Level:** `surface_container_high` (#2a2a2a) for active interaction zones.

### The "No-Line" Sectioning Rule
Prohibit standard 1px solid dividers for sectioning. Boundaries must be defined by:
1.  **Background Shifts:** Transitioning from `surface` to `surface_container_lowest`.
2.  **Structural Borders:** Using the **3px solid** rule (using `primary` or `on_surface`).

### Signature Textures: The Kinetic Overlay
To prevent the UI from feeling "flat," apply a global **Scanning Overlay**: a subtle, fixed-position SVG pattern of horizontal scan lines or a fine 4x4px dot grid at 5% opacity. This reinforces the "Interface" aesthetic.

---

## 3. Typography: Aggressive Metadata
We utilize a high-contrast pairing of massive, condensed display faces and surgical monospace indicators.

| Level | Token | Font | Case | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Space Grotesk (Bold) | ALL CAPS | Massive, -5% letter spacing. |
| **Headline** | `headline-lg` | Space Grotesk (Med) | ALL CAPS | The primary "Authoritative" voice. |
| **Metadata** | `label-md` | Monospace (IBM Plex) | ALL CAPS | Used for [X:/Y:] coordinates. |
| **Body** | `body-md` | Inter | Sentence | High legibility for technical specs. |

**Typography as Architecture:** Headlines should often be "bleeding" off the container or tucked into 3px border corners to feel integrated into the schematic.

---

## 4. Elevation & Depth: Tonal Structuralism
Shadows are a "friendly" UX trope. We replace them with **Ambient Tonal Lift** and **Glassmorphism**.

- **The Layering Principle:** To lift a card, do not use a shadow. Instead, use a **85% opacity backdrop-blur** with a `surface_variant` fill. This creates a "Heavy Glass" effect—like a thick slab of industrial acrylic.
- **The "Ghost Border":** For inactive elements, use the `outline_variant` at 20% opacity. 
- **Kinetic Red Accents:** Use `primary` (#FF3E00) sparingly. It is a "Status Alert" color. If a module is active, it receives a 3px left-side border in Kinetic Red.

---

## 5. Components

### Buttons: The "Trigger"
- **Primary:** Stark White background, Absolute Black text. 3px Kinetic Red border. No curves. Hover state: Invert colors or shift to Kinetic Red background.
- **Secondary:** Transparent background, 3px Stark White border. 
- **Interaction:** On hover, display coordinate data `[STS: ACTIVE]` in monospace next to the label.

### Input Fields: The "Data Entry"
- **Style:** Bottom-border only (3px). 
- **Focus:** The bottom border flashes Kinetic Red. 
- **Metadata:** Every input must have a monospace coordinate marker in the top right corner (e.g., `[INP_04]`).

### Cards & Modules
- **Construction:** Use `surface_container_lowest`. 
- **Asymmetry:** 3px border on Top and Left. 1px border on Bottom and Right. 
- **Content:** No dividers. Use `8px` vertical spacing shifts to separate content blocks.

### Scanning Overlays
- A 1px Kinetic Red horizontal line that slowly moves vertically across the "Hero" or "Product" image containers to simulate a diagnostic scan.

---

## 6. Do’s and Don’ts

### Do:
- **DO** use `[X: / Y:]` coordinate markers to fill empty corners in a grid.
- **DO** use massive, condensed headlines that feel "too big" for the container.
- **DO** maintain 0px border-radius on every single element, including tooltips and checkboxes.
- **DO** use "Kinetic Red" for critical CTAs and error states only.

### Don't:
- **DON'T** use soft drop shadows. If depth is needed, use a solid black offset "block shadow."
- **DON'T** use 1px centered dividers. They are too "clean" and not industrial enough.
- **DON'T** use pastel or "soft" versions of the palette. Stick to the high-chroma extremes.
- **DON'T** prioritize "user comfort" over "technical authority." The interface should feel like it requires a high clearance level to operate.

### Accessibility Note:
While the aesthetic is "Cold," legibility is mandatory. Ensure `on_surface` (Stark White) text maintains a 4.5:1 contrast ratio against the `surface` (Absolute Black). Technical data can be smaller (label-sm) but must remain high-contrast.