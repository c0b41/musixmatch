var pattern =[
  {all:/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g},
  {id:/id=["'](.*?)["']/g},
  {class:/class=["'](.*?)["']/g},
  {src:/src=["'](.*?)["']/g},
  {href:/href=["'](.*?)["']/g},
  {title:/title=["'](.*?)["']/g}
];

module.exports =pattern;
