<!DOCTYPE html>
<html lang="en" class="h-100">

<head>
	<link rel="icon" href="./css/icons/potential.svg" />
	<title>Potential - Works</title>

	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta name="description" content="Potential, home of the unknown!" />
	<meta name="keywords" content="ws,potential" />

	<meta name="metro4:init" content="false">

	<!-- CSS-->
	<link rel="stylesheet" href="./css/libs/metro-all.min.css">
	<link rel="stylesheet" href="./css/libs/metro-theme.css">

	<link rel="stylesheet" href="./css/gui.css">
</head>

<body class="h-100">
	<div class="h-100" id="app">
		<!-- Master Navigation -->
		<?php include './components/navigation.php'; ?>

		<!-- Master Content -->
		<main class="pt-13">
			<!-- PREVIEWS -->
			<div class="m-3">
				<!-- Images -->
				<div id="images">
					<div class="mt-5 mb-3 d-inline-sm d-flex-md flex-justify-start border-bottom border-size-3 bd-lightGray">
						<!-- LEFT -->
						<div class="ml-3">
							<h1>Images</h1>
						</div>

						<!-- RIGHT -->
				    <div class="ml-auto mr-3">
							<ul class="mt-5 pagination no-gap">
						    <li class="page-item">
									<input type="text" oninput="var search_term = this.value.toLowerCase(); if (search_term !== '') { $('#images-content').children().each(function(i, li){ if ($(li).children('.card-header').html().toLowerCase().indexOf(search_term) !== -1) { $(li).show(); } else { $(li).hide(); } }); } else { $('#images-content').children().show(); }" placeholder="Search..." />
								</li>
						    <li class="page-item">
									<button data-order="ascending" onclick="$('#images-content').children().each(function(i, li){ $('#images-content').prepend(li) }); if ($(this).data('order') === 'ascending') { $(this).prop('title', 'Order by ascending').data('order', 'descending').children('.icon').removeClass('mif-sort-desc').addClass('mif-sort-asc'); } else { $(this).prop('title', 'Order by descending').data('order', 'ascending').children('.icon').removeClass('mif-sort-asc').addClass('mif-sort-desc'); }" title="Sort descending" class="image-button">
										<span class="icon mif-sort-desc"></span>
										<span class="caption">Sort</span>
									</button>
								</li>
							</ul>
						</div>
					</div>

					<div style="min-height: 300px;" class="w-100 d-flex-column-sm d-flex-md flex-wrap flex-justify-center" id="images-content">
						<div v-if="GLOBALS.images.length === 0" class="w-100 d-inline-flex flex-justify-center d-flex flex-column">
							<figure>
								<img src="./css/icons/potential.svg" style="margin: auto; width: 100px;" class="ani-pulse" />
								<figcaption class="text-center">Loading...</figcaption>
							</figure>
						</div>

						<div v-for="work in GLOBALS.images" style="min-width: 247px; max-width: 359.8px;" class="m-2 card image-header selectable">
							<div class="card-header text-cap fg-white" :style="{'background-image': 'url(' + work.url + ')'}">
								{{ work.name }}
							</div>
							<div class="card-content p-2">
								<p class="fg-gray">{{ work.modified }}</p>
								Created with love! 💖
							</div>
							<div class="card-footer">
								<button @click="window.location.href = work.url;" title="View" class="mt-2 image-button">
									<span class="icon mif-eye"></span>
									<span class="caption">View</span>
								</button>
							</div>
						</div>
					</div>
				</div>

				<!-- Literature -->
				<div id="literature">
					<div class="mt-5 mb-3 d-inline-sm d-flex-md flex-justify-start border-bottom border-size-3 bd-lightGray">
						<!-- LEFT -->
						<div class="ml-3">
							<h1>Literature</h1>
						</div>

						<!-- RIGHT -->
				    <div class="ml-auto mr-3">
							<ul class="mt-5 pagination no-gap">
						    <li class="page-item">
									<input type="text" oninput="var search_term = this.value.toLowerCase(); if (search_term !== '') { $('#literature-content').children().each(function(i, li){ if ($(li).children('.card-header').html().toLowerCase().indexOf(search_term) !== -1) { $(li).show(); } else { $(li).hide(); } }); } else { $('#literature-content').children().show(); }" placeholder="Search..." />
								</li>
						    <li class="page-item">
									<button data-order="ascending" onclick="$('#literature-content').children().each(function(i, li){ $('#literature-content').prepend(li) }); if ($(this).data('order') === 'ascending') { $(this).prop('title', 'Order by ascending').data('order', 'descending').children('.icon').removeClass('mif-sort-desc').addClass('mif-sort-asc'); } else { $(this).prop('title', 'Order by descending').data('order', 'ascending').children('.icon').removeClass('mif-sort-asc').addClass('mif-sort-desc'); }" title="Sort descending" class="image-button">
										<span class="icon mif-sort-desc"></span>
										<span class="caption">Sort</span>
									</button>
								</li>
							</ul>
						</div>
					</div>

					<div style="min-height: 300px;" class="w-100 d-flex-column-sm d-flex-md flex-wrap flex-justify-center" id="literature-content">
						<div v-if="GLOBALS.literature.length === 0" class="w-100 d-inline-flex flex-justify-center d-flex flex-column">
							<figure>
								<img src="./css/icons/potential.svg" style="margin: auto; width: 100px;" class="ani-pulse" />
								<figcaption class="text-center">Loading...</figcaption>
							</figure>
						</div>

						<div v-for="work in GLOBALS.literature" style="min-width: 247px; max-width: 359.8px;" class="m-2 card selectable">
							<div class="card-header text-cap text-center fg-white">
								{{ work.name }}
							</div>
							<embed :src="work.url" style="min-height: 440px;" class="w-100 card-content"></embed>
							<div class="card-content p-2">
								<p class="fg-gray">{{ work.modified }}</p>
								Created with love! 💖
							</div>
							<div class="card-footer">
								<button @click="window.location.href = work.url;" title="View" class="mt-2 image-button">
									<span class="icon mif-eye"></span>
									<span class="caption">View</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>

		<!-- Master Footer -->
		<?php include './components/footer.php'; ?>
	</div>

	<!-- JS -->
	<script src="./js/libs/jquery-3.3.1.min.js"></script>
	<script src="./js/libs/metro.min.js"></script>
	<script src="./js/libs/vue.min.js"></script>

	<script src="./js/gui.js"></script>

	<script src="./js/works.js"></script>
</body>

</html>
