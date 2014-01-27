var map_svg_width=870
	img_height=100
	img_width=100;

var all_y=85
	map_margin=120
	nir_x=0
	ice_x=map_margin*1
	aus_x=map_margin*2
	can_x=map_margin*3
	den_x=map_margin*4
	swe_x=map_margin*5-10
	por_x=map_margin*6-40
	uk_x =map_margin*7-70;

var nir_ddd=129
	ice_ddd=106
	aus_ddd=89
	can_ddd=86
	den_ddd=85
	swe_ddd=79
	por_ddd=78
	uk_ddd =71;

var stat_fade=400;




var mapsvg = d3.select("#minimaps_svg").append("svg")
				.attr("width",map_svg_width)
				.attr("height",240)
				.style("margin","0 auto")
				.style("display","block");

var map_textbox = mapsvg.append("g")
			.style("margin","0 auto")
			.style("display","block")
			.style("background-color","pink")
			.attr("width",400)
			.attr("height",300);

var map_stat_instruct = map_textbox.append("text")
		.attr("class","map_instruct")
		.text("Click on a country below to see its antidepressant consumption.")
		.attr("y",40)
		.attr("font-size", "20px")
		.attr("font-family", "'Lora'")
		.attr("fill", "#800000")
		.attr("x",function(){return (map_svg_width / 2)-(599/2)  ;});

var map_stat_country = map_textbox.append("text")
		.attr("class","map_instruct")
		.text("")
		.attr("y",35)
		.attr("font-size", "45px")
		.attr("font-family", "sans-serif")
		.attr("font-weight", "bold")
		.attr("fill", "black")
		.attr("x",20);


var map_stat_bigint = map_textbox.append("text")
		.attr("class","map_instruct")
		.text("")
		.attr("y",62)
		.attr("font-size", "70px")
		.attr("font-family", "'Lora'")
		.attr("font-weight", "bold")
		.attr("fill", "#800000")
		.attr("x",0);

var map_stat_sub1 = map_textbox.append("text")
		.attr("class","map_instruct")
		.text("")
		.attr("y",40)
		.attr("font-size", "20px")
		.attr("font-family", "'Lora'")
		.attr("fill", "black")
		.attr("x",function(){return (map_svg_width / 2)+60  ;});
var map_stat_sub2 = map_textbox.append("text")
		.attr("class","map_instruct")
		.text("")
		.attr("y",60)
		.attr("font-size", "20px")
		.attr("font-family", "'Lora'")
		.attr("fill", "black")
		.attr("x",function(){return (map_svg_width / 2)+60  ;});



var g = mapsvg.append("g");


var source_ni = g.append("text")
		.attr("x",495)
		.attr("y",75)
		.attr("font-size", "11px")
		.attr("font-family", "'Lora'")
		.attr("fill", "grey")
		.text("SOURCE: Analysis of GP Prescribing Data by The Detail")
		.attr("display","none");

var source_ot = g.append("text")
		.attr("x",495)
		.attr("y",75)
		.attr("font-size", "11px")
		.attr("font-family", "'Lora'")
		.attr("fill", "grey")
		.text("SOURCE: OECD Health at a Glance 2013")
		.attr("display","none");



var nir = g.append("svg:image")
			.attr("class","nir_map minimap")
			.attr("xlink:href", nir_map_black)
			.attr("height",img_height)
			.attr("width",img_width)
			.attr("x",nir_x)
			.attr("y",all_y)
			.attr("fill","orange")
			.on("click", function(){
				reset()
				source_ni.attr("display","block");
				map_stat_country.text("Northern Ireland").style("opacity",0).transition().duration(stat_fade).style("opacity",1);
				map_stat_bigint.text(nir_ddd).style("opacity",0).transition().duration(stat_fade).style("opacity",1);
				center()
				mapsvg.select(".nir_map")
					.attr("xlink:href", nir_map_hi)
					.transition().duration(80).attr("x",nir_x-2).attr("y",all_y+2)
					.transition().duration(80).attr("x",nir_x).attr("y",all_y)
			});


var ice = g.append("svg:image")
			.attr("class","ice_map minimap")
			.attr("xlink:href", ice_map_black)
			.attr("height",img_height)
			.attr("width",img_width)
			.attr("x",ice_x)
			.attr("y",all_y)
			.attr("fill","orange")
			.on("click", function(){
				reset()
				source_ot.attr("display","block");
				map_stat_country.text("Iceland").style("opacity",0).transition().duration(stat_fade).style("opacity",1);
				map_stat_bigint.text(ice_ddd).style("opacity",0).transition().duration(stat_fade).style("opacity",1);
				center()
				mapsvg.select(".ice_map")
					.attr("xlink:href", ice_map_hi)
					.transition().duration(80).attr("x",ice_x-2).attr("y",all_y+2)
					.transition().duration(80).attr("x",ice_x).attr("y",all_y)
			});

var aus = g.append("svg:image")
			.attr("class","aus_map minimap")
			.attr("xlink:href", aus_map_black)
			.attr("height",img_height)
			.attr("width",img_width)
			.attr("x",aus_x)
			.attr("y",all_y)
			.attr("fill","orange")
			.on("click", function(){
				reset()
				source_ot.attr("display","block");
				map_stat_country.text("Australia").style("opacity",0).transition().duration(stat_fade).style("opacity",1);
				map_stat_bigint.text(aus_ddd).style("opacity",0).transition().duration(stat_fade).style("opacity",1);
				center()
				mapsvg.select(".aus_map")
					.attr("xlink:href", aus_map_hi)
					.transition().duration(80).attr("x",aus_x-2).attr("y",all_y+2)
					.transition().duration(80).attr("x",aus_x).attr("y",all_y)
			});

var can = g.append("svg:image")
			.attr("class","can_map minimap")
			.attr("xlink:href", can_map_black)
			.attr("height",img_height)
			.attr("width",img_width)
			.attr("x",can_x)
			.attr("y",all_y)
			.attr("fill","orange")
			.on("click", function(){
				reset()
				source_ot.attr("display","block");
				map_stat_country.text("Canada").style("opacity",0).transition().duration(stat_fade).style("opacity",1);
				map_stat_bigint.text(can_ddd).style("opacity",0).transition().duration(stat_fade).style("opacity",1);
				center()
				mapsvg.select(".can_map")
					.attr("xlink:href", can_map_hi)
					.transition().duration(80).attr("x",can_x-2).attr("y",all_y+2)
					.transition().duration(80).attr("x",can_x).attr("y",all_y)
			});

var den = g.append("svg:image")
			.attr("class","den_map minimap")
			.attr("xlink:href", den_map_black)
			.attr("height",img_height)
			.attr("width",img_width)
			.attr("x",den_x)
			.attr("y",all_y)
			.attr("fill","orange")
			.on("click", function(){
				reset()
				source_ot.attr("display","block");
				map_stat_country.text("Denmark").style("opacity",0).transition().duration(stat_fade).style("opacity",1);
				map_stat_bigint.text(den_ddd).style("opacity",0).transition().duration(stat_fade).style("opacity",1);
				center()
				mapsvg.select(".den_map")
					.attr("xlink:href", den_map_hi)
					.transition().duration(80).attr("x",den_x-2).attr("y",all_y+2)
					.transition().duration(80).attr("x",den_x).attr("y",all_y)
			});

var swe = g.append("svg:image")
			.attr("class","swe_map minimap")
			.attr("xlink:href", swe_map_black)
			.attr("height",img_height)
			.attr("width",img_width)
			.attr("x",swe_x)
			.attr("y",all_y)
			.attr("fill","orange")
			.on("click", function(){
				reset()
				source_ot.attr("display","block");
				map_stat_country.text("Sweden").style("opacity",0).transition().duration(stat_fade).style("opacity",1);
				map_stat_bigint.text(swe_ddd).style("opacity",0).transition().duration(stat_fade).style("opacity",1);
				center()
				mapsvg.select(".swe_map")
					.attr("xlink:href", swe_map_hi)
					.transition().duration(80).attr("x",swe_x-2).attr("y",all_y+2)
					.transition().duration(80).attr("x",swe_x).attr("y",all_y)
			});

var por = g.append("svg:image")
			.attr("class","por_map minimap")
			.attr("xlink:href", por_map_black)
			.attr("height",img_height)
			.attr("width",img_width)
			.attr("x",por_x)
			.attr("y",all_y)
			.attr("fill","orange")
			.on("click", function(){
				reset()
				source_ot.attr("display","block");
				map_stat_country.text("Portugal").style("opacity",0).transition().duration(stat_fade).style("opacity",1);
				map_stat_bigint.text(por_ddd).style("opacity",0).transition().duration(stat_fade).style("opacity",1);
				center()
				mapsvg.select(".por_map")
					.attr("xlink:href", por_map_hi)
					.transition().duration(80).attr("x",por_x-2).attr("y",all_y+2)
					.transition().duration(80).attr("x",por_x).attr("y",all_y)
			});

var uk = g.append("svg:image")
			.attr("class","uk_map minimap")
			.attr("xlink:href", uk_map_black)
			.attr("height",img_height)
			.attr("width",img_width)
			.attr("x",uk_x)
			.attr("y",all_y)
			.attr("fill","orange")
			.on("click", function(){
				reset()
				source_ot.attr("display","block");
				map_stat_country.text("United Kingdom").style("opacity",0).transition().duration(stat_fade).style("opacity",1);
				map_stat_bigint.text(uk_ddd).style("opacity",0).transition().duration(stat_fade).style("opacity",1);
				center()
				mapsvg.select(".uk_map")
					.attr("xlink:href", uk_map_hi)
					.transition().duration(80).attr("x",uk_x-2).attr("y",all_y+2)	
					.transition().duration(80).attr("x",uk_x).attr("y",all_y)
			});



function reset(){

				mapsvg.select(".nir_map")
					.attr("xlink:href", nir_map_black);
				mapsvg.select(".ice_map")
					.attr("xlink:href", ice_map_black);
				mapsvg.select(".aus_map")
					.attr("xlink:href", aus_map_black);
				mapsvg.select(".can_map")
					.attr("xlink:href", can_map_black);
				mapsvg.select(".den_map")
					.attr("xlink:href", den_map_black);
				mapsvg.select(".swe_map")
					.attr("xlink:href", swe_map_black);
				mapsvg.select(".por_map")
					.attr("xlink:href", por_map_black);
				mapsvg.select(".uk_map")
					.attr("xlink:href", uk_map_black);

				map_stat_instruct.text("");
				map_stat_country.text("");
				map_stat_bigint.text("");
				
				map_stat_sub1.text("daily doses per");
				map_stat_sub2.text("1,000 people per day");

				source_ni.attr("display","none");
				source_ot.attr("display","none");

};

function center(){
	map_stat_bigint
		.attr("x",function(){ return (map_svg_width/2)+50-this.getBBox().width; })
	map_stat_country
		.attr("x",
			function(){ return (map_svg_width/2)+50-map_stat_bigint[0][0].getBBox().width
				-this.getBBox().width -5 ; });

};