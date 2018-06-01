window.onload = function (){

    // Set-up page
    setupPage();
    navActivate("nav-work");

    try{

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("POST", "./php/art.php", false);

		// When the state of the response changes do the following
		xmlHttp.onreadystatechange = function () {
			if(xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 200) { // When response is nice and done do the following
				var response = JSON.parse(xmlHttp.responseText);

                document.getElementsByClassName("sub-space")[0].innerHTML = response.extra.html;

			}
		};

        // Send the file objects with POST
		xmlHttp.send();

	}
	catch(error){
        console.log(error);
	}

};
