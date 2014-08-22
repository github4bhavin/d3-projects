
$(document).ready(function(){
	
var data = [ 20,15,19,25,30,40,10,30,50,60,70,45];

var chartArea = {      width : 500 ,       height : 300 , 
                  marginLeft : 50  , marginBottom : 50  ,
                  marginTop  : 30  , marginRight  : 30  ,
                  barWidth : 60    ,
                };

    chartArea.barWidth = ((chartArea.width)/data.length);

var xScale  = d3.scale.linear()
					.domain([0,data.length])
					.range([0,(chartArea.width+ chartArea.barWidth)]);

var yScale = d3.scale.linear()
					 .domain([0,d3.max(data)])
					 .range([chartArea.height,0]);

var xAxis  = d3.svg.axis()
				.scale(xScale)
				.ticks(data.length)
				.tickPadding(3)
				.innerTickSize(10)
				.outerTickSize(10)
				.orient('bottom');
					 

var yAxis = d3.svg.axis()
				  .scale(yScale)
				  .orient('left');

var chart = d3.select("#chart-bar-vertical-scale")
			  .append('svg')
			  .attr('width' , chartArea.width + chartArea.marginLeft + chartArea.barWidth)
			  .attr('height', chartArea.height + chartArea.marginBottom + chartArea.marginTop);
			  
var bar = chart.append('g')
				.attr('transform' , "translate(" +chartArea.marginLeft+","+ chartArea.marginTop+")" )
				.selectAll('g')
				.data(data)
				.enter().append('g')
				.attr('transform' , function(d,i){ return 'translate(' + xScale(i) + ',0)';});

	chart.append('g')
	     .attr("class","x axis")
	     .attr('transform', "translate("+ chartArea.marginLeft+","+ (chartArea.height + chartArea.marginTop) +")")
	     .call(xAxis)
	     .append('text')
	     	.attr('transform', "translate(" + (chartArea.width+ chartArea.marginLeft)/2 +","+ (chartArea.marginTop+0)+ ")" )
	     	.text('Numbers');
				
	chart.append('g')
		 .attr('class', "y axis")
		 .attr('transform', "translate("+ chartArea.marginLeft + "," + chartArea.marginTop +")" )
		 .call(yAxis)
		 .append('text')
		  .attr("transform" , "translate("+ -chartArea.marginLeft/2 +","+ (chartArea.height + chartArea.marginTop)/1.5 +") " + "rotate(-90)" )
		  .text('Values');
		 
   bar.append('rect')
   	  .attr('width', chartArea.barWidth -1)
   	  .attr('height' , function(d){ return chartArea.height - yScale(d); })
   	  .attr('y', yScale);
   	  
   bar.append('text')
   	  .attr('y', yScale)
   	  .attr('x' , chartArea.barWidth/2)
   	  .attr('dy',"1em")
   	  .attr('dx', ".1em")
   	  .attr('text-anchor','middle')
      .text(function(d){return d});
});