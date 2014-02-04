//Add items to select
var chems2 = JSONSelect.match(".chem",rawdata2).sort();

//All as first option
chems2.splice(chems2.indexOf("All"),1)
var opt2 = document.createElement('option');
  opt2.value='All';
  opt2.innerHTML='All';
  document.getElementById("drug_drop2").options.add(opt2)



chems2.forEach(function(d){
  var opt2 = document.createElement('option');
  opt2.value=d;
  opt2.innerHTML=d;
  document.getElementById("drug_drop2").options.add(opt2)
  });




var margin2 = {top: 20, right: 20, bottom: 50, left: 75},
    width2 = 500 - margin2.left - margin2.right,
    height2 = 300 - margin2.top - margin2.bottom;


var x2 = d3.scale.ordinal()
    .rangeRoundBands([0, width2], .4,.6);

var y2 = d3.scale.linear()
    .range([height2, 0]);

//Scale Sidebar
//Get ALL values and pop em out
var all_max2 = new Array();

for (var i=0; i<rawdata2.length; i++){
  if(rawdata2[i].chem == "All"){
    for (var u=0; u<rawdata2[i].data.grouped.length; u++){
      all_max2.push(rawdata2[i].data.grouped[u].value)
    };
    for (var u=0; u<rawdata2[i].data.ungrouped.length; u++){
      all_max2.push(rawdata2[i].data.ungrouped[u].value)
    };
  };
};


maxs2 = JSONSelect.match(".value",rawdata2)

for(var pop in all_max2){
  maxs2.splice(maxs2.indexOf(all_max2[pop]),1);
};

sidebar_max2 = d3.max(maxs2);


var sidebar2 = d3.scale.linear()
    .domain([0, sidebar_max2])
    .range([height2,2]);



var xAxis2 = d3.svg.axis()
    .scale(x2)
    .ticks(0)
    .orient("bottom");

var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("left");

var svg2 = d3.select("#vizblock2").append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");



svg2.append('rect')
        .attr("class", "graph_back2 cot_back2")
        .attr("x",width2/3+5)
        .attr("y",-5)
        .attr("width",width2/3-10)
        .attr("height",height2+5)
        .attr("opacity",0);


svg2.append('rect')
        .attr("class", "graph_back2 dep_back2")
        .attr("x",width2/4+8)
        .attr("y",-5)
        .attr("width",width2/4-8)
        .attr("height",height2+5);

svg2.append('rect')
        .attr("class", "graph_back2 dep_back2")
        .attr("x",(width2/4)*3-8)
        .attr("y",-5)
        .attr("width",width2/4-8)
        .attr("height",height2+5);



svg2.append('text')
  .attr("class","cot_back2")
  .attr("x",width2/4*1)
  .attr("y",height2+45)
  .attr("font-size",15)
  .style("font-family","serif")
  .attr("fill","#444444")
  .attr("transform","rotate(45,"+width2/4+" "+155+")")
  .text("Most");
svg2.append('text')
  .attr("class","cot_back2")
  .attr("x",width2/4*1.35)
  .attr("y",height2+45)
  .attr("font-size",15)
  .style("font-family","serif")
  .attr("fill","#444444")
  .attr("transform","rotate(45,"+width2/4*1.35+" "+155+")")
  .text("More");
svg2.append('text')
  .attr("class","cot_back2")
  .attr("x",width2/4*1.67)
  .attr("y",height2+45)
  .attr("font-size",15)
  .style("font-family","serif")
  .attr("fill","#444444")
  .attr("transform","rotate(45,"+width2/4*1.67+" "+155+")")
  .text("Less");
svg2.append('text')
  .attr("class","cot_back2")
  .attr("x",width2/4*1.98)
  .attr("y",height2+45)
  .attr("font-size",15)
  .style("font-family","serif")
  .attr("fill","#444444")
  .attr("transform","rotate(45,"+width2/4*1.98+" "+155+")")
  .text("Least");
svg2.append('text')
  .attr("class","cot_back2")
  .attr("x",width2-10)
  .attr("y",height2+22)
  .attr("font-size",24)
  .style("font-family","serif")
  .style("font-style","italic")
  .attr("fill","#800000")
  .style("text-anchor", "end")
  .text("GP Local Deprivation");



svg2.append('text')
  .attr("class","dep_back2")
  .attr("x",width2/4*1)
  .attr("y",height2+62)
  .attr("font-size",100)
  .style("font-family","serif")
  .attr("fill","#555555")
  .attr("transform","rotate(90,"+width2/4+" "+225+")")
  .text("}");
svg2.append('text')
  .attr("class","dep_back2")
  .attr("x",width2/4*2)
  .attr("y",height2+70)
  .attr("font-size",100)
  .style("font-family","serif")
  .attr("fill","#555555")
  .attr("transform","rotate(90,"+width2/4*2+" "+225+")")
  .text("}");
svg2.append('text')
  .attr("class","dep_back2")
  .attr("x",width2/4*3)
  .attr("y",height2+78)
  .attr("font-size",100)
  .style("font-family","serif")
  .attr("fill","#555555")
  .attr("transform","rotate(90,"+width2/4*3+" "+225+")")
  .text("}");
svg2.append('text')
  .attr("class","dep_back2")
  .attr("x",width2/4*4)
  .attr("y",height2+86)
  .attr("font-size",100)
  .style("font-family","serif")
  .attr("fill","#555555")
  .attr("transform","rotate(90,"+width2/4*4+" "+225+")")
  .text("}");
svg2.append('text')
  .attr("class","dep_back2")
  .attr("x",(width2/4*1)/1.7)
  .attr("y",height2+45)
  .attr("font-size",14)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("Most Deprived");
svg2.append('text')
  .attr("class","dep_back2")
  .attr("x",(width2/4*2)/1.3)
  .attr("y",height2+45)
  .attr("font-size",14)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("More Deprived");
svg2.append('text')
  .attr("class","dep_back2")
  .attr("x",(width2/4*3)/1.22)
  .attr("y",height2+45)
  .attr("font-size",14)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("Less Deprived");
svg2.append('text')
  .attr("class","dep_back2")
  .attr("x",(width2/4*4)/1.17)
  .attr("y",height2+45)
  .attr("font-size",14)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("Least Deprived");


//Grouped Labels
svg2.append('text')
  .attr("class","grp_back2")
  .attr("x",(width2/3)-40)
  .attr("y",height2+20)
  .attr("font-size",20)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("NIR");
svg2.append('text')
  .attr("class","grp_back2")
  .attr("x",(width2/2))
  .attr("y",height2+20)
  .attr("font-size",20)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("ENG");
svg2.append('text')
  .attr("class","grp_back2")
  .attr("x",(width2-105))
  .attr("y",height2+20)
  .attr("font-size",20)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("WAL");


//RANGER
svg2.append("polygon")
  .attr("class","range_guide_back2 ranger2")
  .attr("points","-40,"+height2+" -40,2 -65,2 -65,"+height2)
  .style("opacity",0);
svg2.append("polygon")
  .attr("class","range_guide2 ranger2")
  .attr("points","-40,"+height2+" -40,2 -65,2 -65,"+height2)
  .style("opacity",0);
svg2.append('text')
  .attr("class","ranger2")
  .attr("x",-64)
  .attr("y",-9)
  .attr("font-size",11)
  .style("font-family","sans-serif")
  .attr("fill","#555555")
  .text("Top")
  .style("opacity",0);
svg2.append('text')
  .attr("class","ranger2")
  .attr("x",-64)
  .attr("y",0)
  .attr("font-size",11)
  .style("font-family","sans-serif")
  .attr("fill","#555555")
  .text("Drug")
  .style("opacity",0);


function update2(rawdata2, chem2, grouper2) {
  





  var sorter2 = 1;  



  //GET DATA with jsonSelect
  if(grouper2==0){
    var selector2 = '.chem:val("'+chem2+'") ~ .data .grouped'
  }else{
    var selector2 = '.chem:val("'+chem2+'") ~ .data .ungrouped'
  };
  var data2 = JSONSelect.match(selector2,rawdata2)[0];


  //Add IDs to data
  data2.forEach(function(d) {
    d.id = d.country + d.deprive;
    d.value = +d.value});


  var data_max2 = JSONSelect.match('.chem:val("'+chem2+'") ~ .data .ungrouped',rawdata2)[0];
  data_max2.forEach(function(d) {d.value = +d.value});
  var sub_max2 = d3.max(data_max2, function(d) { return d.value; });


  svg2.selectAll(".range_guide2")
  .transition().duration(1000)
  .attr("points","-40,"+height2+" -40,"+sidebar2(sub_max2)+" -65,"+sidebar2(sub_max2)+" -65,"+height2);




  d3.selectAll(".cot_back2").transition().duration(1000)
    .attr("opacity",function(){if(grouper2==0){return 0;}else{return 1;} });

  d3.select("#sort_button2").transition().duration(1000)
    .style("opacity",function(){if(grouper2==0){return .25;}else{return 1;} })
    .style("pointer-events",function(){if(grouper2==0){return "none";}else{return "auto";} } );

  keycall2();
  
  d3.selectAll(".grp_back2").transition().duration(700)
    .attr("opacity",function(){if(grouper2==1){return 0;}else{return 1;} });

  d3.selectAll(".dep_back2").attr("opacity",0);

    //DRAW STUFF
    x2.domain(data2.sort(

      function(a,b){        
          return d3.ascending( (a.country + a.deprive), (b.country + b.deprive));
        })
      .map(function(d) { return d.id; }))


    y2.domain([0, d3.max(data2, function(d) { return d.value; })]);

    








    var bars2 = svg2.selectAll(".bar2")
      .data(data2);
  
    bars2.enter().append("rect")
      .attr("y",height2)
      .attr("height",0)
      .on("mouseover",function(d){
          var selected_bar = this;
          svg2.select(".pointer2."+d.id)
            .style("opacity",1);
        })
      .on("mouseout",function(d){
          svg2.selectAll(".pointer2")
          .style("opacity",0);
      });

    bars2
     .transition().duration(1000)
     .attr("y",height2)
      .attr("height",0)

     .attr("width", x2.rangeBand())
     .attr("x", function(d) { return x2(d.id); })
     .transition().duration(1000)
     .attr("class", function(d){return "bar2 "+d.country+" "+d.id;})
     
     .attr("y", function(d) { return y2(d.value); })
     .attr("height", function(d) { return height2 - y2(d.value); });

    bars2
    .exit().transition().duration(1000)
    .attr("y",height2)
      .attr("height",0).remove();


    var pointers2 = svg2.selectAll(".pointer2")
      .data(data2);

    pointers2.enter().append("polygon")
      .attr("class",function(d){return "pointer2 "+d.id;})
      .style("opacity",0);

    pointers2
      .attr("class",function(d){return "pointer2 "+d.id;})
      .transition()
      .attr("points",function(d){ return "-15,"+(y2(d.value)+5)+" 0,"+(y2(d.value))+" -15,"+(y2(d.value)-5);});

    
    pointers2.exit().remove();





  
    svg2.select(".x2.axis")
        .transition()
        .duration(1000)
        .call(xAxis2);
    svg2.select(".y2.axis")
        .transition()
        .duration(1000)
        .call(yAxis2);



  d3.select("#sort_button2")
    .on("click", function(){
      change2(data2=data2)
      if(sorter2==1){
        sorter2=0
      }else{
        sorter2=1
      }
    });
    
  


/*  var sortTimeout = setTimeout(function() {
    d3.select("input").property("checked", true).each(change);
  }, 2000);*/


  function change2(data2) {




    d3.selectAll(".cot_back2").transition().duration(1500)
    .attr("opacity",function(){
      if(grouper2==0){ return 0;}else{
        if(sorter2==1){return 0;}else{return 1;} 
      }
    });

  d3.selectAll(".dep_back2").transition().duration(1500)
    .attr("opacity",function(){
      if(grouper2==0){ return 0;}else{
        if(sorter2==0){return 0;}else{return 1;} 
      }
    });




    // Copy-on-write since tweens are evaluated after a delay.
    var x0x2 = x2.domain(data2.sort(

      function(a,b){
        if(sorter2==0){
          return d3.ascending( (a.country + a.deprive), (b.country + b.deprive));
        }else{
          return d3.ascending( (a.deprive + a.country), (b.deprive + b.country));
        }

      }



        )
        .map(function(d) { return d.id; }))
        .copy();

    var transition2 = svg2.transition().duration(1000),
        delay2 = function(d, i) { return i * 50; };

    transition2.selectAll(".bar2")
        .delay(delay2)
        .attr("x", function(d) { return x0x2(d.id); });

    transition2.select(".x2.axis")
        .call(xAxis2)
      .selectAll("g")
        .delay(delay2);
  };
  

function keycall2(){

  if(grouper2==0){
    d3.selectAll(".key2")
    .transition().duration(700)
    .attr("transform","translate(0,0)")
  }else{
    d3.selectAll(".key2")
    .transition().duration(700)
    .attr("transform","translate(-200,0)")
  }
};





};


//Add axes outside function
svg2.append("g")
  .attr("class", "x2 axis")
  .attr("transform", "translate(0," + height2 + ")")
  .call(xAxis2);

svg2.append("g")
  .attr("class", "y2 axis")
  .call(yAxis2)
.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Daily Doses per 1,000 Patients");




update2(rawdata2, chem2, grouper2)





d3.select("#group_button2")
  .on("click", function(){
    update2(rawdata2, chem2, grouper2)
    if(grouper2==1){grouper2=0}else{grouper2=1}
  });




  

var grouper2 = 1;



d3.select("#drug_drop2").on("change",
  function(){
    
    

    update2(rawdata2,chem2=this.value,grouper2=0)

    if(this.value=='All'){
      d3.selectAll(".ranger2")
      .style("opacity",0);
    }else{
      
      d3.selectAll(".ranger2")
      .style("opacity",1);
    }

    grouper2=1
  });




//KEY
var key_bar_x2 = width2+50
  key_bar_y2 = -30
      dur2 = 700;


  svg2.append("polygon")
    .attr("class","key2 A_NIR")
    .transition().duration(dur2)
    .attr("points",(key_bar_x2+0)+","+(key_bar_y2+12)+" "+(key_bar_x2+15)+","+(key_bar_y2+12)+" "+(key_bar_x2+15)+","+(key_bar_y2+25)+" "+(key_bar_x2+0)+","+(key_bar_y2+25));
  svg2.append("text")
    .attr("class","key2")
    .transition().duration(dur2)
    .attr("x",key_bar_x2+17)
    .attr("y",key_bar_y2+22)
    .style("fill", "black")
    .text("NIR");

  svg2.append("polygon")
    .attr("class","key2 B_ENG")
    .transition().duration(dur2)
    .attr("points",(key_bar_x2+45)+","+(key_bar_y2+12)+" "+(key_bar_x2+60)+","+(key_bar_y2+12)+" "+(key_bar_x2+60)+","+(key_bar_y2+25)+" "+(key_bar_x2+45)+","+(key_bar_y2+25)); 
  svg2.append("text")
    .attr("class","key2")
    .transition().duration(dur2)
    .attr("x",key_bar_x2+62)
    .attr("y",key_bar_y2+22)
    .style("fill", "black")
    .text("ENG");

  svg2.append("polygon")
    .attr("class","key2 C_WAL")
    .transition().duration(dur2)
    .attr("points",(key_bar_x2+90)+","+(key_bar_y2+12)+" "+(key_bar_x2+105)+","+(key_bar_y2+12)+" "+(key_bar_x2+105)+","+(key_bar_y2+25)+" "+(key_bar_x2+90)+","+(key_bar_y2+25)); 
  svg2.append("text")
    .attr("class","key2")
    .transition().duration(dur2)
    .attr("x",key_bar_x2+107)
    .attr("y",key_bar_y2+22)
    .style("fill", "black")
    .text("WAL");
