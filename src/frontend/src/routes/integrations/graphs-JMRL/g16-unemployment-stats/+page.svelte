<svelte:head>
    <title>integracion-G16</title>
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
    let dataG16 = [];
    // @ts-ignore
    let dataMZ = [];

    let resultStatus, resultMessage = '';

    let APIG16 = "https://sos2425-16.onrender.com/api/v1/unemployment-stats/";
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
            const resG19 = await fetch(APIG16, {method: 'GET'});
            const resMZ = await fetch(API, {method: 'GET'});

            if (resG19.status === 200 && resMZ.status === 200) {
                dataG16 = await resG19.json();
                dataMZ = await resMZ.json();

                dataG16 = sumarPorClave(dataG16, 'year', 'unemployment_rate');
                dataMZ = sumarPorClave(dataMZ, 'year', 'num_workers');

                dataG16.forEach((obj, i) => {
                    // @ts-ignore
                    obj.num_workers = dataMZ[i]?.num_workers;
                });
                console.log(`Response received`);
            } else if (resG19.status === 404 || resMZ.status === 404) {
				resultStatus = 'warning';
				resultMessage = `No se encontraron datos`;
			}
            // @ts-ignore
            return dataG16;

        } catch (error) {
			console.log(`ERROR getting data from ${APIG16}: ${error}`);
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
                wheelX: "panX",
                wheelY: "zoomX",
                paddingLeft:0,
                layout: root.verticalLayout
            }));


            // Add legend
            // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
            // @ts-ignore
            var legend = chart.children.push(am5.Legend.new(root, {
                // @ts-ignore
                centerX: am5.p50,
                // @ts-ignore
                x: am5.p50
            }))


            // Data
            var data = graphData;


            // Create axes
            // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
            // @ts-ignore
            var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
                categoryField: "year",
                // @ts-ignore
                renderer: am5xy.AxisRendererY.new(root, {
                    inversed: true,
                    cellStartLocation: 0.1,
                    cellEndLocation: 0.9,
                    minorGridEnabled: true
                })
            }));

            yAxis.data.setAll(data);
            // @ts-ignore
            var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
                // @ts-ignore
                renderer: am5xy.AxisRendererX.new(root, {
                    strokeOpacity: 0.1,
                    minGridDistance: 50
                }),
                min: 0
            }));


            // Add series
            // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
            // @ts-ignore
            function createSeries(field, name) {
                // @ts-ignore
                var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: name,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueXField: field,
                    categoryYField: "year",
                    sequencedInterpolation: true,
                    // @ts-ignore
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "[bold]{name}[/]\n{categoryY}: {valueX}"
                    })
                }));

                series.columns.template.setAll({
                    // @ts-ignore
                    height: am5.p100,
                    strokeOpacity: 0
                });


                series.bullets.push(function () {
                    // @ts-ignore
                    return am5.Bullet.new(root, {
                        locationX: 1,
                        locationY: 0.5,
                        // @ts-ignore
                        sprite: am5.Label.new(root, {
                            // @ts-ignore
                            centerY: am5.p50,
                            text: "{valueX}",
                            populateText: true
                        })
                    });
                });

                series.bullets.push(function () {
                    // @ts-ignore
                    return am5.Bullet.new(root, {
                        locationX: 1,
                        locationY: 0.5,
                        // @ts-ignore
                        sprite: am5.Label.new(root, {
                            // @ts-ignore
                            centerX: am5.p100,
                            // @ts-ignore
                            centerY: am5.p50,
                            text: "{name}",
                            // @ts-ignore
                            fill: am5.color(0xffffff),
                            populateText: true
                        })
                    });
                });

                series.data.setAll(data);
                series.appear();

                return series;
            }

            createSeries("num_workers", "Numero de Trabajadores");
            createSeries("unemployment_rate", "Tasa de desempleo");


            // Add legend
            // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
            // @ts-ignore
            var legend = chart.children.push(am5.Legend.new(root, {
                // @ts-ignore
                centerX: am5.p50,
                // @ts-ignore
                x: am5.p50
            }));

            legend.data.setAll(chart.series.values);


            // Add cursor
            // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
            // @ts-ignore
            var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
                behavior: "zoomY"
            }));

            cursor.lineY.set("forceHidden", true);
            cursor.lineX.set("forceHidden", true);


            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            chart.appear(1000, 100);

            }); // end am5.ready()
    })

</script>

<div id="chartdiv"></div>