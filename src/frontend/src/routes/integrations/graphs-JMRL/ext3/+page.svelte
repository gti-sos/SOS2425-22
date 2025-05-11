<svelte:head>
    <title> API externa 3</title>
</svelte:head>

<script>
// @ts-nocheck

    let name = '';
    // @ts-ignore
    let prediction = null;
    let isLoading = false;
    // @ts-ignore
    let error = null;
  
    async function predictAge() {
      if (!name.trim()) {
        error = 'Por favor ingresa un nombre';
        return;
      }
  
      isLoading = true;
      error = null;
      
      try {
        const response = await fetch(`https://api.agify.io?name=${name}`);
        const data = await response.json();
        
        if (!data.age) {
          throw new Error('No se pudo predecir la edad');
        }
        
        prediction = data;
      } catch (err) {
        // @ts-ignore
        error = err.message;
        prediction = null;
      } finally {
        isLoading = false;
      }
    }
</script>
  
<style>
    div {
      max-width: 300px;
      margin: 2rem auto;
      padding: 1rem;
      text-align: center;
      font-family: Arial, sans-serif;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      margin: 0.5rem 0;
      box-sizing: border-box;
    }
    button {
      background: #4285F4;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      margin: 0.5rem 0;
      width: 100%;
    }
    button:disabled {
      background: #cccccc;
    }
    .result {
      margin: 1rem 0;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 4px;
    }
    .error {
      color: #f44336;
    }
    .count {
      font-size: 0.8rem;
      color: #666;
    }
</style>
  
<div>
    <h1>Predicción de Edad</h1>
    
    <input 
      bind:value={name} 
      placeholder="Ingresa un nombre" 
      on:keydown={(e) => e.key === 'Enter' && predictAge()}
      disabled={isLoading}
    />
    
    <button on:click={predictAge} disabled={isLoading || !name}>
      {isLoading ? 'Calculando...' : 'Predecir edad'}
    </button>
    
    {#if error}
      <p class="error">{error}</p>
    {/if}
    
    {#if prediction}
      <div class="result">
        <h2>{prediction.name}</h2>
        <p>Edad estimada: <strong>{prediction.age}</strong> años</p>
        <p class="count">(Basado en {prediction.count} personas)</p>
      </div>
    {/if}
</div>