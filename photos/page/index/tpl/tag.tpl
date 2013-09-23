
		<% for(var i = 0; i < data.length; i++){ %>
			<% if ( i === 0){ %>
			<li class="tagItem select <%= data[ i ][ 'tag' ] %>"data-tag="<%= data[ i ][ 'tag' ] %>"><%= data[ i ][ 'tagname' ] %></li>
			<% }else{ %>
			<li class="tagItem <%= data[ i ][ 'tag' ] %>"data-tag="<%= data[ i ][ 'tag' ] %>"><%= data[ i ][ 'tagname' ] %></li>
			<% } %>
		<% } %>


