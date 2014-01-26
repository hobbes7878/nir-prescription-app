var parser = d3.time.format("%Y"),
bisectDate = d3.bisector(function(d) { return d.year; }).right;

var margin = {top: 20, right: 40, bottom: 20, left: 35, axis:-12},
	width = 180 - margin.left - margin.right,
	height = 150 - margin.top - margin.bottom;

var f_x = d3.time.scale()
    .range([0, width]);

var f_y = d3.scale.linear()
    .range([height, 0]);


parser.parse("2000")
var tickVals = [parser.parse("2000"),parser.parse("2004"),parser.parse("2008"),parser.parse("2012")];

var f_xAxis = d3.svg.axis()
    .scale(f_x)
    .tickValues(tickVals)
    .orient("bottom");

var f_yAxis = d3.svg.axis()
    .scale(f_y)
    .ticks(5)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return f_x(parser.parse(d.year)); })
    .y(function(d) { return f_y(d.value); });

var svg = d3.select(".fatal_div .lab_pad").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  f_x.domain(d3.extent(fatal_data.fatalities, function(d) { return parser.parse(d.year); }));
  f_y.domain([0, d3.max(fatal_data.fatalities, function(d) { return d.value; })]);



  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(f_xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate("+margin.axis+",0)")
      .call(f_yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".41em")
      .style("text-anchor", "end")
      .text("Fatalities");

  svg.append("path")
      .datum(fatal_data.fatalities)
      .attr("class", "line")
      .attr("d", line);

  var focus = svg.append("g")
      .attr("class", "focus")

      .style("display", "none");

  focus.append("circle")
    .attr("r", 3.5);

  focus.append("text")
    .attr("y", -15)
    .attr("dy", ".45em")
    .attr("font-size","14px");

  svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove);

  function mousemove() {
    var x0 = f_x.invert(d3.mouse(this)[0]);
    var i = bisectDate(fatal_data.fatalities, x0.getFullYear(), 1);
    var d0 = fatal_data.fatalities[i - 1];
    var d1 = fatal_data.fatalities[i];
    var d = x0 - parser.parse(d0.year) > parser.parse(d1.year) - x0 ? d1 : d0;
    focus.attr("transform", "translate(" + f_x(parser.parse(d.year))+ "," + f_y(d.value) + ")");
    focus.select("text").text(d.value);
  };