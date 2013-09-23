Chassis.Model.Photo = Chassis.Model.extend( {

    url : function() {
        return '/data/photo.php';
    },
    
    parse : function( resp ) {
        return resp;
    }
} );