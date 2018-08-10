$(document).ready(function() {
	
	var topics = ["photography", "jewelry", "minecraft", "skyrim", "colors", "art", "star wars", "dungeons and dragons", "games", "fossils", "minerals", "dragons"];
	var limit;
	var rowInc=0;
	var colCount=0;
	
	function renderButtons() {

        $("#buttons-list").empty();

        for (var i = 0; i < topics.length; i++) {
          var butts = $("<button>");
          butts.addClass("gif-btn btn btn-primary btn-sm");
          butts.attr("data-name", topics[i]);
          butts.text(topics[i]);
          $("#buttons-list").append(butts);
        }
      }
	  
	function generateMatrix(response) {
		$("#gif-view").empty();
		for (var i=0; i < limit; i++){
			var rowNum = "row"+rowInc;
			console.log(rowNum);
			var rowNumCls = "."+rowNum;
			var row = $("<div class='" + rowNum + "'>");
			var col = $("<div class='col-sm-4'>");
			//think i may need to run another loop to fill the row
			//need to do the math on i or something for that
			if(i%3==0){ 
				$("#gif-view").append(row); 
				rowInc++;
			}
			var rating = response.data[i].rating;
			var ratingGif = $("<p>").text("Rating: "+rating);
			var stillURL = response.data[i].images.fixed_width_still.url;
			var stillGif = $("<img>").attr("src", stillURL);
			col.append(ratingGif, stillGif);
			$(rowNumCls).append(col);
		};
	}
	  
	function displayGif() {
		var gif = $(this).data("name");
		var apiKey = "v3q7CXIe6uAx1Ua1TPclHLT9oZ6dJMct";
		limit = 10;
		var queryURL = "http://api.giphy.com/v1/gifs/search?q="+gif+"&api_key="+apiKey+"&limit="+limit;
		
		$.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
			console.log(response);
			generateMatrix(response);
		});
	}

      // Adding a click event listener to all elements with a class of "movie-btn"
      $(document).on("click", ".gif-btn", displayGif);
	
	renderButtons();
});