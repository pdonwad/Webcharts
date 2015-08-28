webCharts.createTable = function(element = 'body', config = {}, controls=null){
    let table = Object.create(webCharts.objects.table);
    
	table.div = element;
	
	table.config = Object.create(config);
	
	table.controls = controls;
	
	table.filters = [];
	
	table.required_cols = [];
	
	table.marks = [];
	
	table.wrap = d3.select(table.div).append('div');
    
	table.events = {
		onLayout(){},
		onDatatransform(){},
		onDraw(){},
		onResize(){}
	};
	
	table.on = function(event, callback){
		let possible_events = ['layout', 'datatransform', 'draw', 'resize'];
		if(possible_events.indexOf(event) < 0){
			return;
		}
		if(callback){
			table.events['on'+event.charAt(0).toUpperCase() + event.slice(1)] = callback;
		}
	};

    return table;
};