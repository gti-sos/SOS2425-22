<svelte:head>
    <title>Integracion-G19</title>
    <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
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
    let dataG19 = [];
    // @ts-ignore
    let dataMZ = [];

    let resultStatus, resultMessage = '';

    let APIG19 = "https://sos2425-19.onrender.com/api/v1/accident-rate-stats";
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
        
        return Object.values(resultado);1
    }

    // @ts-ignore
    async function getData() {
        try {
            const resG19 = await fetch(APIG19, {method: 'GET'});
            const resMZ = await fetch(API, {method: 'GET'});

            if (resG19.status === 200 && resMZ.status === 200) {
                dataG19 = await resG19.json();
                dataMZ = await resMZ.json();

                dataG19 = sumarPorClave(dataG19, 'year', 'deceased');
                dataMZ = sumarPorClave(dataMZ, 'year', 'num_workers');

                dataMZ.forEach((obj, i) => {
                    // @ts-ignore
                    obj.deceased = dataG19[i]?.deceased;
                });
                console.log(`Response received`);
            } else if (resG19.status === 404 || resMZ.status === 404) {
				resultStatus = 'warning';
				resultMessage = `No se encontraron datos`;
			}
            // @ts-ignore
            return dataMZ;

        } catch (error) {
			console.log(`ERROR getting data from ${APIG19}: ${error}`);
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
            // https://www.amcharts.com/docs/v5/charts/xy-chart/
            // @ts-ignore
            var chart = root.container.children.push(am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                paddingLeft: 0,
                wheelX: "panX",
                wheelY: "zoomX",
                layout: root.verticalLayout
            }));


            // Add legend
            // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
            var legend = chart.children.push(
                // @ts-ignore
                am5.Legend.new(root, {
                    // @ts-ignore
                    centerX: am5.p50,
                    // @ts-ignore
                    x: am5.p50
                })
            );

            var data = graphData;


            // Create axes
            // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
            // @ts-ignore
            var xRenderer = am5xy.AxisRendererX.new(root, {
                cellStartLocation: 0.1,
                cellEndLocation: 0.9,
                minorGridEnabled: true
            })

            // @ts-ignore
            var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                categoryField: "year",
                renderer: xRenderer,
                // @ts-ignore
                tooltip: am5.Tooltip.new(root, {})
            }));

            xRenderer.grid.template.setAll({
                location: 1
            })

            xAxis.data.setAll(data);

            // @ts-ignore
            var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                // @ts-ignore
                renderer: am5xy.AxisRendererY.new(root, {
                    strokeOpacity: 0.1
                })
            }));


            // Add series
            // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
            // @ts-ignore
            function makeSeries(name, fieldName) {
            // @ts-ignore
                var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: name,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: fieldName,
                    categoryXField: "year"
                }));

                series.columns.template.setAll({
                    tooltipText: "{name}, {categoryX}:{valueY}",
                    // @ts-ignore
                    width: am5.percent(90),
                    tooltipY: 0,
                    strokeOpacity: 0
                });

                series.data.setAll(data);

                // Make stuff animate on load
                // https://www.amcharts.com/docs/v5/concepts/animations/
                series.appear();

                series.bullets.push(function () {
                    // @ts-ignore
                    return am5.Bullet.new(root, {
                        locationY: 0,
                        // @ts-ignore
                        sprite: am5.Label.new(root, {
                            text: "{valueY}",
                            fill: root.interfaceColors.get("alternativeText"),
                            centerY: 0,
                            // @ts-ignore
                            centerX: am5.p50,
                            populateText: true
                        })
                    });
                });

                legend.data.push(series);
            }

            makeSeries("Numero Trabajadores", "num_workers");
            makeSeries("Fallecidos", "deceased");


            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            chart.appear(1000, 100);

        }); // end am5.ready()
    })

</script>

<div id="chartdiv"></div>