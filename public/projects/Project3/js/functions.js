//JavaScript 
//in order to get zipcode from API
let zipcode;
//in order to create string for URL
let searchString = "";

//Event Listener
//used to use the search button to "click" and then provide the information
$("#search-button").on("click", function() {
    
    zipcode = $("#zip").val();
    searchString ="zip=" + zipcode +",us" + "&units=imperial" + "&appid=fb8e12000f5651c6d9423b4e36a6fb5e";
    
    searchForZipcode(); //will be used to call the function down below
    
})
            // AJAX code to search for Zipcode and then city
            function searchForZipcode() {
                
                $.ajax({
                    
                      method: "GET", 
                         url: "https://api.openweathermap.org/data/2.5/weather?" + searchString, 
                    dataType: "json", 
                     success: function(result,status) {
                         {
                             let weather1 = result.weather[0].description;
                             //^^ used to get the weather description ...parameters
                             let name1 = result.name;
                             //^^ used to get the name of the city
                             let tempt = Math.round(result.main.temp);
                             //^^ used to 1) Round Temperature
                             let temp2 = Math.round(result.main.temp_max);
                             //used to get the max temperature
                             
                             //$("#weather").append(`<br>${weather1}<br>${name1}<br>${temp2}&deg;F<br${tempt}&deg;F`);> <<< Prototype
                             $("#weather").append(`<br>Description: ${weather1}`)
                             
                             $("#weather").append(`<br>City Name: ${name1}`)
                             
                             $("#weather").append(`<br>Current Temperature: ${tempt}&deg;F`)
                             
                             $("#weather").append(`<br>Maximum Temperature: ${temp2}&deg;F`)
                            
                            
                   }
                   
                             
                    }
                }); // ajax
            
            }