var draw_count=0;

var comma = d3.format(",");

var w = 400,
    h = 400,
    fill = d3.scale.category10(),
    nodes = [],
    foci = [{x: 120, y: 160}, {x: 250, y: 275}];





var vis = d3.select("#interactive").append("svg:svg")
  .attr("width", w)
  .attr("height", h);

vis.append("image")
  .attr("xlink:href", map_url)
  .attr("width",400)
  .attr("height",400);

var force = d3.layout.force()
  .nodes(nodes)
  .links([])
  .gravity(0)
  .size([w, h]);

force.on("tick", function(e) {

  // Push nodes toward their designated focus.
  var k = .23 * e.alpha;
  nodes.forEach(function(o, i) {
    o.y += (foci[o.id].y - o.y) * k;
    o.x += (foci[o.id].x - o.x) * k;
  });

  vis.selectAll("image.node")
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; });
});

vis.append("text")
  .attr("class","d3_country")
  .text("England")
  .attr("x",180)
  .attr("y",320)
  .attr("transform","rotate(-35 260 240)");
vis.append("text")
  .attr("class","d3_country")
  .text("Northern")
  .attr("x",-60)
  .attr("y",130)
  .attr("transform","rotate(-35 100 0)");
vis.append("text")
  .attr("class","d3_country")
  .text("Ireland")
  .attr("x",-50)
  .attr("y",160)
  .attr("transform","rotate(-35 100 0)");

var draw = setInterval(
  function(){
  if (draw_count<100){
  
  //assigns random int id
  /*nodes.push({id: ~~(Math.random() * foci.length)});*/
  if(Math.random()<=NIR_probability){ 
    nodes.push({id:0});
  }else{
    nodes.push({id:1});
  }

  force.start();

  vis.selectAll("image.node")
      .data(nodes)
    .enter().append("image")
      .attr("class", "node")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("xlink:href",pill_url)
      .attr("width",25)
      .attr("height",30)
      .call(force.drag);
  draw_count +=1

  }else{

  caption= vis.append("rect")
  
   .attr("rx",15)
   .attr("ry",15)
   .attr("width",180)
   .attr("height",100)
   .attr("class","vizstatblock")
   .attr("x",215)
   .attr("y",-200)
   .transition().duration(1200)
   .attr("y",20);


  vis.append("text")
  .attr("class","viztitle")
  .text("Number of Prescriptions Filled")
  .style("font-size","13px")
  .attr("x",-400)
  .attr("y",40)
  .transition().duration(1200)
  .attr("x",305)

  vis.append("text")
  .attr("class","vizlabel")
  .text("N. Ireland")
  .attr("x",-400)
  .attr("y",62)
  .transition().duration(1200)
  .attr("x",260);

  vis.append("text")
  .attr("class","vizlabel")
  .attr("x",-400)
  .attr("y",62)
  .transition().duration(1200)
  .text("England")
  .attr("x",350);

  vis.append("text")
  .attr("class","vizstat")
  .text(comma(NIR_rx_per_100k))
  .attr("x",-400)
  .attr("y",88)
  .transition().duration(1200)
  .attr("x",260);

  vis.append("text")
  .attr("class","vizstat")
  .text(comma(ENG_rx_per_100k))
  .attr("x",-400)
  .attr("y",88)
  .transition().duration(1200)
  .attr("x",350);

  vis.append("text")
  .attr("class","vizdate")
  .text("per 100K people")
  .attr("x",-400)
  .attr("y",103)
  .transition().duration(1200)
  .attr("x",305)

  clearInterval(draw);
  }
}, 400);

/*Slider*/
box = vis.append("g")
text1 = vis.append("g")
text2 = vis.append("g")
text3 = vis.append("g")

box.append("rect")
   .transition().duration(1200)
   .attr("y",20)
   .transition().delay(12000).duration(1200)
   .attr("y",800).remove();

box.append("rect")
   .transition().delay(13000).duration(1200)
   .attr("y",20)
   .transition().delay(22000).duration(1200)
   .attr("y",800).remove();

box.append("rect")
   .transition().delay(23000).duration(1200)
   .attr("y",20)
   .transition().delay(36000).duration(1200)
   .attr("y",800).remove();




box.selectAll("rect")
   .attr("rx",15)
   .attr("ry",15)
   .attr("width",180)
   .attr("height",100)
   .attr("class","vizstatblock")
   .attr("x",215)
   .attr("y",-200);

box.append("text")
  .attr("class","viztitle")
  .text("100 prescriptions")
  .style("font-size","15px")
  .style("font-style","italic")
  .style("font-weight","normal")
  .style("text-decoration","underline")
  .attr("x",-400)
  .attr("y",40)
  .transition().duration(1200)
  .attr("x",305)
  .transition().delay(12000).duration(1200)
  .attr("x",800).remove();

text1.append("text")
  .text("The graph models how")
  .attr("y",57);
text1.append("text")
  .text("many might be filled in")
  .attr("y",69);
text1.append("text")
  .text("N. Ireland vs. England,")
  .attr("y",81);
text1.append("text")
  .text("based on the distribution")
  .attr("y",93);
text1.append("text")
  .text("per capita from April to")
  .attr("y",105);
text1.append("text")
  .text("June 2013.")
  .attr("y",117);

text2.append("text")
  .text(drug)
  .attr("class","viztitle2")
  .attr("y",57);
text2.append("text")
  .text("is a "+ chem_type+".")
  .attr("class","viztext")
  .attr("y",67);
text2.append("text")
  .text("It's primarily used as a")
  .attr("class","viztext")
  .attr("y",77);
text2.append("text")
  .text(drug_use+".")
  .attr("class","viztext")
  .attr("y",87);

text3.append("text")
  .text("Drug: "+ qt_unit)
  .attr("y",57);
text3.append("text")
  .text("Drug: "+ NIR_qt_per_100k)
  .attr("y",67);
text3.append("text")
  .text("Drug: "+ ENG_qt_per_100k)
  .attr("y",77);

/*Text Transitions*/
text1.selectAll("text")
  .attr("class","viztext")
  .attr("x",-400)
  .transition().duration(1200)
  .attr("x",232)
  .transition().delay(12000).duration(1200)
  .attr("x",800).remove();

text2.selectAll("text")
  .attr("x",-400)
  .transition().delay(13000).duration(1200)
  .attr("x",238)
  .transition().delay(22000).duration(1200)
  .attr("x",800).remove();


text3.selectAll("text")
  .attr("class","viztext")
  .attr("x",-400)
  .transition().delay(23000).duration(1200)
  .attr("x",232)
  .transition().delay(36000).duration(1200)
  .attr("x",800).remove();
