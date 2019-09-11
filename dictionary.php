<?php
    $baseURL = "https://od-api.oxforddictionaries.com/api/v2/entries/";
    $app_id = "1111111";
    $app_key = "11111111111111";
    $lang = "en-us";
    $word_id = "";

    if (isset($_POST['word-id']))
    {
      $word_id = $_POST['word-id'];
    }

    // Initiate curl
    $ch = curl_init($baseURL . $lang . '/'. $word_id . '?' . 'fields=definitions,examples,pronunciations&strictMatch=false');
    
    //Will return the response, if false it prints the response
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FAILONERROR,true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
      "app_id: $app_id",
      "app_key: $app_key" 
    ));

    $response = curl_exec($ch);

    if ($response)
    {
      echo (json_encode($response));
    }
    else 
    {
      return false;
    }
    curl_close($ch);
?>
