//JavaScript file
$(document).ready(function() {
              //event listeners  
                /*global $*/
                $("button").on("click", gradeQuiz); 
                    
                //functions  
                
                //Question 5 images
                $(".q5Choice").on("click", function() {
                    $(".q5Choice").css("background", "");
                    $(this).css("background", "rgb(255 , 255 , 0)");
                });
                
                //Question 8 images
                $(".q8Choice").on("click", function() {
                    $(".q8Choice").css("background", "");
                    $(this).css("background", "rgb(255 , 255 , 0)");
                });
                
                displayQ4Choices();
                
                function displayQ4Choices() {
                    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
                    
                    for (let i=0; i < q4ChoicesArray.length; i++) {
                        $("#q4Choices").append(` <input type="radio" name="q4" id="${q4ChoicesArray[i]}"
                        value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${
                            q4ChoicesArray[i]}</label>`);
                        
                    }
                }
                
                function isFormValid() { 
                    let isValid = true;
                    if ($("#q1").val() == "") {
                        isValid = false;
                        $("#validationFdbk").html("Question 1 was not answered");
                    }
                    return isValid;
                }
                /*global score*/
                function rightAnswer(index) {
                    $(`#q${index}Feedback`).html("Correct!");
                    $(`#q${index}Feedback`).attr("class", "bg-success text-white");
                    $(`#markImg${index}`).html("<img src = 'img/checkmark.png'>");
                    score += 20;
                }
                
                function wrongAnswer(index) {
                    $(`#q${index}Feedback`).html("Incorrect!");
                    $(`#q${index}Feedback`).attr("class", 'bg-warning text-white');
                    $(`#markImg${index}`).html("<img src = 'img/xmark.png' alt = 'xmark'>");
                }
                
                function smallAnswer(index) {
                    $(`#q${index}Feedback`).html("Correct!");
                    $(`#q${index}Feedback`).attr("class", "bg-success text-white");
                    $(`#markImg${index}`).html("<img src = 'img/checkmark.png'>");
                    score += 12.5;
                }
                
                
                function gradeQuiz() {
                    
                    $("#validationFdbk").html(""); //resets validation feedback
                    
                    
                if (!isFormValid()) {
                    return
                }
                //variables
                score = 0;
                let q1Response = $("#q1").val().toLowerCase();
                let q2Response = $("#q2").val();
                let q4Response = $("input[name=q4]:checked").val();
                let q6Response = $("#q6").val();
                let q7Response = $("#q7").val();
               
                
                //Question 1
                if(q1Response == "sacramento") {
                    rightAnswer(1);
                }else {
                    wrongAnswer(1);
                }
                
                //Question 2 
               if(q2Response == "mo") {
                   rightAnswer(2);
               }else {
                   wrongAnswer(2);
               }
               
               //Question 3 
               if ($("#Jefferson").is(":checked") && $("#Roosevelt").is(":checked")
                     && !$("#Jackson").is(":checked")&& !$("#Franklin").is(":checked")) {
                         rightAnswer(3);
                     }else {
                         wrongAnswer(3);
                     }
                     
                //Question 4
                if(q4Response == "Rhode Island") {
                    rightAnswer(4);
                }else {
                    wrongAnswer(4);
                }
                
                //Question 5
                if ($("#seal2").css("background-color") == "rgb(255, 255, 0)") {
                    rightAnswer(5);
                } 
                else {
                    wrongAnswer(5);
                }
                
                //Question 6
                if(q6Response == "1861") {
                    smallAnswer(6);
                }else {
                    wrongAnswer(6);
                }
                
                //Question 7 
               if(q7Response == "wa") {
                   smallAnswer(7);
               }else {
                   wrongAnswer(7);
               }
               
               //Question 8
                if ($("#flag1").css("background-color") == "rgb(255, 255, 0)") {
                    smallAnswer(8);
                } 
                else {
                    wrongAnswer(8);
                }
                
                // TOTAL SCORE 
                if (score >= 80) {
                 $("#totalScore").html(`Total Score: ${score}`).css("color", "green");
                 if (score === 137.5) {
                $("#winner").html("Congratulations on a perfect score!").css("color", "green").css("border", "2px solid black"); 
                   }
                     }
                else {
                 $("#totalScore").html(`Total Score: ${score}`).css("color", "red");
                     }
                     }   
                
        
 }); //ready
            
            