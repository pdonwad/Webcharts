webCharts.chartCount = 0;

/**The base chart object.
	*@alias module:webCharts.chart
	*@param {string} element - CSS selector identifying the element in which to create the chart.
	*@param {string} filepath - path to the file containing data for the chart. Expected to be a text file of comma-separated values.
	*@param {Object} config - the configuration object specifying all options for how the chart is to appear and behave.
	*@param {Object} config.x - object with properties to define the x-axis.
	*@param {Object} config.x.column - column from the supplied dataset to supply values for x-axis.
 	*@param {Object} config.y - object with properties to define the y-axis.
	*@param {controls} controls - {@link module-webCharts.Controls.html Controls} instance that will be linked to this chart instance.
*/
webCharts.chart = function(element = 'body', filepath, config = {}, controls){
    let chart = Object.create(chartProto);
    /** @member {string} */
		chart.div = element;
		/** @member {string} */
		chart.filepath = filepath;
		/** @member {Object} */
		chart.config = Object.create(config);
		/** @member {Controls} */
		chart.controls = controls;
		/** @member {Array} */
		chart.filters = [];
		/** @member {Array} */
		chart.required_cols = [];
		/** @member {Array} */
		chart.marks = [];
		/** @member {d3.selection} */
		chart.wrap = d3.select(chart.div).append('div');

    /** @member {Object} */
		chart.events = {
			onLayout(){},
			onDatatransform(){},
			onDraw(){},
			onResize(){}
		};
		/**run the supplied callback function at the specified time in the Chart lifecycle
			*@method
			*@param {string} event - point in Chart lifecycle at which to fire the associated callback
			*@param {function} callback - function to run
		*/
		chart.on = function(event, callback){
			let possible_events = ['layout', 'datatransform', 'draw', 'resize'];
			if(possible_events.indexOf(event) < 0)
				return;
			if(callback)
				chart.events['on'+event.charAt(0).toUpperCase() + event.slice(1)] = callback;
		};

    webCharts.chartCount++;
    chart.id = webCharts.chartCount;

    return chart;
};
