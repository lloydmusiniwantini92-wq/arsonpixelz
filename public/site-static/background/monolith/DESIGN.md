# Design System Strategy: Architectural Brutalism

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Monolith."** 

This is not a "standard" dark mode interface; it is an architectural statement. Drawing inspiration from high-end editorial layouts and structural brutalism, the system prioritizes heavy, extended typography against an absolute void (`#000000`). By utilizing a rigid, data-driven layout combined with intentional asymmetry, we move away from the "generic template" look. The aesthetic is high-stakes, technical, and authoritative. 

The experience is defined by the tension between the massive, immobile weight of the display type and the sharp, surgical precision of the monospace body copy.

---

## 2. Colors & Tonal Depth
The palette is rooted in deep obsidian, using vibrant orange-red accents to represent "data flow" and "energy."

### The "No-Line" Rule
Traditional 1px borders are strictly prohibited for sectioning. Structural definition must be achieved through:
- **Tonal Shifts:** Transitioning from `surface` (#131313) to `surface_container_low` (#1B1B1B).
- **Negative Space:** Using the Spacing Scale (specifically `spacing-16` or `spacing-20`) to create "voids" that act as invisible barriers.
- **Accents:** Using a single vertical hairline in `primary_container` (#FF562B) to denote a shift in content priority.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of materials.
- **Base Level:** `surface` (#131313) for the main canvas.
- **Interaction Layer:** `surface_container` (#1F1F1F) for interactive cards.
- **Elevated Detail:** `surface_container_highest` (#353535) for small, technical pop-overs.

### The "Glass & Gradient" Rule
To add "soul" to the brutalist structure, use `primary` to `primary_container` gradients on large-scale CTAs. For floating data modules, apply a backdrop blur (20px-40px) with 60% opacity on the `surface_container` to create a "Smoked Glass" effect.

---

## 3. Typography
Typography is the primary visual engine of this system.

- **Display (Space Grotesk - Extended/Bold):** Used for "Slab" headlines. This font should be tracked tightly to feel like a solid block of stone. Use `display-lg` (3.5rem) for high-impact hero statements.
- **Body (Inter - Monospace/Sans):** Clean and technical. Use `body-md` (0.875rem) for general descriptions. The contrast between the "loud" display type and "quiet" body type creates an editorial, high-end feel.
- **Labels (Space Grotesk - All Caps):** Used for "Micro-Data" (e.g., `PROJECT_INSIGHTS`). These should always be uppercase with increased letter spacing to enhance the technical, data-driven aesthetic.

---

## 4. Elevation & Depth
In Architectural Brutalism, depth is about mass, not light.

- **The Layering Principle:** Avoid "Drop Shadows" in the traditional sense. Create elevation by placing a `surface_container_low` card on top of `surface_container_lowest`. 
- **Ambient Shadows:** If a floating element (like a modal) requires a shadow, it must be an "Obsidian Shadow." Use a shadow color derived from `on_surface` at 4% opacity with a blur of 64px.
- **The Ghost Border:** For high-density data tables where separation is critical, use a "Ghost Border"—the `outline_variant` (#5D3F38) set to 15% opacity. It should be barely felt, never seen.
- **Hard Edges:** The `roundedness` scale is set to `0px` globally. Every container, button, and input field must have sharp, architectural corners to maintain the brutalist integrity.

---

## 5. Components

### Buttons
- **Primary:** Solid `primary_container` (#FF562B) with `on_primary_container` (#550E00) text. No rounded corners. High-contrast hover state switching to `primary_fixed`.
- **Secondary (The Outlined Slab):** Transparent background with a 2px stroke of `primary`. Text in `on_background`.
- **Tertiary:** Text-only, using `label-md` in all-caps with a `primary` underline that expands on hover.

### Input Fields
- **Architecture:** No background fill. Only a bottom border using `outline_variant`. 
- **Active State:** The bottom border transforms into a 2px `primary` line. Helper text uses `label-sm` in `on_surface_variant`.

### Cards & Lists
- **Rule:** Forbid divider lines. 
- **Implementation:** Use background shifts (e.g., a `surface_container_low` row) to separate list items. Use the spacing scale `spacing-4` (1.4rem) as the minimum padding between content blocks.

### Custom Components: "The Data Gauge"
Given the data-driven nature, include a "System Status" component: A small, high-contrast bar using `tertiary` (#A7C8FF) to show progress or metrics, juxtaposed against the orange `primary` accents.

---

## 6. Do's and Don'ts

### Do
- **DO** use absolute black (#000000) for high-impact sections to create "depth-voids."
- **DO** use asymmetric layouts. For example, align text to a 12-column grid but leave the first 2 columns empty.
- **DO** use all-caps for labels and navigation to reinforce the "Military/Technical" tone.

### Don't
- **DON'T** use rounded corners (`0px` is the law).
- **DON'T** use standard blue for links. Use `primary` or `tertiary`.
- **DON'T** use soft, "friendly" imagery. Use high-contrast, desaturated photography or technical 3D renders.
- **DON'T** use 100% white for body text. Use `on_surface` (#E2E2E2) to reduce eye strain against the black background.