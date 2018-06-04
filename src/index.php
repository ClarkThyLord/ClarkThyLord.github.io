<!DOCTYPE html>
<html lang="en">
  <head>
		<link rel="icon" href="./assets/potential.svg" />
		<title>Potential - Home</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<meta name="description" content="WorkStation potential allows users to work with 2D and 3D assets via web technologies!" />
		<meta name="keywords" content="ws,workstation,potential" />

    <!-- CSS-->
    <link rel="stylesheet" href="./css/libs/metro-all.min.css">

		<style id="master_style">
			.app-bar-menu li {
      	list-style: none!important;
	    }
		</style>
  </head>
  <body>
		<!-- NAVIGATION TOP -->
		<div class="app-bar-expand-md" data-role="appbar" id="main-nav-top">
			<!-- ICON -->
			<a href="#" class="brand">
				<img src="./assets/potential.svg" style="width: 55px;" class="p-1" />
			</a>

			<!-- LEFT -->
			<ul class="app-bar-menu">
		    <li>
	        <a href="#" class="dropdown-toggle">Works</a>
	        <ul class="d-menu" data-role="dropdown">
						<li><a href="#">Art</a></li>
						<li><a href="#">Design</a></li>
            <li><a href="#">Literature</a></li>
            <li class="divider bg-lightGray"></li>
            <li><a href="#">See more...</a></li>
	        </ul>
		    </li>
		    <li>
	        <a href="#" class="dropdown-toggle">Projects</a>
	        <ul class="d-menu" data-role="dropdown">
            <li><a href="#">WS-potential</a></li>
            <li class="divider bg-lightGray"></li>
            <li><a href="#">See more...</a></li>
	        </ul>
		    </li>
			</ul>

			<!-- RIGHT -->
			<ul class="app-bar-menu ml-auto">
		    <li>
	        <a href="#" class="dropdown-toggle">About</a>
	        <ul class="d-menu put-right" data-role="dropdown">
            <li><a href="#">Info</a></li>
            <li><a href="#">Q&A</a></li>
            <li><a href="#">Contact</a></li>
            <li class="divider bg-lightGray"></li>
            <li><a href="#">See more...</a></li>
	        </ul>
		    </li>
			</ul>
		</div>

		<!-- NAVIGATION SIDE -->
		<aside class="sidebar" data-role="sidebar" id="main-nav-side">
			<!-- HEADER -->
	    <div class="sidebar-header">
		    <a href="/" class="fg-white sub-action">
	        <span class="mif-arrow-left mif-2x"></span>
		    </a>

				<!-- ICON -->
		    <div class="avatar">
	        <img data-role="gravatar" data-default="./assets/potential.svg">
		    </div>

				<!-- TILE -->
		    <span class="title">WWW-potential</span>

				<!-- SUBTITLE -->
		    <span class="subtitle">Home</span>
	    </div>

			<!-- MENU -->
	    <ul class="sidebar-menu">
	    </ul>
		</aside>

		<div class="pt-14" id="master_html">
			<?php include './php/home.php'; ?>
		</div>

    <!-- JS -->
    <script src="./js/libs/jquery-3.3.1.min.js"></script>
    <script src="./js/libs/metro.min.js"></script>
  </body>
</html>
