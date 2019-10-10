$(document).ready(function () {
    
            $("#contenido").html(htmlpuro)
            $(".btn-outline-danger").click(function(){
                var esteBoton= $(this);
                var id = esteBoton.parent().parent().find("#id_producto").text();
                var name=esteBoton.parent().parent().find("#name").text();
                swal({
                    title: "¿Deseas eliminar la película?",
                    text: "Eliminaras la película \""+name+"\" ",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                      swal("La película a sido eliminada correctamente", {
                        icon: "success",
                      });
                      $.ajax({
                        type:"DELETE",
                        url:"/api/pelicula/"+id,
                        dataType:"text",
                        contentType:"application/json" 
                    }).done(function(msg){
                        //alert(msg);
                        esteBoton.parent().parent().remove();
                    });
                    } else {
                      swal("Ok no eliminaremos nada.");
                    }
                  });
                
                    
                
             }); 
        });