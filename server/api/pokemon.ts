export default defineEventHandler(async (event) => {
  const response: any = await $fetch('https://pokeapi.co/api/v2/pokemon?limit=60');
  
  // We use Promise.all to fetch types for all 60 in parallel (efficient leadership!)
  const results = await Promise.all(response.results.map(async (p: any) => {
    const id = p.url.split('/').filter(Boolean).pop();
    const detail: any = await $fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
    return {
      name: p.name,
      id: id,
      thumbnail: detail.sprites.front_default,
      type: detail.types[0].type.name // Grab the primary type
    };
  }));

  return results;
});