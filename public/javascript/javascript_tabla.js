$(document).ready(function () {
    $('#btnconsultar').click(function () {
        var htmlpuro = '<table class="table table-bordered" id="tabla_productos"><thead>'
        htmlpuro += '<tr  class="table-info">'
        htmlpuro += '<th>ID</th>'
        htmlpuro += '<th>Título</th>'
        htmlpuro += '<th>Imagen</th>'
        htmlpuro += '<th>Clasificación</th>'
        htmlpuro += '<th>Descripción</th>'
        htmlpuro += '<th>Fecha de Estreno</th>'
        htmlpuro += '<th>Fin de cartelera </th>'
        htmlpuro += '<th>Duración</th>'
        htmlpuro += '<th>Tiempo en Cartelera</th>'
        htmlpuro += '<th>Acciones</th>'
        htmlpuro += '</tr></thead><tbody>'
        //var varid=$("#txtcedula").val();
        $.ajax({
            type: "GET",
            url: "/api/pelicula",
            dataType: "json",
            contentType: "text/plain"
        }).done(function (msg) {
            //este for entra al objeto peliculas del json "msg" "i" quedara en posicion u objeto 0
            for (let i in msg) {
                //el objeto peliculas del json es un array ahi recorreremos el array con j y sus propiedades
                // de cada j
                for (let j in msg[i]) {
                    // console.log(msg[i][j])
                    htmlpuro += '<tr>'
                    htmlpuro += '<td id="id_producto">' + msg[i][j]._id + '</td>'
                    htmlpuro += '<td id="name">' + msg[i][j].name + '</td>'
                    htmlpuro += '<td>' + msg[i][j].picture + '</td>'
                    htmlpuro += '<td>' + msg[i][j].censura + '</td>'
                    htmlpuro += '<td>' + msg[i][j].descripcion + '</td>'
                    htmlpuro += '<td>' + msg[i][j].fechaEstreno + '</td>'
                    htmlpuro += '<td>' + msg[i][j].fechaFinal + '</td>'
                    htmlpuro += '<td>' + msg[i][j].duracion + '</td>'
                    htmlpuro += '<td>' + msg[i][j].tiempoCartelera + '</td>'
                htmlpuro += '<td>\
                                <button class="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal" id="btn-eliminar"><span class="oi oi-trash" aria-hidden="true" title="Eliminar" "></span></button>\
                                <button class="btn btn-outline-success"><span class="oi oi-pencil" title="Modificar" aria-hidden="true"></span></button>\
							</td>'
                    htmlpuro += '</tr>'
                    
                }
            }
            // gggf
            htmlpuro += '</tbody></table>';
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
    });
}); 