$(document).ready(function() {
	
	//Default selection for GIFs
	var topicsGif = ["photography", "jewelry", "minecraft", "skyrim", "colors", "art", "star wars", "dungeons and dragons", "games", "fossils", "minerals", "dragons"];
	//Default selection for movies
	var titlesMovies = ["Blade Runner", "Star Wars", "Buckaroo Banzai", "Zardoz", "The Fall", "Cowboy Bebop", "Jesus Christ Superstar", "Hoodwinked", "Dark Crystal", "Legend"];
	//Default selection for games
	var titlesGames = ["Morrowind", "Skyrim", "Beyond Good and Evil", "Mass Effect", "Lego City Undercover", "Silent Hill", "Metal Gear Solid", "Grand Theft Auto 3", "Star Wars Knights of the Old Republic"];
	var result;
	var gif;
	var offset = 0;
	var addBtnArr = "topicsGif";
	var card;
	var cardBody;
	var cardImage;

	//Function to create the GIF buttons
	function renderGifButtons() {
		renderButtons("gif-btn", topicsGif);
	}
	
	//Function to create the GIF buttons
	function renderMoviesButtons() {
		renderButtons("movies-btn", titlesMovies);
	}
	
	//Function to create the GIF buttons
	function renderGamesButtons() {
		renderButtons("games-btn", titlesGames);
	}
	
	function renderButtons(buttonChg, arr) {
		//clears the list so that it doesn't keep adding on to it
        $("#buttons-list").empty();
		//loops through and creates the buttons and adds the needed classes and stuff
        for (var i = 0; i < arr.length; i++) {
			var butts = $("<button>");
			butts.addClass(buttonChg);
			butts.addClass("btn btn-primary btn-sm active");
			butts.attr("aria-pressed","true");
			butts.attr("role", "button");
			butts.attr("data-name", arr[i]);
			butts.text(arr[i]);
			$("#buttons-list").append(butts);
        }
      }
	 
	 //generates generic card with classes
	 function cardGen(){
		 card = $("<div class='card float-left'>");
		 cardImage = $("<img class='card-img-top'>");
		 cardBody = $("<div class='card-body'>");
	 }
	 
	//function that generates the matrix display for GIFs
	function generateMatrix() {
		var cardHeightMax = 0;
		var cardImgHeight = 0;
		
		for (var i=0; i < result.length; i++){
			//generates card
			cardGen();
			//creates the title for the gif
			var title = result[i].title;
			
			//gets the value for the still image name, allows a fixed width for cards
			var stillURL = result[i].images.fixed_width_still.url;
			
			//modifies the img element for the card with specific attr's and classes
			cardImage.attr("src", stillURL);
			cardImage.attr("data-still", stillURL);
			cardImage.attr("data-state", "still");
			cardImage.attr("class", "gif");
			cardImage.attr("alt", title);
			
			//creates the animated version for the gif
			var movingGif = cardImage.attr("data-animated", result[i].images.fixed_width.url);

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
			card.append(cardBody)
			
			//add gifs to containing div for display
			//also allows newly grabbed divs to be displayed above
			$("#data-view").prepend(card);
					
			//get card height to fit all to screen more prettily
			var cardHeight = $(card).height();

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
			//Seems that it was an issue where before rendering the first time
			//the image wasn't loaded, but on going back to the page the images
			//were pulled from the cache and threw off the sizing
			card.prepend(cardImage);
		};
		//add the two values together to get the average height for cards
		var cardHeightSet = cardImgHeight + cardHeightMax + 100;
		//Set the height on the cards. Width is automatic due to gif choice above
		$(".card").css({'height':cardHeightSet, 'width': '200px'});
	}		
	
	function displayMoviesInfo() {
		//generates the card
		cardGen();
		//gets the title info
		var title = result.Title;
		//gets the rating info
		var rating = result.Rated;
		//gets the plot
		var plot = result.Plot;
		//gets the poster url
		var poster = result.Poster;
		//updates card image with poster info
		cardImage.attr("src", poster); 
		//sets the alt for the image to the movie title
		cardImage.attr("alt", title);
		//movie title element
		var movieTitle = $("<h5 class='card-body'>").text(title);
		//movie rating element
		var ratingMovie = $("<p class='card-text'>").text("Rating: " + rating);
		//movie rating element
		var plotMovie = $("<p class='card-text plot'>").text("Plot: " + plot);
		//add title and rating to card
		cardBody.append(movieTitle, ratingMovie, plotMovie);
		//add card body to card
		card.append(cardBody);
		//add image to card
		card.prepend(cardImage);
		//add card to page
		$("#data-view").prepend(card);
		//add class for mouse hover to check for
		card.addClass("divTrans");
		//CSS for movie cards
		$(".card").css({"width": "300px", "height": "650px", "overflow": "hidden"});
		//CSS to set movie image to fit within card
		$("img.card-img-top").css('width', '298px');
	}
	
	function displayGamesInfo() {
		//generates the card
		cardGen();
		//gets the title info
		var title = result.results[0].name;
		//gets the rating info
		var rating = result.results[0].original_game_rating[0].name;
		//gets the plot
		var plot = result.results[0].deck;
		//gets the poster url
		var cover = result.results[0].image.small_url;
		//updates card image with poster info
		cardImage.attr("src", cover); 
		//sets the alt for the image to the movie title
		cardImage.attr("alt", title);
		//movie title element
		var gameTitle = $("<h5 class='card-body'>").text(title);
		//movie rating element
		var ratingGame = $("<p class='card-text'>").text("Rating: " + rating);
		//movie rating element
		var plotGame = $("<p class='card-text'>").text("Plot: " + plot);
		//add title and rating to card
		cardBody.append(gameTitle, ratingGame, plotGame);
		//add card body to card
		card.append(cardBody);
		//add image to card
		card.prepend(cardImage);
		//add card to page
		$("#data-view").prepend(card);
		//add class for mouse hover to check for
		card.addClass("divTrans");
		//CSS for movie cards
		$(".card").css({"width": "300px", "height": "650px", "overflow": "hidden", "z-index": "1"});
		//CSS to set movie image to fit within card
		$("img.card-img-top").css('width', '298px');
	}
	
	//Function to make the ajax call for the api
	function ajaxCall(query, type){
		$.ajax({
          url: query,
          method: "GET"
        }).then(function(response) {
			if (type =="gif"){
				result=response.data;
				generateMatrix();			
			} else if (type == "movies"){
				result=response;
				displayMoviesInfo();
			}// else {
			//	displayGamesInfo();
		//	}
		});
	}
	
	// function that makes the ajax call to Giphy and then calls generateMatrix upon data receipt
	
	function displayGif() {
		//appends offset gifs above existing ones
		if (gif == $(this).data("name")){
			var limit = "limit=10&offset=" + offset;
			offset+=10;

		} else {
			//clears any existing gifs, to start fresh if changing subject
			$("#data-view").empty();
			gif = $(this).data("name");
			var limit = "limit=10";
			offset = 10;

		}
		
		var apiKey = "v3q7CXIe6uAx1Ua1TPclHLT9oZ6dJMct";
		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+gif+"&api_key="+apiKey+"&"+limit;
		ajaxCall(queryURL, "gif");

	}
	
	// function that makes the ajax call to OMDB and then calls displayMovieGame //upon data receipt
	function displayMovies() {
		var movie = $(this).data("name");
		var apiKey = "dedeeaf2";
		 var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + apiKey;
		 ajaxCall(queryURL, "movies");
	}


	//this function has to be parsed differently due to the CORS and the way that 
	//giantbomb handles api requests. 
	//Thanks to NukaPunk on GitHubGist for the code that allowed me to do this 
	//https://gist.github.com/NukaPunk/665c20fb5aec492b310b
	function displayGames() {
		var game = $(this).data("name");
		var apiKey = "3e24742f056a71949bb895cc5fc212188c70a6ee";
		$.ajax ({
			type: 'GET',
			dataType: 'jsonp',
			crossDomain: true,
			jsonp: 'json_callback',
			url: "https://www.giantbomb.com/api/search/?format=jsonp&api_key=" +apiKey+ "&query=" +game+"&resources=game"
		}).then(function(data) {
			result = data;
			displayGamesInfo();
		});

	}
	
	//Event listner for nav links
	$(".nav-item").on("click", function(event) {
		var clicked = event.target.id;
		var addToA = $(this);
		var addToSpan;
		$(".sr-only").text("")
		$("a").removeClass("active");
		$("span").removeClass("sr-only");
		$("#data-view").empty();
		
		switch(clicked) {
			case "nav-gif":
				$(this).addClass("active");
				$("#gif-span").addClass("sr-only");
				$("#gif-span").text("(current)");
				renderGifButtons();
				addBtnArr = "topicsGif";
				break;
			case "nav-movies":
				$(this).addClass("active");
				$("#movies-span").addClass("sr-only");
				$("#movies-span").text("(current)");
				renderMoviesButtons();
				addBtnArr = "titlesMovies";
				break;
			case "nav-games":
				$(this).addClass("active");
				$("#games-span").addClass("sr-only");
				$("#games-span").text("(current)");
				renderGamesButtons();
				addBtnArr = "titlesGames";
				break;
			default:
				break;
		}
	});


	// Adding a click event listener to all elements with a class of "gif-btn" and calls display function
	$(document).on("click", ".gif-btn", displayGif);
	
	// Adding a click event listener to all elements with a class of "gif-btn" and calls display function
	$(document).on("click", ".movies-btn", displayMovies);
	
	// Adding a click event listener to all elements with a class of "gif-btn" and calls display function
	$(document).on("click", ".games-btn", displayGames);

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
	
	// This function handles events for adding a new subject or title
      $("#add-btn").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var btnAdd = $("#add-btn-input").val().trim();
		if (btnAdd == "") {return;}
		$("#add-btn-input").val("");
		//adds gif to the array
		switch(addBtnArr){
			case "topicsGif":
				topicsGif.push(btnAdd);
				renderGifButtons();
				break;
			case "titlesMovies":
				titlesMovies.push(btnAdd);
				renderMoviesButtons();
				break;
			case "titlesGames":
				titlesGames.push(btnAdd);
				renderGamesButtons();
				break;
			default:
				break;
		}
		//Render buttons again with new one
	  });
	  
	//Listener for hover on plot summary to expand, makes everything jumpy.
	//At this time I don't have a working solution to the jumpiness
	//Negative margin and padding fix some of it, except on the bottom one
	$(document).on({
		mouseenter: function () {
			$(this).css({"height": "auto", "margin-bottom": "-300px", "z-index": "2"});
			$(".plot").css("height", "300px");
			$(".main").css("margin-bottom", "300px");
		},
		mouseleave: function () {
			$(this).css({"height": "650px", "margin-bottom": "0", "z-index": "1"});
			$(".main").css("margin-bottom", "");
		}
	}, ".divTrans");
	  
	//Starts the party by rendering the GIF buttons on the window
	renderGifButtons();
});