$(document).ready(function() {
	
	var topics = ["photography", "jewelry", "minecraft", "skyrim", "colors", "art", "star wars", "dungeons and dragons", "games", "fossils", "minerals", "dragons"];
	var limit = 10;
	var result;
	var gif;
	
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
	  
	function generateMatrix() {
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
					var col = $("<div class='col-lg-4 col-marg'>");
					//gets the value for rating of the gif
					var rating = result[i].rating;
					//creates the element for the rating
					var ratingGif = $("<p>").text("Rating: "+rating);
					//gets the value for title of the gif
					var title = result[i].title;
					//creates the element for the title
					var titleGif = $("<p>").text("Title: "+title);
					//gets the value for the still image
					var stillURL = result[i].images.fixed_width_still.url;
					//creates the image element for the gif
					var stillGif = $("<img>").attr("src", stillURL);
					stillGif.attr("data-still", stillURL);
					stillGif.attr("data-state", "still");
					stillGif.attr("class", "gif");
					//creates the image element for the gif
					var movingGif = stillGif.attr("data-animated", result[i].images.fixed_width.url);
					//appends the still gif and the rating of the gif to the column element
					col.append(stillGif, ratingGif, titleGif);
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
	
	function displayGif(skip) {
		if (skip != 1){
			gif = $(this).data("name");
		}
		var apiKey = "v3q7CXIe6uAx1Ua1TPclHLT9oZ6dJMct";
		var queryURL = "http://api.giphy.com/v1/gifs/search?q="+gif+"&api_key="+apiKey+"&limit="+limit;
		
		$.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
			result=response.data;
			generateMatrix(result);
		});

	}

	// Adding a click event listener to all elements with a class of "gif-btn" and calls display function
	$(document).on("click", ".gif-btn", displayGif);

	$(document).on("click", ".gif", function() {
	// One really should use .attr even though .data works. But it will not update
	// and so the gifs don't stop. .attr works though
		var state = $(this).attr("data-state");
	// if still, images will animate when clicked
	// if animated, images will return to still state
		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animated"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});
	
	// This function handles events for adding a gif subject
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gifAdd = $("#add-gif-input").val().trim();
		if (gifAdd == "") {return;}
		$("#add-gif-input").val("");
		//adds gif to the array
		topics.push(gifAdd);
		//Render buttons again with new one
		renderButtons();
	  });
	  
	  //button adds 10 more gifs when clicked
	  //I fail to see a way to grab an extra 10 gifs without also technically
	  //writing over the original 10. A call for 10 more gifs that didn't overwrite
	  //would just duplicate the original 10
	  $("#add-more").on("click", function(event) {
		  event.preventDefault();
		  limit+=10;
		displayGif(1);
		console.log(gif);
	  });
		
		
	renderButtons();
});