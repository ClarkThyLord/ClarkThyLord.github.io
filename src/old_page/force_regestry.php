<?php

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

//input variables
$key = $_GET["key"];
$day = $_GET["day"];
$month = $_GET["month"];
$year = $_GET["year"];
$admin = $_GET["admin"];
$player = $_GET["player"];
$xp = $_GET["xp"];
$status = $_GET["status"];

//**********************************************************CHECK THE KEY
//VARIABLES
$admin = $_GET["admin"];
$key = $_GET["key"];

$notice = "";
if($admin == "ClarkthyLord" || $admin == "AmethystCrow" || $admin == "faecream" || $admin == "Arablast" || $admin == "onebozo4u"){
    
    
    
}else{  $notice = "You aren't an <b>admin</b>!";}
if($key != "water"){
    
    $notice = "That isn't the <b>key</b>!";
    
}
if($notice != ""){
    
    die($notice);
    
}

//**********************************************************CONNECT TO DB

// Create connection
$con = mysqli_connect($servername, $username, $password, $database);
// Check connection
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

//**********************************************************ADD TO TABLE#1

//table to choose from
$dbtable = "xp_1";

//mysqli_select_db($con, $dbtable);
$sql = "INSERT INTO `xp_1` ( `type`,`day`, `month`, `year`, `admin`, `player`, `xp`, `status`) VALUES ( 'force','$day', '$month', '$year', '$admin', '$player', '$xp', '$status')";
$result = mysqli_query( $con, $sql);

//catch query error
if (!$result) {
    printf("Error while trying to add update: %s\n", mysqli_error($con));
    exit();
}else{
    
    echo "You've successfully recorded the xp for <b>" .  $player . "</b>!<br>";
    
}

//**********************************************************ADD TO TABLE#2

//table to choose from
$dbtable = "players";

//mysqli_select_db($con, $dbtable);
$sql = "SELECT * FROM `players` WHERE player = '$player' LIMIT 1";
$result = mysqli_query( $con, $sql);
$exist = mysqli_num_rows($result);

//catch query error
if (!$result) {
    printf("Error while trying to check if player exist: %s\n", mysqli_error($con));
    exit();
}

//check if that player exist in database #2
if($exist > 0){//does exist
    
    $values = mysqli_fetch_assoc($result);

//    check xp
//    die("XP for $player: " . $values["xp"]);
//    
    //subtract
    //$gxp = $xp - $values["Txp"];
//    
//    if($gxp < 0){
//        
//        die("<b>This players registry cannot be updated because the xp subtracted to last registry xp is less then 0! GXP: $gxp</b><hr><div id='force_info'></div><b>If the GXP shows a huge number don't force!</b><input type='button' onclick='force_update()' value='force update' id='force'>");
//        
//    }else{
        
    $sql = "UPDATE `players` SET `day` = $day, `month` = $month, `year` = $year, `Txp` = $xp, `Gxp` = 0";

    if($status != "NULL"){   $sql .= ", `status` = '$status'";}

    $sql .= " WHERE player = '$player'";

    //UPDATE
    //mysqli_select_db($con, $dbtable);
    $result = mysqli_query( $con, $sql);

    //catch query error
    if (!$result) {
        printf("Error while trying to update player registry: %s\n", mysqli_error($con));
        exit();
    }
        
//    }
    
}else{//doesn't exist
    
    if($status == "NULL"){   $status = "active";}
    
    //ADD
    //mysqli_select_db($con, $dbtable);
    $sql = "INSERT INTO `players` (`day`, `month`, `year`, `player`, `Txp`, `Gxp`, `status`, `X`, `O`, `mark`) VALUES ('$day', '$month', '$year', '$player', '$xp', '$xp', '$status', '0', '0', '0');";
    $result = mysqli_query( $con, $sql);
    
    //catch query error
    if (!$result) {
        printf("Error while trying to add player registry: %s\n", mysqli_error($con));
        exit();
    }
    
}

echo "You've successfully added to registry for <b>" .  $player . "</b>!";

//close DB connection
$con->close();

?>