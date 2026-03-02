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

// Icon mapping for kid-friendly UI
const typeIcons: Record<string, string> = {
  fire: '🔥',
  water: '💧',
  grass: '🌿',
  electric: '⚡',
  bug: '🐞',
  poison: '🧪',
  normal: '⭐',
  fighting: '🥊',
  ground: '⛰️',
  fairy: '✨',
  psychic: '🔮',
  rock: '🪨',
  ghost: '👻',
  ice: '❄️',
  dragon: '🐲',
  flying: '🕊️',
  steel: '⚙️'
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
.container { 
  max-width: 1100px; margin: 0 auto; padding: 20px; 
  font-family: 'Inter', sans-serif; background-color: #FDFCF0; min-height: 100vh;
}
.header {
  position: sticky; top: 0; background-color: #FDFCF0;
  z-index: 100; padding: 10px 0 20px 0; margin-bottom: 30px;
}
h1 { text-align: center; color: #CC3333; font-size: 3rem; margin-bottom: 15px; }
.search-bar input { 
  width: 100%; padding: 15px; border: 3px solid #eee; 
  border-radius: 25px; font-size: 16px; outline: none;
}
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 25px; }

.card { 
  border: none; padding: 20px; border-radius: 30px; text-align: center; 
  text-decoration: none; color: #333; transition: all 0.3s ease; 
  position: relative; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  display: flex; flex-direction: column; align-items: center;
}

.watermark-bg {
  position: absolute; width: 140%; height: auto; top: 50%; left: 50%;
  transform: translate(-50%, -50%); opacity: 0.07; pointer-events: none; z-index: 0;
}

.card:hover { transform: translateY(-8px); box-shadow: 0 12px 20px rgba(0,0,0,0.1); }

/* UPDATED PILL STYLE */
.type-pill {
  position: absolute; top: 12px; right: 12px; font-size: 10px; font-weight: bold;
  text-transform: uppercase; background: rgba(255, 255, 255, 0.9);
  padding: 6px 14px; border-radius: 20px; z-index: 2;
  display: flex; align-items: center; gap: 4px;
}
.type-icon { font-size: 12px; }

.image-container { z-index: 1; }
.image-container img { width: 120px; height: 120px; filter: drop-shadow(2px 6px 8px rgba(0,0,0,0.1)); }

.poke-name { font-weight: 800; margin-top: 15px; margin-bottom: 5px; z-index: 1; }
.poke-id { font-size: 12px; color: #777; font-weight: bold; z-index: 1; }

/* PALETTE */
.normal { background-color: #F5F5F5; border: 2px solid #E0E0E0; }
.fighting { background-color: #FFF3E0; border: 2px solid #FFE0B2; }
.fire { background-color: #FFEBEC; border: 2px solid #FFCDD2; }
.water { background-color: #E3F2FD; border: 2px solid #BBDEFB; }
.grass { background-color: #F1F8E9; border: 2px solid #DCEDC8; }
.electric { background-color: #FFFDE7; border: 2px solid #FFF9C4; }
.bug { background-color: #F0F4C3; border: 2px solid #DCE775; }
.poison { background-color: #F3E5F5; border: 2px solid #E1BEE7; }
.ground { background-color: #EFEBE9; border: 2px solid #D7CCC8; }
.fairy { background-color: #FCE4EC; border: 2px solid #F8BBD0; }
.psychic { background-color: #FFF1F1; border: 2px solid #FBC2C2; }
.rock { background-color: #D7CCC8; border: 2px solid #BCAAA4; }
.ghost { background-color: #EDE7F6; border: 2px solid #D1C4E9; }
.ice { background-color: #E0F7FA; border: 2px solid #B2EBF2; }
.dragon { background-color: #E8EAF6; border: 2px solid #C5CAE9; }
.flying { background-color: #E1F5FE; border: 2px solid #B3E5FC; }
.steel { background-color: #ECEFF1; border: 2px solid #CFD8DC; }
</style>