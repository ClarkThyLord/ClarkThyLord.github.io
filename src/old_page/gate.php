<?php

//variables
$page = $_GET["page"];
$key = $_GET["key"];

if($page == "guild_manager" && $key == "coco"){
    
    echo '<b>ACCESS GRANTED...<br> LINK ~ <a href="guild_manager.html">Guild Manager</a></b>';
    
   // header("Location: xp_registry.html");
    
    exit;
    
}else{
    
    echo "<b>ACCESS DENIED</b>";
    
}

?>