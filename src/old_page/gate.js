//Hello and good job! You're smart enough to look at my js file to see all the keys! Have fun!XP

function check(){
    
    var form = document.getElementById("info");
    var page = form.elements["page"].options[form.elements["page"].selectedIndex].value;
    var key = form.elements["key"].value;
    
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function(){
        
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            
            document.getElementById("notice").innerHTML = xmlhttp.responseText;
            
        }
        
    }
    
    xmlhttp.open("GET", "gate.php?page=" + page +"&key=" + key, true);
    xmlhttp.send();
    
}