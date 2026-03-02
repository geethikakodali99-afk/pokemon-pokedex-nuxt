<template>
  <div v-if="pokemon" class="profile-page" :class="pokemon.types[0].type.name">
    <img :src="pokemon.sprites.other['official-artwork'].front_default" class="page-watermark" alt="" />

    <div class="nav-header">
      <NuxtLink to="/" class="back-link">← Back to Pokédex</NuxtLink>
    </div>

    <div class="profile-card">
      <div class="image-bg">
        <img :src="pokemon.sprites.other['official-artwork'].front_default" :alt="pokemon.name" />
      </div>
      
      <h1>{{ pokemon.name.toUpperCase() }}</h1>
      
      <p class="type-label">
        <span class="detail-icon">{{ typeIcons[pokemon.types[0].type.name] || '🐾' }}</span>
        {{ pokemon.types[0].type.name }} Pokémon
      </p>

      <div class="stats-container">
        <div class="stat-item">
          <span class="label">Height</span>
          <span class="value">{{ pokemon.height / 10 }} m</span>
        </div>
        <div class="divider"></div>
        <div class="stat-item">
          <span class="label">Weight</span>
          <span class="value">{{ pokemon.weight / 10 }} kg</span>
        </div>
      </div>

      <div class="section">
        <h3>Abilities</h3>
        <div class="ability-tags">
          <span v-for="a in pokemon.abilities" :key="a.ability.name" class="tag">
            {{ a.ability.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">Searching for Pokémon...</div>
</template>

<script setup lang="ts">
const route = useRoute();
const { data: pokemon } = await useFetch(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`);

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
</script>

<style scoped>
.profile-page { 
  min-height: 100vh; padding: 40px 20px; transition: background 0.4s ease; 
  font-family: sans-serif; position: relative; overflow: hidden;
}

.page-watermark {
  position: absolute; width: 100%; max-width: 900px; top: 50%; left: 50%;
  transform: translate(-50%, -50%) rotate(-15deg); opacity: 0.08;
  pointer-events: none; z-index: 0;
}

.nav-header { max-width: 500px; margin: 0 auto 20px; position: relative; z-index: 1; }
.back-link { color: #333; text-decoration: none; font-weight: bold; background: rgba(255,255,255,0.7); padding: 8px 16px; border-radius: 20px; }

.profile-card { 
  max-width: 500px; margin: 0 auto; background: rgba(255, 252, 245, 0.9); 
  border-radius: 40px; padding: 40px; text-align: center;
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  position: relative; z-index: 1; backdrop-filter: blur(10px);
}

.image-bg { background: white; border-radius: 50%; width: 220px; height: 220px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 0 20px rgba(0,0,0,0.05); }
.image-bg img { width: 180px; filter: drop-shadow(4px 8px 12px rgba(0,0,0,0.1)); }

h1 { margin: 0; font-size: 2.5rem; color: #333; }

/* ICON STYLING */
.type-label { 
  text-transform: capitalize; color: #777; font-weight: bold; margin-bottom: 30px;
  display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 1.1rem;
}
.detail-icon { font-size: 1.4rem; }

.stats-container { display: flex; justify-content: center; align-items: center; gap: 40px; margin-bottom: 30px; }
.stat-item { display: flex; flex-direction: column; }
.label { font-size: 12px; color: #999; text-transform: uppercase; margin-bottom: 5px; }
.value { font-size: 18px; font-weight: bold; color: #333; }
.divider { width: 2px; height: 40px; background: #eee; }

.section h3 { font-size: 14px; text-transform: uppercase; color: #999; margin-bottom: 15px; }
.ability-tags { display: flex; gap: 10px; justify-content: center; }
.tag { background: #eee; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; text-transform: capitalize; }

/* PALETTE */
.normal { background-color: #F5F5F5; }
.fighting { background-color: #FFE0B2; }
.fire { background-color: #FFCDD2; }
.water { background-color: #BBDEFB; }
.grass { background-color: #DCEDC8; }
.electric { background-color: #FFF9C4; }
.bug { background-color: #DCE775; }
.poison { background-color: #E1BEE7; }
.ground { background-color: #D7CCC8; }
.fairy { background-color: #F8BBD0; }
.psychic { background-color: #FBC2C2; }
.rock { background-color: #BCAAA4; }
.ghost { background-color: #D1C4E9; }
.ice { background-color: #B2EBF2; }
.dragon { background-color: #C5CAE9; }
.flying { background-color: #B3E5FC; }
.steel { background-color: #CFD8DC; }
</style>