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
        <div class="type-pill">{{ poke.type }}</div>
        <div class="image-container">
          <img :src="poke.thumbnail" :alt="poke.name" />
        </div>
        <p class="poke-name">{{ poke.name.toUpperCase() }}</p>
        <p class="poke-id">#{{ poke.id.padStart(3, '0') }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('');

// Fetching enhanced data from your internal API
const { data: pokemon } = await useFetch('/api/pokemon');

const filteredPokemon = computed(() => {
  if (!pokemon.value) return [];
  return (pokemon.value as any[]).filter(p => 
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
.container { max-width: 1100px; margin: 0 auto; padding: 20px; font-family: 'Inter', sans-serif; }

/* Sticky Header Logic */
.header {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
  padding: 10px 0 20px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
}

h1 { text-align: center; color: #333; margin-bottom: 20px; }

.search-bar input { 
  width: 100%; 
  padding: 15px; 
  border: 2px solid #eee; 
  border-radius: 12px; 
  font-size: 16px; 
  outline: none;
  transition: border-color 0.3s;
}

.search-bar input:focus { border-color: #ef5350; }

.grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); 
  gap: 25px; 
}

/* Card Styling with Type-Based Colors */
.card { 
  border: 1px solid #eee; 
  padding: 20px; 
  border-radius: 20px; 
  text-align: center; 
  text-decoration: none; 
  color: #333; 
  transition: all 0.3s ease; 
  position: relative;
  overflow: hidden;
}

.card:hover { transform: translateY(-8px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }

.type-pill {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.7);
  padding: 4px 10px;
  border-radius: 20px;
}

.image-container img { width: 120px; height: 120px; filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.1)); }

.poke-name { font-weight: 800; margin-top: 15px; margin-bottom: 5px; letter-spacing: 1px; }

.poke-id { font-size: 12px; color: #777; margin: 0; }

/* Dynamic Background Colors based on Type */
.fire { background-color: #ffebec; border-color: #ffcdd2; }
.water { background-color: #e3f2fd; border-color: #bbdefb; }
.grass { background-color: #f1f8e9; border-color: #dcedc8; }
.electric { background-color: #fffde7; border-color: #fff9c4; }
.bug { background-color: #f5f5f5; border-color: #e0e0e0; }
.poison { background-color: #f3e5f5; border-color: #e1bee7; }
.normal { background-color: #fafafa; border-color: #f5f5f5; }
.ground { background-color: #fff3e0; border-color: #ffe0b2; }
.fairy { background-color: #fce4ec; border-color: #f8bbd0; }
</style>