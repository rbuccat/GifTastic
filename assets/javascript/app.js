var players = ['Kobe Bryant', 'Michael Jordan', 
'Lebron James', 'Magic Johnson', 'Carmelo Anthony', 
'Stephen Curry', 'Russell Westbrook', 'Kevin Durant', 
'Shaquille O\'Neal', 'Kyrie Irving', 'Chris Paul', 
'Jerry West', 'Paul George', 'Dwyane Wade', 
'Klay Thompson', 'Allen Iverson', 'Reggie Miller', 
'Kareen Abdul-Jabbar', 'James Worthy', 'Larry Bird', 
'Tim Duncan', 'Penny Hardaway', 'James Harden', 
'Charles Barkley'];

	function playerInfo(){
		var title = $(this).data('name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=dc6zaTOxFJmzC&limit=10";
		$(".superstar").empty();
		

		$.ajax({
			url: queryURL,
			method: 'GET'
		})
			.done(function(response) {
				console.log(response);

				var results = response.data

                for (var i = 0; i < results.length; i++) {

                    var playerDiv = $("<div>");
                    playerDiv.addClass("superstar");
                    var p = $("<p>");

                    p.text("Rating: " + results[i].rating);
                    
                    var playerImage = $("<img>");
                    playerImage.attr("src", results[i].images.fixed_height_still.url);
                    playerImage.attr("data-still", results[i].images.fixed_height_still.url);
                    playerImage.attr("data-animate", results[i].images.fixed_height.url);
                    playerImage.attr("data-state", "still");
                    playerImage.addClass("gif");

                    playerDiv.append(p);
                    playerDiv.append(playerImage);
                    $("#gifsAppearHere").prepend(playerDiv);
			}
			
			$('.gif').on('click', function(){
           
            var state = $(this).attr('data-state');
            
            	if (state === "still") {
                	$(this).attr("src", $(this).attr('data-animate'));
                	$(this).attr("data-state", "animate");
            	}
            	else if (state === "animate") {
                	$(this).attr("src", $(this).attr('data-still'));
                	$(this).attr("data-state", "still");
            	}
        	});
		});	
	}
	
	function renderButtons(){ 
		
		$('#playersView').empty();
		
		for (var i = 0; i < players.length; i++){
			
		    var a = $('<button>') 
		    a.addClass('player'); 
		    a.attr('data-name', players[i]); 
		    a.text(players[i]); 
		    $('#playersView').append(a); 
		}
	}
	
	$('#addplayer').on('click', function(){
		
		var player = $('#player-input').val().trim();
		
		players.push(player);

		renderButtons();
		
		return false;
	})
	
	$(document).on('click', '.player', playerInfo);
	
	renderButtons();