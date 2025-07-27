import { generateAvatar } from '$lib/avatar-generator';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  const id = params.id;
  
  // Generate avatar based on the ID string
  const svg = generateAvatar(id);
  
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      // Super aggressive caching - avatars are deterministic and never change
      'Cache-Control': 'public, max-age=31536000, immutable, stale-while-revalidate=31536000',
      'CDN-Cache-Control': 'public, max-age=31536000, immutable',
      'Surrogate-Control': 'public, max-age=31536000, immutable',
      // ETag for cache validation
      'ETag': `"${id}-v1"`,
      // Additional cache hints
      'X-Avatone-Version': '1.0.0',
      'X-Content-Type-Options': 'nosniff',
      'Vary': 'Accept-Encoding'
    }
  });
};