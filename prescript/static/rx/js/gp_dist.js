
//Helper function
//http://stackoverflow.com/questions/8273047/javascript-function-similar-to-python-range
function range(start, stop, step){
    if (typeof stop=='undefined'){
        // one param defined
        stop = start;
        start = 0;
    };
    if (typeof step=='undefined'){
        step = 1;
    };
    if ((step>0 && start>=stop) || (step<0 && start<=stop)){
        return [];
    };
    var result = [];
    for (var i=start; step>0 ? i<stop : i>stop; i+=step){
        result.push(i);
    };
    return result;
};    
    

var data = {
    NIR : [80,95,91,83],
    ENG : [2190,1661,1930,2164],
    WAL : [110,127,104,119],
   /* SCO : [220,112,98,320],
    DNK : [100,112,91,220],
    IRE : [10,12,9,20],
    FIN : [14,12,9,22],
    EST : [124,212,119,222],*/
    };

//Color scale
var color_scale = ["#3A66A7",  "#6b486b", "#d0743c", "#ff8c00"];
//var color_scale = [ "#6b486b", "steelblue",  "orange","#800000"];
//var color_scale=["#40004b",  "#9970ab", "#ef3b2c", "#67000d"];
var color = d3.scale.ordinal()
.range(color_scale);
    
    

//Some quick convertors    
var radian = function(i){ return i * Math.PI/180 };
var degree = function(i){ return i * 180/Math.PI };

var comma = d3.format(",")        
        
var margin = {top: 20, right: 100, bottom:20,left:30,
              center_ring_radius:30};
//padding inbetween rings as percentage of width
var percent_pad = .15;
var data_length = Object.keys(data).length;    
var width = 350,
    height = 350,
    svg_width  = width - margin.right - margin.left,
    svg_height = height - margin.bottom - margin.top,
    center_x = margin.left + svg_width/2,
    center_y = margin.top + svg_height/2,
    outer_radius = Math.min(svg_width,svg_height) / 2,
    annulus_width = (outer_radius-margin.center_ring_radius)/
    ((data_length-1) * percent_pad + data_length),
    pad_width = annulus_width*percent_pad;      

    
function arc(i){
   return d3.svg.arc()
      .outerRadius(outer_radius - i * (annulus_width+pad_width))
      .innerRadius((outer_radius - i * (annulus_width+pad_width))-annulus_width)
}


        

    
//a starting angle
var angle = 0;
var state_angle = angle;

var tick_angles = [0,90,180,270];

        
var radius = Math.min(svg_width,svg_height)/2;

//Canvas
var svg = d3.select("#dist_viz").append("svg")
            .attr("class",key)
            .attr("width",width)
            .attr("height",height);

var g =  svg.append("g")
        .style("pointer-events","none")
        .attr("transform","translate("+
              (svg_width/2+margin.left)+","+(svg_height/2+margin.top) +")");    
    
//Tick Labels
//Major
var tick_percents = [0,25];
for (tick in tick_percents){
svg.append("text")
        .text(tick_percents[tick]+"%")
        .attr("class","tick_lab")
        .style("font-size","13px")
        .style("fill","black")
        .style("text-anchor","middle")
        .style("dominant-baseline","central")
        //.attr("dy",function(){return this.getBBox().height/2 ;})
        //.attr("dx",function(){return this.getBBox().width/2 ;})
        .attr("angle_state",180-angle-90*(Number(tick)+0))
        .attr("x",center_x + (radius+14) *Math.sin(radian(180-angle-90*(Number(tick)+0))))
        .attr("y",center_y + (radius+14) *Math.cos(radian(180-angle-90*(Number(tick)+0))))
        ;
};
//Minor
var tick_percents = [5,10,15,20];
for (tick in tick_percents){
svg.append("text")
        .attr("class","tick_lab")
        .style("font-size","11px")
        .style("text-anchor","middle")
        .attr("dy",5)
        .attr("dx",2)
        .attr("angle_state",180-angle-18*(Number(tick)+1))
        .attr("x",center_x + (radius+14) *Math.sin(radian(180-angle-18*(Number(tick)+1))))
        .attr("y",center_y + (radius+14) *Math.cos(radian(180-angle-18*(Number(tick)+1))))
        .text(tick_percents[tick]);
};        
    
    


for (var key in data){
   
    var pie = d3.layout.pie().sort(null)
                .startAngle(radian(angle))
                .endAngle(radian(360+angle));
    
    
                
    var path = g.selectAll("g.arc")
                .data(pie(data[key]));
               
    path.enter().append("path")
                .style("pointer-events","fill")
                .style("cursor","pointer")
                .attr("class",function(d, i){ return "arc class"+i+" "+key;})
                .attr("id",function(d, i){ return "arcclass"+i+key;})
                .attr("d",arc(Object.keys(data).indexOf(key)))
                .attr("fill", function(d, i) { return color(i); })
                .each(function(d) { this._current = d; })
                .style("stroke","black").style("stroke-width","0px")
                .on("mouseover",function(){
                        d3.selectAll("."+this.className["baseVal"].split(' ')[1])
                          .style("stroke-width","1.25px");
                         d3.select(".key."+this.className["baseVal"].split(' ')[1])
                          .style("stroke-width","2.5px");
                        d3.select(this).style("stroke","red").style("stroke-width","2px");
                        
                        })
                        
                .on("mouseout",function(){
                        d3.selectAll(".key")     
                            .style("stroke-width","0px");
                        d3.selectAll(".arc")     
                            .style("stroke-width","0px")
                            .style("stroke","black");
                        d3.selectAll(".major_tick.ticks")
                            .transition().delay(2500)
                            .style("opacity",0);
                        d3.selectAll(".tick_lab")
                            .transition().delay(2500)
                            .style("opacity",0);
                        d3.selectAll(".arc")
                            .transition().delay(3000)
                            .style("fill-opacity",1);
                    })
    
                .on("click",function(){
                        
                        //disable click over animation
                        d3.selectAll(".arc")
                          .style("pointer-events","none");  
                        setTimeout(function(){
                          d3.selectAll(".arc").style("pointer-events","fill");
                        },2000); 
                        
                        swivel(this);
                        d3.selectAll(".major_tick.ticks")
                                .style("opacity",1);
                        d3.selectAll(".tick_lab")
                                .style("opacity",1);
                })
                .append("svg:title")
                .text(function(d){return comma(d.value)+" GPs";});
    
        
      for(i in data[key]){  
            g.append("text")
                .attr("x",10)
                .attr("dy",annulus_width*.9)
                .attr("class","path_labs class"+i)
                .style("opacity",0)
                .append("textPath")
                    .attr("xlink:href",function(d){ return "#arcclass"+i+key;})
                    .text(key);
      }
}        
        
    
    
//Change Function                     
function swivel(obj){
    
    var d = degree(obj.__data__.startAngle);
    var s=window.state_angle;
    
    
    //Guide Lines
    var lines = d3.selectAll(".major_tick");
    lines.transition().duration(2000)
        .attrTween("transform", function() { 
                       return d3.interpolateString("rotate("+s+" "+center_x+","+center_y+")", 
                                                   "rotate("+d+" "+center_x+","+center_y+")"); 
                   });

    //Guide Labels
    
    //Some Shorthanded Trig
    function strig(x){
        return Number(x.getAttribute("angle_state"))
    }
    function xtrig(x){
        return center_x + (radius+14) *Math.sin(radian((s>d) ? strig(x) +(s-d) : strig(x) +(s-d)));
    }
    function ytrig(y){
        return center_y + (radius+14) *Math.cos(radian((s>d) ? strig(y) +(s-d) : strig(y) +(s-d)));
    }
    
    var ticklabs = d3.selectAll(".tick_lab");
    ticklabs.transition().delay(0)
        .attr("x", function(){return xtrig(this);})
        .attr("y", function(){return ytrig(this);});
    ticklabs.transition().delay(300).attr("angle_state",function(){
        return ((d>s) ? 360+s-d : s-d) + Number(this.getAttribute("angle_state")) ;});

    
    //reset angle state variable
    window.state_angle=d;
    
    for (var key in data){
        //the angle to change
        var compare = d3.select(".arc."+obj.className["baseVal"].split(' ')[1]+"."+key);
        var compare_angle = degree(compare[0][0].__data__.startAngle);
        var state_angle = degree(d3.select(".arc."+key)[0][0].__data__.startAngle);
        var adjust_angle = d - compare_angle;   
        
        var pie = d3.layout.pie().sort(null)
            .startAngle(radian(state_angle+adjust_angle))
            .endAngle(radian(360+state_angle+adjust_angle));
        
        var paths = d3.selectAll(".arc."+key);  
        paths.data(pie(data[key]))
            .transition().duration(2000)
            .attrTween("d",
                            function (d) {
                              var i = d3.interpolate(this._current, d);
                              this._current = i(0);
                                
                                //Get index of current
                                var index = Object.keys(data).indexOf(this.className["baseVal"].split(' ')[2]);
                              return function(t) {
                                return arc(index)(i(t));
                              };
                            })
            .style("fill-opacity",function(d){
                    if(this.className["baseVal"].split(' ')[1] == 
                       obj.className["baseVal"].split(' ')[1])
                    { return 1; }else{ return .5; } 
                })
            .style("stroke-width",function(d){
                    if(this.className["baseVal"].split(' ')[1] == 
                       obj.className["baseVal"].split(' ')[1])
                    { return "1.25px"; }else{ return "0px"; } 
                })
        
        d3.selectAll(".path_labs")
            .transition().duration(1000)
            .style("opacity",0)
        d3.selectAll(".path_labs."+obj.className["baseVal"].split(' ')[1])
            .transition().delay(1000).duration(1000)
            .style("opacity",1)
        
    }
}
 
           
//Ticks    
//x = cx + r * sin(a)
//y = cy + r * cos(a)
var tick_labels = [0,20,40,60,80];
for (i in range(data_length)){
    for (tick in tick_labels){
        var tock = Number(tick);
        var tock_angle = radian(0-angle-(180/tick_labels.length*(tock)));
        var tock_len = annulus_width*.1;
        var trig_point = radius - (Number(i)*(annulus_width+pad_width))
       
            svg.append("line")
                .attr("class","major_tick ticks")
                .attr("stroke-linecap","round")
                .attr("x1",center_x+ (trig_point -tock_len) *Math.sin(Math.PI/2-tock_angle/2))
                .attr("y1",center_y+ (trig_point -tock_len) *Math.cos(Math.PI/2-tock_angle/2))
                .attr("x2",center_x+ (trig_point) *Math.sin(Math.PI/2-tock_angle/2))
                .attr("y2",center_y+ (trig_point) *Math.cos(Math.PI/2-tock_angle/2));

        }
    
}    

//Zero Axis
svg.append("line")
        .attr("class","major_tick base")
        .attr("x1",center_x+(margin.center_ring_radius-4)*Math.sin(radian(0+angle)))
        .attr("y1",center_y+(margin.center_ring_radius-4)*Math.cos(radian(180-angle)))
        .attr("x2",center_x+ (radius+4) *Math.sin(radian(0+angle)))
        .attr("y2",center_y+ (radius+4) *Math.cos(radian(180-angle))); 

d3.selectAll(".path_labs.class0")
    .style("opacity",1); 
    
    
//CUSTOM KEY
    
svg.append("rect")
    .attr("class","key class0")
    .attr("x",width-70)
    .attr("y", 100)
    .attr("width",17)
    .attr("height",17)
    .attr("fill",color_scale[0]);
svg.append("text")
    .attr("class", "viz_key")
    .attr("x",width-50)
    .attr("y", 115)
    .text("Least");
svg.append("rect")
    .attr("class","key class1")
    .attr("x",width-70)
    .attr("y", 120)
    .attr("width",17)
    .attr("height",17)
    .attr("fill",color_scale[1]);
svg.append("text")
    .attr("class", "viz_key")
    .attr("x",width-50)
    .attr("y", 135)
    .text("Less");
svg.append("rect")
    .attr("class","key class2")
    .attr("x",width-70)
    .attr("y", 140)
    .attr("width",17)
    .attr("height",17)
    .attr("fill",color_scale[2]);
svg.append("text")
    .attr("class", "viz_key")
    .attr("x",width-50)
    .attr("y", 155)
    .text("More");
svg.append("rect")
    .attr("class","key class3")
    .attr("x",width-70)
    .attr("y", 160)
    .attr("width",17)
    .attr("height",17)
    .attr("fill",color_scale[3]);
svg.append("text")
    .attr("class", "viz_key")
    .attr("x",width-50)
    .attr("y", 175)
    .text("Most");
    
svg.append("text")
    .attr("class", "viz_instruct")
    .attr("x",70)
    .attr("y", 325)
    .text("Click a group to align bars for comparison.")

svg.append("text")
    .attr("class", "viz_title")
    .text("GPs per Deprivation Group")
    .attr("x",function(){return width/2-(this.getBBox().width/2)})
    .attr("y", 30)
    

svg.append("text")
    .attr("class", "viz_instruct")
    .style("font-size",14)
    .attr("x",275)
    .attr("y", 82)
    .text("Deprivation")
svg.append("text")
    .attr("class", "viz_instruct")
    .style("font-size",14)
    .attr("x",275)
    .attr("y", 95)
    .text("Group")
