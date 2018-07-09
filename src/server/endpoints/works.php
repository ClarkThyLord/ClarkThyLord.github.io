<?php

	/**
	* Returns/Dumps a Array containing valid work(s) found, with the given filter and options.
	* @param filter [Array] Properties to get with.
	* @param options [Array] Options to get with.
	* @return {Array} Returns a Array containing valid work(s) found.
	*/
	function works_get($filter=array(), $options=array()) {
		if (!isset($filter['type'])) {
			response_send(false, 'works filter `type` not given');
		}

		$GLOBALS['response']['data']['works'] = array();

		// List all work(s) within valid filter
		if ($handle = opendir("../content/works/{$filter["type"]}/")) {
			while (false !== ($entry = readdir($handle))) {
			  if ($entry != '.' && $entry != '..') {
					array_push($GLOBALS['response']['data']['works'], array('name' => preg_replace('/\\.[^.\\s]{3,4}$/', '', $entry), 'modified' => date ("F d Y H:i:s", filemtime("../content/works/{$filter["type"]}/{$entry}")), 'url' => str_replace(' ', '%20', ('http://' . $_SERVER['SERVER_NAME'] . "/content/works/{$filter["type"]}/{$entry}"))));
			  }
			}
			closedir($handle);
		}

		// Sort data by ASCending or DEScending order
		if (isset($options['sort'])) {
			$GLOBALS['order'] = ($options['sort'] === 'DES' ? -1 : 1);
			usort($GLOBALS['response']['data']['works'], function($file_1, $file_2) {
        if ($file_1['modified'] === $file_2['modified']) {
					return 0;
				}

        return $GLOBALS['order'] * ($file_1['modified'] < $file_2['modified'] ? -1 : 1);
	    });
		}

		// Limit returning data to max if given
		if (isset($options['max'])) {
			$GLOBALS['response']['data']['works'] = array_slice($GLOBALS['response']['data']['works'], 0, $options['max'], true);
		}

		response_send(true, 'successfully fetched valid work(s)');
	}

?>
