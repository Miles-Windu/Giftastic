$(document).ready(function() {

// create an array for the searched items. Extra items will be added to this Array
var topics = ["Superman", "Spider-Man", "Batman", "Hulk", "Thor", "Wonder Woman", "Captain Planet"];

function displayGifInfo() {

    
    var character = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character +  "&limit=10&offset=20&rating=pg-13&lang=en&api_key=tLC4vRAdAP5U3nGNQwHWGOhTWPo1mxDH&";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        // display the object in the console to pull information 
        console.log(response.data);

        // create a loop to go through the 10 objects that the API pulls 
        for (var i = 0; i < response.data.length; i++){

        // store variable for rating called from the API
        var rated = response.data[i].rating;

        // places the rating in a paragraph tag in the #gif div
        $("#gifs").append("Rating: " + rated); 

        var gifURL = response.data[i].images.original.url; 
        
        var gif = $("<img class='img-thumbnail mb-2' style='height: 300px; width: 300px'>").attr("src", gifURL);
        $("#gifs").append(gif);
        }
        
        
    });
}

function renderButtons() {

    // Deleting the gifs prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#fiction").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {
      // Then dynamicaly generating buttons for each movie in the array
      var a = $("<button>");
      // Adding a class of movie-btn to our button
      a.addClass("btn btn-info gif-btn mr-2 mt-1 mb-1");
      // Adding a data-attribute
      a.attr("data-name", topics[i]);
      // Providing the initial button text
      a.text(topics[i]);
      // Adding the button to the fiction container 
      $("#fiction").append(a);
    }

}
// This function grabs the information in the text field and adds it to the Array "topics"
$("#btn-mkr").on("click", function(event){
    event.preventDefault();
    
        // grabs the value from the textfield 
    var characters = $("#srch-field").val().trim(); 
    
        // pushes that into the array "topics"
    topics.push(characters); 
    
    $("#srch-field").val(); 

    console.log(topics);

    renderButtons(); 
})

// // Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".gif-btn", displayGifInfo);

// // Calling the renderButtons function to display the intial buttons
renderButtons();

})
