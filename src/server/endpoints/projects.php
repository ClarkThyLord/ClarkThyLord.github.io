<?php

	/**
	* Returns/Dumps a Array containing valid projects(s) found, with the given filter and options.
	* @param filter [Array] Properties to get with.
	* @param options [Array] Options to get with.
	* @return {Array} Returns a Array containing valid projects(s) found.
	*/
	function projects_get($filter=array(), $options=array()) {
		$GLOBALS['response']['data']['projects'] = array();

		// List all project(s) within valid filter
		if ($handle = opendir("../content/projects/")) {
			while (false !== ($entry = readdir($handle))) {
			  if ($entry != '.' && $entry != '..') {
					array_push($GLOBALS['response']['data']['projects'], array('name' => $entry, 'modified' => date("F d Y H:i:s", filemtime("../content/projects/{$entry}/project.json")), 'data' => json_decode(file_get_contents("../content/projects/{$entry}/project.json"), true)));
			  }
			}
			closedir($handle);
		}

		// Sort data by ASCending or DEScending order
		if (isset($options['sort'])) {
			$GLOBALS['order'] = ($options['sort'] === 'DES' ? -1 : 1);
			usort($GLOBALS['response']['data']['projects'], function($file_1, $file_2) {
        if ($file_1['modified'] === $file_2['modified']) {
					return 0;
				}

        return $GLOBALS['order'] * ($file_1['modified'] < $file_2['modified'] ? -1 : 1);
	    });
		}

		// Limit returning data to max if given
		if (isset($options['max'])) {
			$GLOBALS['response']['data']['projects'] = array_slice($GLOBALS['response']['data']['projects'], 0, $options['max'], true);
		}

		response_send(true, 'successfully fetched valid project(s)');
	}

?>
