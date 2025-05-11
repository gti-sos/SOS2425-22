<svelte:head>
    <title>Visualizacion de todos los datos</title>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/non-cartesian-zoom.js"></script>
    <script src="https://code.highcharts.com/modules/mouse-wheel-zoom.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<style>
    .highcharts-figure,
    .highcharts-data-table table {
        min-width: 320px;
        max-width: 800px;
        margin: 1em auto;
    }

    .highcharts-data-table table {
        font-family: Verdana, sans-serif;
        border-collapse: collapse;
        border: 1px solid #ebebeb;
        margin: 10px auto;
        text-align: center;
        width: 100%;
        max-width: 500px;
    }

    .highcharts-data-table caption {
        padding: 1em 0;
        font-size: 1.2em;
        color: #555;
    }

    .highcharts-data-table th {
        font-weight: 600;
        padding: 0.5em;
    }

    .highcharts-data-table td,
    .highcharts-data-table th,
    .highcharts-data-table caption {
        padding: 0.5em;
    }

    .highcharts-data-table thead tr,
    .highcharts-data-table tbody tr:nth-child(even) {
        background: #f8f8f8;
    }

    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }

    input[type="number"] {
        min-width: 50px;
    }

    .highcharts-description {
        margin: 0.3rem 10px;
    }
</style>

<script>
    import { onMount } from "svelte";

    // @ts-ignore
    let dataMZ = [];
    let resultStatus, resultMessage = '';

    // @ts-ignore
    let API = "https://sos2425-22.onrender.com/api/v2/ministry-of-justice-in-zaragoza"

    // @ts-ignore
    function sumarPorClave(arr, agrupar, suma) {
    const resultado = {};
    // @ts-ignore
    arr.forEach(i => {
        const clave = i[agrupar];
        // @ts-ignore
        if (!resultado[clave]) {
            // @ts-ignore
            resultado[clave] = { name: clave, y: 0 }; // Cambiado a formato Highcharts
        }
        // @ts-ignore
        resultado[clave].y += i[suma];
    });
    return Object.values(resultado);
}

    // @ts-ignore
    async function getData() {
        try {
            const resMZ = await fetch(API, {method: 'GET'});

            if (resMZ.status === 200) {
                dataMZ = await resMZ.json();
                dataMZ = sumarPorClave(dataMZ, 'id', 'num_workers');

                console.log(`Response received`);
            } else if (resMZ.status === 404) {
				resultStatus = 'warning';
				resultMessage = `No se encontraron datos`;
			}
            // @ts-ignore
            return dataMZ;

        } catch (error) {
			console.log(`ERROR getting data from ${API}: ${error}`);
		}
    }

    onMount(async() => {
        // @ts-ignore
        let graphData = await getData();
        // @ts-ignore
        Highcharts.chart('container', {
            chart: {
                type: 'pie',
                zooming: {
                    type: 'xy'
                },
                panning: {
                    enabled: true,
                    type: 'xy'
                },
                panKey: 'shift'
            },
            title: {
                text: 'Grafica por ID y numero de trabajadores'
            },
            tooltip: {
                valueSuffix: '%'
            },
            subtitle: {
                text:
                'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: [{
                        enabled: true,
                        distance: 20
                    }, {
                        enabled: true,
                        distance: -40,
                        format: '{point.percentage:.1f}%',
                        style: {
                            fontSize: '1.2em',
                            textOutline: 'none',
                            opacity: 0.7
                        },
                        filter: {
                            operator: '>',
                            property: 'percentage',
                            value: 10
                        }
                    }]
                }
            },
            series: [
                {
                    name: 'Numero trabajadores',
                    colorByPoint: true,
                    data: graphData
                }
            ]
        });
    })
</script>

<figure class="highcharts-figure">
    <div id="container"></div>
</figure>