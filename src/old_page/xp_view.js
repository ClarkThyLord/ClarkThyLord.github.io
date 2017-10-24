function searchtype(){
    
    var selection = document.getElementById("type");
    var stuff = selection.options[selection.selectedIndex].value;
    
    if(stuff == "all"){
        
        document.getElementById("fields").innerHTML = "";
        
    }else if(stuff == "recent"){
        
        document.getElementById("fields").innerHTML = "";
        
    }else if(stuff == "name"){
        
        
        //var code = "<b>Name:</b>";
        
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function(){
            
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                
                if(xmlhttp.responseText == "DB" || xmlhttp.responseText == "Q"){
                    
                    document.getElementById("content-1").innerHTML = "Something went wrong while trying to fetch data! CODE: " + xmlhttp.responseText + "<hr>";
                    
                    document.getElementById("fields").innerHTML += "<b>Name:</b> <input type='text' id='f1'>";
                    
                }else{
                    
//                    code += xmlhttp.responseText;
//                    code += "<b>Name:</b> <input type='text' id='f1'>";

                    document.getElementById("fields").innerHTML = "<b>Name:</b>" + xmlhttp.responseText;
                    
                }
                
            }
            
        }
        
        xmlhttp.open("GET", "playerslist.php", true);
        xmlhttp.send();
        
        //document.getElementById("fields").innerHTML = "<b>Name:</b> <input type='text' id='f1'>";
        
    }else if(stuff == "date"){
        
        document.getElementById("fields").innerHTML = "<b>Day: </b><input type='text' id='f1'><b>Month: </b><input type='text' id='f2'><b>Year: </b><input type='text' id='f3'><i>leave a field blank to ignore</i>";
        
    }else if(stuff == "status"){
        
        document.getElementById("fields").innerHTML = "<b>Status: </b><select id='status'><option value='active'>Active</option><option value='semi'>Semi</option><option value='inactive'>Inactive</option><option value='break'>Break</option><option value='out'>Out</option</select>";
        
    }else{
        
        document.getElementById("info").innerHTML = "Something went wrong while trying to change type! TYPE: " + stuff;
        
    }
    
}

function fetch(){
    
    //type of fetch
    var selection1 = document.getElementById("type");
    var selection2 = document.getElementById("from");
    var stuff = selection1.options[selection1.selectedIndex].value;
    var table = selection2.options[selection2.selectedIndex].value;
    
    
    if(stuff == "all"){
        
        //send the request
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

            document.getElementById("table").innerHTML = xmlhttp.responseText;

        }

        }
        xmlhttp.open("GET", "xp_view.php?table=" + table + "&type=" + stuff, true);
        xmlhttp.send();
        
        document.getElementById("info").innerHTML = "Fetching <b>everything</b>..."
        
    }else if(stuff == "recent"){
        
        //date
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        
        //send the request
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

            document.getElementById("table").innerHTML = xmlhttp.responseText;

        }

        }
        xmlhttp.open("GET", "xp_view.php?table=" + table + "&type=" + stuff + "&day=" + day + "&month=" + month + "&year=" + year, true);
        xmlhttp.send();
        
        document.getElementById("info").innerHTML = "Fetching the <b>most recent registries</b>...";
        
    }else if(stuff == "name"){
        
        var name = document.getElementById("player").value;
        
        //validate the info
        if(name.length > 3 && isNaN(name)){
            
            //send the request
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

                document.getElementById("table").innerHTML = xmlhttp.responseText;

            }

            }
            xmlhttp.open("GET", "xp_view.php?table=" + table + "&type=" + stuff + "&name=" + name, true);
            xmlhttp.send();
            
            document.getElementById("info").innerHTML = "Fetching everything on <b>" + name + "</b>...";
            
        }else{   document.getElementById("info").innerHTML = "<b>That isn't a valid name!</b>";}
        
    }else if(stuff == "date"){
        
        var day = document.getElementById("f1").value;
        var month = document.getElementById("f2").value;
        var year = document.getElementById("f3").value;
        
        //validate the info
        if(day != "" || month != "" || year != ""){
            
            if(day == ""){   day = 0;}
            if(month == ""){   month = 0;}
            if(year == ""){   year = 0;}
            
            if(!(isNaN(day)) && !(isNaN(month)) && !(isNaN(year))){

                //send the request
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function(){
                if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

                    document.getElementById("table").innerHTML = xmlhttp.responseText;

                }

                }
                xmlhttp.open("GET", "xp_view.php?table=" + table + "&type=" + stuff + "&day=" + day + "&month=" + month + "&year=" + year, true);
                xmlhttp.send();

                document.getElementById("info").innerHTML = "Fetching everything on <b>" + day + ", " + month + ", " + year + "</b>...";

            }else{   document.getElementById("info").innerHTML = "<b>That isn't a valid date!</b>";}
            
        }else{   document.getElementById("info").innerHTML = "<b>You need to fill atleast one field!</b>";}
        
        
    }else if(stuff == "status"){
        
        var selection2 = document.getElementById("status");
        var status = selection2.options[selection2.selectedIndex].value;
        
        //send the request
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

            document.getElementById("table").innerHTML = xmlhttp.responseText;

        }

        }
        xmlhttp.open("GET", "xp_view.php?table=" + table + "&type=" + stuff + "&status=" + status, true);
        xmlhttp.send();
        
        document.getElementById("info").innerHTML = "Fetching everything on <b>" + status + "</b>...";
        
    }else{
        
        document.getElementById("info").innerHTML = "Something went wrong while trying to send your request! TYPE: " + stuff;
        
    }
    
//    var xmlhttp = new XMLHttpRequest();
//    xmlhttp.onreadystatechange = function(){
//        
//        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
//            
//            document.getElementById("table").innerHTML = xmlhttp.responseText;
//            
//        }
//        
//    }
//    xmlhttp.open("GET", "xp_view.php?key=" + key, true);
//    xmlhttp.send();
    
}