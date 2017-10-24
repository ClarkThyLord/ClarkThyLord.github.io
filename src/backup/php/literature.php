<?php

// Response object that will be sent back
$response = array("status" => "unknown", "reason" => "initial response", "extra" => array("querry" => $_GET));

$directory = scandir("../assets/literature/");

$GLOBALS["response"]["extra"]["files"] = $directory;

$html = "";
foreach ($directory as $file){
    
    // If it's a real file do the following
    if ($file != "." && $file != ".."){
        
        $html .= '<iframe class="sub-sub-content selectable image" style="text-align: center; min-height: 500px;" onclick="location.href = `./assets/literature/' . $file . '`" src="./assets/literature/' . $file . '" type="application/pdf"> No Support For Viewing; Click To Download! </iframe>';
        
    }
    
}

$GLOBALS["response"]["extra"]["html"] = $html;

$GLOBALS["response"]["status"] = "done";
$GLOBALS["response"]["reason"] = "html has been setup";
echo json_encode($GLOBALS["response"]);

?>