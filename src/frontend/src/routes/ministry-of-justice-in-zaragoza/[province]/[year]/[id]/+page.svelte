<svelte:head>
    <title>Editar</title>
</svelte:head>

<script>
    // @ts-nocheck
    import { dev } from "$app/environment";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { Button, Table, Alert } from '@sveltestrap/sveltestrap';

    let DEVEL_HOST = "http://localhost:16078";
    let API = `/api/v2/ministry-of-justice-in-zaragoza/${$page.params.province}/${$page.params.year}/${$page.params.id}`;
    if(dev) API = DEVEL_HOST + API;

    // Datos y estado
    let ministryData = {};
    let isLoading = false;
    let userMessage = { text: "", type: "" };
    
    // Variables para edición
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

    // Funciones
    function showMessage(text, type = "info", duration = 5000) {
        userMessage = { text, type };
        if (duration > 0) {
            setTimeout(() => userMessage.text = "", duration);
        }
    }

    function translateError(error) {
        if (error.includes("404")) return "No se encontró el ministerio";
        if (error.includes("400")) return "Datos inválidos";
        if (error.includes("500")) return "Error del servidor";
        return "Error inesperado";
    }

    async function getMinistry() {
        isLoading = true;
        try {
            const res = await fetch(API, { method: "GET" });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            
            ministryData = await res.json();
            
            // Inicializar variables de edición
            newMinistryCreationYear = ministryData.creation_year;
            newMinistryPortalId = ministryData.portalId;
            newMinistryLatitude = ministryData.latitude;
            newMinistryPostalCode = ministryData.postal_code;
            newMinistryLength = ministryData.length;
            newMinistryTitle = ministryData.title;
            newMinistryEquipmentType = ministryData.equipment_type;
            newMinistryPublicTitularity = ministryData.public_titularity;
            newMinistryStreetAddress = ministryData.street_address;
            newMinistryNumWorkers = ministryData.num_workers;

        } catch (error) {
            console.error("Error:", error);
            showMessage(translateError(error.message), "error");
        } finally {
            isLoading = false;
        }
    }

    async function updateMinistry() {
        isLoading = true;
        showMessage("Actualizando ministerio...", "info");
        
        try {
            const payload = {
                province: ministryData.province,
                year: ministryData.year,
                id: ministryData.id,
                creation_year: Number(newMinistryCreationYear),
                portalId: Number(newMinistryPortalId),
                postal_code: Number(newMinistryPostalCode),
                latitude: Number(newMinistryLatitude),
                length: Number(newMinistryLength),
                title: newMinistryTitle,
                equipment_type: newMinistryEquipmentType,
                public_titularity: newMinistryPublicTitularity,
                street_address: newMinistryStreetAddress,
                num_workers: Number(newMinistryNumWorkers)
            };

            const res = await fetch(API, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            
            if (res.ok) {
                showMessage("Ministerio actualizado correctamente", "success");
                setTimeout(() => goto("/ministry-of-justice-in-zaragoza"), 1500);
            } else {
                const errorData = await res.json();
                throw new Error(errorData.message || `HTTP ${res.status}`);
            }
        } catch (error) {
            console.error("Error:", error);
            showMessage("Error al actualizar: " + translateError(error.message), "error");
        } finally {
            isLoading = false;
        }
    }

    async function deleteMinistry() {
        isLoading = true;
        showMessage("Eliminando ministerio...", "info");
        
        try {
            const res = await fetch(API, { method: "DELETE" });
            
            if (res.ok) {
                showMessage("Ministerio eliminado correctamente", "success");
                setTimeout(() => goto("/ministry-of-justice-in-zaragoza"), 1500);
            } else {
                throw new Error(`HTTP ${res.status}`);
            }
        } catch (error) {
            console.error("Error:", error);
            showMessage("Error al eliminar: " + translateError(error.message), "error");
        } finally {
            isLoading = false;
        }
    }

    // Carga inicial
    onMount(async () => {
        await getMinistry();
    });
</script>

<h2>Editando ministerio en {ministryData.province} ({ministryData.year})</h2>

{#if userMessage.text}
    <Alert color={userMessage.type === 'success' ? 'success' : userMessage.type === 'error' ? 'danger' : 'info'}>
        {userMessage.text}
    </Alert>
{/if}

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
        <Button color="primary" on:click={updateMinistry} disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
        <Button color="danger" on:click={deleteMinistry} disabled={isLoading}>
            {isLoading ? 'Eliminando...' : 'Eliminar Ministerio'}
        </Button>
        <Button color="secondary" on:click={() => goto("/ministry-of-justice-in-zaragoza")}>
            Cancelar
        </Button>
    </div>
{/if}

<style>
    .actions {
        margin: 1rem 0;
        display: flex;
        gap: 1rem;
    }
    
    input {
        width: 100%;
        padding: 0.5rem;
        box-sizing: border-box;
    }

    th, td {
        padding: 0.75rem;
        vertical-align: top;
        border-top: 1px solid #dee2e6;
    }
    
    th {
        text-align: left;
        background-color: #f8f9fa;
    }
</style>