$(document).ready(function() {
	
	var topics = ["photography", "jewelry", "minecraft", "skyrim", "colors", "art", "star wars", "dungeons and dragons", "games", "fossils", "minerals", "dragons"];
	var limit;
	var result;
	
	function renderButtons() {

        $("#buttons-list").empty();

        for (var i = 0; i < topics.length; i++) {
          var butts = $("<button>");
          butts.addClass("gif-btn btn btn-primary btn-sm active");
		  butts.attr("aria-pressed","true");
		  butts.attr("role", "button");
          butts.attr("data-name", topics[i]);
          butts.text(topics[i]);
          $("#buttons-list").append(butts);
        }
      }
	  
	//creates matrix of gifs  
	  
	function generateMatrix(response) {
		//clears any existing gifs, to start fresh
		$("#gif-view").empty();
		//loop for adding the gifs and creating the framework of the page
		for (var i=0; i < limit; i++){
			//creates a bootstrap div class of row
			var row = $("<div class='row'>");
			//appends the row to the parent element
			$("#gif-view").append(row);
				//Appends columns to the row that was created
				//this loop will also modify i and becomes an internal itteration of the outer loop
				for (var j=0; j<3; j++){
					//breaks out of the function if end of array is reached
					if (!result[i]){return;}
					//creates the bootstrap element with col size 4
					var col = $("<div class='col-sm-4 col-marg'>");
					//gets the value for rating of the gif
					var rating = result[i].rating;
					//creates the element for the rating
					var ratingGif = $("<p>").text("Rating: "+rating);
					//gets the value for the still image
					var stillURL = result[i].images.fixed_width_still.url;
					//creates the image element for the gif
					var stillGif = $("<img>").attr("src", stillURL);
					stillGif.attr("data-still", stillURL);
					stillGif.attr("data-state", "still");
					//creates the image element for the gif
					var movingGif = stillGif.attr("data-animated", result[i].images.fixed_width.url);
					//appends the still gif and the rating of the gif to the column element
					col.append(stillGif, ratingGif);
					//adds the column to the row
					$(row).append(col);
					//manual itteration of i
					i++;
				}
				//manual decrementation of i or it skips every fourth number as i itterates due to end of loop
				i--;
		};
	}
	
	// function that makes the ajax call to Giphy and then calls generateMatrix upon data receipt
	
	function displayGif() {
		var gif = $(this).data("name");
		var apiKey = "v3q7CXIe6uAx1Ua1TPclHLT9oZ6dJMct";
		limit = 10;
		var queryURL = "http://api.giphy.com/v1/gifs/search?q="+gif+"&api_key="+apiKey+"&limit="+limit;
		
		$.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
			result=response.data;
			generateMatrix(response);
		});
	}

      // Adding a click event listener to all elements with a class of "gif-btn" and calls display function
      $(document).on("click", ".gif-btn", displayGif);
	
	renderButtons();
});