Chassis.Model.Detail = Chassis.Model.extend( {

    url : function() {
        return '/data/detail.php';
    },
    
    parse : function( resp ) {
        return resp;
    }
} );