<svelte:head>
    <title>Visualizacion de todos los datos</title>
    <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/percent.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
</svelte:head>

<style>
    #chartdiv {
      width: 100%;
      height: 500px;
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
                resultado[clave] = { [agrupar]: clave, [suma]: 0 };
            }
            // @ts-ignore
            resultado[clave][suma] += i[suma];
        });
        
        // @ts-ignore
        return Object.values(resultado);1
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
        let graphData = await getData();
        // @ts-ignore
        am5.ready(function() {

            // Create root element
            // https://www.amcharts.com/docs/v5/getting-started/#Root_element
            // @ts-ignore
            var root = am5.Root.new("chartdiv");

            // Set themes
            // https://www.amcharts.com/docs/v5/concepts/themes/
            root.setThemes([
            // @ts-ignore
                am5themes_Animated.new(root)
            ]);

            // Create chart
            // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
            var chart = root.container.children.push(
            // @ts-ignore
                am5percent.PieChart.new(root, {
                    endAngle: 270
                })
            );

            // Create series
            // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
            var series = chart.series.push(
                // @ts-ignore
                am5percent.PieSeries.new(root, {
                    valueField: "num_workers",
                    categoryField: "id",
                    endAngle: 270
                })
            );

            series.states.create("hidden", {
                endAngle: -90
            });

            // Set data
            // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
            series.data.setAll(graphData);

            series.appear(1000, 100);

            }); // end am5.ready()
    })
</script>

<div id="chartdiv"></div>