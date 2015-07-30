export function makeBtnGroupControl(control, control_wrap){
  let option_data = control.values ? control.values : d3.keys(this.data[0]);

  let btn_wrap = control_wrap.append('div').attr('class', 'btn-group');

  let changers = btn_wrap.selectAll('button')
    	.data(option_data)
    	.enter().append('button')
      .attr('class', 'btn btn-default btn-sm')
      .text(d => d)
      .classed('btn-primary', d => {
        if(control.option.indexOf('.') !== -1)
          return this.targets[0].config[control.option.split('.')[0]][control.option.split('.')[1]] === d;
        else
          return this.targets[0].config[control.option] === d;
      });

  changers.on('click', d => {
     changers.each(function(e){
       d3.select(this).classed('btn-primary', e === d);
     });
     this.changeOption(control.option, d);
  });
}
