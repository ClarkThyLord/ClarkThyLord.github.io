<?php

// Response object that will be sent back
$response = array("status" => "unknown", "reason" => "initial response", "extra" => array("querry" => $_GET));

$directory = scandir("../assets/art/");

$GLOBALS["response"]["extra"]["files"] = $directory;

$html = "";
foreach ($directory as $file){
    
    // If it's a real file do the following
    if ($file != "." && $file != ".."){
        
        $html .= '<div class="sub-sub-content selectable" style="text-align: center;" onclick="location.href = `'  . ('./assets/art/' . $file) . '`"><img class="image" src="' . ('./assets/art/' . $file) . '"><hr><span class="title">' . explode(".", $file)[0] . '</span></div>';
        
    }
    
}

$GLOBALS["response"]["extra"]["html"] = $html;

$GLOBALS["response"]["status"] = "done";
$GLOBALS["response"]["reason"] = "html has been setup";
echo json_encode($GLOBALS["response"]);

?>