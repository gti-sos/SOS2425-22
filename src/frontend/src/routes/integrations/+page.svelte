<svelte:head>
    <title>Integraciones</title>
</svelte:head>

<main>
    <h1>Listado de Integraciones</h1>
    
    <table>
        <thead>
            <tr>
                <th>Integraciones JMRL</th>
                <th>Integraciones AMG</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <a href="/integrations/graphs-JMRL/g19-accident-rate-stats">Integración G19</a>
                </td>
                <td>
                    <!-- integracion AMG  -->
                </td>
            </tr>
            <tr>
                <td>
                    <a href="/integrations/graphs-JMRL/g16-unemployment-stats">Integración G16</a>
                </td>
                <td>
                    <!-- integracion AMG  -->
                </td>
            </tr>
            <tr>
                <td>
                    <a href="/integrations/graphs-JMRL/ext1">Integración API externa 1</a>
                </td>
                <td>
                    <!-- integracion AMG  -->
                </td>
            </tr>
            <tr>
                <td>
                    <a href="/integrations/graphs-JMRL/ext2">Integración API externa 2</a>
                </td>
                <td>
                    <!-- integracion AMG  -->
                </td>
            </tr>
            <tr>
                <td>
                    <a href="/integrations/graphs-JMRL/ext3">Integración API externa 3</a>
                </td>
                <td>
                    <!-- integracion AMG  -->
                </td>
            </tr>
        </tbody>
    </table>
</main>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: left;
    }
    th {
        background-color: #f2f2f2;
    }
    tr:nth-child(even) {
        background-color: #f9f9f9;
    }
    a {
        color: #0066cc;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
</style>