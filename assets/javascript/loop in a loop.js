<button type="button" class="btn btn-primary btn-lg btn-block" id="add-more">Add more GIFs</button>


	//creates matrix of gifs  
	  
	function generateMatrix() {
		//clears any existing gifs, to start fresh
		$("#gif-view").empty();
		//loop for adding the gifs and creating the framework of the page
		for (var i=0; i < result.length; i++){
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
	
	$("#add-more").on("click", function(event) {
		event.preventDefault();
//		console.log(result);
//		for (var i = 0;i<topics.length;i++){
//			result.push(topics[i]);
//		}
//		console.log(result);
	});