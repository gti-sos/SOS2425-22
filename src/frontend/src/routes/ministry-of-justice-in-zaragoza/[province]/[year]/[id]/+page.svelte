<script>
    // @ts-nocheck
    import { dev } from "$app/environment";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { Button, Table } from '@sveltestrap/sveltestrap';

    let DEVEL_HOST = "http://localhost:16078";
    let API = "/api/v2/ministry-of-justice-in-zaragoza/"+$page.params.province+"/"+$page.params.year+"/"+$page.params.id;

    if(dev){
        API = DEVEL_HOST + API;
    }

    // Datos actuales del ministerio (solo lectura)
    let ministryData = {};
    
    // Variables para los campos editables (inicializadas después de cargar los datos)
    let newMinistryCreationYear;
    let newMinistryPortalId;
    let newMinistryLatitude;
    let newMinistryPostalCode;
    let newMinistryLength;
    let newMinistryTitle;
    let newMinistryEquipmentType;
    let newMinistryPublicTitularity;
    let newMinistryStreetAddress;
    let newMinistryNumWorkers;

    // Estado para feedback al usuario
    let result = "";
    let resultStatus = "";
    let isLoading = false;

    async function getMinistry() {
        isLoading = true;
        try {
            const res = await fetch(API, {method:"GET"});
            if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            
            ministryData = await res.json();
            
            // Inicializar las variables de edición con los datos actuales
            // Solo si no han sido modificadas previamente
            if(newMinistryCreationYear === undefined) newMinistryCreationYear = ministryData.creation_year;
            if(newMinistryPortalId === undefined) newMinistryPortalId = ministryData.portalId;
            if(newMinistryLatitude === undefined) newMinistryLatitude = ministryData.latitude;
            if(newMinistryPostalCode === undefined) newMinistryPostalCode = ministryData.postal_code;
            if(newMinistryLength === undefined) newMinistryLength = ministryData.length;
            if(newMinistryTitle === undefined) newMinistryTitle = ministryData.title;
            if(newMinistryEquipmentType === undefined) newMinistryEquipmentType = ministryData.equipment_type;
            if(newMinistryPublicTitularity === undefined) newMinistryPublicTitularity = ministryData.public_titularity;
            if(newMinistryStreetAddress === undefined) newMinistryStreetAddress = ministryData.street_address;
            if(newMinistryNumWorkers === undefined) newMinistryNumWorkers = ministryData.num_workers;

            console.log("Datos cargados:", ministryData);
        } catch(error) {
            console.error("Error al obtener datos:", error);
            result = `Error: ${error.message}`;
        } finally {
            isLoading = false;
        }
    }

    async function editMinistry() {
        isLoading = true;
        resultStatus = result = "";
        
        try {
            const payload = {
                province: ministryData.province,
                year: ministryData.year,
                id: ministryData.id,
                creation_year: newMinistryCreationYear !== undefined ? 
                             Number(newMinistryCreationYear) : ministryData.creation_year,
                portalId: newMinistryPortalId !== undefined ? 
                         Number(newMinistryPortalId) : ministryData.portalId,
                postal_code: newMinistryPostalCode !== undefined ? 
                           Number(newMinistryPostalCode) : ministryData.postal_code,
                latitude: newMinistryLatitude !== undefined ? 
                        Number(newMinistryLatitude) : ministryData.latitude,
                length: newMinistryLength !== undefined ? 
                      Number(newMinistryLength) : ministryData.length,
                title: newMinistryTitle !== undefined ? 
                     newMinistryTitle : ministryData.title,
                equipment_type: newMinistryEquipmentType !== undefined ? 
                             newMinistryEquipmentType : ministryData.equipment_type,
                public_titularity: newMinistryPublicTitularity !== undefined ? 
                                  newMinistryPublicTitularity : ministryData.public_titularity,
                street_address: newMinistryStreetAddress !== undefined ? 
                              newMinistryStreetAddress : ministryData.street_address,
                num_workers: newMinistryNumWorkers !== undefined ? 
                           Number(newMinistryNumWorkers) : ministryData.num_workers
            };

            const res = await fetch(API, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            resultStatus = res.status;
            
            if(res.ok) {
                console.log("Ministerio actualizado correctamente");
                await getMinistry(); // Refrescar datos
                goto("/ministry-of-justice-in-zaragoza");
            } else {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error al actualizar");
            }
        } catch(error) {
            console.error("Error en editMinistry:", error);
            result = `Error: ${error.message}`;
        } finally {
            isLoading = false;
        }
    }

    async function deleteMinistry() {
        if(!confirm("¿Estás seguro de que quieres eliminar este ministerio?")) return;
        
        isLoading = true;
        try {
            const res = await fetch(API, {method:"DELETE"});
            
            if(res.ok) {
                console.log("Ministerio eliminado");
                goto("/ministry-of-justice-in-zaragoza");
            } else {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        } catch(error) {
            console.error("Error al eliminar:", error);
            result = `Error: ${error.message}`;
        } finally {
            isLoading = false;
        }
    }

    // Cargar datos al iniciar
    onMount(getMinistry);
</script>

<h2>Editando ministerio en {ministryData.province} ({ministryData.year})</h2>

{#if isLoading}
    <p>Cargando datos...</p>
{:else}
    <Table>
        <thead>
            <tr>
                <th>Campo</th>
                <th>Valor Actual</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Province</td>
                <td>{ministryData.province} (no editable)</td>
            </tr>
            <tr>
                <td>Creation Year</td>
                <td><input bind:value={newMinistryCreationYear} type="number"></td>
            </tr>
            <tr>
                <td>ID</td>
                <td>{ministryData.id} (no editable)</td>
            </tr>
            <tr>
                <td>Portal ID</td>
                <td><input bind:value={newMinistryPortalId} type="number"></td>
            </tr>
            <tr>
                <td>Postal Code</td>
                <td><input bind:value={newMinistryPostalCode} type="number"></td>
            </tr>
            <tr>
                <td>Latitude</td>
                <td><input bind:value={newMinistryLatitude} type="number" step="0.000001"></td>
            </tr>
            <tr>
                <td>Length</td>
                <td><input bind:value={newMinistryLength} type="number" step="0.000001"></td>
            </tr>
            <tr>
                <td>Title</td>
                <td><input bind:value={newMinistryTitle}></td>
            </tr>
            <tr>
                <td>Equipment Type</td>
                <td><input bind:value={newMinistryEquipmentType}></td>
            </tr>
            <tr>
                <td>Public Titularity</td>
                <td><input bind:value={newMinistryPublicTitularity}></td>
            </tr>
            <tr>
                <td>Street Address</td>
                <td><input bind:value={newMinistryStreetAddress}></td>
            </tr>
            <tr>
                <td>Year</td>
                <td>{ministryData.year} (no editable)</td>
            </tr>
            <tr>
                <td>Number of Workers</td>
                <td><input bind:value={newMinistryNumWorkers} type="number"></td>
            </tr>
        </tbody>
    </Table>

    <div class="actions">
        <Button color="primary" on:click={editMinistry} disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
        <Button color="danger" on:click={deleteMinistry} disabled={isLoading}>
            Eliminar Ministerio
        </Button>
        <Button color="secondary" on:click={() => goto("/ministry-of-justice-in-zaragoza")}>
            Cancelar
        </Button>
    </div>

    {#if result}
        <div class:success={resultStatus === 200} class:error={resultStatus !== 200}>
            {result}
        </div>
    {/if}
{/if}

<style>
    .actions {
        margin: 1rem 0;
        display: flex;
        gap: 1rem;
    }
    
    .success {
        color: green;
        margin-top: 1rem;
    }
    
    .error {
        color: red;
        margin-top: 1rem;
    }
    
    input {
        width: 100%;
        padding: 0.5rem;
        box-sizing: border-box;
    }
</style>