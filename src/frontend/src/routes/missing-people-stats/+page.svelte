<script lang="ts">
  import { onMount } from 'svelte';

  interface Stat {
    year: number;
    province: string;
    missing_men: number;
    missing_women: number;
    missing_unknown: number;
    total_population: number;
  }

  let stats: Stat[] = [];
  let mensaje = '';
  let form = {
    year: '',
    province: '',
    missing_men: '',
    missing_women: '',
    missing_unknown: '',
    total_population: ''
  };

  let filtros = {
    year: '',
    province: ''
  };

  async function cargarStats() {
    try {
      const params = new URLSearchParams();
      if (filtros.year) params.set('year', filtros.year);
      if (filtros.province) params.set('province', filtros.province);

      const res = await fetch(`/api/v1/missing-people-stats?${params.toString()}`);
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }
      
      stats = await res.json();
      mensaje = '';
    } catch (error) {
      mensaje = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error:', error);
      stats = [];
    }
  }

  async function crearStat() {
    try {
      const statData = {
        year: Number(form.year),
        province: form.province,
        missing_men: Number(form.missing_men),
        missing_women: Number(form.missing_women),
        missing_unknown: Number(form.missing_unknown),
        total_population: Number(form.total_population)
      };

      const res = await fetch('/api/v1/missing-people-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(statData)
      });

      if (res.status === 201) {
        mensaje = 'Estadística creada correctamente.';
        form = {
          year: '',
          province: '',
          missing_men: '',
          missing_women: '',
          missing_unknown: '',
          total_population: ''
        };
        await cargarStats();
      } else if (res.status === 409) {
        mensaje = 'Ya existe una estadística con ese año y provincia.';
      } else {
        const errorText = await res.text();
        mensaje = `Error ${res.status}: ${errorText}`;
      }
    } catch (error) {
      mensaje = error instanceof Error ? error.message : 'Error desconocido';
    }
  }

  async function borrarTodos() {
    if (!confirm('¿Estás seguro de querer borrar TODOS los registros?')) return;
    
    try {
      const res = await fetch('/api/v1/missing-people-stats', { method: 'DELETE' });
      mensaje = res.ok ? 'Todos los registros eliminados.' : `Error: ${res.status}`;
      await cargarStats();
    } catch (error) {
      mensaje = error instanceof Error ? error.message : 'Error desconocido';
    }
  }

  async function borrar(province: string, year: number) {
    if (!confirm(`¿Eliminar registro de ${province} (${year})?`)) return;
    
    try {
      const res = await fetch(`/api/v1/missing-people-stats/${encodeURIComponent(province)}/${year}`, {
        method: 'DELETE'
      });
      
      mensaje = res.ok 
        ? 'Registro eliminado correctamente.' 
        : `Error al eliminar: ${res.status}`;
        
      await cargarStats();
    } catch (error) {
      mensaje = error instanceof Error ? error.message : 'Error desconocido';
    }
  }

  onMount(cargarStats);
</script>

<h1>📊 Gestión de personas desaparecidas</h1>

<section class="formulario">
  <h2>➕ Crear nueva estadística</h2>
  <form on:submit|preventDefault={crearStat}>
    <input type="number" placeholder="Año" bind:value={form.year} required min="2000" max="2050" />
    <input placeholder="Provincia" bind:value={form.province} required />
    <input type="number" placeholder="Hombres" bind:value={form.missing_men} required min="0" />
    <input type="number" placeholder="Mujeres" bind:value={form.missing_women} required min="0" />
    <input type="number" placeholder="Desconocidos" bind:value={form.missing_unknown} required min="0" />
    <input type="number" placeholder="Población total" bind:value={form.total_population} required min="0" />
    <button>Crear</button>
  </form>
</section>

<section class="busqueda">
  <h2>🔍 Buscar estadísticas</h2>
  <input type="number" placeholder="Año" bind:value={filtros.year} min="2000" max="2050" />
  <input placeholder="Provincia" bind:value={filtros.province} />
  <button on:click={cargarStats}>Buscar</button>
  <button class="peligro" on:click={borrarTodos}>Eliminar todos</button>
</section>

{#if mensaje}
  <p class:success={!mensaje.startsWith('Error')} class:error={mensaje.startsWith('Error')}>
    {mensaje}
  </p>
{/if}

<section class="tabla">
  <h2>📋 Listado</h2>
  {#if stats.length === 0}
    <p>No hay datos disponibles</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>Año</th><th>Provincia</th><th>Hombres</th><th>Mujeres</th><th>Desconocidos</th><th>Población</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {#each stats as stat}
          <tr>
            <td>{stat.year}</td>
            <td>{stat.province}</td>
            <td>{stat.missing_men}</td>
            <td>{stat.missing_women}</td>
            <td>{stat.missing_unknown}</td>
            <td>{stat.total_population}</td>
            <td>
              <a class="boton" href={`/missing-people-stats/${encodeURIComponent(stat.province)}/${stat.year}`}>Editar</a>
              <button class="peligro" on:click={() => borrar(stat.province, stat.year)}>Borrar</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</section>

<style>
  :global(body) {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
  }

  h1, h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  .formulario, .busqueda, .tabla {
    margin-bottom: 2rem;
    background: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  form, .busqueda {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    align-items: center;
  }

  input {
    padding: 0.6rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex: 1 1 200px;
  }

  button, .boton {
    padding: 0.6rem 1.2rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
  }

  button:hover, .boton:hover {
    background-color: #2980b9;
  }

  .peligro {
    background-color: #e74c3c;
  }

  .peligro:hover {
    background-color: #c0392b;
  }

  .success {
    padding: 0.8rem;
    background-color: #d4edda;
    color: #155724;
    border-left: 4px solid #28a745;
    margin: 1rem 0;
  }

  .error {
    padding: 0.8rem;
    background-color: #f8d7da;
    color: #721c24;
    border-left: 4px solid #dc3545;
    margin: 1rem 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }

  th, td {
    padding: 0.8rem;
    border: 1px solid #ddd;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
    font-weight: 600;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }

  .boton {
    text-decoration: none;
    display: inline-block;
    margin-right: 0.5rem;
  }
</style>