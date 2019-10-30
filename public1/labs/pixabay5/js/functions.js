
//JavaScript
//Variables

let keyword;
let orientation;
let searchString = "";

$("#search-button").on("click", function() {
    keyword = $("#keyword").val();
    orientation = $("#orientation").val();
    searchString ="q=" + keyword + "&orientation=" + orientation + "&image_type=vector";
    searchForImages();
})

            function searchForImages() {
            $.ajax({
                   method: "GET",
                      url: "https://pixabay.com/api/?key=13831354-d4a3a65cf672bdaceb3d354f1&" + searchString,
                 dataType: "json",
                  success: function(result, status) {
                   for (let i = 0; i < 4; i++) {
                       $("#likes").append(`Likes: ${result.hits[i].likes} &emsp;&emsp;&emsp;&emsp; &emsp;&emsp;`);
                       $("#pictures").append( `<img src="${result.hits[i].largeImageURL}"
                       alt="picture" width="${result.hits[i].previewWidth}" height="${result.hits[i].previewHeight}"> `);
                   }
               }
               });
            
        }
        