<!doptype html>
<html>
<head>
    
<style>
    
    table {
    width: 100%;
    border-collapse: collapse;
    }

    table, td, th {
        border: 1px solid black;
        padding: 5px;
    }

    th {text-align: left;}
    
</style>
    
</head>
<body>
    
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

//**********************************************************CHECK THE TYPE
$type = $_GET["type"];

//die($type);

if($type == "suggestions"){//**********************************************************SUGGESTIONS
    
    //VARIABLES
    $array_one = array();
    $array_two = array();
    $array_three = array();

    //**********************************************************CONNECT TO DB

    // Create connection
    $con = mysqli_connect($servername, $username, $password, $database);
    // Check connection
    if (!$con) {

        die("Error could not connect to <b>Database</b>: " . mysqli_error($con));

    }

    //**********************************************************FETCH DATES

    //database table to search
    $dbtable = "date";

    //do a query
    $sql = "SELECT * FROM `$dbtable` WHERE `name` = 'date' ";
    $result = mysqli_query($con, $sql);

    //catch query error
    if(!$result){
        
        die("Error while trying to <b>Fetch Dates</b>: " . mysqli_error($con));
        
    }

    //set dates
    $values = mysqli_fetch_assoc($result);

    $day_one = $values["day"];
    $month_one = $values["month"];
    $year_one = $values["year"];

    $day_two = $values["Pday"];
    $month_two = $values["Pmonth"];
    $year_two = $values["Pyear"];

    //die($day_one . $month_one . $year_one . "<br>" . $day_two . $month_two .$year_two);

    //**********************************************************FETCH NAMES

    //NAMES #1 ~ recent updates
    //database table to search
    $dbtable = "xp_1";

    //do a query
    $sql = "SELECT * FROM `$dbtable` WHERE `type` != 'status' &&  `type` != 'mark' && `day` = $day_one && `month` = $month_one && `year` = $year_one";
    $result = mysqli_query($con, $sql);

    //catch query error
    if(!$result){

        die("Error while trying to <b>Fetch First Set Of Names</b>: " . mysqli_error($con));

    }

    //make the first array code
    while($row = mysqli_fetch_array($result)){

        //    echo '<option value="' . $row['player'] . '">';
        if(!in_array($row["player"], $array_one)){//check that it isn't in the array already

            $array_one[] = $row["player"];

        }


    }

//    $string = "";
//
//    foreach($array_one as $n){
//
//        $string .= $n;
//
//    }
//
//    die($string);

    //NAMES #2 ~ past updates
    //database table to search
    $dbtable = "xp_1";

    //do a query
    $sql = "SELECT * FROM `$dbtable` WHERE `type` != 'status' &&  `type` != 'mark' &&  `type` != 'mark' && `day` = $day_two && `month` = $month_two && `year` = $year_two";
    $result = mysqli_query($con, $sql);

    //catch query error
    if(!$result){

        die("Error while trying to <b>Fetch Second Set Of Names</b>: " . mysqli_error($con));

    }

    //make the first array code
    while($row = mysqli_fetch_array($result)){

        //echo '<option value="' . $row['player'] . '">';
        if(!in_array($row["player"], $array_two)){//check that it isn't in the array already

            $array_two[] = $row["player"];

        }

    }

//    $string .= "<hr>";
//
//    foreach($array_two as $n){
//
//        $string .= $n;
//
//    }
//
//    $string .=  "<hr>" . $day_one . " | " . $month_one . " | " . $year_one . "<br>" . $day_two . " | " . $month_two . " | " . $year_two;
//    echo $string;
//    die($string);

    //FINAL LIST OF NAMES #3 ~ final
    foreach($array_two as $n){

        if(!in_array($n, $array_one)){//check what is in the past array that isn't in the recent array

            $array_three[] = $n;

        }

    }

    $string = "";
//
//    foreach($array_three as $n){
//
//        $string .= $n;
//
//    }
//    echo $string;
//
//    echo "<hr>";
//    $string = "";

    foreach($array_three as $n){

        $string .= "<div id='" . $n . "txt'><b>" . $n . ":</b><input type='button' id='" . $n . "' onclick='manage_out(this.id)' value='out'></div>";

    }

    echo $string;
    
}else if($type == "status"){//**********************************************************STATUS

    //VARIABLES
    $day = $_GET["day"];
    $month = $_GET["month"];
    $year = $_GET["year"];
    $player = $_GET["player"];
    $status = $_GET["status"];

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
    $sql = "INSERT INTO `xp_1` ( `type`,`day`, `month`, `year`, `admin`, `player`, `xp`, `status`) VALUES ( 'status','$day', '$month', '$year', '$admin', '$player', '0', '$status')";
    $result = mysqli_query( $con, $sql);

    //catch query error
    if (!$result) {
        printf("Error while trying to add update: %s\n", mysqli_error($con));
        exit();
    }else{

        echo "You've successfully recorded the <b>$status</b> for <b>" .  $player . "</b>!<br>";

    }

    //**********************************************************UPDATE TO TABLE#2

    //table to choose from
    $dbtable = "players";

    //mysqli_select_db($con, $dbtable);
    $sql = "SELECT * FROM `players` WHERE player = '$player' LIMIT 1";
    $result = mysqli_query($con, $sql);
    $exist = mysqli_num_rows($result);

    //catch query error
    if (!$result) {
        printf("Error while trying to check if player exist: %s\n", mysqli_error($con));
        exit();
    }

    //check if that player exist in database #2
    if($exist > 0){//does exist

        $sql = "UPDATE `players` SET `status` = '$status' WHERE player = '$player'";

        //UPDATE
        //mysqli_select_db($con, $dbtable);
        $result = mysqli_query( $con, $sql);

        //catch query error
        if (!$result) {
            printf("Error while trying to update player registry: %s\n", mysqli_error($con));
            exit();
        }

    }else{//doesn't exist

        die("Something went horrible wrong while updating the player, <b>$player</b>!");

    }

    echo "You've successfully changed status of <b>$player</b> to <b>$status</b>!";
    
}else if ($type == "mark"){//**********************************************************MARK
    
    //VARIABLES
    $day = $_GET["day"];
    $month = $_GET["month"];
    $year = $_GET["year"];
    $player = $_GET["player"];
    $operation = $_GET["operation"];
    $mark = $_GET["mark"];

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
    $sql = "INSERT INTO `$dbtable` ( `type`,`day`, `month`, `year`, `admin`, `player`, `xp`, `status`) VALUES ( 'mark','$day', '$month', '$year', '$admin', '$player', '0', '')";
    $result = mysqli_query( $con, $sql);

    //catch query error
    if (!$result) {
        printf("Error while trying to add update: %s\n", mysqli_error($con));
        exit();
    }else{

        echo "You've successfully recorded the <b>$operation</b> of <b>$mark</b> for <b>" .  $player . "</b>!<br>";

    }

    //**********************************************************UPDATE TO TABLE#2

    //table to choose from
    $dbtable = "players";

    //mysqli_select_db($con, $dbtable);
    $sql = "SELECT * FROM `$dbtable` WHERE player = '$player' LIMIT 1";
    $result = mysqli_query($con, $sql);
    $exist = mysqli_num_rows($result);

    //catch query error
    if (!$result) {
        printf("Error while trying to check if player exist: %s\n", mysqli_error($con));
        exit();
    }

    //check if that player exist in database #2
    if($exist > 0){//does exist
        
        $values = mysqli_fetch_assoc($result);
        $marks = $values["mark"];
        $O = $values["O"];
        $X = $values["X"];

        //$sql = "UPDATE `players` SET `status` = '$status' WHERE player = '$player'";
        $sql = "UPDATE `players` SET";
        
        if($operation == "subtract"){
            
            //$sql .= " ";
            if($mark == "cross"){
                
                $X -= 1;
                
                if($X < 0){
                    
                    die("Can't remove any more <b>$mark</b> from <b>$player</b>!");
                    
                }
                
                $sql .= " `X` = $X";

            }
            else if($mark == "circle"){
                
                $O -= 1;
                
                if($O < 0){
                    
                    die("Can't remove any more <b>$mark</b> from <b>$player</b>!");
                    
                }
                
                $sql .= " ,`O` = $O";

            }
            else if($mark == "point"){
                
                $marks -= 1;
                
                $sql .= " ,`mark` = $marks";

            }
            
        }
        if($operation == "add"){
            
            //$sql .= " ";
            if($mark == "cross"){
                
                $X += 1;

                $sql .= " `X` = $X";

            }
            else if($mark == "circle"){
                
                $O += 1;
                
                $sql .= " ,`O` = $O";

            }
            else if($mark == "point"){
                
                $marks += 1;
                
                $sql .= " ,`mark` = $marks";

            }
            
        }
            
        $sql .= " WHERE player = '$player'";
        
        //die($sql);
        
        //UPDATE
        //mysqli_select_db($con, $dbtable);
        $result = mysqli_query( $con, $sql);

        //catch query error
        if (!$result) {
            printf("Error while trying to update player registry: %s\n", mysqli_error($con));
            exit();
        }

    }else{//doesn't exist

        die("Something went horrible wrong while updating the player, <b>$player</b>!");

    }

    echo "You've successfully registered <b>$operation</b> of <b>$player</b> to <b>$mark</b>!";
    
}else if ($type == "table"){//**********************************************************TABLE
    
    //table to choose
    $dbtable = "players";

    //**********************************************************CONNECT TO DB

    // Create connection
    $con = mysqli_connect($servername, $username, $password, $database);
    // Check connection
    if (!$con) {
        die('Could not connect: ' . mysqli_error($con));
    }
    
    //mysqli_select_db($con, $dbtable);
    $sql = "SELECT * FROM `date` WHERE name = 'date'";
    $result = mysqli_query( $con, $sql);

    //catch query error
    if (!$result) {
        printf("Error while trying to get date: %s\n", mysqli_error($con));
        exit();
    }
    
    $values = mysqli_fetch_assoc($result);
    $day = $values["day"];
    $month = $values["month"];
    $year = $values["year"];
    
    $dbtable = "players";
    
    $sql = "SELECT * FROM `$dbtable` WHERE `day` = '$day' && `month` = '$month' && `year` = '$year' AND `status` != 'out' ORDER BY Txp DESC";
    
    $result = mysqli_query( $con, $sql);
    
    //make the table
    $n = 0;
    
    echo "<table>
    <tr>
    <th>Position</th>
    <th>Player</th>
    <th>Total xp</th>
    <th>Xp Gain</th>
    <th>Status</th>
    <th>X</th>
    <th>O</th>
    <th>Marks</th>
    </tr>";
    while($row = mysqli_fetch_array($result)){
        
        $n += 1;
        
        echo "<tr>";
        echo "<td>" . $n . "</td>";
        echo "<td>" . $row['player'] . "</td>";
        echo "<td>" . $row['Txp'] . "</td>";
        echo "<td>" . $row['Gxp'] . "</td>";
        echo "<td>" . $row['status'] . "</td>";
        echo "<td>" . $row['X'] . "</td>";
        echo "<td>" . $row['O'] . "</td>";
        echo "<td>" . $row['mark'] . "</td>";
        echo "</tr>";
        
    }
    echo "</table>";
    
}else{
    
    die("Something went horribly wrong while trying to <b>setup</b>!");
    
}

////**********************************************************CONNECT TO DB
//
//// Create connection
//$con = mysqli_connect($servername, $username, $password, $database);
//// Check connection
//if (!$con) {
//    
//    die("Error could not connect to <b>Database</b>: " . mysqli_error($con));
//    
//}
//
////**********************************************************FETCH DATA
//
////do a query
//$sql = "";
//$result = mysqli_query($con, $sql);
//
////catch query error
//if(!$result){
//    
//    die("Error while trying to <b>Fetch Data</b>: " . mysqli_error($con));
//    
//}
//
////make the first array code
//while($row = mysqli_fetch_array($result)){
//    
////    echo '<option value="' . $row['player'] . '">';
//    $array_one[] = $row["player"];
//    
//    
//}
//
//die($array_one);

//kill the Database connection
mysqli_close($con);

?>
    
</body>
</html>