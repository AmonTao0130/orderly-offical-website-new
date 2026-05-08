# Orderly Network — Design System

Extracted from Figma: **Website Rebrand** (`Nlrcx9HmXs6E6jqhTLRoLx`, node `2100:6392`)

---

## Colors

### Primitive Variables (Figma token names)

| Token | Value |
|-------|-------|
| `Purple/200 Orderly Purple` | `#6700CE` |
| `Purple/300` | `#3F0086` |
| `Black/800` | `#1E2026` |
| `Black/600` | `#474D57` |
| `Black/0` | `#FFFFFF` |

### Semantic Color Usage

| Role | Value | Notes |
|------|-------|-------|
| Page background | `#000000` | Pure black canvas |
| Primary purple | `#6700CE` | Buttons, stats bg, footer, "Why" alt cards |
| Deep purple | `#3F0086` | "Why" card alternates, dark sections |
| Bright purple | `#7800F0` | Email input field background |
| Surface dark | `#1E2026` | Logo container fills |
| Card overlay | `rgba(20, 21, 26, 0.7)` | DEX / partner cards |
| Footer logo bg | `rgba(156, 117, 255, 0.1)` | Pill badge around logo |
| Text primary | `#FFFFFF` | All headings and body on dark bg |
| Text secondary | `rgba(255, 255, 255, 0.8)` | Card body text |
| Link / accent | `#9C75FF` | Footer nav links |
| Token badge text | `#000000` | "Buy ORDER" badge on white bg |

### Gradients

| Name | Value |
|------|-------|
| Nav CTA button | `linear-gradient(-89.2deg, #48BDFF 0%, #786CFF 47.8%, #BD00FF 99.6%)` (shown on white bg) |
| Feature tag fill | `linear-gradient(to top, rgba(156,117,255,0.6), rgba(156,117,255,0))` |

---

## Typography

### Fonts

| Family | Usage |
|--------|-------|
| **Atyp BL** (variable, Display subfamily) | All headings, CTAs, display text |
| **Atyp Text** (Medium) | Navigation menu items |

Both fonts use OpenType feature settings throughout the design:
- Standard: `'ss02' 1, 'ss03' 1, 'ss05' 1`
- Extended (most display text): `'ss02' 1, 'ss03' 1, 'ss05' 1, 'ss06' 1`
- Buttons with arrow icons: add `'liga' 0`

### Type Scale

| Role | Font subfamily | Size | Weight | Line-height | Tracking |
|------|---------------|------|--------|-------------|---------|
| Hero title (largest) | `Atyp BL: Text - Bold` | 96px | Bold | 1.0 | — |
| Big CTA headline | `Atyp BL: Display - SemiBold` | 86px | SemiBold | 1.2 | — |
| Section heading H2 | `Atyp BL: Bold` | 56px | Bold | 1.1–1.2 | — |
| Feature step title | `Atyp BL: Display - Bold` | 48px | Bold | 1.2 | — |
| Stats value | `Atyp BL: Display - SemiBold` | 48px | SemiBold | 1.0 | — |
| Feature tag / card title | `Atyp BL: Display - SemiBold` | 30px | SemiBold | 1.2 | — |
| Newsletter heading | `Atyp BL: Display - SemiBold` | 30px | SemiBold | 1.2 | `0.3px` |
| Hero subtitle / stats label | `Atyp BL: Display - Medium` | 24px | Medium | 1.3 | `-0.3125px` |
| Footer price display | `Atyp BL: Display - SemiBold` | 24px | SemiBold | — | `0.24px` |
| Card body text | `Atyp BL: Display - Medium` | 20px | Medium | 1.3 | — |
| CTA button (large) | `Atyp BL: Bold` | 20px | Bold | 1.0 | `0.2px` |
| "View all" / inline links | `Atyp BL: Bold` | 20px | Bold | 1.0 | `0.2px` |
| Feature number badge | `Atyp BL: Display - SemiBold` | 50px | SemiBold | 1.2 | — |
| Nav menu items | `Atyp Text: Medium` | 16px | Medium | 1.0 | — |
| Button text (small) | `Atyp BL: Bold` | 16px | Bold | 1.0 | `0.16px` |
| Footer section headers | `Atyp BL: Bold` | 14px | Bold | 0.753 | `0.14px` |
| Footer nav links | `Atyp BL: Display - Medium` | 14px | Medium | 0.753 | `0.14px` |
| Footer status badge | `Atyp BL: Display - SemiBold` | 14px | SemiBold | 0.753 | `0.14px` |

---

## Spacing & Layout

### Grid
- **Canvas width:** 1440px
- **Content max-width:** 1280px
- **Horizontal margin:** 80px each side

### Section Gaps (vertical)
| Context | Gap |
|---------|-----|
| Between major page sections | `160px` |
| Within section (heading to content) | `64px` |
| Card internal gap (title to body) | `20px` |
| Stats row gap | `10px` |

### Internal Padding
| Component | Padding |
|-----------|---------|
| "Why / Build" cards | `36px` all sides |
| Footer container | `60px` |
| Stats section | `43px` top/bottom |
| Newsletter section | `30px` |
| DEX partner cards | `20px` |

---

## Border Radius

| Size | Value | Used on |
|------|-------|---------|
| XS | `5px` | DEX / partner cards |
| S | `20px` | Email input ends |
| M | `24px` | Buttons (primary, secondary) |
| L | `30px` | Section containers, "Why" cards, footer, newsletter |
| XL | `40px` | Feature number badges |
| Pill nav | `46px` | Nav CTA button |
| Circle / pill | `60–124px` | Logo avatars, feature tag pills |

---

## Components

### Buttons

#### Primary (filled purple)
```css
background: #6700CE;
color: white;
padding: 12px 24px;   /* small: 12px top/bottom — large CTAs use 18px */
border-radius: 24px;
font: Atyp BL Bold, 16–20px;
letter-spacing: 0.16–0.2px;
```

#### Secondary (white outline)
```css
border: 1px solid white;
color: white;
padding: 18px 24px;
border-radius: 24px;
font: Atyp BL Bold, 16px;
letter-spacing: 0.16px;
```

#### Nav CTA (white with gradient)
```css
background: white; /* gradient effect layered beneath */
/* gradient: linear-gradient(-89.2deg, #48BDFF 0%, #786CFF 47.8%, #BD00FF 99.6%) */
color: #3F0086;
padding: 12px 20px;
border-radius: 46px;
font: Atyp BL Bold, 16px;
letter-spacing: 0.16px;
font-feature-settings: 'ss03' 1, 'ss02' 1, 'ss05' 1;
```

---

### Cards

#### "Why Orderly?" / Feature Cards
```css
/* Alternate between the two bg colors */
background: #3F0086;  /* or #6700CE */
width: 410px;
height: 483px;
padding: 36px;
border-radius: 30px;
overflow: hidden;
gap between cards: 25px;

/* Title */
font: Atyp BL Display-SemiBold, 30px;
color: white;
line-height: 1.2;

/* Body */
font: Atyp BL Display-Medium, 20px;
color: rgba(255, 255, 255, 0.8);
line-height: 1.3;

/* Decorative icon — absolute positioned, bottom-right quadrant */
```

#### DEX / Partner Cards
```css
background: rgba(20, 21, 26, 0.7);
padding: 20px;
border-radius: 5px;
display: flex;
gap: 16px;
align-items: center;

/* Logo container */
width: 64px; height: 64px;
border-radius: 60px;  /* circle */

/* Name */
font: Atyp BL Display-SemiBold, 24px;
color: white;
```

#### Floating Feature Tags (hero)
```css
backdrop-filter: blur(30px);
background: linear-gradient(to top, rgba(156,117,255,0.6), rgba(156,117,255,0));
border: 3px solid white;
padding: 30px 40px;
border-radius: 124px;
box-shadow: 18px 23px 40px 0px rgba(0,0,0,0.1);

/* Dot indicator */
width: 14.4px; height: 14.4px; border-radius: 50%;

/* Label */
font: Atyp BL Display-SemiBold, 30px;
color: white;
```

---

### Stats Section
```css
background: #6700CE;
border-radius: 30px;
padding: 43px 0;
/* 4 columns, flex, separated by thin vertical lines */

/* Label */
font: Atyp BL Display-Medium, 24px, white;
line-height: 1.3;
letter-spacing: -0.3125px;

/* Value */
font: Atyp BL Display-SemiBold, 48px, white;
text-transform: capitalize;
```

---

### Navigation Header
```css
width: 1280px;
height: 100px;
padding: 40px 0;
backdrop-filter: blur(8.65px);
border-radius: 130px;
display: flex;
gap: 48px;          /* between nav items */

/* Logo area */
width: 110.96px;

/* Menu items */
font: Atyp Text Medium, 16px, white;
/* dropdown chevron: 12px icon, -45deg rotated */

/* CTA button: see "Nav CTA" above */
```

---

### Email Newsletter Input
```css
height: 69px;
display: flex;

/* Input field (left) */
background: #7800F0;
padding: 16px 0 16px 18px;
border-radius: 20px 0 0 20px;
font: Atyp BL Display-Medium, 24px, rgba(255,255,255,0.7);
letter-spacing: 0.504px;

/* Submit button (right) */
background: #000000;
padding: 24px 45px;
border-radius: 0 20px 20px 0;
font: Atyp BL Bold, 20px, white;
letter-spacing: 0.2px;
```

---

### Footer
```css
background: #6700CE;
border-radius: 30px;
padding: 60px;

/* Logo / token pill */
background: rgba(156, 117, 255, 0.1);
border-radius: 63px;
padding: 12px;
logo: 48px;
token price: Atyp BL Display-SemiBold, 24px, white, tracking: 0.24px;

/* "Buy ORDER" badge */
background: white;
border-radius: 63px;
padding: 12px;
font: Atyp BL Display-SemiBold, 14px, black, tracking: 0.14px;

/* Nav columns — gap between columns: 92px */
section header: Atyp BL Bold, 14px, white, tracking: 0.14px, capitalize;
links: Atyp BL Display-Medium, 14px, #9C75FF, tracking: 0.14px, capitalize;
link gap: 24px vertical;

/* Bottom bar */
status dot: 6px circle;
social icons: 16–20px;
copyright + Terms/Privacy: Atyp BL, 14–17px;
```

---

## Effects

| Effect | Value |
|--------|-------|
| Nav header blur | `backdrop-filter: blur(8.65px)` |
| Feature tag blur | `backdrop-filter: blur(30px)` |
| Feature tag shadow | `box-shadow: 18px 23px 40px 0px rgba(0,0,0,0.1)` |
