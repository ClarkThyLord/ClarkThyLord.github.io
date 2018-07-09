<!DOCTYPE html>
<html lang="en" class="h-100">

<head>
	<link rel="icon" href="./css/icons/potential.svg" />
	<title>Potential - Home</title>

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
			<!-- CAROUSEL -->
			<div data-role="carousel" data-auto-start="true" data-bullet-style="circle" data-effect="fade" data-period="3000" data-duration="500" style="max-height: 100%; background-color: rgba(0, 0, 0, 0);">
				<div v-for="(url, name) in {'eye of potential': './content/works/images/eye%20of%20potential.jpg', 'kingdom hearts sky': './content/works/images/kingdom%20hearts%20sky.jpg', 'pierce the veil': './content/works/images/pierce%20the%20veil.jpg'}" class="slide h-100 p-10 fg-white d-flex flex-content-end flex-justify-center flex-wrap" :data-cover="url">
					<span style="font-size: 3vw;" class="text-cap"> {{ name }} </span>
				</div>
			</div>

			<!-- PREVIEWS -->
			<div class="m-3">
				<!-- Recent Works -->
				<div>
					<div class="mt-5 mb-3 d-flex flex-justify-start border-bottom border-size-3 bd-lightGray">
						<!-- LEFT -->
						<div class="ml-3">
							<h1>Works</h1>
						</div>

						<!-- RIGHT -->
				    <div class="ml-auto mr-3">
							<button onclick="window.location.href = 'works.php';" title="View all" class="mt-3 image-button">
								<span class="icon mif-plus"></span>
								<span class="caption">View all</span>
							</button>
						</div>
					</div>

					<div style="min-height: 300px;" class="w-100 d-flex-column-sm d-flex-md">
						<div v-if="GLOBALS.works.length === 0" class="w-100 d-inline-flex flex-justify-center d-flex flex-column">
							<figure>
								<img src="./css/icons/potential.svg" style="margin: auto; width: 100px;" class="ani-pulse" />
								<figcaption class="text-center">Loading...</figcaption>
							</figure>
						</div>

						<div v-for="work in GLOBALS.works" class="m-2 card image-header selectable">
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

				<!-- Recent Projects -->
				<div>
					<div class="mt-5 mb-3 d-flex flex-justify-start border-bottom border-size-3 bd-lightGray">
						<!-- LEFT -->
						<div class="ml-3">
							<h1>Projects</h1>
						</div>

						<!-- RIGHT -->
						<div class="ml-auto mr-3">
							<button onclick="window.location.href = 'projects.php';" title="View all" class="mt-3 image-button">
								<span class="icon mif-plus"></span>
								<span class="caption">View all</span>
							</button>
						</div>
					</div>

					<div style="min-height: 300px;" class="w-100 d-flex-column-sm d-flex-md flex-wrap flex-justify-center" id="projects-content">
						<div v-if="GLOBALS.projects.length === 0" class="w-100 d-inline-flex flex-justify-center d-flex flex-column">
							<figure>
								<img src="./css/icons/potential.svg" style="margin: auto; width: 100px;" class="ani-pulse" />
								<figcaption class="text-center">Loading...</figcaption>
							</figure>
						</div>

						<div v-for="project in GLOBALS.projects" style="min-width: 247px; max-width: 359.8px;" class="m-2 card image-header selectable">
							<div class="card-header text-cap fg-white" :style="{'background-image': 'url(/content/projects/' + project.name.replace(' ', '%20') + '/project.jpg)'}">
								{{ project.name }}
							</div>
							<div style="min-height: 80px;" class="card-content p-2">
								<p class="fg-gray">{{ project.modified }}</p>
								{{ project.data.description }}
							</div>
							<div class="card-footer">
								<button v-if="project.data.preview" @click="window.location.href = '/content/projects/' + project.name + '/src/';" title="View" class="mt-2 image-button">
									<span class="icon mif-eye"></span>
									<span class="caption">Preview</span>
								</button>
								<button v-if="project.data.github" @click="window.location.href = project.data.github;" title="View" class="mt-2 image-button">
									<span class="icon mif-github"></span>
									<span class="caption">GitHub</span>
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

	<script src="./js/index.js"></script>
</body>

</html>
