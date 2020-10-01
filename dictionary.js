$(function() {

  var searchBar = $("#search-bar");
  var searchBtn = $("#search-btn");

  searchBar.focus();

  searchBtn.click(function() {
    var wordContainer = $('#word-container');
    var definitionWrapper = $("#definition-wrapper");
    
    $.ajax({
      dataType: 'json',
      data: {'word-id': searchBar.val()},
      url: 'dictionary.php',
      type: 'POST',
      success: function(data) {
        data = JSON.parse(data);
        var pronunciation = data.results[0].lexicalEntries[0].entries[0].pronunciations[1].audioFile; 
        
        /* Accurately travesing the JSON result 
          depends on whether or not there is more
          than 1 part of speech for the given word */
        var numOfPartsOfSpeech = data.results[0].lexicalEntries.length;

        $('#word').html(data['results'][0].id);
        $('#pronunciation').show();
        $('#audio').attr('src', pronunciation);
        wordContainer.show();

        definitionWrapper.empty();

        // Once the number of parts of speech is determined, append all parts of speech and definitions
        if (numOfPartsOfSpeech == 1)
        {
          for (i = 0; i < data.results[0].lexicalEntries[0].entries[0].senses.length; i++)
          {
            var definitionContainer = $("<div ></div>").addClass('definition-container');
            var partOfSpeech = $('<h3>' + data.results[0].lexicalEntries[0].lexicalCategory + '</h3>').appendTo(definitionContainer).addClass('part-of-speech');
            var definition   = $('<p>'  + data.results[0].lexicalEntries[0].entries[0].senses[i].definitions + '</p>').appendTo(definitionContainer).addClass('definition');
            definitionWrapper.append(definitionContainer);
          }
        }
        else
        {
          for (i = 0; i < numOfPartsOfSpeech; i++)
          {
            var definitionContainer = $("<div ></div>").addClass('definition-container');
            var partOfSpeech = $('<h3>' + data.results[0].lexicalEntries[i].lexicalCategory.id + '</h3>').appendTo(definitionContainer).addClass('part-of-speech');
            var definition   = $('<p>'  + data.results[0].lexicalEntries[i].entries[0].senses[0].definitions + '</p>').appendTo(definitionContainer).addClass('definition');
            definitionWrapper.append(definitionContainer);
          }
        }

        $("#pronunciation").on("click", function() {
          document.getElementById("audio").play();
        });
      },
      error: function() {
        wordContainer.show();
        definitionWrapper.empty();

        $('#pronunciation').hide();
        // Display error message
        $("#word").html("Nothing Found!");

        searchBar.focus();
        searchBar.val("");
      }
  });
 });
});

