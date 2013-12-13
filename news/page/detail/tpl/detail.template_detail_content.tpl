
	<% if( content && content.length ){ %>
	<header>
		<h2><%= title %></h2>
		<h3><%= site %> <%= (new Date( parseInt(time) )).getFullYear() %>年<%= (new Date( parseInt(time) )).getMonth() + 1 %>月<%= (new Date( parseInt(time) )).getDate() %>日 <%= (new Date( parseInt(time) )).getHours() + 1 %>:<%= (new Date( parseInt(time) )).getMinutes() %></h3>
	</header>
	<section>
		<% for(var i = 0, j = content.length; i < j; i++){ %>
			<% if(content[ i ][ 'type' ] == 'text'){ %>
				<div class="paragraph"><%:= content[ i ][ 'data' ] %></div>
			<% }%>
			
			<% if(content[ i ][ 'type' ] == 'image'){ %>
				<% var img = content[ i ][ 'data' ][ 'original' ][ 'url' ] %>
				<% var img = img.indexOf( '/u=' ) > 0 ? img.split( '/u=' )[1].split( '&' )[0] : img %>
				<div class="paragraph paragraphimg"><img src="<%= img %>" data-width="<%= content[ i ][ 'data' ][ 'original' ][ 'width' ] %>" data-height="<%= content[ i ][ 'data' ][ 'original' ][ 'height' ] %>" /></div>
			<% }%>
		<% } %>
	</section>
    <% } else { %>
		<div>该文已被删除!</div>
	<% } %>
