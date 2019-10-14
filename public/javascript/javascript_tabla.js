$(document).ready(function () {
  $('#btnconsultar').click(function () {
    var htmlpuro= '<p>'+ +'</p>'
    htmlpuro += '<table class="table table-bordered" id="tabla_productos"><thead>'
    htmlpuro += '<tr  class="table-info">'
    htmlpuro += '<th>Descripción</th>'
    htmlpuro += '<th>Precio</th>'
    htmlpuro += '<th>Imagen</th>'
    htmlpuro += '<th>Clasificación</th>'
    // htmlpuro += '<th>Descripción</th>'
    htmlpuro += '<th>Fecha de Estreno</th>'
    htmlpuro += '<th>Fin de cartelera </th>'
    htmlpuro += '<th>Duración</th>'
    htmlpuro += '<th>Tiempo en Cartelera</th>'
    htmlpuro += '<th>Acciones</th>'
    htmlpuro += '</tr></thead><tbody>'
    //var varid=$("#txtcedula").val();
    $.ajax({
        type: "GET",
        url: "/api/getproductos",
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
                htmlpuro += '<td id="id_producto">' + msg[i][j].PRDNOMBRE + '</td>'
                htmlpuro += '<td id="name">' + msg[i][j].PRDPVP + '</td>'
                htmlpuro += '<td>' + '<div class="flip-box"> <div class="flip-box-inner"> <div class="flip-box-front"><img alt="'+msg[i][j].IMAGEN+'" src="'+msg[i][j].IMAGEN+'" width="200" height="200" class="img-circle" title="'+msg[i][j].name+'">  </div> <div class="flip-box-back"> <h2>'+msg[i][j].name+'</h2> <p>'+ msg[i][j].descripcion +'</p> </div> </div> </div>' + '</td>'
                // htmlpuro += '<td>' + msg[i][j].picture + '</td>'
                htmlpuro += '<td>' + msg[i][j].IMAGEN+ '</td>'
                console.log(msg[i][j].IMAGEN)
                // htmlpuro += '<td>' + msg[i][j].descripcion + '</td>'
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
            //$("#contenido").html(htmlpuro)
            
    });
  });
  $(".btn-info").click(function(){
    var esteBoton= $(this);
    var id = esteBoton.parent().parent().find("#id_producto").text();
    var name=esteBoton.parent().parent().find("#name").text();
    swal({
        title: "Gracias por contactarnos",
        text: "Su petición fue enviada en breve nos contactaremos con usted.",
        icon: "success",
        buttons: true,
      })
 }); 
}); 