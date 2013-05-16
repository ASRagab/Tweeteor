dataViz = new Meteor.Collection("dataViz");

if (Meteor.isServer) {
 Meteor.publish("tweets", function() {
 		self = this;
        var init = true;
 		return dataViz.find({coordinates:{$ne: null}}, { 
        				fields: {'text': 1, 'coordinates': 1}});
        				
        				/**.observeChanges({
        
					//Don't care about adding yet, changes won't happen		
        			removed: function() {
        							console.log("A document has been removed");
									self.changed('dataViz', id)
        			}
        		        
			});**/
		
		    
    });
    
 	  Meteor.startup(function () {
    // code to run on server at startup
    
  });
}


if(!String.linkify) { //helper function to linkify tweet data
    String.prototype.linkify = function() {

        // http://, https://, ftp://
        var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

        // www. sans http:// or https://
        var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

        // Email addresses
        var emailAddressPattern = /\w+@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6})+/gim;

        return this
            .replace(urlPattern, '<a href="$&">$&</a>')
            .replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
            .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
    };
}

if (Meteor.isClient) {

Template.map.theMap = function(){

var testDataSet = [];

function fillData(list, data){

	for(var i = 0; i < list.length; i++){
		var tweetObject = {
				text: list[i].text,
				lon: list[i].coordinates.coordinates[0], 
				lat: list[i].coordinates.coordinates[1]
		};
		data.push(tweetObject);
	}
}

Deps.autorun(function(){ 
	Meteor.subscribe("tweets");
	var tweetList = dataViz.find({},{fields:{'text':1,'coordinates': 1}}).fetch();	
	fillData(tweetList, testDataSet);
	drawMap(testDataSet);
	});

function drawMap(data){
if(data.length > 30){

	var width  = 1280, height = 768;
	var svg = d3.select("#map-background").append("svg")
	                .attr("width", width)
	                .attr("height", height);
	
	var g = svg.append("g");
	var projection = d3.geo.mercator()
			.scale(200)
			.center([0,20])
	       .rotate([-10,0])
	       .translate([width/2, height/2]);
	        
	var countries = topojson.feature(theWorld50m, 	
						 theWorld50m.objects.countries).features;
	var path = d3.geo.path().projection(projection);
	
	g.selectAll("path")
		 .data(countries)
		 .enter()
		 .append("path")
		 .attr("d", path)
		 .attr("class", "countries");	
		                      
	 function rgba(d){
	    return "rgba(" + 0 + "," + 
					Math.round(d) + "," + 	
					Math.round(d*4*Math.random())+","
					 +Math.random()+")";
	    };
	      
	  var toolTweet = d3.select("#map-background")
								.append("div")
								.attr("class","tooltip")
								.style("opacity", 0);
	    				 
	 var circles = g.selectAll("circle")
						  .data(data)
				    	  .enter()
						  .append("circle");
							  
	 circles.attr("transform", function(d){ 
					return "translate(" + projection([d.lon, d.lat]) + ")"; 
					})					 	 
			 .attr("r", 3)
			 .style("fill", function(d, i){ return rgba(i); })
			 .on("click", function(d){
						toolTweet.transition()
				  			  		 .duration(300)						
				   			  		 .style("opacity",1);
								  			  		 
				  		toolTweet.html(d.text.linkify())
								  	.style("left", d3.event.pageX + "px")
								  	.style("top", d3.event.pageY + "px");
					});					   
		} 				// end of if testData > 1	
	}
		return
	};						//end of Template.map
} 							// end of Meteor Client


/**Snippet Cemetary

Template.tweetStream.tweets = function(){
	var tweetList = dataViz.find({},{fields:{'text': 1, 'coordinates': 1}}).fetch();	
	return tweetList;
	};
	
	
Template.tweetStream.tweetCount = function(){
	return dataViz.find().count();
}; 
 
  Template.hello.greeting = function(){
   	return "Welcome to firstApp.";
  };

  Template.hello.events({
      'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
		}
    
  });

var svgTweet     = d3.select("#tweetCount")
	    				 .append("svg")
	    				 .attr("width", w)
	    				 .attr("height", h);

Meteor.http.get("http://localhost:3000/world-50m.json", 
function(error, theWorld50m){
 		
 		         
 	
			
		g.append("path")
			.datum(topojson.feature(world, us.objects.places2))
			.attr("d", path.pointRadius(3))
			.attr("class","place");
		
		g.selectAll(".place-label")
			.data(topojson.feature(world, world.objects.world).features)
			.enter().append("text")
			.attr("class", "place-label")
			.attr("transform", function(d){
				 return "translate(" + 	
				projection(d.geometry.coordinates) + ")";})
			.attr("dx",".40em")
			.text(function(d){return d.properties.sovereignt;}); 

{fields: {coordinates: 1, text: 1}}
for(var i = 0; i < tweetList.length; i++){
		console.log(tweetList[i].text);
	}
	txt.text(function(d){ return d.text})
							 			.attr("x", function(d){	return  scaleFactorX*d.lat; })
							 			.attr("y", function(d){ return  scaleFactorY*d.lon; });
	
	
	
	};**/

