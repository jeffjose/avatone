# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Avatone is a unique avatar generator that creates consistent, deterministic avatars based on input strings. It uses duotone color palettes with abstract wave patterns to generate 580 unique avatar combinations.

## Technology Stack

- **Framework**: SvelteKit
- **Styling**: Tailwind CSS v4 (using @import syntax)
- **UI Components**: shadcn/ui (when needed)
- **Package Manager**: pnpm
- **Language**: TypeScript

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev                # Start dev server
pnpm dev -- --open     # Start and open in browser

# Build and preview
pnpm build             # Build for production
pnpm preview           # Preview production build

# Code quality
pnpm check             # Type check
pnpm check:watch       # Type check in watch mode
```

## Project Structure

```
src/
├── lib/
│   ├── avatar-generator.ts    # Core avatar generation logic
│   ├── avatar-constants.ts    # Patterns and palettes (client-safe)
│   └── index.ts              # Re-exports
├── routes/
│   ├── +page.svelte          # Interactive demo and gallery
│   └── api/
│       ├── avatar/[id]/      # Main avatar generation endpoint
│       └── avatar-pattern/   # Pattern preview endpoint
└── app.css                   # Tailwind CSS imports
```

## Key Implementation Details

### Avatar Generation

1. **Deterministic**: Uses MD5 hashing to ensure same input always produces same avatar
2. **Two-hash system**: Generates independent hash values for pattern and palette selection
3. **SVG-based**: Server-side SVG generation with circular clipping
4. **Caching**: Avatars are cached for 1 year (immutable for given input)

### Pattern System

- 29 unique patterns (0-28) defined in `avatar-generator.ts`
- Patterns include waves, stripes, checkerboards, and geometric designs
- Each pattern uses up to 5 colors from the selected palette

### Color Palettes

- 20 duotone palettes defined in `avatar-constants.ts`
- Each palette contains 5 carefully selected colors
- Palettes are named (e.g., "Ocean", "Sunset", "Berry")

### API Design

- **Simple**: Single string parameter generates unique avatar
- **RESTful**: `GET /api/avatar/{identifier}`
- **Flexible**: Accepts any string (email, username, ID, etc.)
- **Pattern Preview**: `GET /api/avatar-pattern/{pattern}?color={palette}`

## Development Guidelines

1. **Pattern Addition**: Add new patterns to the switch statement in `generatePattern()`
2. **Palette Addition**: Add new palettes to `DUOTONE_PALETTES` array
3. **Performance**: Keep SVG generation lightweight for fast response times
4. **Caching**: Leverage browser caching with immutable cache headers
5. **Type Safety**: Maintain TypeScript types for all pattern and palette indices