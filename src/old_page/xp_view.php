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

//**********************************************************GET VARIABLES

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
////database variables
//$servername = "localhost";
//$username = "root";
//$password = "";
//$database = "xp_registry";
////server database varibales
//$username = "id528170_clarck71";
//$password = "propose";
//$database = "id528170_xp_registry";
    
//set table to select from
$table = $_GET["table"];
if($table == "registries"){
    
    $dbtable = "players";
    
}else if($table == "updates"){
    
    $dbtable = "xp_1";
    
}else{   die("Something went wrong while trying to select a table! TABLE: $table");}
    
//if($table == "registries"){   $sql .= " ORDER BY Txp DESC";}
//else if($table == "updates"){   $sql .= " ORDER BY xp DESC";}


//get key
$type = $_GET["type"];

$con = mysqli_connect( $servername, $username, $password, $database);
//check if connection is true
if (!$con) {
    die('Could not connect: ' . mysqli_error( $con));
}

//if($key == "*"){
//    
//    //get everything
//    mysqli_select_db( $con, $dbtable);
//    $sql = "SELECT * FROM `$dbtable`";
//    $result = mysqli_query( $con, $sql);
//    
//}else{
//    
//    //get everything with the key for player
//    mysqli_select_db( $con, $dbtable);
//    $sql = "SELECT * FROM `$dbtable` WHERE player = '" . $key . "'" ;
//    $result = mysqli_query( $con, $sql);
//}

    
//check what type of fetch is it
if($type == "all"){
    
    //mysqli_select_db($con, $dbtable);
    $sql = "SELECT * FROM `$dbtable`";
    
    if($table == "registries"){   $sql .= " ORDER BY Txp DESC";}
    else if($table == "updates"){   $sql .= " ORDER BY xp DESC";}
    
    $result = mysqli_query( $con, $sql);
    
}else if($type == "recent"){
    
    $day = $_GET["day"];
    $month = $_GET["month"];
    $year = $_GET["year"];
    
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
    
    $sql = "SELECT * FROM $dbtable WHERE day = '$day' && month = '$month' && year = '$year'";
    
    if($table == "registries"){   $sql .= " AND status != 'out'";}
    
    if($table == "registries"){   $sql .= " ORDER BY Txp DESC";}
    else if($table == "updates"){   $sql .= " ORDER BY xp DESC";}
    
    $result = mysqli_query( $con, $sql);
    
}else if($type == "name"){
    
    $name = $_GET["name"];
    
    //mysqli_select_db($con, $dbtable);
    $sql = "SELECT * FROM `$dbtable` WHERE player = '" . $name . "'";
    
    if($table == "registries"){   $sql .= " ORDER BY Txp DESC";}
    else if($table == "updates"){   $sql .= " ORDER BY xp DESC";}
    
    $result = mysqli_query( $con, $sql);
    
}else if($type == "date"){
    
    $day = $_GET["day"];
    $month = $_GET["month"];
    $year = $_GET["year"];
    
    //make the query
    $string = "SELECT * FROM `$dbtable` WHERE";
    if($day != 0){   $string .= " day = " . $day;}
    if($month != 0){   if($day != 0){   $string .= " &&";}   $string .= " month = " . $month;}
    if($year != 0){   if($day != 0 || $month != 0){   $string .= " &&";}   $string .= " year = " . $year;}
    
    //echo $string;
    
    //run the query
    //mysqli_select_db($con, $dbtable);
    $sql = $string;
    
    if($table == "registries"){   $sql .= " ORDER BY Txp DESC";}
    else if($table == "updates"){   $sql .= " ORDER BY xp DESC";}
    
    $result = mysqli_query( $con, $sql);
    
    
}else if($type == "status"){
    
    $status = $_GET["status"];
    
    //mysqli_select_db($con, $dbtable);
    $sql = "SELECT * FROM `$dbtable` WHERE status = '" . $status . "'";

    if($table == "registries"){   $sql .= " ORDER BY Txp DESC";}
    else if($table == "updates"){   $sql .= " ORDER BY xp DESC";}
    
    $result = mysqli_query( $con, $sql);
    
}else{
    
    die("Something went wrong in PHP! TYPE: " + $type);
    
}


//catch query error
if (!$result) {
printf("Error: %s\n", mysqli_error($con));
exit();
}

//make and send the table
if($table == "registries"){
    
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
        echo "</tr>";
        
    }
    echo "</table>";
    
}else if($table == "updates"){

    echo "<table>
    <tr>
    <th>Player</th>
    <th>Xp</th>
    <th>Status</th>
    </tr>";
    while($row = mysqli_fetch_array($result)){
        echo "<tr>";
        echo "<td>" . $row['player'] . "</td>";
        echo "<td>" . $row['xp'] . "</td>";
        echo "<td>" . $row['status'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
    
}else{   die("Something went wrong while trying to create the table!");}
    
    
//close the connection
mysqli_close( $con);

?>
    
</body>
</html>