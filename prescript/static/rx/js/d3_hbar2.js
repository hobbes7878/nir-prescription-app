var margin2 = {top: 60, right: 45, bottom: 10, left: 10},
    width2 = 380 - margin2.left - margin2.right,
    height2 = 280 - margin2.top - margin2.bottom;

var x2 = d3.scale.linear()
    .range([0, width2])

var y2 = d3.scale.ordinal()
    .rangeRoundBands([0, height2], .2);

var xAxis2 = d3.svg.axis()
    .scale(x2)
    .ticks(6)
    .orient("top");

var svg2 = d3.select("#vizblock2").append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

   
//Formatting
var percent = d3.format("1");
  xAxis2.tickFormat(percent);


    
var update2 =function(data) {

  //Make sure 0 is in the domain if both numbers are positive or negative.
  var x_extent2 = d3.extent(data.data, function(d) { return +d.value ; });
      if(x_extent2[0]*x_extent2[1]<0){
        //opposite signs
        x2.domain(x_extent2).nice();
      }else if(x_extent2[0]<0){
        //both negative
        x2.domain([_.min(x_extent2),0])
      }else{
        //both positive
        x2.domain([0,_.max(x_extent2)])
      };
    
  y2.domain(data.data.map(function(d) { return d.name; }));

    var titles2 = svg2.selectAll(".title2")
      .data(data.chem.split(""),function(d,i){return d+i;});
      

    //update
    titles2.attr("class","title2 update2")
      .transition()
      .duration(750)
      .attr("x", function(d, i) { return i * 16; });
    //enter
    titles2.enter().append("text")
      .attr("class","title2 enter2")
      .attr("y", -50)
      .attr("x", function(d, i) { return i * 16; })
      .style("fill-opacity", 1e-6)
      .text(function(d) { return d; })
     .transition()
      .duration(750)
      .attr("y", -35)
      .style("fill-opacity", 1);
    titles2.exit()
      .attr("class", "title2 exit2")
    .transition()
      .duration(750)
      .attr("y", -20)
      .style("fill-opacity", 1e-6)
      .remove();



    var labs2 = svg2.selectAll(".lab2")
      .data(data.data);

    labs2.enter().append("text").attr("class","lab2");
    
    labs2
      .text( function(d){return d.name;} )
      .attr("transform",function(d){ return "translate("+(width2+10)+","+ (y2(d.name)+ (y2.rangeBand()/2)+(this.getComputedTextLength()/2) )+")rotate(-35)";});
    
    labs2.exit()
      .remove();  




    var bars2 = svg2.selectAll(".bar2")
      .data(data.data);


    bars2.enter().append("rect")
      .attr("width",0)
      .attr("cursor","pointer")
      .attr("x", function(d) { return d.value < 0 ? x2(0) : x2(Math.min(0, d.value)); })
      
      .on("click", 
            function(){ 
              onclick2();
              if(clicker2 == 1)
                {
                  clearInterval(interval2),
                  clicker2 = 0,
                  pausing2.transition().duration(600)
                    .style("opacity",1)
                    .transition().duration(600)
                    .style("opacity",0);
                }
              else
                { 
                  update2(eval("dataset2.data".concat(i2)));
                  if(i2 < 3){i2=i2+1}else{i2=1};
                  interval2 = setInterval(cycle2,5000) , 
                  clicker2=1,
                  playing2.transition().duration(600)
                    .style("opacity",1)
                    .transition().duration(600)
                    .style("opacity",0);
                };
            }
          )
      .on("mouseover",function(d){
          svg2.select(".tip2."+ d.name)
            .style("opacity","1")
            .style("fill","black");
          svg2.select(".pointer2."+ d.name)
            .style("opacity","1");
          svg2.select(".eng_points2."+ d.name)
            .style("opacity","1");
          svg2.select(".wal_points2."+ d.name)
            .style("opacity","1");
          svg2.selectAll(".instruct2")
            .transition().duration(700)
            .style("opacity",1);
          })
      .on("mouseout",function(d){
          svg2.select(".tip2."+ d.name)
            .style("fill","grey")
            .transition().duration(100)
            .style("opacity","0");
          svg2.selectAll(".pointer2")
            .style("opacity","0");
          svg2.selectAll(".eng_points2")
            .style("opacity","0");
          svg2.selectAll(".wal_points2")
            .style("opacity","0");
          svg2.selectAll(".instruct2")
            .transition().duration(700)
            .style("opacity",0);
          })
      ;
    

    bars2
      .transition().duration(1000)
      .attr("class", function(d) { return d.value < 0 ? "bar2 negative2" : "bar2 positive2"; })
      .attr("y", function(d) { return y2(d.name); })
      .attr("height", y2.rangeBand())
      .style("fill", function(d) { return d.value < 0 ? "steelblue" : "#800000"; })
      .attr("x", function(d) { 
        return x2(Math.min(0, d.value)); })
      .attr("width", function(d) { return Math.abs(x2(d.value) - x2(0)); });

    bars2.exit()
      .remove();




    var tips2 = svg2.selectAll(".tip2")
      .data(data.data);

    tips2.enter().append("text").attr("class",function(d){return "tip2 "+d.name;})
      .attr("y",-33)
      .attr("x",width2-50);

    tips2
      .text(function(d){ return percent(d.value) ;});

    tips2.exit()
    .remove();


    /*English Pointers*/
    var eng_points2 = svg2.selectAll(".eng_points2")
      .data(data.data);

    eng_points2.enter().append("polygon")
      .attr("class",function(d){return "eng_points2 "+d.name;});

    eng_points2
      .transition()
      .duration(1000)
      .attr("points",function(d){ return x2(d.eng)+",-2 "+(x2(d.eng)-9)+",-20 "+(x2(d.eng)+9)+",-20";});

    eng_points2.exit().remove();


    /*Welsch Pointers*/
    var wal_points2 = svg2.selectAll(".wal_points2")
      .data(data.data);

    wal_points2.enter().append("polygon")
      .attr("class",function(d){return "wal_points2 "+d.name;});

    wal_points2
      .transition()
      .duration(1000)
      .attr("points",function(d){ return x2(d.wal)+",-2 "+(x2(d.wal)-9)+",-20 "+(x2(d.wal)+9)+",-20";});

    wal_points2.exit().remove();



    var pointers2 = svg2.selectAll(".pointer2")
      .data(data.data);

    pointers2.enter().append("polygon")
      .attr("class",function(d){return "pointer2 "+d.name;});

    pointers2
      .transition()
      .duration(1000)
      .attr("points",function(d){return x2(d.value)+",-2 "+(x2(d.value)-9)+",-20 "+(x2(d.value)+9)+",-20";});

    pointers2.exit().remove();



    //Update x-axis
    svg2.select(".x2.axis2")
        .transition()
        .duration(1000)
        .call(xAxis2);

    svg2.selectAll(".y2.axis2")
      .transition()
      .duration(1000)
      .attr("x1", x2(0))
      .attr("x2", x2(0));
 

};


var onclick2 = function(){
    var bar2 = d3.selectAll(".bar2");

      bar2
        .transition().duration(60)
        .attr("height",y2.rangeBand()-4)
        .attr("y", function(d) { return y2(d.name)+2; })
        .attr("width", function(d) { return Math.abs(x2(d.value) - x2(0)-4); })
        .attr("x", function(d) { return x2(Math.min(0, d.value))+2; })
        .transition().duration(60)
        .attr("height",y2.rangeBand())
        .attr("y", function(d) { return y2(d.name); })
        .attr("width", function(d) { return Math.abs(x2(d.value) - x2(0)); })
        .attr("x", function(d) { return x2(Math.min(0, d.value)); });
  };







svg2.append("g")
  .attr("class", "x2 axis2")
  .call(xAxis2);

svg2.append("g")
  .attr("class", "y2 axis2")
  .append("line")
  .attr("class", "y2 axis2")
  .attr("y2", height2)
  .attr("x1", 0)
  .attr("x2", 0);


var i2 = 1,
    clicker2 = 1;

update2(eval("dataset2.data".concat(i2)));
if(i2 < 3){i2=i2+1}else{i2=1};
var cycle2 = function(){update2(eval("dataset2.data".concat(i2)));if(i2 < 3){i2=i2+1}else{i2=1};};

var interval2 = setInterval(cycle2,5000);

svg2.append("polygon")
  .attr("class", "play2")
  .attr("points",(width2/2+20)+","+(height2/2)+" "+(width2/2-20)+","+(height2/2-20)+" "+(width2/2-20)+","+(height2/2+20));;



// Play/Pause Instructions
svg2.append("rect")
  .attr("class","instruct2")
  .attr("x",-10)
  .attr("y",height2-5)
  .attr("height",18)
  .attr("width",113)
  .style("fill", "white")
  .style("opacity",0);

svg2.append("text")
  .attr("class","instruct2")
  .text("Click to pause/play.")
  .attr("x",-5)
  .attr("y",height2+8)
  .style("opacity",0);

// Play/Pause button
svg2.append("rect")
  .attr("class", "pause2")
  .attr("width",13)
  .attr("height",40)
  .attr("x", width2/2 - (10))
  .attr("y", height2/2 - (40/2));
svg2.append("rect")
  .attr("class", "pause2")
  .attr("width",13)
  .attr("height",40)
  .attr("x", width2/2 + (10))
  .attr("y", height2/2 - (40/2));
svg2.append("polygon")
  .attr("class", "play2")
  .attr("points",(width2/2+20)+","+(height2/2)+" "+(width2/2-20)+","+(height2/2-20)+" "+(width2/2-20)+","+(height2/2+20));


var key_bar_x2 = 220;
var key_bar_y2 = height2-15;

svg2.append("polygon")
  .style("fill","#B22222")
  .attr("class","instruct2")
  .style("opacity",0)
  .attr("points",(key_bar_x2+0)+","+(key_bar_y2+12)+" "+(key_bar_x2+15)+","+(key_bar_y2+12)+" "+(key_bar_x2+15)+","+(key_bar_y2+25)+" "+(key_bar_x2+0)+","+(key_bar_y2+25));
svg2.append("text")
  .attr("class","instruct2")
  .attr("x",key_bar_x2+17)
  .attr("y",key_bar_y2+22)
  .style("fill", "black")
  .style("opacity",0)
  .text("NIR");

svg2.append("polygon")
  .style("fill","#4682B4")
  .attr("class","instruct2")
  .style("opacity",0)
  .attr("points",(key_bar_x2+45)+","+(key_bar_y2+12)+" "+(key_bar_x2+60)+","+(key_bar_y2+12)+" "+(key_bar_x2+60)+","+(key_bar_y2+25)+" "+(key_bar_x2+45)+","+(key_bar_y2+25)); 
svg2.append("text")
  .attr("class","instruct2")
  .attr("x",key_bar_x2+62)
  .attr("y",key_bar_y2+22)
  .style("fill", "black")
  .style("opacity",0)
  .text("ENG");

svg2.append("polygon")
  .style("fill","#228B22")
  .attr("class","instruct2")
  .style("opacity",0)
  .attr("points",(key_bar_x2+90)+","+(key_bar_y2+12)+" "+(key_bar_x2+105)+","+(key_bar_y2+12)+" "+(key_bar_x2+105)+","+(key_bar_y2+25)+" "+(key_bar_x2+90)+","+(key_bar_y2+25)); 
svg2.append("text")
  .attr("class","instruct2")
  .attr("x",key_bar_x2+107)
  .attr("y",key_bar_y2+22)
  .style("fill", "black")
  .style("opacity",0)
  .text("WAL");


var pausing2 = svg2.selectAll(".pause2");
var playing2 = svg2.selectAll(".play2");