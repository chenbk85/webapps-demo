
<% for(var i = 0, j = news.length; i < j; i++){ %>
	<% if(!news[ i ][ 'title' ]){ %>
		<% continue; %>
	<% } %>
	<div class="item" data-id="<%= news[ i ][ 'nid' ] %>" data-cid="<%= news[ 'cid' ] %>">
		<div class="left">
			<h3><%= news[ i ][ 'title' ] %></h3>
			<div class="abs"><%= news[ i ][ 'abs' ] %></div>
			<div class="ts">
				<% var last = Math.round(((new Date()).getTime() - news[ i ][ 'ts' ]) / (1000 * 60)); %>
				
				<% if(last >= 1440){%>
					<%= Math.round(last / (60 * 24)) %>天前
				<% } else if(last >= 60){%>
					<%= Math.round(last / 60) %>小时前
				<% } else { %>
					<%= last %>分钟前
				<% } %>
			</div>
		</div>
		<div class="right">
			<% if(news[ i ][ 'imageurls' ].length){ %>
				
			<% } %>
		</div>
	</div>
<% } %>
	






