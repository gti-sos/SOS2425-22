<svelte:head>
    <title> API externa 2</title>
</svelte:head>

<script>
// @ts-nocheck

    let input = '';
    // @ts-ignore
    let pokemon = null;
    let error = '';
    let isLoading = false;
  
    async function search() {
      if (!input) return;
      
      isLoading = true;
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`);
        if (!res.ok) throw new Error('No encontrado');
        const data = await res.json();
        pokemon = {
          name: data.name,
          id: data.id,
          img: data.sprites.front_default,
          // @ts-ignore
          types: data.types.map(t => t.type.name),
          // @ts-ignore
          stats: data.stats.map(s => ({
            name: s.stat.name.replace('-', ' '),
            value: s.base_stat
          })),
          weight: data.weight / 10,
          height: data.height / 10
        };
        error = '';
      } catch {
        pokemon = null;
        error = '¡Pokémon no encontrado!';
      } finally {
        isLoading = false;
      }
    }
  </script>
  
  <style>
    div, form { max-width: 220px; margin: 10px auto }
    input, button { width: 100%; padding: 8px; margin: 5px 0 }
    button { background: #FF3E00; color: white; border: none }
    img { width: 96px; height: 96px }
    .type { display: inline-block; background: #eee; padding: 2px 8px; margin: 2px; border-radius: 10px }
    .stat { font-size: 14px; margin: 3px 0 }
    .stat-name { color: #666 }
    .number { font-weight: bold }
  </style>
  
  <div>
    <form on:submit|preventDefault={search}>
      <input bind:value={input} placeholder="Nombre o ID" disabled={isLoading}>
      <button disabled={isLoading}>
        {isLoading ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
    
    {#if pokemon}
      <h3>#{pokemon.id} {pokemon.name}</h3>
      <img src={pokemon.img} alt={pokemon.name}>
      <div>
        {#each pokemon.types as type}
          <span class="type">{type}</span>
        {/each}
      </div>
      <div>
        <div>Altura: {pokemon.height}m</div>
        <div>Peso: {pokemon.weight}kg</div>
      </div>
      {#each pokemon.stats as stat}
        <div class="stat">
          <span class="stat-name">{stat.name}:</span>
          <span class="number">{stat.value}</span>
        </div>
      {/each}
    {:else if error}
      <p>{error}</p>
    {/if}
  </div>