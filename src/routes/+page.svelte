<script lang="ts">
  import { PATTERN_COUNT, PATTERN_NAMES, PALETTE_NAMES } from '$lib/avatar-constants';
  
  let inputText = '';
  let selectedPattern = 0;
  let selectedPalette = 0;
  
  // Sample strings for demo
  const demoStrings = [
    'alice@example.com',
    'bob@company.org', 
    'charlie',
    'david123',
    'emma.wilson',
    'frank_jones',
    'grace2024',
    'henry.smith@domain.com',
    'isabella',
    'jack.brown',
    'kate_anderson',
    'liam.taylor@email.com'
  ];
  
  const patternNames = PATTERN_NAMES;
  const paletteNames = PALETTE_NAMES;
</script>

<svelte:head>
  <title>Avatone - Unique Avatar Generator</title>
  <meta name="description" content="Generate consistent, deterministic avatars with beautiful duotone patterns" />
</svelte:head>

<div class="min-h-screen bg-gray-900">
  <!-- Header -->
  <header class="bg-gray-800 shadow-sm border-b border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-100">Avatone</h1>
        <p class="text-sm text-gray-400">29 patterns × 20 palettes = 580 unique avatars</p>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Interactive Demo -->
    <section class="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4 text-gray-100">Try It Out</h2>
      <div class="flex gap-4 items-end mb-6">
        <div class="flex-1">
          <label for="input" class="block text-sm font-medium text-gray-300 mb-1">
            Enter any text (email, username, ID, etc.)
          </label>
          <input
            id="input"
            type="text"
            bind:value={inputText}
            placeholder="e.g. user@example.com"
            class="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div class="flex items-center gap-2">
          {#if inputText}
            <img
              src="/avatar/{encodeURIComponent(inputText)}"
              alt="Generated avatar"
              class="w-24 h-24 rounded-full shadow-lg"
            />
          {:else}
            <div class="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-gray-500">
              <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          {/if}
        </div>
      </div>
      
      <!-- API Example -->
      <div class="bg-gray-900 rounded p-4 font-mono text-sm">
        <p class="text-gray-400 mb-1">API Endpoint:</p>
        <code class="text-gray-100">
          GET /avatar/{inputText || '{identifier}'}
        </code>
      </div>
    </section>

    <!-- Sample Avatars -->
    <section class="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4 text-gray-100">Sample Avatars</h2>
      <div class="grid grid-cols-6 md:grid-cols-12 gap-3">
        {#each demoStrings as str}
          <div class="flex flex-col items-center">
            <img
              src="/avatar/{encodeURIComponent(str)}"
              alt="Avatar for {str}"
              class="w-16 h-16 rounded-full shadow"
            />
            <p class="text-xs text-gray-400 mt-1 text-center truncate w-full">
              {str.split('@')[0]}
            </p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Pattern Gallery -->
    <section class="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4 text-gray-100">All Patterns</h2>
      
      <!-- Pattern Selector -->
      <div class="mb-6 flex gap-4">
        <div class="flex-1">
          <label for="pattern" class="block text-sm font-medium text-gray-300 mb-1">
            Pattern
          </label>
          <select
            id="pattern"
            bind:value={selectedPattern}
            class="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {#each patternNames as name, i}
              <option value={i}>{i}: {name}</option>
            {/each}
          </select>
        </div>
        
        <div class="flex-1">
          <label for="palette" class="block text-sm font-medium text-gray-300 mb-1">
            Color Palette
          </label>
          <select
            id="palette"
            bind:value={selectedPalette}
            class="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {#each paletteNames as name, i}
              <option value={i}>{name}</option>
            {/each}
          </select>
        </div>
      </div>
      
      <!-- Pattern Preview -->
      <div class="bg-gray-900 rounded p-8 flex justify-center">
        <img
          src="/avatar/pattern/{selectedPattern}?color={selectedPalette}"
          alt="Pattern {selectedPattern} with palette {selectedPalette}"
          class="w-32 h-32 rounded-full shadow-lg"
        />
      </div>
    </section>

    <!-- Pattern Grid -->
    <section class="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-100">All 580 Unique Combinations</h2>
      <p class="text-sm text-gray-400 mb-6">Each row shows one pattern with all 20 color palettes</p>
      
      <div class="space-y-6 max-h-[600px] overflow-y-auto">
        {#each Array(PATTERN_COUNT) as _, patternIndex}
          <div>
            <h3 class="text-sm font-medium text-gray-300 mb-2">
              {patternIndex}: {patternNames[patternIndex]}
            </h3>
            <div class="grid grid-cols-10 lg:grid-cols-20 gap-2">
              {#each Array(20) as _, paletteIndex}
                <div class="group relative">
                  <img
                    src="/avatar/pattern/{patternIndex}?color={paletteIndex}"
                    alt="{patternNames[patternIndex]} - {paletteNames[paletteIndex]}"
                    class="w-12 h-12 rounded-full shadow hover:shadow-md transition-shadow"
                  />
                  <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p class="text-xs bg-gray-950 text-gray-100 px-2 py-1 rounded whitespace-nowrap">
                      {paletteNames[paletteIndex]}
                    </p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </section>
  </main>
</div>

<style>
  /* Add any custom styles here */
</style>