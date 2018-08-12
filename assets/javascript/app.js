$(document).ready(function() {
	
	var topicsGif = ["photography", "jewelry", "minecraft", "skyrim", "colors", "art", "star wars", "dungeons and dragons", "games", "fossils", "minerals", "dragons"];
	var result;
	var gif;
	var offset = 0;


	
	function renderButtons() {

        $("#buttons-list").empty();

        for (var i = 0; i < topicsGif.length; i++) {
          var butts = $("<button>");
          butts.addClass("gif-btn btn btn-primary btn-sm active");
		  butts.attr("aria-pressed","true");
		  butts.attr("role", "button");
          butts.attr("data-name", topicsGif[i]);
          butts.text(topicsGif[i]);
          $("#buttons-list").append(butts);
        }
      }
	 
	function cardHeightFunc(height){
		$(".card").css({'height':height});
	}
	 
	function generateMatrix() {
		var cardHeightMax = 0;
		var cardImgHeight = 0;
		
		
		
		for (var i=0; i < result.length; i++){
			
			//create a card to hold the gif and data
			var gifCard = $("<div class='card float-left'>");
			
			//creates the title for the gif
			var title = result[i].title;
			
			//gets the value for the still image
			var stillURL = result[i].images.fixed_width_still.url;
			
			//create the img element for the card and assign attr's
			var gifImage = $("<img>").attr("src", stillURL);
			gifImage.attr("data-still", stillURL);
			gifImage.attr("data-state", "still");
			gifImage.attr("class", "gif card-img-top");
			gifImage.attr("alt", title);
			
			//creates the animated version for the gif
			var movingGif = gifImage.attr("data-animated", result[i].images.fixed_width.url);
			
			//creates the card body div
			var cardBody = $("<div class='card-body'>");
			
			// creates the element and text for the title of the gif
			var gifTitle = $("<h5 class='card-body'>").text(title);
			
			//creates the rating for the gif
			var rating = result[i].rating;
			
			//creates the element for the rating
			var ratingGif = $("<p class='card-text'>").text("Rating: "+rating);
			
			//creates the download link for the gif
			var dl = result[i].images.original.url;
			
			//creates the element target for the download
			//Browser updates have stopped cross origin downloads, so this
			//only sends you to the actual image, won't allow downloading
			//but it would have worked on an older version of Chrome (pre-release 65)
			var dlGif = $("<a href='" + dl + "' class='btn btn-primary btn-sm'   download target='_blank'> Download </a>");
			
			//add divs to cardbody
			cardBody.append(gifTitle, ratingGif, dlGif);
			
			//add gif and cardbody to card
			gifCard.append(cardBody)
			
			//add gifs to containing div for display
			//also allows newly grabbed divs to be displayed above
			$("#gif-view").prepend(gifCard);
					
			//get card height to fit all to screen more prettily
			var cardHeight = $(gifCard).height();

			//gets image height from object data as image not visible to be 
			//measured at time measurement occurs
			var cardImgHeightChk = parseInt(result[i].images.fixed_width.height);

			//check for largest heights and setting of those heights
			//the two largest values are used as sometimes a pic is large but the 
			//title is short and the download button can be pushed below the card
			//bottom
			if (cardImgHeightChk > cardImgHeight) {	
				cardImgHeight = cardImgHeightChk;
			}
			if (cardHeight > cardHeightMax){
				cardHeightMax = cardHeight;
			}
			//add image to gif cards or else when you click on another button
			//and come back, the cards will retain the image data and throw
			// off the height of above and screw up the display
			//I spent over 3 hours trying to find this bug
			//I think this is a hack and is stupid, but it works, so that trumps
			gifCard.prepend(gifImage);
			
		};
		var cardHeightSet = cardImgHeight + cardHeightMax;


		$(".card").css({'height':cardHeightSet});
		cardHeightMax = 0;
		cardImgHeight = 0;
	}		
	
	

	
	function ajaxCall(query){
		$.ajax({
          url: query,
          method: "GET"
        }).then(function(response) {
			result=response.data;
			generateMatrix();
				
		});
	}
	
	// function that makes the ajax call to Giphy and then calls generateMatrix upon data receipt
	
	function displayGif() {
		if (gif == $(this).data("name")){
			var limit = "limit=10&offset=" + offset;
			offset+=10;

		} else {
			//clears any existing gifs, to start fresh, goes here or resets view
			//when adding offset gifs
			$("#gif-view").empty();
			gif = $(this).data("name");
			var limit = "limit=10";
			offset = 10;

		}
		
		var apiKey = "v3q7CXIe6uAx1Ua1TPclHLT9oZ6dJMct";
		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+gif+"&api_key="+apiKey+"&"+limit;
		ajaxCall(queryURL);
	}
	
	//Event listner for nav links
	$(".nav-item").on("click", function(event) {
		var clicked = event.target.id;
		var addToA = $(this);
		var addToSpan;
		$(".sr-only").text("")
		$("a").removeClass("active");
		$("span").removeClass("sr-only");
		
		switch(clicked) {
			case "nav-gif":
				$(this).addClass("active");
				$("#gif-span").addClass("sr-only");
				$("#gif-span").text("(current)");
				break;
			case "nav-movies":
				$(this).addClass("active");
				$("#movies-span").addClass("sr-only");
				$("#movies-span").text("(current)");
				break;
			case "nav-games":
				$(this).addClass("active");
				$("#games-span").addClass("sr-only");
				$("#games-span").text("(current)");
				break;
		}
	});


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
		topicsGif.push(gifAdd);
		//Render buttons again with new one
		renderButtons();
	  });
	  
	//Starts the party by rendering the buttons on the window
	renderButtons();
});