<footer class="d-flex-md border-top bd-lightGray bg-dark">
	<div style="flex: 0.33;">
		<div class="m-2">
			<h2>
				Hello World!
			</h2>
			<div class="pl-5">
				Just another programmer :v
			</div>
		</div>

		<div class="m-2 icon-box">
			<h4>
				Skills
			</h4>
			<ul>
				<li v-for="(time, skill) in {'Java': 2, 'PHP': 3, 'SQL': 3, 'Mongo': 3, 'Web Technologies': 5, 'JSON': 4, 'JavaScript': 3, 'Python 3': 3, 'API': 3, '2D': 6, '3D': 1, 'Game Development': 6}" data-role="popover" data-hide-on-leave="true" data-popover-hide="0"
				  :data-popover-text="'Experienced in ' + skill + ' for over ' + time + ' year(s)'" data-cls-popover="p-1 tooltip" style="margin: 3px; padding: 2px; display: inline-block;">
					{{ skill }}
				</li>
			</ul>
		</div>
	</div>
	<div style="flex: 0.34;">
	</div>
	<div style="flex: 0.33;">
		<div class="m-2">
			<h2>
				Contact
			</h2>
			<div>
				<button onclick="window.location.href = 'https://github.com/ClarkThyLord'" title="GitHub" class="mt-2 image-button">
					<span class="icon mif-github"></span>
					<span class="caption">ClarkThyLord</span>
				</button> <br />
				<button onclick="window.location.href = 'https://discordapp.com/'" title="Discord" class="mt-2 image-button">
					<img src="./assets/icons/discord.svg" class="icon" />
					<span class="caption">Clark thy Lord#7042</span>
				</button> <br />
				<button onclick="window.location.href = 'mailto:ccpotential@gmail.com';" title="E-Mail" class="mt-2 image-button">
					<span class="icon mif-mail"></span>
					<span class="caption">ccpotential@gmail.com</span>
				</button>
			</div>
		</div>
	</div>
</footer>
