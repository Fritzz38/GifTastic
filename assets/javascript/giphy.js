var topics = ["dog", "cat", "frog", "fish", "hamster", "salamander", "goldfish", "bird", "ferret", "turtle", "chicken", "rabbit", "hedgehog", "gerbil"];



function renderButtons() {
$("#animalButtons").empty();
for (j = 0; j < topics.length; j++) {
  var a = $("<button>");
  a.addClass("animals");
  a.attr("data-animal", topics[j]);
  a.text(topics[j])
  $("#animalButtons").append(a);
  }

}


function displayAnimalInfo() {
      var animal = $(this).attr("data-animal");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
         
         console.log(response);
         var results = response.data;

         for (var i = 0; i < results.length; i++) {
         
         var animalDiv = $("<div>");
         var pOne = $("<p>").text("Rating: " + results[i].rating);
         animalDiv.append(pOne);
         var still = results[i].images.fixed_height_still.url;
         var animate = results[i].images.fixed_height.url;

         var image = $("<img>").attr("src", still);
         image.addClass("gif");
         image.attr("data-still", still);
         image.attr("data-animate", animate);
         image.attr("data-state", "still");
         animalDiv.append(image)
         $("#animals").prepend(animalDiv);
        };

      });

  };


  $("#addAnimal").on("click", function(event) {
        event.preventDefault();
        var newAnimal = $("#animal-input").val().trim();
        topics.push(newAnimal);
        renderButtons();
        
      });

$(document).on("click", ".animals", displayAnimalInfo);

renderButtons();

  $(document).on("click", ".gif", function() {
     var state = $(this).attr("data-state");

      if ( state === "still" ) {
         $(this).attr("src",$(this).attr("data-animate"));
         $(this).attr("data-state", "animate");
      }
      else {
         $(this).attr("src",$(this).attr("data-still"));
         $(this).attr("data-state", "still");
         }
  });
