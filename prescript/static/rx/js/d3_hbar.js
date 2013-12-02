var margin = {top: 60, right: 45, bottom: 10, left: 10},
    width = 380 - margin.left - margin.right,
    height = 280 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width])

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], .2);

var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(6)
    .orient("top");

var svg = d3.select("#vizblock1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   
//Formatting
var percent = d3.format("+1%");
  xAxis.tickFormat(percent);


    
function update(data) {

  //Make sure 0 is in the domain if both numbers are positive or negative.
  var x_extent = d3.extent(data.data, function(d) { return +d.value ; });
      if(x_extent[0]*x_extent[1]<0){
        //opposite signs
        x.domain(x_extent).nice();
      }else if(x_extent[0]<0){
        //both negative
        x.domain([_.min(x_extent),0])
      }else{
        //both positive
        x.domain([0,_.max(x_extent)])
      };
    
  y.domain(data.data.map(function(d) { return d.name; }));

    var titles = svg.selectAll(".title")
      .data(data.chem.split(""),function(d,i){return d+i;});
      

    //update
    titles.attr("class","title update")
      .transition()
      .duration(750)
      .attr("x", function(d, i) { return i * 16; });
    //enter
    titles.enter().append("text")
      .attr("class","title enter")
      .attr("y", -50)
      .attr("x", function(d, i) { return i * 16; })
      .style("fill-opacity", 1e-6)
      .text(function(d) { return d; })
     .transition()
      .duration(750)
      .attr("y", -35)
      .style("fill-opacity", 1);
    titles.exit()
      .attr("class", "title exit")
    .transition()
      .duration(750)
      .attr("y", -20)
      .style("fill-opacity", 1e-6)
      .remove();



    var labs = svg.selectAll(".lab")
      .data(data.data);

    labs.enter().append("text").attr("class","lab");
    
    labs
      .text( function(d){return d.name;} )
      .attr("transform",function(d){ return "translate("+(width+10)+","+ (y(d.name)+ (y.rangeBand()/2)+(this.getComputedTextLength()/2) )+")rotate(-35)";});
    
    labs.exit()
      .remove();  

    var ENG = svg.selectAll(".ENG")
      .data(data.data);
    ENG.enter()
      .append("text")
      .attr("class","ENG")
      .attr("x",0)
      .attr("y",height+10);
    
    ENG
      .text("ENG")
      .transition().duration(1000)
      .attr("x",x(0)-11.5);

    ENG.exit().remove();


    var bars = svg.selectAll(".bar")
      .data(data.data);


    bars.enter().append("rect")
      .attr("width",0)
      .attr("cursor","pointer")
      .attr("x", function(d) { return d.value < 0 ? x(0) : x(Math.min(0, d.value)); })
      
      .on("click", 
            function(){ 
              onclick();
              if(clicker == 1)
                {
                  clearInterval(interval),
                  clicker = 0,
                  pausing.transition().duration(600)
                    .style("opacity",1)
                    .transition().duration(600)
                    .style("opacity",0);
                }
              else
                { 
                  update(eval("dataset.data".concat(i)));
                  if(i < 37){i=i+1}else{i=1};
                  interval = setInterval(cycle,5000) , 
                  clicker=1,
                  playing.transition().duration(600)
                    .style("opacity",1)
                    .transition().duration(600)
                    .style("opacity",0);
                };
            }
          )
      .on("mouseover",function(d){
          svg.select(".tip."+ d.name)
            .style("opacity","1")
            .style("fill","black");
          svg.select(".pointer."+ d.name)
            .transition().duration(100)
            .style("opacity","1");
          svg.selectAll(".instruct")
            .transition().duration(700)
            .style("opacity",1);
          })
      .on("mouseout",function(d){
          svg.select(".tip."+ d.name)
            .style("fill","grey")
            .transition().duration(100)
            .style("opacity","0");
          svg.selectAll(".pointer")
            .transition().duration(100)
            .style("opacity","0");
          svg.selectAll(".instruct")
            .transition().duration(700)
            .style("opacity",0);
          })
      ;
    

    bars
      .transition().duration(1000)
      .attr("class", function(d) { return d.value < 0 ? "bar negative" : "bar positive"; })
      .attr("y", function(d) { return y(d.name); })
      .attr("height", y.rangeBand())
      .style("fill", function(d) { return d.value < 0 ? "steelblue" : "#800000"; })
      .attr("x", function(d) { return x(Math.min(0, d.value)); })
      .attr("width", function(d) { return Math.abs(x(d.value) - x(0)); });

    bars.exit()
      .remove();


var onclick = function(){
    var bar = d3.selectAll(".bar");

      bar
        .transition().duration(60)
        .attr("height",y.rangeBand()-4)
        .attr("y", function(d) { return y(d.name)+2; })
        .attr("width", function(d) { return Math.abs(x(d.value) - x(0)-4); })
        .attr("x", function(d) { return x(Math.min(0, d.value))+2; })
        .transition().duration(60)
        .attr("height",y.rangeBand())
        .attr("y", function(d) { return y(d.name); })
        .attr("width", function(d) { return Math.abs(x(d.value) - x(0)); })
        .attr("x", function(d) { return x(Math.min(0, d.value)); });
  };

    var tips = svg.selectAll(".tip")
      .data(data.data);

    tips.enter().append("text").attr("class",function(d){return "tip "+d.name;})
      .attr("y",-33)
      .attr("x",width-50);

    tips
      .text(function(d){ return percent(d.value) ;});

    tips.exit()
    .remove();


    //Update x-axis
    svg.select(".x.axis")
        .transition()
        .duration(1000)
        .call(xAxis);

    svg.selectAll(".y.axis")
      .transition()
      .duration(1000)
      .attr("x1", x(0))
      .attr("x2", x(0));


    var pointers = svg.selectAll(".pointer")
      .data(data.data);

    pointers.enter().append("polygon")
      .attr("class",function(d){return "pointer "+d.name;});

    pointers
      .transition()
      .duration(1000)
      .attr("points",function(d){ return x(d.value)+",-2 "+(x(d.value)-5)+",-10 "+(x(d.value)+5)+",-10";});

    pointers.exit().remove();
};


svg.append("g")
  .attr("class", "x axis")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .append("line")
  .attr("class", "y axis")
  .attr("y2", height)
  .attr("x1", 0)
  .attr("x2", 0);


var i = 1,
    clicker = 1;

update(eval("dataset.data".concat(i)));
if(i < 37){i=i+1}else{i=1};
var cycle = function(){update(eval("dataset.data".concat(i)));if(i < 37){i=i+1}else{i=1};};

var interval = setInterval(cycle,5000);

svg.append("polygon")
  .attr("class", "play")
  .attr("points",(width/2+20)+","+(height/2)+" "+(width/2-20)+","+(height/2-20)+" "+(width/2-20)+","+(height/2+20));;



// Play/Pause Instructions
svg.append("rect")
  .attr("class","instruct")
  .attr("x",-10)
  .attr("y",height-5)
  .attr("height",18)
  .attr("width",113)
  .style("fill", "white")
  .style("opacity",0);

svg.append("text")
  .attr("class","instruct")
  .text("Click to pause/play.")
  .attr("x",-5)
  .attr("y",height+8)
  .style("opacity",0);

// Play/Pause button
svg.append("rect")
  .attr("class", "pause")
  .attr("width",13)
  .attr("height",40)
  .attr("x", width/2 - (10))
  .attr("y", height/2 - (40/2));
svg.append("rect")
  .attr("class", "pause")
  .attr("width",13)
  .attr("height",40)
  .attr("x", width/2 + (10))
  .attr("y", height/2 - (40/2));
svg.append("polygon")
  .attr("class", "play")
  .attr("points",(width/2+20)+","+(height/2)+" "+(width/2-20)+","+(height/2-20)+" "+(width/2-20)+","+(height/2+20));

var pausing = svg.selectAll(".pause");
var playing = svg.selectAll(".play");