//Add items to select
var chems1 = JSONSelect.match(".chem",rawdata1).sort();

//All as first option
chems1.splice(chems1.indexOf("All"),1)
var opt1 = document.createElement('option');
  opt1.value='All';
  opt1.innerHTML='All';
  document.getElementById("drug_drop1").options.add(opt1)



chems1.forEach(function(d){
  var opt1 = document.createElement('option');
  opt1.value=d;
  opt1.innerHTML=d;
  document.getElementById("drug_drop1").options.add(opt1)
  });




var margin1 = {top: 20, right: 20, bottom: 50, left: 75},
    width1 = 500 - margin1.left - margin1.right,
    height1 = 300 - margin1.top - margin1.bottom;


var x1 = d3.scale.ordinal()
    .rangeRoundBands([0, width1], .4,.6);

var y1 = d3.scale.linear()
    .range([height1, 0]);

//Scale Sidebar
//Get ALL values and pop em out
var all_max1 = new Array();

for (var i=0; i<rawdata1.length; i++){
  if(rawdata1[i].chem == "All"){
    for (var u=0; u<rawdata1[i].data.grouped.length; u++){
      all_max1.push(rawdata1[i].data.grouped[u].value)
    };
    for (var u=0; u<rawdata1[i].data.ungrouped.length; u++){
      all_max1.push(rawdata1[i].data.ungrouped[u].value)
    };
  };
};


maxs1 = JSONSelect.match(".value",rawdata1)

for(var pop in all_max1){
  maxs1.splice(maxs1.indexOf(all_max1[pop]),1);
};

sidebar_max1 = d3.max(maxs1);


var sidebar1 = d3.scale.linear()
    .domain([0, sidebar_max1])
    .range([height1,2]);



var xAxis1 = d3.svg.axis()
    .scale(x1)
    .ticks(0)
    .orient("bottom");

var yAxis1 = d3.svg.axis()
    .scale(y1)
    .orient("left");

var svg1 = d3.select("#vizblock1").append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
  .append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");



svg1.append('rect')
        .attr("class", "graph_back1 cot_back1")
        .attr("x",width1/3+5)
        .attr("y",-5)
        .attr("width",width1/3-10)
        .attr("height",height1+5)
        .attr("opacity",0);


svg1.append('rect')
        .attr("class", "graph_back1 dep_back1")
        .attr("x",width1/4+8)
        .attr("y",-5)
        .attr("width",width1/4-8)
        .attr("height",height1+5);

svg1.append('rect')
        .attr("class", "graph_back1 dep_back1")
        .attr("x",(width1/4)*3-8)
        .attr("y",-5)
        .attr("width",width1/4-8)
        .attr("height",height1+5);



svg1.append('text')
  .attr("class","cot_back1")
  .attr("x",width1/4*1)
  .attr("y",height1+45)
  .attr("font-size",15)
  .style("font-family","serif")
  .attr("fill","#444444")
  .attr("transform","rotate(45,"+width1/4+" "+155+")")
  .text("Most");
svg1.append('text')
  .attr("class","cot_back1")
  .attr("x",width1/4*1.35)
  .attr("y",height1+45)
  .attr("font-size",15)
  .style("font-family","serif")
  .attr("fill","#444444")
  .attr("transform","rotate(45,"+width1/4*1.35+" "+155+")")
  .text("More");
svg1.append('text')
  .attr("class","cot_back1")
  .attr("x",width1/4*1.67)
  .attr("y",height1+45)
  .attr("font-size",15)
  .style("font-family","serif")
  .attr("fill","#444444")
  .attr("transform","rotate(45,"+width1/4*1.67+" "+155+")")
  .text("Less");
svg1.append('text')
  .attr("class","cot_back1")
  .attr("x",width1/4*1.98)
  .attr("y",height1+45)
  .attr("font-size",15)
  .style("font-family","serif")
  .attr("fill","#444444")
  .attr("transform","rotate(45,"+width1/4*1.98+" "+155+")")
  .text("Least");
svg1.append('text')
  .attr("class","cot_back1")
  .attr("x",width1-10)
  .attr("y",height1+22)
  .attr("font-size",24)
  .style("font-family","serif")
  .style("font-style","italic")
  .attr("fill","#800000")
  .style("text-anchor", "end")
  .text("GP Local Deprivation");



svg1.append('text')
  .attr("class","dep_back1")
  .attr("x",width1/4*1)
  .attr("y",height1+62)
  .attr("font-size",100)
  .style("font-family","serif")
  .attr("fill","#555555")
  .attr("transform","rotate(90,"+width1/4+" "+225+")")
  .text("}");
svg1.append('text')
  .attr("class","dep_back1")
  .attr("x",width1/4*2)
  .attr("y",height1+70)
  .attr("font-size",100)
  .style("font-family","serif")
  .attr("fill","#555555")
  .attr("transform","rotate(90,"+width1/4*2+" "+225+")")
  .text("}");
svg1.append('text')
  .attr("class","dep_back1")
  .attr("x",width1/4*3)
  .attr("y",height1+78)
  .attr("font-size",100)
  .style("font-family","serif")
  .attr("fill","#555555")
  .attr("transform","rotate(90,"+width1/4*3+" "+225+")")
  .text("}");
svg1.append('text')
  .attr("class","dep_back1")
  .attr("x",width1/4*4)
  .attr("y",height1+86)
  .attr("font-size",100)
  .style("font-family","serif")
  .attr("fill","#555555")
  .attr("transform","rotate(90,"+width1/4*4+" "+225+")")
  .text("}");
svg1.append('text')
  .attr("class","dep_back1")
  .attr("x",(width1/4*1)/1.7)
  .attr("y",height1+45)
  .attr("font-size",14)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("Most Deprived");
svg1.append('text')
  .attr("class","dep_back1")
  .attr("x",(width1/4*2)/1.3)
  .attr("y",height1+45)
  .attr("font-size",14)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("More Deprived");
svg1.append('text')
  .attr("class","dep_back1")
  .attr("x",(width1/4*3)/1.22)
  .attr("y",height1+45)
  .attr("font-size",14)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("Less Deprived");
svg1.append('text')
  .attr("class","dep_back1")
  .attr("x",(width1/4*4)/1.17)
  .attr("y",height1+45)
  .attr("font-size",14)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("Least Deprived");


//Grouped Labels
svg1.append('text')
  .attr("class","grp_back1")
  .attr("x",(width1/3)-40)
  .attr("y",height1+20)
  .attr("font-size",20)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("NIR");
svg1.append('text')
  .attr("class","grp_back1")
  .attr("x",(width1/2))
  .attr("y",height1+20)
  .attr("font-size",20)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("ENG");
svg1.append('text')
  .attr("class","grp_back1")
  .attr("x",(width1-105))
  .attr("y",height1+20)
  .attr("font-size",20)
  .style("font-family","serif")
  .attr("fill","#555555")
  .style("text-anchor", "middle")
  .text("WAL");


//RANGER
svg1.append("polygon")
  .attr("class","range_guide_back1 ranger1")
  .attr("points","-40,"+height1+" -40,2 -65,2 -65,"+height1)
  .style("opacity",0);
svg1.append("polygon")
  .attr("class","range_guide1 ranger1")
  .attr("points","-40,"+height1+" -40,2 -65,2 -65,"+height1)
  .style("opacity",0);
svg1.append('text')
  .attr("class","ranger1")
  .attr("x",-64)
  .attr("y",-9)
  .attr("font-size",11)
  .style("font-family","sans-serif")
  .attr("fill","#555555")
  .text("Top")
  .style("opacity",0);
svg1.append('text')
  .attr("class","ranger1")
  .attr("x",-64)
  .attr("y",0)
  .attr("font-size",11)
  .style("font-family","sans-serif")
  .attr("fill","#555555")
  .text("Drug")
  .style("opacity",0);


function update1(rawdata1, chem1, grouper1) {
  





  var sorter1 = 1;  



  //GET DATA with jsonSelect
  if(grouper1==0){
    var selector1 = '.chem:val("'+chem1+'") ~ .data .grouped'
  }else{
    var selector1 = '.chem:val("'+chem1+'") ~ .data .ungrouped'
  };
  var data1 = JSONSelect.match(selector1,rawdata1)[0];




  //Add IDs to data
  data1.forEach(function(d) {
    d.id = d.country + d.deprive;
    d.value = +d.value});

  var data_max1 = JSONSelect.match('.chem:val("'+chem1+'") ~ .data .ungrouped',rawdata1)[0];
  data_max1.forEach(function(d) {d.value = +d.value});
  var sub_max1 = d3.max(data_max1, function(d) { return d.value; });


  svg1.selectAll(".range_guide1")
  .transition().duration(1000)
  .attr("points","-40,"+height1+" -40,"+sidebar1(sub_max1)+" -65,"+sidebar1(sub_max1)+" -65,"+height1);




  d3.selectAll(".cot_back1").transition().duration(1000)
    .attr("opacity",function(){if(grouper1==0){return 0;}else{return 1;} });

  d3.select("#sort_button1").transition().duration(1000)
    .style("opacity",function(){if(grouper1==0){return .25;}else{return 1;} })
    .style("pointer-events",function(){if(grouper1==0){return "none";}else{return "auto";} } );

  keycall1();
  
  d3.selectAll(".grp_back1").transition().duration(700)
    .attr("opacity",function(){if(grouper1==1){return 0;}else{return 1;} });

  d3.selectAll(".dep_back1").attr("opacity",0);

    //DRAW STUFF
    x1.domain(data1.sort(

      function(a,b){        
          return d3.ascending( (a.country + a.deprive), (b.country + b.deprive));
        })
      .map(function(d) { return d.id; }))


    y1.domain([0, d3.max(data1, function(d) { return d.value; })]);

    








    var bars1 = svg1.selectAll(".bar1")
      .data(data1);
  
    bars1.enter().append("rect")
      .attr("y",height1)
      .attr("height",0)
      .on("mouseover",function(d){
          var selected_bar = this;
          svg1.select(".pointer1."+d.id)
            .style("opacity",1);
        })
      .on("mouseout",function(d){
          svg1.selectAll(".pointer1")
          .style("opacity",0);
      });

    bars1
     .transition().duration(1000)
     .attr("y",height1)
      .attr("height",0)

     .attr("width", x1.rangeBand())
     .attr("x", function(d) { return x1(d.id); })
     .transition().duration(1000)
     .attr("class", function(d){return "bar1 "+d.country+" "+d.id;})
     
     .attr("y", function(d) { return y1(d.value); })
     .attr("height", function(d) { return height1 - y1(d.value); });

    bars1
    .exit().transition().duration(1000)
    .attr("y",height1)
      .attr("height",0).remove();


    var pointers1 = svg1.selectAll(".pointer1")
      .data(data1);

    pointers1.enter().append("polygon")
      .attr("class",function(d){return "pointer1 "+d.id;})
      .style("opacity",0);

    pointers1
      .attr("class",function(d){return "pointer1 "+d.id;})
      .transition()
      .attr("points",function(d){ return "-15,"+(y1(d.value)+5)+" 0,"+(y1(d.value))+" -15,"+(y1(d.value)-5);});

    
    pointers1.exit().remove();





  
    svg1.select(".x1.axis")
        .transition()
        .duration(1000)
        .call(xAxis1);
    svg1.select(".y1.axis")
        .transition()
        .duration(1000)
        .call(yAxis1);



  d3.select("#sort_button1")
    .on("click", function(){
      change1(data1=data1)
      if(sorter1==1){
        sorter1=0
      }else{
        sorter1=1
      }
    });
    
  


/*  var sortTimeout = setTimeout(function() {
    d3.select("input").property("checked", true).each(change);
  }, 2000);*/


  function change1(data1) {




    d3.selectAll(".cot_back1").transition().duration(1500)
    .attr("opacity",function(){
      if(grouper1==0){ return 0;}else{
        if(sorter1==1){return 0;}else{return 1;} 
      }
    });

  d3.selectAll(".dep_back1").transition().duration(1500)
    .attr("opacity",function(){
      if(grouper1==0){ return 0;}else{
        if(sorter1==0){return 0;}else{return 1;} 
      }
    });




    // Copy-on-write since tweens are evaluated after a delay.
    var x0x1 = x1.domain(data1.sort(

      function(a,b){
        if(sorter1==0){
          return d3.ascending( (a.country + a.deprive), (b.country + b.deprive));
        }else{
          return d3.ascending( (a.deprive + a.country), (b.deprive + b.country));
        }

      }



        )
        .map(function(d) { return d.id; }))
        .copy();

    var transition1 = svg1.transition().duration(1000),
        delay1 = function(d, i) { return i * 50; };

    transition1.selectAll(".bar1")
        .delay(delay1)
        .attr("x", function(d) { return x0x1(d.id); });

    transition1.select(".x1.axis")
        .call(xAxis1)
      .selectAll("g")
        .delay(delay1);
  };
  

function keycall1(){

  if(grouper1==0){
    d3.selectAll(".key1")
    .transition().duration(700)
    .attr("transform","translate(0,0)")
  }else{
    d3.selectAll(".key1")
    .transition().duration(700)
    .attr("transform","translate(-200,0)")
  }
};





};


//Add axes outside function
svg1.append("g")
  .attr("class", "x1 axis")
  .attr("transform", "translate(0," + height1 + ")")
  .call(xAxis1);

svg1.append("g")
  .attr("class", "y1 axis")
  .call(yAxis1)
.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Daily Doses per 1,000 Patients");




update1(rawdata1, chem1, grouper1)





d3.select("#group_button1")
  .on("click", function(){
    update1(rawdata1, chem1, grouper1)
    if(grouper1==1){grouper1=0}else{grouper1=1}
  });




  

var grouper1 = 1;



d3.select("#drug_drop1").on("change",
  function(){
    
    

    update1(rawdata1,chem1=this.value,grouper1=0)

    if(this.value=='All'){
      d3.selectAll(".ranger1")
      .style("opacity",0);
    }else{
      
      d3.selectAll(".ranger1")
      .style("opacity",1);
    }

    grouper1=1
  });




//KEY
var key_bar_x1 = width1+50
  key_bar_y1 = -30
      dur1 = 700;


  svg1.append("polygon")
    .attr("class","key1 A_NIR")
    .transition().duration(dur1)
    .attr("points",(key_bar_x1+0)+","+(key_bar_y1+12)+" "+(key_bar_x1+15)+","+(key_bar_y1+12)+" "+(key_bar_x1+15)+","+(key_bar_y1+25)+" "+(key_bar_x1+0)+","+(key_bar_y1+25));
  svg1.append("text")
    .attr("class","key1")
    .transition().duration(dur1)
    .attr("x",key_bar_x1+17)
    .attr("y",key_bar_y1+22)
    .style("fill", "black")
    .text("NIR");

  svg1.append("polygon")
    .attr("class","key1 B_ENG")
    .transition().duration(dur1)
    .attr("points",(key_bar_x1+45)+","+(key_bar_y1+12)+" "+(key_bar_x1+60)+","+(key_bar_y1+12)+" "+(key_bar_x1+60)+","+(key_bar_y1+25)+" "+(key_bar_x1+45)+","+(key_bar_y1+25)); 
  svg1.append("text")
    .attr("class","key1")
    .transition().duration(dur1)
    .attr("x",key_bar_x1+62)
    .attr("y",key_bar_y1+22)
    .style("fill", "black")
    .text("ENG");

  svg1.append("polygon")
    .attr("class","key1 C_WAL")
    .transition().duration(dur1)
    .attr("points",(key_bar_x1+90)+","+(key_bar_y1+12)+" "+(key_bar_x1+105)+","+(key_bar_y1+12)+" "+(key_bar_x1+105)+","+(key_bar_y1+25)+" "+(key_bar_x1+90)+","+(key_bar_y1+25)); 
  svg1.append("text")
    .attr("class","key1")
    .transition().duration(dur1)
    .attr("x",key_bar_x1+107)
    .attr("y",key_bar_y1+22)
    .style("fill", "black")
    .text("WAL");
