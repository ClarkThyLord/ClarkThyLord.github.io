<?php

//SERVER KEYS
$SERVER = 1;

if($SERVER == 0){
    
    //local database variables
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "xp_registry";
    
}else if($SERVER == 1){
    
    //server database variables
    $servername = "localhost";
    $username = "id528170_clarck71";
    $password = "propose";
    $database = "id528170_xp_registry";
    
}else{
    
    die("<b>!!!SERVER NOT REAL!!!</b>");
    
}

//create connection
$con = mysqli_connect($servername, $username, $password, $database);
//check connection
if (!$con) {   die("DB");}

//table to choose from
$dbtable = "players";

//fetch names
$sql = "SELECT * FROM `$dbtable` WHERE 1";
$result = mysqli_query($con, $sql);

//catch query error
if (!$result) {   die("Q");}

//send names
//while($row = mysqli_fetch_array($result)){
//    
//    echo $row['player'] . ",";
//    
//}

//send the datalist
echo "<br><input type='text' list='names' id='player'><datalist id='names'>";
while($row = mysqli_fetch_array($result)){
    
    echo '<option value="' . $row['player'] . '">';
    
}
echo "</datalist>";

//kill the Database connection
mysqli_close($con);

?>