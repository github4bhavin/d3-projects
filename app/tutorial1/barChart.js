var barChart = function (args){
	
	this.chartArea    = args.chartArea;
	this.chartElement = args.chartElement;
	this._data        = args.data;

	this.data = function(data){ this._data = data; };

	
	this.addScales = function(){
			this.xScale = d3.scale.linear()
			                      .domain([0,this._data.length])
			                      .range([0,this.chartArea.width]);
			                      
			this.yScale = d3.scale.linear()
								  .domain([0, d3.max(this._data)])
								  .range([this.chartArea.height, 0]);
								  
			this.xAxis = d3.svg.axis()
								.scale(this.xScale)
								.orient(this.chartArea.axis.x.orient);
								
			this.yAxis = d3.svg.axis()
							   .scale(this.yScale)
							   .orient(this.chartArea.axis.y.orient);

		};
	
	this.getChart = function(){
			this.chart = d3.select(this.chartElement)
			               .append('svg')
			               .attr('width' , this.chartArea.outerArea.width )
			               .attr('height', this.chartArea.outerArea.height );
		};
	
	this.addBars = function(){
			bar = this;
			bar.bar = bar.chart.append('g')
								.attr('transform', "translate("+ bar.chartArea.margin.left + ","+bar.chartArea.margin.top+")" )
								.selectAll('g')
								 .data(bar._data)
								 .enter()
								 .append('g')
								  .attr('transform', 
										  function(d,i){ return "translate("+ bar.xScale(i) + ",0)"; });
			bar.bar.append('rect')
					.attr('width',bar.chartArea.bar.width)
					.attr('height', function(d){ return (bar.chartArea.height - bar.yScale(d)); })
					.attr('y', function(d){ return bar.yScale(d); });
					
			bar.bar.append('text')
					.attr('x', function(d){return bar.chartArea.bar.width/2;})
					.attr('y', function(d){ return bar.yScale(d); })
					.attr('dy',"1em")
					.attr('text-anchor', "middle")
					.text(function(d){return d;})
		};
	this.addGrid = function(){
			chart = this;
			this.chart.append('g')
					  .attr('class',"x grid")
					  .selectAll('line')
					  .data(this.yScale.ticks())
					  .enter()
					  	.append("line")
					  	.attr('transform', function(d,i){ return "translate(0,"+ (chart.yScale(d)+ chart.chartArea.margin.top) +")";})
					  	.attr('x1', this.chartArea.margin.left )
					  	.attr('y1', 0)
					  	.attr('x2', this.chartArea.width + this.chartArea.margin.right )
					  	.attr('y2', 0);

			this.chart.append('g')
					  .attr('class', 'y grid')
					  .attr('transform', "translate("+this.chartArea.margin.left+",0)" )
					  .selectAll('line')
					  .data(this.xScale.ticks())
					  .enter()
					  	.append("line")
					  	.attr('transform',function(d,i){return "translate("+ chart.xScale(i) +","+chart.chartArea.margin.top+")"; })
					  	.attr('x1', 0)
					  	.attr('y1', 0)
					  	.attr('x2', 0)
					  	.attr('y2',  this.chartArea.height );
					  	
		};
	this.addMinorGrid = function (){
			chart = this;
			this.chart.append('g')
						.attr('class','x grid minor')
						.selectAll('line')
						.data( this.xScale.ticks(this._data.length * this.chartArea.yGridLines))
						.enter()
							.append('line')
							.attr('transform' , function(d,i){ return "translate("+ (chart.chartArea.margin.left + chart.xScale(d))+","+chart.chartArea.margin.top+")"; })
							.attr('x1' , 0)
							.attr('y1' , 0)
							.attr('x2' , 0)
							.attr('y2' , (this.chartArea.height));
						
			this.chart.append('g')
						  .attr('class', 'y grid minor')
						  .selectAll('line')
						  .data( this.yScale.ticks( this._data.length * this.chartArea.xGridLines ))
						  .enter()
							  	.append('line')
							  	.attr('transform', function(d,i){ return "translate(0," +(chart.yScale(d)+ chart.chartArea.margin.top)+ ")"; })
							  	.attr('x1', this.chartArea.margin.left)
							  	.attr('y1', 0)
							  	.attr('x2', this.chartArea.width + this.chartArea.margin.right)
							  	.attr('y2', 0);
		};
	
	this.addAxis = function(){
			this.chart.append('g')
					  .attr('class', "x axis")
					  .attr('transform', "translate("+this.chartArea.margin.left+"," + (this.chartArea.height + this.chartArea.margin.top)+ ")" )
					  .call(this.xAxis);
			this.chart.append('g')
					  .attr('class', "y axis")
					  .attr('transform', "translate("+this.chartArea.margin.left +","+ this.chartArea.margin.top+")" )
					  .call(this.yAxis);
					  
		};
	
	this.validate = function(){
			var minTopMargin = this.chartArea.height *.20;
			var minLeftMargin = this.chartArea.width *.20;
			
			if( minTopMargin < 20)
				minTopMargin = 20;
			if ( minLeftMargin < 20)
				minLeftMargin = 20;
				
			if( this.chartArea.margin.top < minTopMargin )
				this.chartArea.margin.top = minTopMargin;
			if( this.chartArea.margin.bottom < minTopMargin )
				this.chartArea.margin.bottom = minTopMargin;
			if( this.chartArea.margin.left < minLeftMargin )
				this.chartArea.margin.left = minLeftMargin;
			if( this.chartArea.margin.right < minLeftMargin )
				this.chartArea.margin.right = minLeftMargin;
				
			if (!this.chartArea.xGridLines ) this.chartArea.xGridLines = 5;
			if (!this.chartArea.yGridLines ) this.chartArea.yGridLines = 5; 
			
			this.chartArea.bar = {};
			this.chartArea.bar.spacing = 1;
			this.chartArea.bar.width = (this.chartArea.width /this._data.length) - this.chartArea.bar.spacing;
			this.chartArea.axis = {
					x : { orient : 'bottom' },
					y : { orient : 'left'   } 
			};
	
			this.chartArea.outerArea = { 
					width : this.chartArea.width + this.chartArea.margin.left + this.chartArea.margin.right,
					height : this.chartArea.height + this.chartArea.margin.top + this.chartArea.margin.bottom
			};			
		};// validate end
	
	
	this.draw = function(){
			this.validate();
			this.getChart();
			this.addScales();
			this.addMinorGrid();
			this.addGrid();
			this.addBars();
			this.addAxis();
		};
	
};
