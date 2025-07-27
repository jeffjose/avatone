import type { RequestHandler } from './$types';
import { DUOTONE_PALETTES, PATTERN_COUNT } from '$lib/avatar-constants';

function generatePatternPreview(patternType: number, paletteIndex: number = 0): string {
  if (patternType < 0 || patternType >= PATTERN_COUNT) {
    throw new Error('Invalid pattern type');
  }
  
  const palette = DUOTONE_PALETTES[paletteIndex % DUOTONE_PALETTES.length];
  let pattern = '';
  
  // This is a simplified version - in production, you'd import the pattern generation logic
  // For now, we'll just create a simple placeholder that shows the pattern number
  switch (patternType) {
    case 0: // Diagonal stripes (thin)
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        ${Array.from({ length: 20 }, (_, i) => {
          const x = i * 10 - 100;
          const color = palette[(i % 4) + 1];
          return `<path d="M${x},100 L${x+100},0 L${x+110},0 L${x+10},100 Z" fill="${color}"/>`;
        }).join('')}
      `;
      break;
      
    case 1: // Diagonal stripes (thick)
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        ${Array.from({ length: 10 }, (_, i) => {
          const x = i * 20 - 100;
          const color = palette[(i % 4) + 1];
          return `<path d="M${x},100 L${x+100},0 L${x+120},0 L${x+20},100 Z" fill="${color}"/>`;
        }).join('')}
      `;
      break;
      
    case 2: // Horizontal stripes (varying widths)
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        <rect x="0" y="15" width="100" height="10" fill="${palette[1]}"/>
        <rect x="0" y="30" width="100" height="15" fill="${palette[2]}"/>
        <rect x="0" y="50" width="100" height="8" fill="${palette[3]}"/>
        <rect x="0" y="65" width="100" height="20" fill="${palette[2]}"/>
        <rect x="0" y="90" width="100" height="10" fill="${palette[1]}"/>
      `;
      break;
      
    case 3: // Vertical stripes
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        ${Array.from({ length: 10 }, (_, i) => {
          const x = i * 10;
          const color = palette[(i % 4) + 1];
          return `<rect x="${x}" y="0" width="10" height="100" fill="${color}"/>`;
        }).join('')}
      `;
      break;
      
    case 4: // Checkerboard (medium)
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        ${Array.from({ length: 5 }, (_, i) => {
          return Array.from({ length: 5 }, (_, j) => {
            if ((i + j) % 2 === 1) {
              const colorIndex = ((Math.floor(i/2) + Math.floor(j/2)) % 2 === 0) ? 2 : 3;
              return `<rect x="${i * 20}" y="${j * 20}" width="20" height="20" fill="${palette[colorIndex]}"/>`;
            }
            return '';
          }).join('');
        }).join('')}
      `;
      break;
      
    case 5: // Checkerboard (large)
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        <rect x="0" y="0" width="50" height="50" fill="${palette[2]}"/>
        <rect x="50" y="50" width="50" height="50" fill="${palette[2]}"/>
      `;
      break;
      
    case 6: // Wave pattern (horizontal)
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        <path d="M0,20 Q25,10 50,20 T100,20 L100,40 Q75,30 50,40 T0,40 Z" fill="${palette[1]}"/>
        <path d="M0,40 Q25,30 50,40 T100,40 L100,60 Q75,50 50,60 T0,60 Z" fill="${palette[2]}"/>
        <path d="M0,60 Q25,50 50,60 T100,60 L100,80 Q75,70 50,80 T0,80 Z" fill="${palette[3]}"/>
        <path d="M0,80 Q25,70 50,80 T100,80 L100,100 L0,100 Z" fill="${palette[2]}"/>
      `;
      break;
      
    case 7: // Wave pattern (vertical)
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        <path d="M20,0 Q10,25 20,50 T20,100 L40,100 Q30,75 40,50 T40,0 Z" fill="${palette[1]}"/>
        <path d="M40,0 Q30,25 40,50 T40,100 L60,100 Q50,75 60,50 T60,0 Z" fill="${palette[2]}"/>
        <path d="M60,0 Q50,25 60,50 T60,100 L80,100 Q70,75 80,50 T80,0 Z" fill="${palette[3]}"/>
        <path d="M80,0 Q70,25 80,50 T80,100 L100,100 L100,0 Z" fill="${palette[2]}"/>
      `;
      break;
      
    case 8: // Smooth gradient waves
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        <path d="M0,25 C15,15 35,35 50,25 C65,15 85,35 100,25 L100,45 C85,55 65,35 50,45 C35,55 15,35 0,45 Z" fill="${palette[1]}"/>
        <path d="M0,45 C15,35 35,55 50,45 C65,35 85,55 100,45 L100,65 C85,75 65,55 50,65 C35,75 15,55 0,65 Z" fill="${palette[2]}"/>
        <path d="M0,65 C15,55 35,75 50,65 C65,55 85,75 100,65 L100,85 C85,95 65,75 50,85 C35,95 15,75 0,85 Z" fill="${palette[3]}"/>
        <path d="M0,85 C15,75 35,95 50,85 C65,75 85,95 100,85 L100,100 L0,100 Z" fill="${palette[4]}"/>
      `;
      break;
      
    case 9: // Layered sine waves
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        ${Array.from({ length: 5 }, (_, i) => {
          const y = 15 + i * 12;
          const amplitude = 8 - i * 1.5;
          const frequency = 0.15 + i * 0.02;
          const color = palette[i % 5];
          let path = `M0,${y}`;
          for (let x = 0; x <= 100; x += 3) {
            const yOffset = Math.sin(x * frequency) * amplitude;
            path += ` L${x},${y + yOffset}`;
          }
          path += ` L100,100 L0,100 Z`;
          return `<path d="${path}" fill="${color}" opacity="${0.85 - i * 0.12}"/>`;
        }).join('')}
      `;
      break;
      
    case 10: // Chevron stripes
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        ${Array.from({ length: 5 }, (_, i) => {
          const y = i * 20;
          const color = palette[(i % 4) + 1];
          return `<path d="M0,${y+10} L50,${y} L100,${y+10} L100,${y+20} L50,${y+10} L0,${y+20} Z" fill="${color}"/>`;
        }).join('')}
      `;
      break;
      
    case 11: // Diamond grid
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        ${Array.from({ length: 5 }, (_, i) => {
          return Array.from({ length: 5 }, (_, j) => {
            const x = i * 20 + 10;
            const y = j * 20 + 10;
            const color = palette[((i + j) % 3) + 2];
            return `<polygon points="${x},${y-10} ${x+10},${y} ${x},${y+10} ${x-10},${y}" fill="${color}"/>`;
          }).join('');
        }).join('')}
      `;
      break;
      
    case 12: // Zigzag horizontal
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        ${Array.from({ length: 4 }, (_, i) => {
          const y = i * 25;
          const color = palette[(i % 3) + 1];
          let path = `M0,${y}`;
          for (let x = 0; x <= 100; x += 20) {
            const yOffset = (x / 20) % 2 === 0 ? 0 : 15;
            path += ` L${x},${y + yOffset}`;
          }
          path += ` L100,${y + 25} L0,${y + 25} Z`;
          return `<path d="${path}" fill="${color}"/>`;
        }).join('')}
      `;
      break;
      
    case 13: // Dots in grid
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        ${Array.from({ length: 5 }, (_, i) => {
          return Array.from({ length: 5 }, (_, j) => {
            const x = i * 20 + 10;
            const y = j * 20 + 10;
            const r = ((i + j) % 3) + 5;
            const color = palette[((i + j) % 3) + 2];
            return `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
          }).join('');
        }).join('')}
      `;
      break;
      
    case 14: // Alternating columns
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        <rect x="0" y="0" width="20" height="100" fill="${palette[2]}"/>
        <rect x="40" y="0" width="20" height="100" fill="${palette[3]}"/>
        <rect x="80" y="0" width="20" height="100" fill="${palette[2]}"/>
        <rect x="20" y="0" width="20" height="50" fill="${palette[1]}"/>
        <rect x="60" y="0" width="20" height="50" fill="${palette[1]}"/>
        <rect x="20" y="50" width="20" height="50" fill="${palette[4]}"/>
        <rect x="60" y="50" width="20" height="50" fill="${palette[4]}"/>
      `;
      break;
      
    case 15: // Triangular grid
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        ${Array.from({ length: 5 }, (_, i) => {
          return Array.from({ length: 5 }, (_, j) => {
            const x = i * 20;
            const y = j * 20;
            const color1 = palette[((i + j) % 3) + 1];
            const color2 = palette[((i + j + 1) % 3) + 1];
            return `
              <polygon points="${x},${y} ${x+20},${y} ${x+10},${y+20}" fill="${color1}"/>
              <polygon points="${x},${y+20} ${x+20},${y+20} ${x+10},${y}" fill="${color2}" opacity="0.5"/>
            `;
          }).join('');
        }).join('')}
      `;
      break;
      
    case 16: // Wave flow (diagonal)
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        <path d="M0,0 Q50,0 50,50 T100,100 L100,100 Q50,100 50,50 T0,0" fill="${palette[1]}"/>
        <path d="M0,20 Q40,20 40,60 T80,100 L100,100 Q60,100 60,60 T20,20 L0,20" fill="${palette[2]}"/>
        <path d="M20,0 Q60,0 60,40 T100,80 L100,100 Q60,100 60,60 T20,20 L20,0" fill="${palette[3]}"/>
      `;
      break;
      
    case 17: // Flowing wave bands
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        <path d="M0,10 C30,5 70,15 100,10 L100,30 C70,35 30,25 0,30 Z" fill="${palette[1]}"/>
        <path d="M0,30 C30,25 70,35 100,30 L100,50 C70,55 30,45 0,50 Z" fill="${palette[2]}"/>
        <path d="M0,50 C30,45 70,55 100,50 L100,70 C70,75 30,65 0,70 Z" fill="${palette[3]}"/>
        <path d="M0,70 C30,65 70,75 100,70 L100,90 C70,95 30,85 0,90 Z" fill="${palette[4]}"/>
        <path d="M0,90 C30,85 70,95 100,90 L100,100 L0,100 Z" fill="${palette[2]}"/>
      `;
      break;
      
    case 18: // Gradient stripes
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        <rect x="0" y="0" width="100" height="25" fill="${palette[1]}"/>
        <rect x="0" y="25" width="100" height="25" fill="${palette[2]}"/>
        <rect x="0" y="50" width="100" height="25" fill="${palette[3]}"/>
        <rect x="0" y="75" width="100" height="25" fill="${palette[4]}"/>
      `;
      break;
      
    case 19: // Smooth wave layers (vertical)
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        <path d="M25,0 C15,20 35,30 25,50 C15,70 35,80 25,100 L45,100 C55,80 35,70 45,50 C55,30 35,20 45,0 Z" fill="${palette[1]}"/>
        <path d="M45,0 C35,20 55,30 45,50 C35,70 55,80 45,100 L65,100 C75,80 55,70 65,50 C75,30 55,20 65,0 Z" fill="${palette[2]}"/>
        <path d="M65,0 C55,20 75,30 65,50 C55,70 75,80 65,100 L85,100 C95,80 75,70 85,50 C95,30 75,20 85,0 Z" fill="${palette[3]}"/>
        <path d="M85,0 C75,20 95,30 85,50 C75,70 95,80 85,100 L100,100 L100,0 Z" fill="${palette[4]}"/>
      `;
      break;
      
    case 20: // Wave curves (smooth)
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        <path d="M0,30 C20,20 30,40 50,30 C70,20 80,40 100,30 L100,50 C80,60 70,40 50,50 C30,60 20,40 0,50 Z" fill="${palette[1]}"/>
        <path d="M0,50 C20,40 30,60 50,50 C70,40 80,60 100,50 L100,70 C80,80 70,60 50,70 C30,80 20,60 0,70 Z" fill="${palette[2]}"/>
        <path d="M0,70 C20,60 30,80 50,70 C70,60 80,80 100,70 L100,100 L0,100 Z" fill="${palette[3]}"/>
      `;
      break;
      
    case 21: // Wave interference
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        <path d="M0,0 Q25,50 50,0 T100,0 L100,100 Q75,50 50,100 T0,100 Z" fill="${palette[1]}" opacity="0.8"/>
        <path d="M0,0 Q50,25 0,50 T0,100 L100,100 Q50,75 100,50 T100,0 Z" fill="${palette[2]}" opacity="0.6"/>
        <circle cx="50" cy="50" r="20" fill="${palette[3]}" opacity="0.8"/>
      `;
      break;
      
    case 22: // Sine wave layers
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        ${Array.from({ length: 4 }, (_, i) => {
          const y = 20 + i * 15;
          const amplitude = 10 - i * 2;
          const color = palette[i + 1];
          let path = `M0,${y}`;
          for (let x = 0; x <= 100; x += 5) {
            const yOffset = Math.sin(x * 0.1) * amplitude;
            path += ` L${x},${y + yOffset}`;
          }
          path += ` L100,100 L0,100 Z`;
          return `<path d="${path}" fill="${color}" opacity="${0.9 - i * 0.1}"/>`;
        }).join('')}
      `;
      break;
      
    case 23: // Wave mesh
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        ${Array.from({ length: 5 }, (_, i) => {
          const offset = i * 20;
          const color = palette[(i % 4) + 1];
          return `<path d="M${offset},0 Q${offset+10},50 ${offset+20},100 L${offset+10},100 Q${offset},50 ${offset-10},0 Z" fill="${color}" opacity="0.7"/>`;
        }).join('')}
      `;
      break;
      
    case 24: // Harmonic resonance
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        ${Array.from({ length: 4 }, (_, i) => {
          const baseFreq = 0.1;
          const harmonic = i + 1;
          const y = 50;
          const amplitude = 20 / harmonic;
          const color = palette[i + 1];
          let path = `M0,${y}`;
          for (let x = 0; x <= 100; x += 2) {
            const y1 = Math.sin(x * baseFreq * harmonic) * amplitude;
            const y2 = Math.sin(x * baseFreq * harmonic * 2) * amplitude * 0.3;
            const yOffset = y1 + y2;
            path += ` L${x},${y + yOffset}`;
          }
          path += ` L100,100 L0,100 Z`;
          return `<path d="${path}" fill="${color}" opacity="${0.6 - i * 0.1}"/>`;
        }).join('')}
      `;
      break;
      
    case 25: // Ocean waves
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        <path d="M0,70 Q20,60 40,70 T80,70 Q90,65 100,70 L100,100 L0,100 Z" fill="${palette[4]}"/>
        <path d="M0,60 Q25,50 50,60 T100,60 L100,70 Q80,75 60,70 T20,70 Q10,72 0,70 Z" fill="${palette[3]}"/>
        <path d="M0,50 Q30,40 60,50 T100,50 L100,60 Q70,65 40,60 T0,60 Z" fill="${palette[2]}"/>
        <path d="M0,40 Q35,30 70,40 Q85,35 100,40 L100,50 Q65,55 30,50 T0,50 Z" fill="${palette[1]}"/>
      `;
      break;
      
    case 26: // Smooth undulating waves
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        <path d="M0,20 C25,10 25,30 50,20 C75,10 75,30 100,20 L100,40 C75,50 75,30 50,40 C25,50 25,30 0,40 Z" fill="${palette[1]}"/>
        <path d="M0,40 C25,30 25,50 50,40 C75,30 75,50 100,40 L100,60 C75,70 75,50 50,60 C25,70 25,50 0,60 Z" fill="${palette[2]}"/>
        <path d="M0,60 C25,50 25,70 50,60 C75,50 75,70 100,60 L100,80 C75,90 75,70 50,80 C25,90 25,70 0,80 Z" fill="${palette[3]}"/>
        <path d="M0,80 C25,70 25,90 50,80 C75,70 75,90 100,80 L100,100 L0,100 Z" fill="${palette[4]}"/>
      `;
      break;
      
    case 27: // Flowing ribbons
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        <path d="M0,20 C30,10 70,30 100,20 L100,40 C70,50 30,30 0,40 Z" fill="${palette[1]}"/>
        <path d="M0,40 C30,30 70,50 100,40 L100,60 C70,70 30,50 0,60 Z" fill="${palette[2]}"/>
        <path d="M0,60 C30,50 70,70 100,60 L100,80 C70,90 30,70 0,80 Z" fill="${palette[3]}"/>
        <path d="M0,80 C30,70 70,90 100,80 L100,100 L0,100 Z" fill="${palette[2]}"/>
      `;
      break;
      
    case 28: // Wave cascade
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        ${Array.from({ length: 6 }, (_, i) => {
          const y = i * 15 + 10;
          const amplitude = 8 + (i % 3) * 4;
          const freq = 0.08 + (i % 2) * 0.04;
          let path = `M0,${y}`;
          for (let x = 0; x <= 100; x += 3) {
            const yOffset = Math.sin(x * freq + i) * amplitude;
            path += ` L${x},${y + yOffset}`;
          }
          path += ` L100,100 L0,100 Z`;
          return `<path d="${path}" fill="${palette[(i % 4) + 1]}" opacity="${0.85 - i * 0.12}"/>`;
        }).join('')}
      `;
      break;
      
    default:
      // Fallback pattern
      pattern = `
        <rect x="0" y="0" width="100" height="100" fill="${palette[0]}"/>
        <text x="50" y="50" text-anchor="middle" dy=".3em" fill="${palette[3]}" font-size="20">${patternType}</text>
      `;
  }
  
  // Create the SVG with circular clipping
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <defs>
      <clipPath id="circle-pattern">
        <circle cx="50" cy="50" r="50"/>
      </clipPath>
    </defs>
    <g clip-path="url(#circle-pattern)">
      ${pattern}
    </g>
  </svg>`;
  
  return svg;
}

export const GET: RequestHandler = async ({ params, url }) => {
  const patternType = parseInt(params.pattern);
  const colorParam = url.searchParams.get('color');
  const paletteIndex = colorParam ? parseInt(colorParam) : 0;
  
  if (isNaN(patternType) || patternType < 0 || patternType >= PATTERN_COUNT) {
    return new Response('Invalid pattern type', { status: 400 });
  }
  
  const svg = generatePatternPreview(patternType, paletteIndex);
  
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=864000'
    }
  });
};