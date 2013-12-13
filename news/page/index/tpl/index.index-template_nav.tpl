	<ul>
		<% for(var item in nav){ %>
			<li class="item" data-id="<%= item %>"><%= nav[item] %></li>
		<% } %>
	</ul>