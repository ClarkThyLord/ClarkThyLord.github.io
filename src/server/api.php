<?php

// ~ API Endpoints ~
// Main:      | Sub:     | Methods:  | Access:
// -------------------------------------------
// works      |           | GET       | none
// projects   |           | GET       | none
// *******************************************

	// Initialize session if not already
	if (!isset($_SESSION)) {
		session_start();
	}

	// Setup Response that will be sent back
	$response = array('success' => true, 'reason' => 'initial response', 'data' => array());

	// Stripping the base URL and getting all the 'routes'
	// ***************************************************************************

	// Get the base URL and remove it from the request URL
	$url = substr($_SERVER['REQUEST_URI'], strlen(implode('/', array_slice(explode('/', 'api.php'), 0, -1)) . '/'));
	// Remove query elements and excess /
	if (strstr($url, '?')) $url = substr($url, 0, strpos($url, '?'));
	$url = '/' . trim($url, '/');
	// Make an array of it
	$url = explode('/', $url);

	// Create a routes array
	$routes = array();
	// If head, this file, has been reached
	$head = false;
	// Remove bad routes from the URL array and add them to valid routes
	foreach ($url as $route){
		 // If that it's not a empty string and it's not this file
    if (trim($route) != '') {
			// Check if route is this file; meaning head
	    if ($route === basename(__FILE__)) {
				$head = true;
			}
			// If true then route is valid
			else if ($head === true) {
				array_push($routes, $route);
			}
    }
	}

	// FOR DEBUGGING
	if (is_debugging()) {
		// Setup debug spot in response
		$GLOBALS['response']['debug'] = Array();

		$GLOBALS['response']['debug']['method'] = $_SERVER['REQUEST_METHOD'];
		$GLOBALS['response']['debug']['routes'] = $routes;
	}

	// Common Functions
	// ***************************************************************************

	/**
	* Check whether currently debugging.
	* @return {boolean} Returns true, if debugging; false, if not debugging.
	*/
	function is_debugging() {
		return (isset($_GET['debug']) && $_GET['debug'] == true);
	}


	/**
	* Modify response's status and reason.
	* @param status [boolean] True, response is sucesfull; False, response is unsucesfull.
	* @param reason [string] Reason for given status.
	* @return {undefined} Returns nothing.
	*/
	function response_status($success=true, $reason='unknown') {
		if ($success === true) { $success = true; }
		else { $success = false; }

		$GLOBALS['response']['success'] = $success;
		$GLOBALS['response']['reason'] = $reason;
	}


	/**
	* Echo current resopnse end exit.
	* @param status [boolean] True, response is sucesfull; False, response is unsucesfull.
	* @param reason [string] Reason for given status.
	* @return {undefined} Returns nothing.
	*/
	function response_send($success=null, $reason=null) {
		if ($success !== null) { response_status($success, $reason); }

		// Echo response
		echo json_encode($GLOBALS['response']);

		// Kill PHP
		die();
	}

	// Call on endpoint according to client's request
	// ***************************************************************************

	if (count($routes) <= 0) {
		response_status(false, 'no valid endpoint given');
	} else if ($routes[0] === 'works') {
		include_once './endpoints/works.php';

		if ($_SERVER['REQUEST_METHOD'] === 'GET') {
			works_get((isset($_GET['filter']) ? json_decode($_GET['filter'], true) : array()), (isset($_GET['options']) ? json_decode($_GET['options'], true) : array()));
		}
	} else if ($routes[0] === 'projects') {
		include_once './endpoints/projects.php';

		if ($_SERVER['REQUEST_METHOD'] === 'GET') {
			projects_get((isset($_GET['filter']) ? json_decode($_GET['filter'], true) : array()), (isset($_GET['options']) ? json_decode($_GET['options'], true) : array()));
		}
	} else {
		response_status(false, "`{$routes[0]}` endpoint not found");
	}

	response_send();

?>
