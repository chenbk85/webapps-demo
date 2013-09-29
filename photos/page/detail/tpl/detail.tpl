		<div class="pics">
			<ul id="<%= id %>">
			<% for(var i = 0, j = pics.length; i < j; i++) { %>
				<li><img src="<%= pics[ i ][ 'stand' ][ 'url' ] %>" /></li>
			<% } %>
			</ul>
		</div>
		<div class="pic-tools">
			<ul>
				<li><span class="typcn typcn-arrow-left-outline"></span></li>
				<li><span class="typcn typcn-eye-outline"></span></li>
				<li><span class="typcn typcn-media-play"></span></li>
				<li><span class="typcn typcn-arrow-forward"></span></li>
			</ul>
		</div>
		<div class="pic-iphone">
			11:20
		</div>

