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
                
                showImage.attr('src', results[i].images.fixed_height.url);

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

	$(document).on('click', '.tvShow', showGifs);

	makeButtons();
});