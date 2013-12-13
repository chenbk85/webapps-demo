Chassis.Model.Index = Chassis.Model.extend( {

    url : function() {

        return '/data/list.php';
    },
    
    parse : function( resp ) {
        return resp;
    }
} );
