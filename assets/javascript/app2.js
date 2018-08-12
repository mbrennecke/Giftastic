$(document).ready(function() {
	
	var topicsMov = ["photography", "jewelry", "minecraft", "skyrim", "colors", "art", "star wars", "dungeons and dragons", "games", "fossils", "minerals", "dragons"];
	
	//Event listner for nav links
	$(document).on("click", ".movies-gif", function() {
		var addToA = $(this);
		var addToSpan = $(".movies-span");
		var removeFromMovies = $(".nav-gif");
		var removeFromGames = $(".nav-games");
		navClass(addToA, addToSpan, removeFromMovies, removeFromGames);
		console.log(addToA);

	});
}