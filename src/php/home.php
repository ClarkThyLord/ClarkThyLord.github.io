<div class="container-fluid">
	<div data-role="carousel" data-auto-start="true" data-bullet-style="circle" data-effect="fade" data-period="3000" data-duration="500">
		<div class="slide h-100 p-10 fg-white d-flex flex-content-end flex-justify-center flex-wrap" data-cover="./assets/art/Eye%20Of%20Potential.jpg">
			<h2><em>Eye of Potential</em></h2>
		</div>
		<div class="slide h-100 p-10 fg-white d-flex flex-content-end flex-justify-center flex-wrap" data-cover="./assets/art/Kingdom%20Hearts%20Sky.jpg">
			<h2><em>Kingdom Heart's Sky</em></h2>
		</div>
		<div class="slide h-100 p-10 fg-white d-flex flex-content-end flex-justify-center flex-wrap" data-cover="./assets/design/Pierce%20The%20Veil.jpg">
			<h2><em>Pierce the Veil</em></h2>
		</div>
	</div>
</div>

<div v-if="previews" v-for="preview in previews" data-role="panel" :data-title-icon="<img src='preview.img_url'>" :data-title-caption="preview.name" style="padding: 0px;" class="border bd-grey m-5">
	<div v-for="section in preview.sections" data-role="panel" :data-title-icon="<img src='section.img_url'>" data-title-caption="section.name">
		<div class="m-3 d-flex flex-justify-around flex-wrap">
			<div v-for="piece in section.pieces" data-role="tile" data-size="wide" data-effect="hover-zoom-down" class="border border-radius m-2">
				<!-- TITLE -->
				<span class="branding-bar fg-white">
					{{ piece.name }}
				</span>

				<!-- CONTENT -->
		    <div class="slide-front">
	        <img :src="piece.img_url" class="h-100 w-100">
		    </div>
		    <div class="slide-back d-flex flex-justify-center flex-align-center p-4 op-mauve text-center">
					{{ piece.description }}
		    </div>
			</div>
		</div>
	</div>
</div>

<script>
	function loaded() {
	}
</script>
