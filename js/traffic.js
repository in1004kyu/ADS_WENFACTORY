 jQuery(document).ready(function() {

          $( "#datetraffic1, #datetraffic2" ).datepicker({
            dateFormat: 'yy-mm-dd',
            prevText: '이전 달',
            nextText: '다음 달',
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            dayNames: ['일','월','화','수','목','금','토'],
            dayNamesShort: ['일','월','화','수','목','금','토'],
            dayNamesMin: ['일','월','화','수','목','금','토'],
            showMonthAfterYear: true,
            yearSuffix: '년'
            });


        // Chosen Select
        jQuery(".chosen-select").chosen({
            'width':'100%',
            'white-space':'nowrap',
            disable_search: true
        });
        
        new Morris.Bar({
            // ID of the element in which to draw the chart.
            element: 'bar-chart',
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
            data: [
                { y: '2006', a: 30, b: 20 },
                { y: '2007', a: 75,  b: 65 },
                { y: '2008', a: 50,  b: 40 },
                { y: '2009', a: 75,  b: 65 },
                { y: '2010', a: 50,  b: 40 },
                { y: '2011', a: 75,  b: 65 },
                { y: '2012', a: 100, b: 90 }
            ],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Solved', 'Unresolved'],
            barColors: ['#D9534F', '#F0AD4E'],
            lineWidth: '1px',
            fillOpacity: 0.8,
            smooth: false,
            hideHover: true
        });
        
        new Morris.Bar({
            // ID of the element in which to draw the chart.
            element: 'stacked-chart',
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
            data: [
                { y: '2006', a: 30, b: 20 },
                { y: '2007', a: 75,  b: 65 },
                { y: '2008', a: 50,  b: 40 },
                { y: '2009', a: 75,  b: 65 },
                { y: '2010', a: 50,  b: 40 },
                { y: '2011', a: 75,  b: 65 },
                { y: '2012', a: 100, b: 90 }
            ],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Series A', 'Series B'],
            barColors: ['#1CAF9A', '#428BCA'],
            lineWidth: '1px',
            fillOpacity: 0.8,
            smooth: false,
            stacked: true,
            hideHover: true
        });

        new Morris.Bar({
            // ID of the element in which to draw the chart.
            element: 'bar-chart2',
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
            data: [
                { y: '2006', a: 30, b: 20 },
                { y: '2007', a: 75,  b: 65 },
                { y: '2008', a: 50,  b: 40 },
                { y: '2009', a: 75,  b: 65 },
                { y: '2010', a: 50,  b: 40 },
                { y: '2011', a: 75,  b: 65 },
                { y: '2012', a: 100, b: 90 }
            ],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Solved', 'Unresolved'],
            barColors: ['#D9534F', '#F0AD4E'],
            lineWidth: '1px',
            fillOpacity: 0.8,
            smooth: false,
            hideHover: true
        });
 
    // Flot Chart Dynamic Chart

        var container = $("#flot-moving-line-chart");

        // Determine how many data points to keep based on the placeholder's initial size;
        // this gives us a nice high-res plot while avoiding more than one point per pixel.

        var maximum = container.outerWidth() / 2 || 300;

        //

        var data = [];

        function getRandomData() {

            if (data.length) {
                data = data.slice(1);
            }

            while (data.length < maximum) {
                var previous = data.length ? data[data.length - 1] : 50;
                var y = previous + Math.random() * 10 - 5;
                data.push(y < 0 ? 0 : y > 100 ? 100 : y);
            }

            // zip the generated y values with the x values

            var res = [];
            for (var i = 0; i < data.length; ++i) {
                res.push([i, data[i]])
            }

            return res;
        }

        //

        series = [{
            data: getRandomData(),
            lines: {
                fill: true
            }
        }];

        //

        var plot = $.plot(container, series, {
            grid: {
                borderWidth: 1,
                minBorderMargin: 20,
                labelMargin: 10,
                backgroundColor: {
                    colors: ["#fff", "#e4f4f4"]
                },
                margin: {
                    top: 8,
                    bottom: 20,
                    left: 20
                },
                markings: function(axes) {
                    var markings = [];
                    var xaxis = axes.xaxis;
                    for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
                        markings.push({
                            xaxis: {
                                from: x,
                                to: x + xaxis.tickSize
                            },
                            color: "rgba(232, 232, 255, 0.2)"
                        });
                    }
                    return markings;
                }
            },
            xaxis: {
                tickFormatter: function() {
                    return "";
                }
            },
            yaxis: {
                min: 0,
                max: 110
            },
            legend: {
                show: true
            }
        });

        // Update the random dataset at 25FPS for a smoothly-animating chart

        setInterval(function updateRandom() {
            series[0].data = getRandomData();
            plot.setData(series);
            plot.draw();
        }, 40);

    // Flot Chart Dynamic Chart
    });