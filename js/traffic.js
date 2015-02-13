jQuery(document).ready(function() {

	var db_data = [
			{ y: '2015-2-1', a: 30,  b: 20 },
			{ y: '2015-2-2', a: 75,  b: 65 },
			{ y: '2015-2-3', a: 50,  b: 40 },
			{ y: '2015-2-4', a: 75,  b: 65 },
			{ y: '2015-2-5', a: 50,  b: 40 },
			{ y: '2015-2-6', a: 75,  b: 65 },
			{ y: '2015-2-7', a: 100, b: 90 },
			{ y: '2015-2-12', a: 30,  b: 20 },
			{ y: '2015-2-13', a: 75,  b: 65 },
			{ y: '2015-2-14', a: 50,  b: 40 },
			{ y: '2015-2-15', a: 75,  b: 65 },
			{ y: '2015-2-16', a: 50,  b: 40 },
			{ y: '2015-2-17', a: 75,  b: 65 },
			{ y: '2015-2-18', a: 100, b: 90 },
			{ y: '2015-2-19', a: 30,  b: 20 },
			{ y: '2015-2-20', a: 75,  b: 65 },
			{ y: '2015-2-21', a: 50,  b: 40 },
			{ y: '2015-2-22', a: 75,  b: 65 },
			{ y: '2015-2-23', a: 50,  b: 40 },
			{ y: '2015-2-24', a: 75,  b: 65 },
			{ y: '2015-2-25', a: 100, b: 90 }
		];

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

		var traffic_data = db_data;

                
        var traffic_total_bar = Morris.Bar({
            // ID of the element in which to draw the chart.
            element: 'stacked-chart',
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
            data: traffic_data,
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['기 방문자', '미 방문자'],
            barColors: ['#1CAF9A', '#428BCA'],
            lineWidth: '1px',
            fillOpacity: 0.8,
            smooth: false,
            stacked: true,
            hideHover: true
        });
	
        var traffic_existing_bar = Morris.Bar({
            // ID of the element in which to draw the chart.
            element: 'bar-chart',
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
            data: traffic_data,
            xkey: 'y',
            ykeys: ['a'],
            labels: ['기 방문자'],
            barColors: ['#1CAF9A'],
            lineWidth: '1px',
            fillOpacity: 0.8,
            smooth: false,
            hideHover: true
        });


        var traffic_new_bar = Morris.Bar({
            // ID of the element in which to draw the chart.
            element: 'bar-chart2',
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
            data: traffic_data,
            xkey: 'y',
            ykeys: ['b'],
            labels: ['미 방문자'],
            barColors: ['#428BCA'],
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

	function setData(start, end){
		var ret = [];
		var sdate, date;	
		for (var i = 0; i < db_data.length; i++) {
			sdate = db_data[i].y.split('-');
			date = new Date(sdate[0], sdate[1], sdate[2]).valueOf();
			if (date >= start && date <= end) {
				ret.push({
					y: db_data[i].y,
					a: db_data[i].a,
					b: db_data[i].b
				});
			}
		}
		return ret;
	}

	$("#btnsearch").click(function() {
			var start = $("#datetraffic1").val();
			var end = $("#datetraffic2").val();

			var startDate = start.split('-');
			var endDate = end.split('-');

			var sDate = new Date(startDate[0], startDate[1], startDate[2]).valueOf();
			var eDate = new Date(endDate[0], endDate[1], endDate[2]).valueOf();

			if(sDate > eDate) {
				alert("시간 구간을 제대로 설정해 주세요");
				return;
			}

			traffic_total_bar.setData(setData(sDate, eDate));
			traffic_existing_bar.setData(setData(sDate, eDate));
			traffic_new_bar.setData(setData(sDate, eDate));
	});
});
