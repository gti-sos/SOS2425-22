<svelte:head>
    <title>Ministry of Justice in Zaragoza</title>
</svelte:head>

<script>
    // @ts-nocheck
    import { dev } from "$app/environment";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { Button, Table, Form, FormGroup, Input, Label, Row, Col, Alert } from '@sveltestrap/sveltestrap';

    let DEVEL_HOST = "http://localhost:16078";
    let API = "/api/v2/ministry-of-justice-in-zaragoza";
    if(dev) API = DEVEL_HOST + API;

    // Datos y estados
    let ministryData = [];
    let filteredData = [];
    let isLoading = false;
    let userMessage = { text: "", type: "" };
    
    // Variables para creación
    let newMinistryProvince;
    let newMinistryCreationYear;
    let newMinistryId;
    let newMinistryPortalId;
    let newMinistryLatitude;
    let newMinistryPostalCode;
    let newMinistryLength;
    let newMinistryTitle;
    let newMinistryEquipmentType;
    let newMinistryPublicTitularity;
    let newMinistryStreetAddress;
    let newMinistryYear;
    let newMinistryNumWorkers;

    // Variables para filtrado
    let filterField = "creation_year";
    let filterValue = "";
    let minId = "";
    let maxId = "";

    // Variables para paginación
    let currentPage = 1;
    const itemsPerPage = 10;
    let totalPages = 1;
    let paginatedData = [];

    // Funciones auxiliares
    function updatePagination() {
        totalPages = Math.ceil(filteredData.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
    }

    function goToPage(page) {
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        updatePagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showMessage(text, type = "info", duration = 5000) {
        userMessage = { text, type };
        if (duration > 0) {
            setTimeout(() => userMessage.text = "", duration);
        }
    }

    function translateError(error) {
        if (error.includes("404")) return "Datos no encontrados";
        if (error.includes("400")) return "Datos inválidos";
        if (error.includes("409")) return "Ya existe el dato";
        if (error.includes("500")) return "Error del servidor";
        return "Error inesperado";
    }

    // Operaciones CRUD
    async function refreshData(showSuccess = true) {
        isLoading = true;
        try {
            const res = await fetch(API, { method: "GET" });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            
            ministryData = await res.json();
            filteredData = [...ministryData];
            updatePagination();
            
            if (showSuccess) showMessage("Datos cargados correctamente", "success");
        } catch (error) {
            console.error("Error:", error);
            showMessage(translateError(error.message), "error");
        } finally {
            isLoading = false;
        }
    }

    async function createMinistry() {
        if (!newMinistryProvince || !newMinistryId || !newMinistryYear) {
            showMessage("Provincia, Id y Año son obligatorios", "error");
            return;
        }

        isLoading = true;
        showMessage("Creando ministerio...", "info");
        
        try {
            const res = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    province: newMinistryProvince,
                    creation_year: Number(newMinistryCreationYear) || 0,
                    id: Number(newMinistryId),
                    portalId: Number(newMinistryPortalId) || 0,
                    postal_code: Number(newMinistryPostalCode) || 0,
                    latitude: Number(newMinistryLatitude) || 0,
                    length: Number(newMinistryLength) || 0,
                    title: newMinistryTitle || "Desconocido",
                    equipment_type: newMinistryEquipmentType || "Desconocido",
                    public_titularity: newMinistryPublicTitularity || "Desconocida", 
                    street_address: newMinistryStreetAddress || "No especificada",
                    year: Number(newMinistryYear),
                    num_workers: Number(newMinistryNumWorkers) || 0
                })
            });
            
            if (res.ok) {
                await refreshData(false);
                showMessage("Ministerio creado exitosamente", "success");
                // Resetear campos
                newMinistryProvince = "";
                newMinistryCreationYear = "";
                newMinistryId = "";
                newMinistryPortalId = "";
                newMinistryPostalCode = "";
                newMinistryLatitude = "";
                newMinistryLength = "";
                newMinistryTitle = "";
                newMinistryEquipmentType = "";
                newMinistryPublicTitularity = "";
                newMinistryStreetAddress = "";
                newMinistryYear = "";
                newMinistryNumWorkers = "";
            } else {
                throw new Error(`HTTP ${res.status}`);
            }
        } catch (error) {
            console.error("Error:", error);
            showMessage("Error al crear ministerio: " + translateError(error.message), "error");
        } finally {
            isLoading = false;
        }
    }

    async function deleteMinistry(province, year, id) {
        isLoading = true;
        showMessage("Eliminando ministerio...", "info");
        
        try {
            const res = await fetch(`${API}/${province}/${year}/${id}`, { method: "DELETE" });
            
            if (res.ok) {
                await refreshData(false);
                showMessage("Ministerio eliminado correctamente", "success");
            } else {
                throw new Error(`HTTP ${res.status}`);
            }
        } catch (error) {
            console.error("Error:", error);
            showMessage("Error al eliminar ministerio: " + translateError(error.message), "error");
        } finally {
            isLoading = false;
        }
    }

    async function deleteData() {
        if (!confirm("¿Eliminar TODOS los datos? Esta acción no se puede deshacer.")) return;
        
        isLoading = true;
        showMessage("Eliminando todos los datos...", "info");
        
        try {
            const res = await fetch(API, { method: "DELETE" });
            
            if (res.ok) {
                await refreshData(false);
                showMessage("Todos los datos han sido eliminados", "success");
            } else {
                throw new Error(`HTTP ${res.status}`);
            }
        } catch (error) {
            console.error("Error:", error);
            showMessage("Error al eliminar datos: " + translateError(error.message), "error");
        } finally {
            isLoading = false;
        }
    }

    async function filterByField() {
        if (!filterField || filterValue === "") {
            filteredData = [...ministryData];
            currentPage = 1;
            updatePagination();
            showMessage("Filtro limpiado", "info");
            return;
        }

        isLoading = true;
        showMessage(`Aplicando filtro por ${filterField}...`, "info");
        
        try {
            filteredData = ministryData.filter(item => {
                const fieldValue = item[filterField];
                if (fieldValue === undefined) return false;
                
                if (typeof fieldValue === 'number') {
                    return fieldValue === Number(filterValue);
                }
                return fieldValue.toString().toLowerCase().includes(filterValue.toLowerCase());
            });
            
            currentPage = 1;
            updatePagination();
            
            if (filteredData.length === 0) {
                showMessage("No se encontraron resultados", "info");
            } else {
                showMessage(`${filteredData.length} resultados encontrados`, "success");
            }
        } catch (error) {
            console.error("Error al filtrar:", error);
            showMessage("Error al aplicar filtro", "error");
        } finally {
            isLoading = false;
        }
    }

    async function searchByIdRange() {
        if (!minId && !maxId) {
            filteredData = [...ministryData];
            currentPage = 1;
            updatePagination();
            showMessage("Búsqueda limpiada", "info");
            return;
        }

        isLoading = true;
        showMessage("Buscando...", "info");
        
        try {
            const min = minId ? Number(minId) : 0;
            const max = maxId ? Number(maxId) : Infinity;
            
            filteredData = ministryData.filter(item => {
                return item.id >= min && item.id <= max;
            });
            
            currentPage = 1;
            updatePagination();
            
            if (filteredData.length === 0) {
                showMessage("No se encontraron resultados", "info");
            } else {
                showMessage(`${filteredData.length} resultados encontrados`, "success");
            }
        } catch (error) {
            console.error("Error en búsqueda:", error);
            showMessage("Error al buscar", "error");
        } finally {
            isLoading = false;
        }
    }

    // Inicialización
    onMount(async () => {
        await refreshData(true);
    });
</script>

<h2>Ministry of Justice in Zaragoza</h2>

{#if userMessage.text}
    <Alert color={userMessage.type === 'success' ? 'success' : userMessage.type === 'error' ? 'danger' : 'info'}>
        {userMessage.text}
    </Alert>
{/if}

<Form>
    <Row>
        <Col md="6">
            <FormGroup>
                <h4>Filtrar por campo</h4>
                <Input type="select" bind:value={filterField} id="filterField">
                    <option value="creation_year">Año de creación</option>
                    <option value="province">Provincia</option>
                    <option value="id">ID</option>
                    <option value="portalId">Portal ID</option>
                    <option value="postal_code">Código postal</option>
                    <option value="latitude">Latitud</option>
                    <option value="length">Longitud</option>
                    <option value="title">Título</option>
                    <option value="equipment_type">Tipo de equipo</option>
                    <option value="public_titularity">Titularidad pública</option>
                    <option value="street_address">Dirección</option>
                    <option value="year">Año</option>
                    <option value="num_workers">Número de trabajadores</option>
                </Input>
                
                <Label for="filterValue"> </Label>
                <Input bind:value={filterValue} id="filterValue" placeholder="Valor para filtrar"/>
                
                <div class="button-group">
                    <Button color="primary" on:click={filterByField} disabled={isLoading}>
                        {isLoading ? 'Filtrando...' : 'Aplicar Filtro'}
                    </Button>
                    <Button color="secondary" on:click={() => {filterValue = ""; filteredData = [...ministryData]; currentPage = 1;}}>
                        Limpiar
                    </Button>
                </div>
            </FormGroup>
        </Col>
        
        <Col md="6">
            <FormGroup>
                <h4>Buscar por rango de IDs</h4>
                <div class="range-inputs">
                    <Input type="number" bind:value={minId} placeholder="ID mínimo"/>
                    <span>a</span>
                    <Input type="number" bind:value={maxId} placeholder="ID máximo"/>
                </div>
                
                <div class="button-group">
                    <Button color="primary" on:click={searchByIdRange} disabled={isLoading}>
                        {isLoading ? 'Buscando...' : 'Buscar'}
                    </Button>
                    <Button color="secondary" on:click={() => {minId = ""; maxId = ""; filteredData = [...ministryData]; currentPage = 1;}}>
                        Limpiar
                    </Button>
                </div>
            </FormGroup>
        </Col>
    </Row>
</Form>

<div class="pagination-controls">
    <Button color="secondary" on:click={() => goToPage(1)} disabled={currentPage === 1 || isLoading}>
        « Primera
    </Button>
    <Button color="secondary" on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1 || isLoading}>
        Anterior
    </Button>
    <Button color="secondary" on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages || isLoading}>
        Siguiente 
    </Button>
    <Button color="secondary" on:click={() => goToPage(totalPages)} disabled={currentPage === totalPages || isLoading}>
        Última »
    </Button>
</div>

<div class="pagination-info">
    Página {currentPage} de {totalPages} | Mostrando {paginatedData.length} de {filteredData.length} resultados
</div>

<Table>
    <thead>
        <tr>
            <th>Province</th>
            <th>Creation Year</th>
            <th>Id</th>
            <th>Portal Id</th>    
            <th>Postal Code</th>
            <th>Latitude</th>
            <th>Length</th>
            <th>Title</th>
            <th>Equipment Type</th>
            <th>Public Titularity</th>
            <th>Street Address</th>
            <th>Year</th>
            <th>Number of Workers</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><Input bind:value={newMinistryProvince} placeholder="Provincia" required/></td>
            <td><Input type="number" bind:value={newMinistryCreationYear} placeholder="Año creación"/></td>
            <td><Input type="number" bind:value={newMinistryId} placeholder="ID"/></td>
            <td><Input type="number" bind:value={newMinistryPortalId} placeholder="Portal ID"/></td>
            <td><Input type="number" bind:value={newMinistryPostalCode} placeholder="Código postal"/></td>
            <td><Input type="number" step="0.000001" bind:value={newMinistryLatitude} placeholder="Latitud"/></td>
            <td><Input type="number" step="0.000001" bind:value={newMinistryLength} placeholder="Longitud"/></td>
            <td><Input bind:value={newMinistryTitle} placeholder="Título" required/></td>
            <td><Input bind:value={newMinistryEquipmentType} placeholder="Tipo equipo"/></td>
            <td><Input bind:value={newMinistryPublicTitularity} placeholder="Titularidad"/></td>
            <td><Input bind:value={newMinistryStreetAddress} placeholder="Dirección"/></td>
            <td><Input type="number" bind:value={newMinistryYear} placeholder="Año"/></td>
            <td><Input type="number" bind:value={newMinistryNumWorkers} placeholder="Trabajadores"/></td>
            <td>
                <Button color="success" on:click={createMinistry} disabled={isLoading}>
                    {isLoading ? 'Creando...' : 'Crear'}
                </Button>
            </td>
        </tr>
        
        {#each paginatedData as mini}
            <tr>
                <td>{mini.province}</td>
                <td>{mini.creation_year}</td>
                <td>{mini.id}</td>
                <td>{mini.portalId}</td>
                <td>{mini.postal_code}</td>
                <td>{mini.latitude}</td>
                <td>{mini.length}</td>
                <td>{mini.title}</td>
                <td>{mini.equipment_type}</td>
                <td>{mini.public_titularity}</td>
                <td>{mini.street_address}</td>
                <td>{mini.year}</td>
                <td>{mini.num_workers}</td>
                <td>
                    <Button color="danger" size="sm" on:click={() => deleteMinistry(mini.province, mini.year, mini.id)} disabled={isLoading}>
                        {isLoading ? 'Eliminando...' : 'Eliminar'}
                    </Button>
                    <Button color="primary" size="sm" on:click={() => goto(`/ministry-of-justice-in-zaragoza/${mini.province}/${mini.year}/${mini.id}`)}>
                        Editar
                    </Button>
                </td>
            </tr>
        {:else}
            <tr>
                <td colspan="14" style="text-align: center;">
                    {isLoading ? 'Cargando datos...' : 'No se encontraron resultados'}
                </td>
            </tr>
        {/each}
    </tbody>
</Table>

<div class="global-actions">
    <Button color="danger" on:click={deleteData} disabled={isLoading}>
        {isLoading ? 'Procesando...' : 'Eliminar TODOS los datos'}
    </Button>
</div>

<style>
    .range-inputs {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .range-inputs span {
        margin: 0 0.5rem;
    }
    
    .button-group {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .global-actions {
        margin: 1rem 0;
    }
    
    .pagination-controls {
        display: flex;
        justify-content: center;
        gap: 0.3rem;
        margin: 1rem 0;
        flex-wrap: wrap;
    }
    
    .pagination-info {
        text-align: center;
        margin: 0.5rem 0;
        color: #666;
        font-size: 0.9rem;
    }
    
    th {
        white-space: nowrap;
    }

    @media (max-width: 768px) {
        .pagination-controls {
            gap: 0.2rem;
        }
    }
</style>