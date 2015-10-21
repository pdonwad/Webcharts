import version from './version';
import objects from './objects';
import {createChart} from './chart';
import {createControls} from './controls';
import {createTable} from './table';
import multiply from './multiply';

export var webCharts = {
	version: version,
	objects: objects,
	createChart: createChart,
	createControls: createControls,
	createTable: createTable,
	multiply: multiply
};

console.log(webCharts);