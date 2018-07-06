<?php

	/**
	* Returns/Dumps a Array containing valid work(s) found, with the given filter and options.
	* @param filter [Array] Properties to get with.
	* @param options [Array] Options to get with.
	* @return {Array} Returns a Array containing valid work(s) found.
	*/
	function works_get($filter=array(), $options=array()) {
		$GLOBALS['response']['data']['works'] = array();

		if ($handle = opendir('../works/')) {
			while (false !== ($entry = readdir($handle))) {
			  if ($entry != '.' && $entry != '..') {
					array_push($GLOBALS['response']['data']['works'], array('name' => preg_replace('/\\.[^.\\s]{3,4}$/', '', $entry), 'extension' => pathinfo("../works/{$entry}", PATHINFO_EXTENSION), 'modified' => date ("F d Y H:i:s", filemtime("../works/{$entry}")), 'url' => ('http://' . $_SERVER['SERVER_NAME'] . "/works/{$entry}")));
			  }
			}
			closedir($handle);
		}

		response_send(true, 'successfully fetched valid work(s)');
	}

?>
