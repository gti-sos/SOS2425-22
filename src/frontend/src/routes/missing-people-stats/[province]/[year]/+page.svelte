<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  interface StatForm {
    year: string;
    province: string;
    missing_men: string;
    missing_women: string;
    missing_unknown: string;
    total_population: string;
  }

  let form: StatForm = {
    year: '',
    province: '',
    missing_men: '',
    missing_women: '',
    missing_unknown: '',
    total_population: ''
  };

  let mensaje = '';
  let loading = true;

  $: province = decodeURIComponent($page.params.province);
  $: year = $page.params.year;

  onMount(async () => {
    try {
      const res = await fetch(`/api/v1/missing-people-stats/${encodeURIComponent(province)}/${year}`);
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `HTTP ${res.status}`);
      }
      
      const data = await res.json();
      form = {
        year: data.year.toString(),
        province: data.province,
        missing_men: data.missing_men.toString(),
        missing_women: data.missing_women.toString(),
        missing_unknown: data.missing_unknown.toString(),
        total_population: data.total_population.toString()
      };
    } catch (error) {
      mensaje = error instanceof Error 
        ? `Error: ${error.message}` 
        : 'Error al cargar los datos';
    } finally {
      loading = false;
    }
  });

  async function actualizar() {
    try {
      const statData = {
        year: Number(form.year),
        province: form.province,
        missing_men: Number(form.missing_men),
        missing_women: Number(form.missing_women),
        missing_unknown: Number(form.missing_unknown),
        total_population: Number(form.total_population)
      };

      const res = await fetch(`/api/v1/missing-people-stats/${encodeURIComponent(province)}/${year}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(statData)
      });

      if (res.ok) {
        mensaje = '¡Estadística actualizada correctamente!';
        setTimeout(() => goto('/missing-people-stats'), 1500);
      } else {
        const errorText = await res.text();
        throw new Error(errorText || `HTTP ${res.status}`);
      }
    } catch (error) {
      mensaje = error instanceof Error 
        ? `Error al actualizar: ${error.message}` 
        : 'Error desconocido al actualizar';
    }
  }
</script>

<h1>✏️ Editar estadística</h1>

{#if loading}
  <p>Cargando datos...</p>
{:else if mensaje && mensaje.startsWith('Error')}
  <p class="error">{mensaje}</p>
{:else}
  <form on:submit|preventDefault={actualizar}>
    <input type="number" placeholder="Año" bind:value={form.year} required min="2000" max="2050" />
    <input placeholder="Provincia" bind:value={form.province} required />
    <input type="number" placeholder="Hombres" bind:value={form.missing_men} required min="0" />
    <input type="number" placeholder="Mujeres" bind:value={form.missing_women} required min="0" />
    <input type="number" placeholder="Desconocidos" bind:value={form.missing_unknown} required min="0" />
    <input type="number" placeholder="Población total" bind:value={form.total_population} required min="0" />
    
    <div class="botones">
      <button type="submit">Guardar cambios</button>
      <a class="boton cancelar" href="/missing-people-stats">Cancelar</a>
    </div>
  </form>

  {#if mensaje && !mensaje.startsWith('Error')}
    <p class="success">{mensaje}</p>
  {/if}
{/if}

<style>
  h1 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }

  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
    max-width: 800px;
    margin: 0 auto;
    background: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  input {
    padding: 0.7rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
  }

  .botones {
    grid-column: span 2;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1rem;
  }

  button {
    padding: 0.7rem 1.5rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #218838;
  }

  .boton.cancelar {
    padding: 0.7rem 1.5rem;
    background-color: #6c757d;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    text-align: center;
  }

  .boton.cancelar:hover {
    background-color: #5a6268;
  }

  .success {
    padding: 0.8rem;
    background-color: #d4edda;
    color: #155724;
    border-left: 4px solid #28a745;
    margin: 1rem auto;
    max-width: 800px;
  }

  .error {
    padding: 0.8rem;
    background-color: #f8d7da;
    color: #721c24;
    border-left: 4px solid #dc3545;
    margin: 1rem auto;
    max-width: 800px;
  }
</style>