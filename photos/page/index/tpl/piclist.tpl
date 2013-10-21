<div class="picList">
	<div class="group loading">
		loading...
	</div>
</div>
<% for(var m = 0 ,n = pics.length; m < n; m+= 6){ %>
	<% if(random === 4){ %>
		<% random = 0; %>
	<% } %>
	<div class="picList">
		<% if( random == 0 ) { %>
			<div class="group up">
				<div class="big" style="height:<%= (height * 2) +2 %>px;"><img src="<%= pics[ m ][ 'thumb' ][ 'url' ] %>" data-i="<%= m %>" /></div>
				<div class="small" style="height:<%= (height * 2) +2 %>px;">
					<div class="smallitem" style="height:<%= height %>px;"><img src="<%= pics[ m+1 ][ 'thumb' ][ 'url' ] %>" data-i="<%= m %>" /></div>
					<div class="smallitem"  style="height:<%= height %>px;"><img src="<%= pics[ m+2 ][ 'thumb' ][ 'url' ] %>" data-i="<%= m %>" /></div>
				</div>
				<div class="line"></div>
				<ul style="height:<%= height %>px;">
					<% for(var i = m+3; i < m+6; i++){ %>
						<li><img src="<%= pics[ i ][ 'thumb' ][ 'url' ] %>" data-i="<%= m %>" /></li>
					<% } %>
				</ul>
			</div>
			
			
		<% } %>
		<% if( random == 1 ) { %>
			<div class="group up">
				<div class="small" style="height:<%= (height * 2) +2 %>px;">
					<div class="smallitem"  style="height:<%= height %>px;"><img src="<%= pics[ m ][ 'thumb' ][ 'url' ] %>" data-i="<%= m %>" /></div>
					<div class="smallitem"  style="height:<%= height %>px;"><img src="<%= pics[ m+1 ][ 'thumb' ][ 'url' ] %>" data-i="<%= m %>" /></div>
				</div>
				<div class="big" style="height:<%= (height * 2) +2 %>px;"><img src="<%= pics[ m+2 ][ 'thumb' ][ 'url' ] %>" data-i="<%= m %>" /></div>
				<div class="line"></div>
				<ul style="height:<%= height %>px;">
					<% for(var i = m+3; i < m+6; i++){ %>
						<li><img src="<%= pics[ i ][ 'thumb' ][ 'url' ] %>" data-i="<%= m %>" /></li>
					<% } %>
				</ul>
			</div>
			
			
		<% } %>
		
		<% if( random == 2 ) { %>
			
			<div class="group down">
				<ul style="height:<%= height %>px;">
					<% for(var i = m; i < m+3; i++){ %>
						<li><img src="<%= pics[ i ][ 'thumb' ][ 'url' ] %>" data-i="<%= m %>" /></li>
					<% } %>
				</ul>
				<div class="line"></div>
				<div class="big" style="height:<%= (height * 2) +2 %>px;"><img src="<%= pics[ m+3 ][ 'thumb' ][ 'url' ] %>" data-i="<%= m %>" /></div>
				<div class="small" style="height:<%= (height * 2) +2 %>px;">
					<div class="smallitem" style="height:<%= height %>px;"><img src="<%= pics[ m+4 ][ 'thumb' ][ 'url' ] %>" data-i="<%= m %>" /></div>
					<div class="smallitem" style="height:<%= height %>px;"><img src="<%= pics[ m+5][ 'thumb' ][ 'url' ] %>" data-i="<%= m %>" /></div>
				</div>
			</div>
		<% } %>
		
		<% if( random == 3 ) { %>
			
			<div class="group down">
				<ul style="height:<%= height %>px;">
					<% for(var i = m; i < m+3; i++){ %>
						<li><img src="<%= pics[ i ][ 'thumb' ][ 'url' ] %>" data-i="<%= m %>" /></li>
					<% } %>
				</ul>
				<div class="line"></div>
				<div class="small" style="height:<%= (height * 2) +2 %>px;">
					<div class="smallitem" style="height:<%= height %>px;"><img src="<%= pics[ m+3 ][ 'thumb' ][ 'url' ] %>" data-i="<%= m %>" /></div>
					<div class="smallitem" style="height:<%= height %>px;"><img src="<%= pics[ m+4][ 'thumb' ][ 'url' ] %>" data-i="<%= m %>" /></div>
				</div>
				<div class="big" style="height:<%= (height * 2) +2 %>px;"><img src="<%= pics[ m+5 ][ 'thumb' ][ 'url' ] %>" data-i="<%= m %>" /></div>
			</div>
		<% } %>
			
	</div>
	<% random++; %>
<% } %>
<div class="picList">
	<div class="group loading">
		loading...
	</div>
</div>