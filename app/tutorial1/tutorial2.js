
$(document).ready(function(){
	
var data =[ 10,40,23,32,25,15];

var chartArea = {width : 300 , height : 300 , barWidth : 30 };

var yScale = d3.scale.linear()
				.domain([0,d3.max(data)])
				.range([chartArea.height,0]);

var chart = d3.select('#chart-bar-vertical')
				.append('svg')
				.attr('width', chartArea.width)
				.attr('height',chartArea.height);
				
var bar = chart.selectAll('g')
			.data(data)
			.enter()
				.append('g')
				.attr('transform', function(d,i){ return 'translate(' + i * chartArea.barWidth + ',0)'; })
				
	bar.append('rect')
	   .attr('width' , chartArea.barWidth -1 )
	   .attr('y', yScale ) 
	   .attr('height', function(d){ return chartArea.height - yScale(d); });
	   
	bar.append('text')
		.attr('x', chartArea.barWidth/2 )
		.attr('y',yScale)
		.attr('dx',".35em")
		.attr('dy',"1em")
		.text(function(d){ return d;})
});