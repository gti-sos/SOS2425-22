<svelte:head>
    <title>Ministry of Justice in Zaragoza</title>
</svelte:head>

<script>
// @ts-nocheck
    import { dev } from "$app/environment"; 

    let DEVEL_HOST = "http://localhost:16078";
    let API = "/api/v2/ministry-of-justice-in-zaragoza";

    if(dev)
        API = DEVEL_HOST + API;

    import { onMount } from "svelte";
    import { Button, Table } from '@sveltestrap/sveltestrap';

    let ministryData = [];
    let result = "";
    let resultStatus = "";
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


    async function getMinistry(){
        resultStatus = result = "";
        try {
            const res = await fetch(API, {method:"GET"});
            const data = await res.json();
            result = JSON.stringify(data,null,2);

            ministryData = data;
            console.log(`Response received:\n${JSON.stringify(ministryData,null,2)}`);
        } catch (error){
            console.log(`ERROR:  GET from ${API}: ${error}`);
        }
    }

    async function createMinistry(){
        resultStatus = result = "";
        try {
            const res = await fetch(API,{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({ 
                    province: newMinistryProvince,
                    creation_year: Number(newMinistryCreationYear),
                    id: Number(newMinistryId),
                    portalId: Number(newMinistryPortalId),
                    postal_code: Number(newMinistryPostalCode),
                    latitude: Number(newMinistryLatitude),
                    length: Number(newMinistryLength),
                    title: newMinistryTitle,
                    equipment_type: newMinistryEquipmentType,
                    public_titularity: newMinistryPublicTitularity, 
                    street_address: newMinistryStreetAddress,
                    year: Number(newMinistryYear),
                    num_workers: Number(newMinistryNumWorkers)
                })
            });
  
            const status = await res.status;
            resultStatus = status;
            if(status == 201){
                console.log(`Ministry created`);
                getMinistry();
            } else {
                console.log(`ERROR creating ministry: status received\n${status}`);
            }

        } catch (error){
            console.log(`ERROR:  GET from ${API}: ${error}`);
        }
    }

    async function deleteMinistry(province, year, id){
        resultStatus = result = "";
        let paramYear = Number(year);
        let paramId = Number(id)
        try {
            const res = await fetch(API+"/"+province+"/"+year+"/"+id, {method:"DELETE"});
            
            const status = await res.status;
            resultStatus = status;

            if(status == 200){
                console.log(`Ministry deleted`);
                getMinistry();
            } else {
                console.log(typeof(province), typeof(year), typeof(id))
                console.log(`ERROR deleting ministry with fields ${province}, ${year} and ${id}: status received\n${status}`);
            }

        } catch (error){
            console.log(`ERROR:  GET from ${API}: ${error}`);
        }
    }

    async function deleteData() { 
        resultStatus = result = "";
        try {
            const res = await fetch(API, {method:"DELETE"});

            const status = await res.status; 
            resultStatus = status;

            if(status === 200){
                console.log(`All data has been deleted`);
                getMinistry();
            }else{
                console.log(`Error deleting all data : status received\n${status}`);
            }
        } catch(error){
            console.log(`ERROR deleting data from ${API}: ${error}`);
        }
        
    }


    onMount(async () => {
        getMinistry();
    })

</script>

<h2>Ministry of Justice in Zaragoza List</h2>
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
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <input bind:value={newMinistryProvince}>
            </td>
            <td>
                <input bind:value={newMinistryCreationYear}>
            </td>
            <td>
                <input bind:value={newMinistryId}>
            </td>
            <td>
                <input bind:value={newMinistryPortalId}>
            </td>
            <td>
                <input bind:value={newMinistryPostalCode}>
            </td>
            <td>
                <input bind:value={newMinistryLatitude}>
            </td>
            <td>
                <input bind:value={newMinistryLength}>
            </td>
            <td>
                <input bind:value={newMinistryTitle}>
            </td>
            <td>
                <input bind:value={newMinistryEquipmentType}>
            </td>
            <td>
                <input bind:value={newMinistryPublicTitularity}>
            </td>
            <td>
                <input bind:value={newMinistryStreetAddress}>
            </td>
            <td>
                <input bind:value={newMinistryYear}>
            </td>
            <td>
                <input bind:value={newMinistryNumWorkers}>
            </td>
            <td>
                <Button color="secondary" on:click={createMinistry}>Create</Button>
            </td>
        </tr>
        {#each ministryData as mini}
            <tr>
                <td>
                    {mini.province}
                </td>
                <td>
                    {mini.creation_year}
                </td>
                <td>
                    {mini.id}
                </td>
                <td>
                    {mini.portalId}
                </td>
                <td>
                    {mini.postal_code}
                </td>
                <td>
                    {mini.latitude}
                </td>
                <td>
                    {mini.length}
                </td>
                <td>
                    {mini.title}
                </td>
                <td>
                    {mini.equipment_type}
                </td>
                <td>
                    {mini.public_titularity}
                </td>
                <td>
                    {mini.street_address}
                </td>
                <td>
                    {mini.year}
                </td>
                <td>
                    {mini.num_workers}
                </td>
                <td>
                    <Button color="danger" on:click={() => {deleteMinistry(mini.province,mini.year,mini.id)}}>Delete</Button>
                </td>
            </tr>
        {/each}
        <tr>
            <td>
                    <Button color="danger" on:click={deleteData}>Delete All</Button>
            </td>
        </tr>
    </tbody>
</Table>