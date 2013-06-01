dataViz = new Meteor.Collection("dataViz");


if (Meteor.isServer) {
Fiber = Npm.require("fibers");

	var t = new ntwitter({
        consumer_key: credentials.consumer_key,
        consumer_secret: credentials.consumer_secret,
        access_token_key: credentials.access_token,
        access_token_secret: credentials.access_token_secret
        });


	t.stream('statuses/filter', { track: ['data', 'visualization', 'dataviz']}, 						function(stream){
						stream.on('data', function(tweet){
								insertTweets(tweet);
						 		});
						 });
					
function insertTweets(tweet){
	self = this;
	self.tweet = tweet;
	Fiber(function(){
		dataViz.insert(self.tweet);
	}).run();
};


      
 Meteor.publish("tweets", function() {
 		this.ready();
 		return dataViz.find({coordinates: {$ne: null}}, { 
        				fields: {'text': 1, 'coordinates': 1}});  
    });
    
Meteor.startup(function () {

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

	 

function rgba(d){
	    return "rgba(" + 0 + "," + 
					Math.round(d) + "," + 	
					Math.round(d*4*Math.random())+","
					 + 150 +")";
	    }

Meteor.subscribe("tweets");	
Template.map.rendered = function(){
self = this;

	var width  = 1280, height = 640;
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
		 
var drawTweets = function(theList){

			var toolTweet = d3.select("#map-background")
										.append("div")
										.attr("class","tooltip")
										.style("opacity",0);
										
	    				 
		 var circles = g.selectAll("circle")
						  .data(theList)				    	  
						  .enter()
						  .append("circle");
							  
		 circles.attr("transform", function(d){ 
					return "translate(" + projection([d.lon, d.lat]) + ")"; 
					})					 	 
			 .attr("r", 30)
			 .style("opacity", 0.1)
			 .transition()
			 .duration(3000)
			 .attr("r", 3).style("opacity", .9)
			 .ease("cubic-in");
	
/*	circles.transition()
			 .delay(4000)
			 .attr("r", 3).style("opacity", 0.8); */
			 
	
	circles.style("fill", function(d, i){ return rgba(i); })
			 .on("mouseover", function(d){
						
						 toolTweet.html(d.text.linkify())	
									  .style("left", d3.event.pageX + "px")
									  .style("top", d3.event.pageY + "px")
									  .transition()
								  	  .duration(1000)
								  	  .style("opacity", 1);
								  	 
								  	  })
			.on("mouseout", function(){
										toolTweet.style("opacity", 0);
												});		
	
								 }

if(!self.drawTweets){
	self.drawTweets = Deps.autorun(function(){
	
	var theList = dataViz.find({},{fields:{'text':1,'coordinates': 1}}).map(
			function(doc){	
								return {
												text: doc.text, 
												lon: doc.coordinates.coordinates[0], 
												lat: doc.coordinates.coordinates[1]
												}
											});
											
				 
		 				//console.log(theList.length);				  	
						drawTweets(theList);
						});
				
				
				}
		 
		 }
		  

 Template.map.destroyed = function () {
 if(this.drawTweets){  
 		 this.drawTweets.stop(); 
	 }
 
  };
				//end of Template.map
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
	
	var tweetObject = {
					text: tweet.text,
					lon: tweet.coordinates.coordinates[0], 
					lat: tweet.coordinates.coordinates[1]
					};
			testDataSet.push(tweetObject);
			drawMap(testDataSet);
	
	};**/

