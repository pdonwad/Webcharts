export function makeLegend(scale = this.colorScale, label, custom_data){
  let context = this;
  let config = this.config;

  config.legend.mark = config.legend.mark ? config.legend.mark :
    config.marks.length && config.marks[0].type === 'bar' ? 'square' :
    config.marks.length ? config.marks[0].type :
    'square';

  let legend_label = label ? label :
   typeof config.legend.label === 'string' ? config.legend.label :
   config.meta_map ? this.metaMap(config.color_by) :
   '';

  let legend = this.legend || this.wrap.select('.legend');

  let legend_data = custom_data || scale.domain().slice(0).filter(f => f !== undefined && f !== null).map(m => {
    return {label: m,  mark: config.legend.mark};
  });

  legend.select('.legend-title').text(legend_label).style('display', legend_label ? 'inline' : 'none');

  let leg_parts = legend.selectAll('.legend-item')
      .data(legend_data, d => d.label + d.mark);

  leg_parts.exit().remove();

  let new_parts = leg_parts.enter().append('li')
      .attr('class', 'legend-item')
  new_parts.append('span').attr('class', 'legend-mark-text').style('color', d => scale(d.label) );
  new_parts.append('svg').attr('class', 'legend-color-block');

  if(config.legend.order)
    leg_parts.sort((a,b) => d3.ascending(config.legend.order.indexOf(a.label), config.legend.order.indexOf(b.label)) );

  leg_parts.selectAll('.legend-color-block').select('.legend-mark').remove();
  leg_parts.selectAll('.legend-color-block').each(function(e){
    let svg = d3.select(this);
    if(e.mark === 'circle')
      svg.append('circle').attr({'cx': '.5em', 'cy': '.45em', 'r': '.45em', 'class': 'legend-mark'});
    else if(e.mark === 'line')
      svg.append('line').attr({'x1': 0, 'y1': '.5em', 'x2': '1em', 'y2': '.5em', 'stroke-width': 2, 'shape-rendering': 'crispEdges', 'class': 'legend-mark'});
    else if(e.mark === 'square')
      svg.append('rect').attr({'height': '1em', 'width': '1em', 'class': 'legend-mark'});
  });
  leg_parts.selectAll('.legend-color-block').select('.legend-mark')
    .attr('fill', d => d.color || scale(d.label))
    .attr('stroke', d => d.color || scale(d.label))
    .each(function(e){ d3.select(this).attr(e.attributes) });

  new_parts.append('span').attr('class', 'legend-label')
  .text(d => this.metaMap.domain().indexOf(d.label) > -1 ? this.metaMap(d.label) : d.label);

  leg_parts.on('mouseover', function(d){
    if(!config.legend.highlight_on_hover)
      return;
    let fill = d3.select(this).select('.legend-mark').attr('fill');
    context.svg.selectAll('.wc-data-mark').attr('opacity', 0.1).filter(function(f){
      return d3.select(this).attr('fill') === fill || d3.select(this).attr('stroke') === fill;
    }).attr('opacity', 1);
  })
  .on('mouseout', d => {
    if(!config.legend.highlight_on_hover)
      return;
     this.svg.selectAll('.wc-data-mark').attr('opacity', 1);
  });

  if(scale.domain().length > 1)
    legend.style('display', 'block');
  else
    legend.style('display', 'none');

  this.legend = legend;
}
