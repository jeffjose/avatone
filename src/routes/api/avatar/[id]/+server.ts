import { generateAvatar } from '$lib/avatar-generator';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  const id = params.id;
  
  // Generate avatar based on the ID string
  const svg = generateAvatar(id);
  
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
      'X-Avatone-Version': '1.0.0'
    }
  });
};