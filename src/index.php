<!DOCTYPE html>
<html lang="en">
  <head>
		<link rel="icon" href="./assets/potential.svg" />
		<title>Potential - Home</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<meta name="description" content="Potential, home of the unknown!" />
		<meta name="keywords" content="ws,potential" />

		<meta name="metro4:init" content="false">

    <!-- CSS-->
    <link rel="stylesheet" href="./css/libs/metro-all.min.css">
    <link rel="stylesheet" href="./css/libs/metro-theme.css">

		<style id="master_style">
			.app-bar-menu li {
      	list-style: none!important;
	    }
		</style>
  </head>
	<body>
		<div id="app">
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
		  <script src="./js/libs/vue.min.js"></script>
		</div>

		<!-- Start Vue.js and Metro -->
		<script>
			var app;
			$(function () {
				app = new Vue({
					el: '#app',
					data: {
						previews: [
							{
								name: 'Works',
								url: 'works',
								img_url: '',
								description: 'Works I\'ve done over time',
								sections: [
									{
										name: 'Art',
										url: 'works#art',
										img_url: '',
										description: 'Art I\'ve done over time',
										items: [
											{
												name: '',
												url: '',
												img_url: '',
												description: ''
											},
											{
												name: '',
												url: '',
												img_url: '',
												description: ''
											},
											{
												name: '',
												url: '',
												img_url: '',
												description: ''
											},
											{
												name: '',
												url: '',
												img_url: '',
												description: ''
											}
										]
									},
									{
										name: 'Design',
										url: 'works#design',
										img_url: '',
										description: 'Designs I\'ve done over time',
										items: [
											{
												name: '',
												url: '',
												img_url: '',
												description: ''
											}
										]
									},
									{
										name: 'Literature',
										url: 'works#literature',
										img_url: '',
										description: 'Literature I\'ve done over time',
										items: [
											{
												name: '',
												url: '',
												img_url: '',
												description: ''
											}
										]
									}
								]
							}
						]
					},
					mounted: function () {
						Metro.init();
					}
				});
			});
		</script>
	</body>
</html>
