// create an array for the searched items. Extra items will be added to this Array
var topics = ["Superman", "Spider-Man", "Batman", "Zelda", "Link", "Goku", "Yoshi", "Pikachu"];

function displayGifInfo() {

    var character = $(this).attr("data-name");
    var queryURL = "https://developers.giphy.com/docs/" + character + "apikey=tLC4vRAdAP5U3nGNQwHWGOhTWPo1mxDH";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Creating a div to hold the movie
      var gifDiv = $("<div class='gif'>");

      // Storing the rating data
      var rating = response.Rated;

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);

      // Displaying the rating
      gifDiv.append(pOne);

      // Retrieving the URL for the image
      var imgURL = response.Poster;

      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

      // Appending the image
      movieDiv.append(image);

      // Putting the entire movie above the previous movies
      $("#gifs").prepend(movieDiv);
    });
}

function renderButtons() {

    // Deleting the gifs prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#fiction").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {
      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of movie-btn to our button
      a.addClass("btn-info");
      // Adding a data-attribute
      a.attr("data-name", topics[i]);
      // Providing the initial button text
      a.text(topics[i]);
      // Adding the button to the buttons-view div
      $("#fiction").append(a);
    }

// This function grabs the information in the text field and adds it to the Array "topics"
$("#submit").on("click", function(event){
event.preventDefault();

    // grabs the value from the textfield 
var characters = $("#srch-field").val().trim(); 

    // pushes that into the array "topics"
characters.push(topics); 

renderButtons(); 

})

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".btn-info", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

}
