<template>
  <div class="profile-container">
    <NuxtLink to="/" class="back-button">← Back to List</NuxtLink>
    
    <div v-if="pokemon" class="profile-card">
      <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
      <h1>{{ pokemon.name.toUpperCase() }}</h1>
      
      <div class="stats">
        <p><strong>Height:</strong> {{ pokemon.height / 10 }} m</p>
        <p><strong>Weight:</strong> {{ pokemon.weight / 10 }} kg</p>
      </div>

      <h3>Abilities</h3>
      <ul>
        <li v-for="ability in pokemon.abilities" :key="ability.ability.name">
          {{ ability.ability.name }}
        </li>
      </ul>
    </div>
    <div v-else>Loading Pokémon details...</div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const pokemonName = route.params.name;

// Fetch details directly from the public API for the specific pokemon
const { data: pokemon } = await useFetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
</script>

<style scoped>
.profile-container { max-width: 600px; margin: 40px auto; padding: 20px; font-family: sans-serif; text-align: center; }
.back-button { display: inline-block; margin-bottom: 20px; text-decoration: none; color: #ef5350; font-weight: bold; }
.profile-card { border: 1px solid #ddd; padding: 30px; border-radius: 20px; background: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
.profile-card img { width: 200px; height: 200px; }
.stats { display: flex; justify-content: space-around; margin: 20px 0; border-top: 1px solid #eee; padding-top: 20px; }
ul { list-style: none; padding: 0; }
li { background: #eee; margin: 5px; padding: 5px 15px; display: inline-block; border-radius: 20px; font-size: 14px; }
</style>