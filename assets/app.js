$( document ).ready(function() {
	var tvShows = [
		'scandal', 'game of thrones', 'this is us', 'westworld', 'breaking bad'
	];

	function showGifs(){

		var tvShow = $(this).attr('data-name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=g1ujkhir931sWHXeqRUaOPBuJWKpvuz4&limit=10";

		$.ajax({
            url: queryURL, 
            method: 'GET'})
            .done(function(response) {

			console.log(queryURL);
            console.log(response)

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
            	
            	var showDiv = $('<div>');
				var p = $('<p>').text("Rating: " + results[i].rating);
				var showImage = $('<img>');
                
				showImage.attr('src', results[i].images.fixed_height_still.url);
				showImage.attr('data-still', results[i].images.fixed_height_still.url);
				showImage.attr('data-animate', results[i].images.fixed_height.url);
				showImage.attr('data-state', 'still');

                showDiv.append(p);
                showDiv.append(showImage);

                $('#gif').prepend(showDiv);
            }
		});
	}

	function makeButtons(){ 

		$('#newTvShow').empty();

		for (var i = 0; i < tvShows.length; i++){

		    var a = $('<button>')
            a.addClass('tvShow'); 
		    a.attr('data-name', tvShows[i]);
		    a.text(tvShows[i]);
		    $('#newTvShow').append(a);
		}
	}

	$('#addTvShow').on('click', function(){

		var tvShow = $('#tvShowInput').val().trim();

		tvShows.push(tvShow);
		
		makeButtons();

		return false;
	})
	$('#gif').on('click', 'img' , function(){
		var state = $(this).attr("data-state");

      	if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
		} 
		else {
        $(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
		}
	})
	

	$(document).on('click', '.tvShow', showGifs);

	makeButtons();
});