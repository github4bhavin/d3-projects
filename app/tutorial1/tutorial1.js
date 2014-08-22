

$(document).ready(function(){

	var data = [20,30,22,42,10,35];

var chartArea = { width : 500 , height : 200 , barHeight : 30 ,barSpacing:5};	

var xScale    = d3.scale.linear()
				  .domain([0 , d3.max(data)])
				  .range([0 , chartArea.width]);

var chart = d3.select('#chart-bar-horizontal')
	  			.append('svg')
	  			.attr('width', chartArea.width)
	  			.attr('height',chartArea.height);

var bar = chart.selectAll('g')
				.data(data)
				.enter().append('g')
				.attr('transform',function(d,i){return 'translate(0,' + i * chartArea.barHeight + ')'; });

	bar.append('rect')
		.attr('width',xScale)
		.attr('height',chartArea.barHeight - 1);
	bar.append('text')
		.attr('x',xScale)
		.attr('y',chartArea.barHeight/2)
		.attr('dy', ".2em")
		.attr('dx',"-.2em")
		.text( function(d){return d;} );
});