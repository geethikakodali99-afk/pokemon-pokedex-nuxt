<template>
  <div class="container">
    <header class="header">
      <h1>Pokédex</h1>
      <div class="search-bar">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search Pokémon by name or type..." 
        />
      </div>
    </header>

    <div class="grid">
      <NuxtLink 
        v-for="poke in filteredPokemon" 
        :key="poke.id" 
        :to="`/pokemon/${poke.name}`"
        class="card"
        :class="poke.type"
      >
        <img :src="poke.thumbnail" class="watermark-bg" alt="" />
        <div class="type-pill">
          <span class="type-icon">{{ typeIcons[poke.type] || '🐾' }}</span>
          {{ poke.type }}
        </div>
        <div class="image-container">
          <img :src="poke.thumbnail" :alt="poke.name" />
        </div>
        <p class="poke-name">{{ poke.name.toUpperCase() }}</p>
        <p class="poke-id">#{{ poke.id.toString().padStart(3, '0') }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('');
const { data: pokemon } = await useFetch('/api/pokemon');

const typeIcons: Record<string, string> = {
  fire: '🔥', water: '💧', grass: '🌿', electric: '⚡',
  bug: '🐞', poison: '🧪', normal: '⭐', fighting: '🥊',
  ground: '⛰️', fairy: '✨', psychic: '🔮', rock: '🪨',
  ghost: '👻', ice: '❄️', dragon: '🐲', flying: '🕊️', steel: '⚙️'
};

const filteredPokemon = computed(() => {
  if (!pokemon.value) return [];
  return (pokemon.value as any[]).filter(p => 
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
.container { max-width: 1100px; margin: 0 auto; padding: 20px; font-family: 'Inter', sans-serif; background-color: #FDFCF0; min-height: 100vh; }
.header { position: sticky; top: 0; background-color: #FDFCF0; z-index: 100; padding: 10px 0 20px 0; margin-bottom: 30px; }
h1 { text-align: center; color: #CC3333; font-size: 3rem; margin-bottom: 15px; }
.search-bar input { width: 100%; padding: 15px; border: 2px solid #e0e0e0; border-radius: 25px; font-size: 16px; outline: none; transition: border 0.3s; background: white; }
.search-bar input:focus { border-color: #CC3333; }

.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 25px; }
.card { border: none; padding: 20px; border-radius: 30px; text-align: center; text-decoration: none; color: #333; transition: all 0.3s ease; position: relative; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); display: flex; flex-direction: column; align-items: center; }
.watermark-bg { position: absolute; width: 140%; height: auto; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.06; pointer-events: none; z-index: 0; }
.card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }

.type-pill { position: absolute; top: 12px; right: 12px; font-size: 10px; font-weight: 800; text-transform: uppercase; background: rgba(255, 255, 255, 0.9); padding: 5px 12px; border-radius: 20px; z-index: 2; display: flex; align-items: center; gap: 4px; border: 1px solid rgba(0,0,0,0.03); color: #555; }
.image-container { z-index: 1; }
.image-container img { width: 115px; height: 115px; filter: drop-shadow(0 6px 8px rgba(0,0,0,0.08)); }
.poke-name { font-weight: 800; margin-top: 12px; margin-bottom: 4px; z-index: 1; letter-spacing: 0.5px; color: #333; }
.poke-id { font-size: 11px; color: #777; font-weight: 800; z-index: 1; }

/* --- SATURATED CREAMY PASTELS (ONE TONE DARKER) --- */
.normal   { background-color: #E2E2D2; border: 2px solid #D1D1BE; } /* Meowth - Warm Parchment */
.fighting { background-color: #F5C9C5; border: 2px solid #EBB3AF; } /* Mankey - Dusty Coral */
.fire     { background-color: #FFD1B3; border: 2px solid #F7BA94; } 
.water    { background-color: #BDD1FF; border: 2px solid #A3BCF5; }
.grass    { background-color: #C2E6B1; border: 2px solid #ACD698; }
.electric { background-color: #FDF0A3; border: 2px solid #F5E37D; }
.bug      { background-color: #E2EC94; border: 2px solid #D1DC7D; }
.poison   { background-color: #EBCCEB; border: 2px solid #D9B3D9; }
.ground   { background-color: #F5E6BA; border: 2px solid #E6D4A3; }
.fairy    { background-color: #FAD1DA; border: 2px solid #F0B8C4; }
.psychic  { background-color: #FFC2D1; border: 2px solid #F5A3B8; }
.rock     { background-color: #E2D2B8; border: 2px solid #D1BDA3; }
.ghost    { background-color: #D1C2EB; border: 2px solid #BFA9E0; }
.ice      { background-color: #C9F0F0; border: 2px solid #B3E0E0; }
.dragon   { background-color: #C2B3FF; border: 2px solid #AD99F5; }
.flying   { background-color: #D1E0FF; border: 2px solid #B8CCF5; }
.steel    { background-color: #E2E2F0; border: 2px solid #D1D1E6; }
</style>