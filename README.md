# Avatone

Unique avatar generator for creating consistent, deterministic avatars based on input strings. Uses beautiful duotone color palettes with abstract wave patterns to create 580 unique avatar combinations.

## Features

- **Deterministic**: Same input always generates the same avatar
- **Unique**: 29 patterns × 20 color palettes = 580 unique combinations
- **Beautiful**: Carefully crafted duotone color palettes and smooth wave patterns
- **Fast**: Server-side SVG generation with built-in caching
- **Simple API**: Single endpoint - just pass any string to get an avatar

## Usage

### API Endpoint

```
GET /api/avatar/{identifier}
```

Where `{identifier}` can be any string - email, username, user ID, etc.

### Examples

```html
<!-- In HTML -->
<img src="/api/avatar/user@example.com" alt="User avatar" class="w-16 h-16 rounded-full" />

<!-- In Svelte -->
<img src="/api/avatar/{userId}" alt="Avatar for {userName}" />
```

### Pattern Gallery

Visit the homepage at `/` to:
- Try the interactive demo
- View all 580 unique combinations
- Browse individual patterns and color palettes

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Technology Stack

- **Framework**: SvelteKit
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm
- **Language**: TypeScript
- **Avatar Generation**: Server-side SVG generation with crypto hashing

## Architecture

The avatar system consists of:

1. **Avatar Generator** (`src/lib/avatar-generator.ts`): Core logic for generating SVG avatars
2. **Constants** (`src/lib/avatar-constants.ts`): Pattern and palette definitions
3. **API Routes**:
   - `/api/avatar/[id]`: Generate avatar for any identifier
   - `/api/avatar-pattern/[pattern]`: Preview specific pattern/palette combinations
4. **Demo Page** (`src/routes/+page.svelte`): Interactive gallery and documentation

## How It Works

1. Input string is hashed using MD5 to create deterministic values
2. Hash values determine pattern (0-28) and color palette (0-19)
3. SVG is generated server-side with the selected pattern and colors
4. Response is cached for 1 year (avatars are immutable for a given input)
