window.onload = function(){
    
    mode();
    
}

function mode(){
    
    var selected = document.getElementById("type");
    var type = selected.options[selected.selectedIndex].value;
    
    if(type == "xp_registry"){
        
        var code = "<h2>Instructions</h2><p><b>IGN of the player you're recording, case sensitive, then input the necessary information.</b></p><br><i>The players in game name case sensitive</i><br><b>Players IGN:</b>";
        
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function(){
            
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                
                if(xmlhttp.responseText == "DB" || xmlhttp.responseText == "Q"){
                    
                    document.getElementById("content").innerHTML = "Something went wrong while trying to fetch data! CODE: " + xmlhttp.responseText + "<hr>";
                    
                    document.getElementById("content").innerHTML += "<h2>Instructions</h2><p>IGN of the player you're recording, case sensitive, then input the necessary information.</p><br><i>The players in game name case sensitive</i><br><b>Players IGN:</b>  <input type='text' id='player'><br><i>XP shown at the moment</i><br><b>Current XP:</b>   <input type='text' id='xp'><br><hr><i>Null, if you're not aware of players state. Active, means the players plays regularly.Semi, means the player plays every so often. Inactive, means the player is not playing at the moment.Break, means the player is on vacation. Out, means the player is no longer in the guild.</i><br><b>Status:</b>       <select id='status'>   <option value='null'>Null</option>   <option value='active'>Active</option>   <option value='semi'>Semi</option>   <option value='inactive'>Inactive</option>   <option value='break'>Break</option><option value='out'>Out</option></select><hr>  <input type='button' id='enter' onclick='check()' value='enter'><p id='notice'></p>";
                    
                }else{
                    
                code += xmlhttp.responseText;
                code += "<br><i>XP shown at the moment</i><br><b>Current XP:</b><br>   <input type='text' id='xp'><br><hr><i>Null, if you're not aware of players state. Active, means the players plays regularly.Semi, means the player plays every so often. Inactive, means the player is not playing at the moment.Break, means the player is on vacation. Out, means the player is no longer in the guild.</i><br><b>Status:</b><br>       <select id='status'>   <option value='null'>Null</option>   <option value='active'>Active</option>   <option value='semi'>Semi</option>   <option value='inactive'>Inactive</option>   <option value='break'>Break</option><option value='out'>Out</option></select><hr>   <input type='button' id='enter' onclick='check()' value='enter'><p id='notice'></p>";
                
                document.getElementById("content").innerHTML = code;
                    
                }
                
            }
            
        }
        
        xmlhttp.open("GET", "playerslist.php", true);
        xmlhttp.send();
        
//        document.getElementById("content").innerHTML = "<h2>Instructions</h2><p>Type in your IGN and the IGN of the player you're recording, case sensitive, then input the necessary information.</p><i>Your in game name case sensitive</i><br><b>Your IGN:</b><input type='text' id='admin'><br><i>The players in game name case sensitive</i><br><b>Players IGN:</b>  <input type='text' id='player'><br><i>XP shown at the moment</i><br><b>Current XP:</b>   <input type='text' id='xp'><br><hr><i>Null, if you're not aware of players state. Active, means the players plays regularly.Semi, means the player plays every so often. Inactive, means the player is not playing at the moment.Break, means the player is on vacation. Out, means the player is no longer in the guild.</i><br><b>Status:</b>       <select id='status'>   <option value='null'>Null</option>   <option value='active'>Active</option>   <option value='semi'>Semi</option>   <option value='inactive'>Inactive</option>   <option value='break'>Break</option><option value='out'>Out</option></select><hr><b>Key:</b> <input type='text' id='key'><input type='button' id='enter' onclick='check()' value='enter'><p id='notice'></p>";
        
    }else if(type == "member_managing"){
        
        document.getElementById("content").innerHTML = "<h2>Instructions</h2><p><b>Select how you'd like to manage a player then fill in the required infomation everything is case sensitive.</b></p><b>Manage:</b>  <select id='manage' onchange='manage_type()' autocomplete='off'>    <option value='status'>Status</option>  <option value='marks'>Marks</option></select><hr><div id='content-1'></div>";
        
        manage_type();
        
    }else{
        
        document.getElementById("content").innerHTML = "<b>Something went horribly wrong!</b>";
        
    }
    
}

function manage_type(){
    
    var selected = document.getElementById("manage");
    var type = selected.options[selected.selectedIndex].value;
    
    if(type == "status"){
        
        
        var code = "<h2>Status Manager</h2><b>Manage players status.</b><br><i>The players in game name case sensitive</i><br><b>Players IGN:</b>";
        
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function(){
            
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                
                if(xmlhttp.responseText == "DB" || xmlhttp.responseText == "Q"){
                    
                    document.getElementById("content-1").innerHTML = "Something went wrong while trying to fetch data! CODE: " + xmlhttp.responseText + "<hr>";
                    
                    document.getElementById("content-1").innerHTML += "<br><i>The players in game name case sensitive</i><br><b>Players IGN:</b>  <input type='text' id='player'><br><i>Null, if you're not aware of players state. Active, means the players plays regularly.Semi, means the player plays every so often. Inactive, means the player is not playing at the moment.Break, means the player is on vacation. Out, means the player is no longer in the guild.</i><br><b>Status:</b><br>  <select id='status'>   <option value='null'>Null</option>   <option value='active'>Active</option>   <option value='semi'>Semi</option>   <option value='inactive'>Inactive</option>   <option value='break'>Break</option><option value='out'>Out</option></select><hr>  <input type='button' onclick='manage_status()' id='enter' value='enter'><div id='notice'></div><hr><h2>Suggestions</h2><b>A list of players who might be out of the guild. Double check that the player isn't in the guild! If he isn't then press the, 'out', button next to there name!</b><div id='suggestions'></div>";
                    
                }else{
                    
                    code += xmlhttp.responseText;
                    code += "<br><i>Null, if you're not aware of players state. Active, means the players plays regularly.Semi, means the player plays every so often. Inactive, means the player is not playing at the moment.Break, means the player is on vacation. Out, means the player is no longer in the guild.</i><br><b>Status:</b><br>  <select id='status'>   <option value='null'>Null</option>   <option value='active'>Active</option>   <option value='semi'>Semi</option>   <option value='inactive'>Inactive</option>   <option value='break'>Break</option><option value='out'>Out</option></select><hr>  <input type='button' onclick='manage_status()' id='enter' value='enter'><div id='notice'></div><hr><h2>Suggestions</h2><b>A list of players who might be out of the guild. Double check that the player isn't in the guild! If he isn't then press the, 'out', button next to there name!</b><div id='suggestions'></div>";

                    document.getElementById("content-1").innerHTML = code;
                    
                }
                
            }
            
        }
        
        xmlhttp.open("GET", "playerslist.php", true);
        xmlhttp.send();
        
        
//        document.getElementById("content-1").innerHTML = "<br><i>The players in game name case sensitive</i><br><b>Players IGN:</b>  <input type='text' id='player'><br><i>Null, if you're not aware of players state. Active, means the players plays regularly.Semi, means the player plays every so often. Inactive, means the player is not playing at the moment.Break, means the player is on vacation. Out, means the player is no longer in the guild.</i><br><b>Status:</b>  <select id='status'>   <option value='null'>Null</option>   <option value='active'>Active</option>   <option value='semi'>Semi</option>   <option value='inactive'>Inactive</option>   <option value='break'>Break</option><option value='out'>Out</option></select><hr>  <input type='button' onclick='manage_status()' id='enter' value='enter'><div id='notice'></div><hr><h2>Suggestions</h2><b>A list of players who might be out of the guild. Double check that the player isn't in the guild! If he isn't then press the, 'out', button next to there name!</b><div id='suggestions'></div>";
        
        manage_list();
        
    }else if(type == "marks"){
        
        
        var code = "<h2>Mark Manager</h2><b>Manage players marks.</b><br><i>The players in game name case sensitive</i><br><b>Players IGN:</b>";
        
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function(){
            
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                
                if(xmlhttp.responseText == "DB" || xmlhttp.responseText == "Q"){
                    
                    document.getElementById("content-1").innerHTML = "Something went wrong while trying to fetch data! CODE: " + xmlhttp.responseText + "<hr>";
                    
                    document.getElementById("content-1").innerHTML += "<input type='text' id='player'><br><i>Subtract or add mark</i><br><b>Operation:</b><br><select id='sign'><option value='subtract'>Remove</option><option value='add'>Add</option></select><br><i>Type of mark you would like to use</i><br><b>Mark:</b><br><select id='mark'><option value='cross'>X</option><option value='circle'>O</option><option value='point'>*</option></select><hr><input type='button' onclick='manage_mark()' value='enter'><div id='notice'></div><hr><h2>Table of Recent Regestry</h2><i>Use to guide when marking players.</i><div id='table'></div>";
                    
                }else{
                    
                    code += xmlhttp.responseText;
                    code += "<br><i>Subtract or add mark</i><br><b>Operation:</b><br><select id='sign'><option value='subtract'>Remove</option><option value='add'>Add</option></select><br><i>Type of mark you would like to use</i><br><b>Mark:</b><br><select id='mark'><option value='cross'>X</option><option value='circle'>O</option><option value='point'>+</option></select><hr><input type='button' onclick='manage_mark()' value='enter'><div id='notice'></div><hr><h2>Table of Recent Regestry</h2><i>Use to guide when marking players.</i><div id='table'></div>";

                    document.getElementById("content-1").innerHTML = code;
                    
                }
                
                manage_table();
                
            }
            
        }
        
        xmlhttp.open("GET", "playerslist.php", true);
        xmlhttp.send();
        
        
        
//        document.getElementById("content-1").innerHTML = "<h2>Mark Manager</h2><b>Manage players marks.</b><br><i>The players in game name case sensitive</i><br><b>Name:</b><input type='text' id='name'><br><i>Subtract or add mark</i><br><b>Operation:</b><select id='sign'><option value='subtract'>Remove</option><option value='add'>Add</option></select><br><i>Type of mark you would like to use</i><br><b>Mark:</b><select id='mark'><option value='cross'>X</option><option value='circle'>O</option><option value='add'>+</option><option value='minus'>-</option></select><hr><input type='button' value='enter'><hr><h2><i>Use to guide when marking players.</iTable of Recent Regestry</h2><div id='table'></div>";
        
    }else{
        
        document.getElementById("content").innerHTML = "Something went horrible wrong!";
        
    }
    
    
    
}

function check(){
    
    var player = document.getElementById("player").value;
    var xp = document.getElementById("xp").value;
    var status = document.getElementById("status").options[document.getElementById("status").selectedIndex].value;
    var key = document.getElementById("key").value;
    var notice = "";
    var msg = "";
    var passed = 0;
    
    //check if the string can be a VG players name
    if(player != "" && player.length >= 3){
        //msg += "<b>That's a players name! PLAYER: " + player + " </b><br>"; notice += "That's a players name! ";
        passed += 1;
    }else{   msg += "<b>That isn't a players name! PLAYER: " + player + " </b><br>"; notice += "That isn't a players name! ";}
    
    //check if it's not a number
    if(String(xp) != "" && !(isNaN(xp))){
       //msg += "<b>Good sum of xp! XP: " + xp + " </b><br>"; notice += "Good sum of xp!";
       passed += 1;
    }else{   msg += "<b>That can't be a correct sum of xp! XP: " + xp + " </b><br>"; notice += "That can't be a correct sum of xp! ";}
    
    //if status is null set it as NULL
    if(String(status) == "null"){
        //msg += "<b>STATUS:" + status + " </b><br>";
        status = "NULL";
    }//else{   msg += "<b>STATUS: " + status + " </b><br>";}
    
    //check if a key is entered
    if(String(key) == ""){
        msg += "<b>You need to enter a key! KEY: " + key + "</b><br>"; notice += "You need to enter a key!";
    }else{   
        //msg += "<b>A key in entered! KEY: " + key + "</b><br>"; notice += "A key is entered!"; 
        passed += 1;
    }
    
    //if all the checks passed then tell the user and sumbit the data
    if(passed == 3){
        
        msg = "<b>Everything looks good! It's being submitted...</b>"; notice = "Everything looks good! It's being submitted...";
        document.getElementById("notice").innerHTML = msg;
        document.getElementById("enter").disabled = true;//disable the button
        submit();
        
    }
    
    //if all the checks don't pass tell the user why
    if(passed < 3){
        
        msg = "<b>We weren't able to register the data because:</b><br>" + msg;
        document.getElementById("notice").innerHTML = msg;
        
        alert(notice);
        
    }
    
}

function submit(){
    
    //get info
    var key = document.getElementById("key").value;
    var admin = document.getElementById("admin").value;
    var player = document.getElementById("player").value;
    var xp = document.getElementById("xp").value;
    var status = document.getElementById("status").options[document.getElementById("status").selectedIndex].value;
    
    //date
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function(){
        
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            
            document.getElementById("notice").innerHTML = xmlhttp.responseText;
            
            exist = document.getElementById("force");
            if(exist == null){
                
                //clear the inputs
                document.getElementById("player").value = "";
                document.getElementById("xp").value = "";
                document.getElementById("status").value = "null";
                
            }else{
                
                //"<input id='force-1' type='text' value='' disabled> <input id='force-2' type='text' value='' disabled> <input id='force-3' type='text' value='' disabled> <input id='force-4' type='text' value='' disabled>"
                
                document.getElementById("force_info").innerHTML = "<input id='force-1' type='text' value='' disabled> <input id='force-2' type='text' value='' disabled> <input id='force-3' type='text' value='' disabled> <input id='force-4' type='text' value='' disabled>";
                
                //document.getElementById("force_info").innerHTML = "<input id='force-1' type='text' value='' disabled>";
                document.getElementById("force-1").value = document.getElementById("admin").value;
                
                //document.getElementById("force_info").innerHTML += "<input id='force-2' type='text' value='' disabled>";
                document.getElementById("force-2").value = document.getElementById("player").value;
                
                //document.getElementById("force_info").innerHTML += "<input id='force-3' type='text' value='' disabled>";
                document.getElementById("force-3").value = document.getElementById("xp").value;
                
                //document.getElementById("force_info").innerHTML += "<input id='force-4' type='text' value='' disabled>";
                document.getElementById("force-4").value = document.getElementById("status").value;
                
                document.getElementById("player").value = "";
                document.getElementById("xp").value = "";
                document.getElementById("status").value = "null";
                
            }
            
            //enable the button after everything
            document.getElementById("enter").disabled = false;
            
        }
        
    }
    
    xmlhttp.open("GET", "xp_regestry.php?key=" + key + "&day=" + day + "&month=" + month + "&year=" + year + "&admin=" + admin + "&player=" + player + "&xp=" + xp + "&status=" + status, true);
    xmlhttp.send();
    
}

function force_update(){
    
    document.getElementById("force").disabled = true;
    
    //date
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    //var
    var key = document.getElementById("key").value;
    var admin = document.getElementById("force-1").value;
    var player = document.getElementById("force-2").value;
    var xp = document.getElementById("force-3").value;
    var status = document.getElementById("force-4").value;
    
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function(){
        
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            
            document.getElementById("notice").innerHTML = xmlhttp.responseText;
            
            //clear the inputs
//            document.getElementById("player").value = "";
//            document.getElementById("xp").value = "";
//            document.getElementById("status").value = "null";
            
            //enable the button after everything
            document.getElementById("force").disabled = false;
            
        }
        
    }
    
    xmlhttp.open("GET", "force_regestry.php?key=" + key + "&day=" + day + "&month=" + month + "&year=" + year + "&admin=" + admin + "&player=" + player + "&xp=" + xp + "&status=" + status, true);
    xmlhttp.send();
    
}

function manage_list(){
    
    //date
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    //variables
    var key = document.getElementById("key").value;
    var admin = document.getElementById("admin").value;
    
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function(){
        
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            
            document.getElementById("suggestions").innerHTML = xmlhttp.responseText;
            
        }
        
    }
    
    xmlhttp.open("GET", "player_manager.php?admin=" + admin + "&key=" + key + "&type=suggestions", true);
    xmlhttp.send();
    
}

function manage_out(player){
    
    document.getElementById(player).disabled = true;
    
    //date
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    //variables
    var key = document.getElementById("key").value;
    var admin = document.getElementById("admin").value;
    
    
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function(){
        
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            
            document.getElementById(player + "txt").innerHTML = xmlhttp.responseText;
            
        }
        
    }
    
    xmlhttp.open("GET", "player_manager.php?admin=" + admin + "&key=" + key + "&type=status" + "&day=" + day + "&month=" + month + "&year=" + year + "&player=" + player + "&status=out", true);
    xmlhttp.send();
    
}

function manage_status(){
    
    //date
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    //variables
    var key = document.getElementById("key").value;
    var admin = document.getElementById("admin").value;
    var player = document.getElementById("player").value;
    var status = document.getElementById("status").value;
    
    
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function(){
        
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            
            document.getElementById("notice").innerHTML = xmlhttp.responseText;
            
        }
        
    }
    
    xmlhttp.open("GET", "player_manager.php?admin=" + admin + "&key=" + key + "&type=status" + "&day=" + day + "&month=" + month + "&year=" + year + "&player=" + player + "&status=" + status, true);
    xmlhttp.send();
    
}

function manage_table(){
    
    //variables
    var key = document.getElementById("key").value;
    var admin = document.getElementById("admin").value;
    
    
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function(){
        
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            
            document.getElementById("table").innerHTML = xmlhttp.responseText;
            
        }
        
    }
    
    xmlhttp.open("GET", "player_manager.php?admin=" + admin + "&key=" + key + "&type=table", true);
    xmlhttp.send();
    
}

function manage_mark(){
    
    //date
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    //variables
    var key = document.getElementById("key").value;
    var admin = document.getElementById("admin").value;
    var player = document.getElementById("player").value;
    var operation = document.getElementById("sign").value;
    var mark = document.getElementById("mark").value;
    
    
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function(){
        
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            
            document.getElementById("notice").innerHTML = xmlhttp.responseText;
            
        }
        
    }
    
    xmlhttp.open("GET", "player_manager.php?admin=" + admin + "&key=" + key + "&type=mark&player=" + player + "&day=" + day + "&month=" + month + "&year=" + year + "&operation=" + operation + "&mark=" + mark, true);
    xmlhttp.send();
    
}