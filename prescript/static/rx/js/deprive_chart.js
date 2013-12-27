var width = 180,
    barHeight = 20,
    margin_left = 50;

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width+margin_left)
    .attr("height", barHeight * data.length+15);

var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate("+margin_left+"," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

bar.append("text")
	.attr("class","dep_chart_bar")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });

chart.append("text")
	.attr("class","dep_chart_lab")
	.attr("x",margin_left-5)
	.attr("y",barHeight-2)
	.attr("transform","rotate(-20 42,5)")
	.text("Least ");
chart.append("text")
	.attr("class","dep_chart_lab")
	.attr("x",margin_left-5)
	.attr("y",(barHeight*2)-2)
	.attr("transform","rotate(-20 42,25)")
	.text("Less ");
chart.append("text")
	.attr("class","dep_chart_lab")
	.attr("x",margin_left-5)
	.attr("y",(barHeight*3)-2)
	.attr("transform","rotate(-20 42,45)")
	.text("More ");
chart.append("text")
	.attr("class","dep_chart_lab")
	.attr("x",margin_left-5)
	.attr("y",(barHeight*4)-2)
	.attr("transform","rotate(-20 42,65)")
	.text("Most ");
