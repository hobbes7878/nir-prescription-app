//Add items to select
var chems3 = JSONSelect.match(".chem",rawdata3).sort();

//All as first option
chems3.splice(chems3.indexOf("All"),1)
var opt3 = document.createElement('option');
  opt3.value='All';
  opt3.innerHTML='All';
  document.getElementById("drug_drop3").options.add(opt3)



chems3.forEach(function(d){
  var opt3 = document.createElement('option');
  opt3.value=d;
  opt3.innerHTML=d;
  document.getElementById("drug_drop3").options.add(opt3)
  });




var margin3 = {top: 20, right: 20, bottom: 50, left: 75},
    width3 = 500 - margin3.left - margin3.right,
    height3 = 300 - margin3.top - margin3.bottom;


var x3 = d3.scale.ordinal()
    .rangeRoundBands([0, width3], .4,.6);

var y3 = d3.scale.linear()
    .range([height3, 0]);

//Scale Sidebar
//Get ALL values and pop em out
var all_max3 = new Array();

for (var i=0; i<rawdata3.length; i++){
  if(rawdata3[i].chem == "All"){
    for (var u=0; u<rawdata3[i].data.grouped.length; u++){
      all_max3.push(rawdata3[i].data.grouped[u].value)
    };
    for (var u=0; u<rawdata3[i].data.ungrouped.length; u++){
      all_max3.push(rawdata3[i].data.ungrouped[u].value)
    };
  };
};


maxs3 = JSONSelect.match(".value",rawdata3)

for(var pop in all_max3){
  maxs3.splice(maxs3.indexOf(all_max3[pop]),1);
};

sidebar_max3 = d3.max(maxs3);


var sidebar3 = d3.scale.linear()
    .domain([0, sidebar_max3])
    .range([height3,2]);



var xAxis3 = d3.svg.axis()
    .scale(x3)
    .ticks(0)
    .orient("bottom");

var yAxis3 = d3.svg.axis()
    .scale(y3)
    .orient("left");

var svg3 = d3.select("#vizblock3").append("svg")
    .attr("width", width3 + margin3.left + margin3.right)
    .attr("height", height3 + margin3.top + margin3.bottom)
  .append("g")
    .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");



svg3.append('rect')
        .attr("class", "graph_back3 cot_back3")
        .attr("x",width3/3+5)
        .attr("y",-5)
        .attr("width",width3/3-10)
        .attr("height",height3+5)
        .attr("opacity",0);


svg3.append('rect')
        .attr("class", "graph_back3 dep_back3")
        .attr("x",width3/4+8)
        .attr("y",-5)
        .attr("width",width3/4-8)
        .attr("height",height3+5);

svg3.append('rect')
        .attr("class", "graph_back3 dep_back3")
        .attr("x",(width3/4)*3-8)
        .attr("y",-5)
        .attr("width",width3/4-8)
        .attr("height",height3+5);



svg3.append('text')
  .attr("class","cot_back3")
  .attr("x",width3/4*1)
  .attr("y",height3+45)
  .attr("font-size",15)
  .style("font-family","serif")
  .attr("fill","#444444")
  .attr("transform","rotate(45,"+width3/4+" "+155+")")
  .text("Most");
svg3.append('text')
  .attr("class","cot_back3")
  .attr("x",width3/4*1.35)
  .attr("y",height3+45)
  .attr("font-size",15)
  .style("font-family","serif")
  .attr("fill","#444444")
  .attr("transform","rotate(45,"+width3/4*1.35+" "+155+")")
  .text("More");
svg3.append('text')
  .attr("class","cot_back3")
  .attr("x",width3/4*1.67)
  .attr("y",height3+45)
  .attr("font-size",15)
  .style("font-family","serif")
  .attr("fill","#444444")
  .attr("transform","rotate(45,"+width3/4*1.67+" "+155+")")
  .text("Less");
svg3.append('text')
  .attr("class","cot_back3")
  .attr("x",width3/4*1.98)
  .attr("y",height3+45)
  .attr("font-size",15)
  .style("font-family","serif")
  .attr("fill","#444444")
  .attr("transform","rotate(45,"+width3/4*1.98+" "+155+")")
  .text("Least");
svg3.append('text')
  .attr("class","cot_back3")
  .attr("x",width3-10)
  .attr("y",height3+22)
  .attr("font-size",24)
  .style("font-family","serif")
  .style("font-style","italic")
  .attr("fill","#800000")
  .style("text-anchor", "end")
  .text("GP Local Deprivation");



svg3.append('text')
  .attr("class","dep_back3")
  .attr("x",width3/4*1)
  .attr("y",height3+62)
  .attr("font-size",100)
  .style("font-family","serif")
  .attr("fill","#555555")
  .attr("transform","rotate(90,"+width3/4+" "+225+")")
  .text("}");
svg3.append('text')
  .attr("class","dep_back3")
  .attr("x",width3/4*2)
  .attr("y",height3+70)
  .attr("font-size",100)
  .style("font-family","serif")
  .attr("fill","#555555")
  .attr("transform","rotate(90,"+width3/4*2+" "+225+")")
  .text("}");
svg3.append('text')
  .attr("class","dep_back3")
  .attr("x",width3/4*3)
  .attr("y",height3+78)
  .attr("font-size",100)
  .style("font-family","serif")
  .attr("fill","#555555")
  .attr("transform","rotate(90,"+width3/4*3+" "+225+")")
  .text("}");
svg3.append('text')
  .attr("class","dep_back3")
  .attr("x",width3/4*4)
  .attr("y",height3+86)
  .attr("font-size",100)
  .style("font-family","serif")
  .attr("fill","#555555")
  .attr("transform","rotate(90,"+width3/4*4+" "+225+")")
  .text("}");
svg3.append('text')
  .attr("class","dep_back3")
  .attr("x",(width3/4*1)/1.7)
  .attr("y",height3+45)
  .attr("font-size",14)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("Most Deprived");
svg3.append('text')
  .attr("class","dep_back3")
  .attr("x",(width3/4*2)/1.3)
  .attr("y",height3+45)
  .attr("font-size",14)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("More Deprived");
svg3.append('text')
  .attr("class","dep_back3")
  .attr("x",(width3/4*3)/1.22)
  .attr("y",height3+45)
  .attr("font-size",14)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("Less Deprived");
svg3.append('text')
  .attr("class","dep_back3")
  .attr("x",(width3/4*4)/1.17)
  .attr("y",height3+45)
  .attr("font-size",14)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("Least Deprived");


//Grouped Labels
svg3.append('text')
  .attr("class","grp_back3")
  .attr("x",(width3/3)-40)
  .attr("y",height3+20)
  .attr("font-size",20)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("NIR");
svg3.append('text')
  .attr("class","grp_back3")
  .attr("x",(width3/2))
  .attr("y",height3+20)
  .attr("font-size",20)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("ENG");
svg3.append('text')
  .attr("class","grp_back3")
  .attr("x",(width3-105))
  .attr("y",height3+20)
  .attr("font-size",20)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("WAL");


//RANGER
svg3.append("polygon")
  .attr("class","range_guide_back3 ranger3")
  .attr("points","-40,"+height3+" -40,2 -65,2 -65,"+height3)
  .style("opacity",0);
svg3.append("polygon")
  .attr("class","range_guide3 ranger3")
  .attr("points","-40,"+height3+" -40,2 -65,2 -65,"+height3)
  .style("opacity",0);
svg3.append('text')
  .attr("class","ranger3")
  .attr("x",-64)
  .attr("y",-9)
  .attr("font-size",11)
  .style("font-family","sans-serif")
  .attr("fill","#555555")
  .text("Top")
  .style("opacity",0);
svg3.append('text')
  .attr("class","ranger3")
  .attr("x",-64)
  .attr("y",0)
  .attr("font-size",11)
  .style("font-family","sans-serif")
  .attr("fill","#555555")
  .text("Drug")
  .style("opacity",0);


function update3(rawdata3, chem3, grouper3) {
  





  var sorter3 = 1;  



  //GET DATA with jsonSelect
  if(grouper3==0){
    var selector3 = '.chem:val("'+chem3+'") ~ .data .grouped'
  }else{
    var selector3 = '.chem:val("'+chem3+'") ~ .data .ungrouped'
  };
  var data3 = JSONSelect.match(selector3,rawdata3)[0];




  //Add IDs to data
  data3.forEach(function(d) {
    d.id = d.country + d.deprive;
    d.value = +d.value});

  var data_max3 = JSONSelect.match('.chem:val("'+chem3+'") ~ .data .ungrouped',rawdata3)[0];
  data_max3.forEach(function(d) {d.value = +d.value});
  var sub_max3 = d3.max(data_max3, function(d) { return d.value; });


  svg3.selectAll(".range_guide3")
  .transition().duration(1000)
  .attr("points","-40,"+height3+" -40,"+sidebar3(sub_max3)+" -65,"+sidebar3(sub_max3)+" -65,"+height3);




  d3.selectAll(".cot_back3").transition().duration(1000)
    .attr("opacity",function(){if(grouper3==0){return 0;}else{return 1;} });

  d3.select("#sort_button3").transition().duration(1000)
    .style("opacity",function(){if(grouper3==0){return .25;}else{return 1;} })
    .style("pointer-events",function(){if(grouper3==0){return "none";}else{return "auto";} } );

  keycall3();
  
  d3.selectAll(".grp_back3").transition().duration(700)
    .attr("opacity",function(){if(grouper3==1){return 0;}else{return 1;} });

  d3.selectAll(".dep_back3").attr("opacity",0);

    //DRAW STUFF
    x3.domain(data3.sort(

      function(a,b){        
          return d3.ascending( (a.country + a.deprive), (b.country + b.deprive));
        })
      .map(function(d) { return d.id; }))


    y3.domain([0, d3.max(data3, function(d) { return d.value; })]);

    








    var bars3 = svg3.selectAll(".bar3")
      .data(data3);
  
    bars3.enter().append("rect")
      .attr("y",height3)
      .attr("height",0)
      .on("mouseover",function(d){
          var selected_bar = this;
          svg3.select(".pointer3."+d.id)
            .style("opacity",1);
        })
      .on("mouseout",function(d){
          svg3.selectAll(".pointer3")
          .style("opacity",0);
      });

    bars3
     .transition().duration(1000)
     .attr("y",height3)
      .attr("height",0)

     .attr("width", x3.rangeBand())
     .attr("x", function(d) { return x3(d.id); })
     .transition().duration(1000)
     .attr("class", function(d){return "bar3 "+d.country+" "+d.id;})
     
     .attr("y", function(d) { return y3(d.value); })
     .attr("height", function(d) { return height3 - y3(d.value); });

    bars3
    .exit().transition().duration(1000)
    .attr("y",height3)
      .attr("height",0).remove();


    var pointers3 = svg3.selectAll(".pointer3")
      .data(data3);

    pointers3.enter().append("polygon")
      .attr("class",function(d){return "pointer3 "+d.id;})
      .style("opacity",0);

    pointers3
      .attr("class",function(d){return "pointer3 "+d.id;})
      .transition()
      .attr("points",function(d){ return "-15,"+(y3(d.value)+5)+" 0,"+(y3(d.value))+" -15,"+(y3(d.value)-5);});

    
    pointers3.exit().remove();





  
    svg3.select(".x3.axis")
        .transition()
        .duration(1000)
        .call(xAxis3);
    svg3.select(".y3.axis")
        .transition()
        .duration(1000)
        .call(yAxis3);



  d3.select("#sort_button3")
    .on("click", function(){
      change3(data3=data3)
      if(sorter3==1){
        sorter3=0
      }else{
        sorter3=1
      }
    });
    
  


/*  var sortTimeout = setTimeout(function() {
    d3.select("input").property("checked", true).each(change);
  }, 2000);*/


  function change3(data3) {




    d3.selectAll(".cot_back3").transition().duration(1500)
    .attr("opacity",function(){
      if(grouper3==0){ return 0;}else{
        if(sorter3==1){return 0;}else{return 1;} 
      }
    });

  d3.selectAll(".dep_back3").transition().duration(1500)
    .attr("opacity",function(){
      if(grouper3==0){ return 0;}else{
        if(sorter3==0){return 0;}else{return 1;} 
      }
    });




    // Copy-on-write since tweens are evaluated after a delay.
    var x0x3 = x3.domain(data3.sort(

      function(a,b){
        if(sorter3==0){
          return d3.ascending( (a.country + a.deprive), (b.country + b.deprive));
        }else{
          return d3.ascending( (a.deprive + a.country), (b.deprive + b.country));
        }

      }



        )
        .map(function(d) { return d.id; }))
        .copy();

    var transition3 = svg3.transition().duration(1000),
        delay3 = function(d, i) { return i * 50; };

    transition3.selectAll(".bar3")
        .delay(delay3)
        .attr("x", function(d) { return x0x3(d.id); });

    transition3.select(".x3.axis")
        .call(xAxis3)
      .selectAll("g")
        .delay(delay3);
  };
  

function keycall3(){

  if(grouper3==0){
    d3.selectAll(".key3")
    .transition().duration(700)
    .attr("transform","translate(0,0)")
  }else{
    d3.selectAll(".key3")
    .transition().duration(700)
    .attr("transform","translate(-200,0)")
  }
};





};


//Add axes outside function
svg3.append("g")
  .attr("class", "x3 axis")
  .attr("transform", "translate(0," + height3 + ")")
  .call(xAxis3);

svg3.append("g")
  .attr("class", "y3 axis")
  .call(yAxis3)
.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Daily Doses per 1,000 Patients");




update3(rawdata3, chem3, grouper3)





d3.select("#group_button3")
  .on("click", function(){
    update3(rawdata3, chem3, grouper3)
    if(grouper3==1){grouper3=0}else{grouper3=1}
  });




  

var grouper3 = 1;



d3.select("#drug_drop3").on("change",
  function(){
    
    

    update3(rawdata3,chem3=this.value,grouper3=0)

    if(this.value=='All'){
      d3.selectAll(".ranger3")
      .style("opacity",0);
    }else{
      
      d3.selectAll(".ranger3")
      .style("opacity",1);
    }

    grouper3=1
  });




//KEY
var key_bar_x3 = width3+50
  key_bar_y3 = -30
      dur3 = 700;


  svg3.append("polygon")
    .attr("class","key3 A_NIR")
    .transition().duration(dur3)
    .attr("points",(key_bar_x3+0)+","+(key_bar_y3+12)+" "+(key_bar_x3+15)+","+(key_bar_y3+12)+" "+(key_bar_x3+15)+","+(key_bar_y3+25)+" "+(key_bar_x3+0)+","+(key_bar_y3+25));
  svg3.append("text")
    .attr("class","key3")
    .transition().duration(dur3)
    .attr("x",key_bar_x3+17)
    .attr("y",key_bar_y3+22)
    .style("fill", "black")
    .text("NIR");

  svg3.append("polygon")
    .attr("class","key3 B_ENG")
    .transition().duration(dur3)
    .attr("points",(key_bar_x3+45)+","+(key_bar_y3+12)+" "+(key_bar_x3+60)+","+(key_bar_y3+12)+" "+(key_bar_x3+60)+","+(key_bar_y3+25)+" "+(key_bar_x3+45)+","+(key_bar_y3+25)); 
  svg3.append("text")
    .attr("class","key3")
    .transition().duration(dur3)
    .attr("x",key_bar_x3+62)
    .attr("y",key_bar_y3+22)
    .style("fill", "black")
    .text("ENG");

  svg3.append("polygon")
    .attr("class","key3 C_WAL")
    .transition().duration(dur3)
    .attr("points",(key_bar_x3+90)+","+(key_bar_y3+12)+" "+(key_bar_x3+105)+","+(key_bar_y3+12)+" "+(key_bar_x3+105)+","+(key_bar_y3+25)+" "+(key_bar_x3+90)+","+(key_bar_y3+25)); 
  svg3.append("text")
    .attr("class","key3")
    .transition().duration(dur3)
    .attr("x",key_bar_x3+107)
    .attr("y",key_bar_y3+22)
    .style("fill", "black")
    .text("WAL");
