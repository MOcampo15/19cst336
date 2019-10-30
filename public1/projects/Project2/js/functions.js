//Javascript File
//ID = #fallpersonalityquiz
//event listener
$("#fallpersonalityquiz").submit(function(event) {
    event.preventDefault();
    
    var answers = $(this).serializeArray();

    
    //count how many times a user picked answers
    var scores = {
        bubbly: 0,
        
        relaxed: 0,
        
        adventurous: 0,
    };
    
    for(var answer of answers){
        scores[answer.value] += 1;
    }
    //default response and if the answers 
    //are bigger than the default then it is the new dessert
    var maxDessert = "relaxed";
    
    for(var dessert in scores){
        if(scores[dessert] > scores[maxDessert]){
            maxDessert = dessert;
        }
    }
    
    for(var dessert in scores) {
        if(scores[dessert] > scores[maxDessert]) {
            maxDessert = dessert;
        }
    }
    
    for(var dessert in scores) {
        if(scores[dessert] > scores[maxDessert]) {
            maxDessert = dessert;
        }
    }
    
    //used to stop displaying the quiz in order
    //to show what the correct answer should be
    $("#fallpersonalityquiz").css('display', 'none');
    
    //used to show the result to the user based on their response
    $(".result#"+maxDessert).css('display', 'block');
    
    
});