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
                  htmlpuro += '<td>' + '<div class="flip-box"> <div class="flip-box-inner"> <div class="flip-box-front"><img alt="'+msg[i][j].IMAGEN+'" src="../imagenes/'+msg[i][j].PRDIDENTI+'.jpg" width="200" height="200" class="img-circle" title="'+msg[i][j].name+'">  </div> <div class="flip-box-back"> <h2>'+msg[i][j].name+'</h2> <p>'+ msg[i][j].descripcion +'</p> </div> </div> </div>' + '</td>'
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
  
    /// lista de productos cuadricula
    $('#btnconsultar2').click(function () {
      var htmlpuro='<div class="row">';
      
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
                  htmlpuro += '<div class="col-lg-3 col-md-4 col-6 product-block">'
                  htmlpuro += '<section class="box style1">'
                  htmlpuro += '<div class="main-category-image">'
                  htmlpuro += '<img class="thumbnail img-portfolio img-hover mb-3" src="/imagenes/'+msg[i][j].PRDIDENTI+'.jpg" width="200" height="200 alt="">'
                  htmlpuro += '<div class="caption">'
                  htmlpuro += '<h5>'+ msg[i][j].PRDNOMBRE + '</h5>'
                  htmlpuro += '<div class="price-mob">'+parseFloat(Math.round(msg[i][j].PRDPVP * 100) / 100).toFixed(2)+'</div>'
                  htmlpuro += '<p>'+msg[i][j].PRDNOMBRE+'</p>'
                  htmlpuro += '</div></div></section></div>'
                  console.log(msg[i][j].IMAGEN)
                  var contador;
                  contador++;
              }
          }
          // gggf
          htmlpuro += '</div>';
          $("#contenido").html(htmlpuro)
              //$("#contenido").html(htmlpuro)
              
      });
    });

    $('#btnconsultar3').click(function () {
        var htmlpuro='<div class="row">';
        
        $.ajax({
            type: "GET",
            url: "/api/getProductosCoincidencia",
            dataType: "json",
            contentType: "text/plain"
        }).done(function (msg) {
            //este for entra al objeto peliculas del json "msg" "i" quedara en posicion u objeto 0
            for (let i in msg) {
                //el objeto peliculas del json es un array ahi recorreremos el array con j y sus propiedades
                // de cada j
                for (let j in msg[i]) {
                    htmlpuro += '<div class="col-lg-3 col-md-4 col-6 product-block">'
                    htmlpuro += '<section class="box style1">'
                    htmlpuro += '<div class="main-category-image">'
                    htmlpuro += '<img class="thumbnail img-portfolio img-hover mb-3" src="/imagenes/'+msg[i][j].PRDIDENTI+'.jpg" width="200" height="200 alt="">'
                    htmlpuro += '<div class="caption">'
                    htmlpuro += '<h5>'+ msg[i][j].PRDNOMBRE + '</h5>'
                    htmlpuro += '<div class="price-mob">'+parseFloat(Math.round(msg[i][j].PRDPVP * 100) / 100).toFixed(2)+'</div>'
                    htmlpuro += '<p>'+msg[i][j].PRDNOMBRE+'</p>'
                    htmlpuro += '</div></div></section></div>'
                    console.log(msg[i][j].IMAGEN)
                    var contador;
                    contador++;
                }
            }
            // gggf
            htmlpuro += '</div>';
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
  /////// validacion de imagen
  var extensionesValidas = ".png, .gif, .jpeg, .jpg";
       var pesoPermitido = 1024;
  
      // Cuando cambie #fichero
      $("#picture").change(function () {
  
          $('#texto').text('');
      $('#img').attr('src', '');
  
      if(validarExtension(this)) {
  
              if(validarPeso(this)) {
          verImagen(this);
          }
      }  
      });
  
      // Validacion de extensiones permitidas
  
      function validarExtension(datos) {
  
      var ruta = datos.value;
      var extension = ruta.substring(ruta.lastIndexOf('.') + 1).toLowerCase();
      var extensionValida = extensionesValidas.indexOf(extension);
  
      if(extensionValida < 0) {
              $('#texto').text('La extensión no es válida Su fichero tiene de extensión: .'+ extension);
              return false;
          } else {
              return true;
          }
      }
      // Validacion de peso del fichero en kbs
  
      function validarPeso(datos) {
  
        if (datos.files && datos.files[0]) {
  
      var pesoFichero = datos.files[0].size/1024;
  
      if(pesoFichero > pesoPermitido) {
          $('#texto').text('El peso maximo permitido del fichero es: ' + pesoPermitido + ' KBs Su fichero tiene: '+ pesoFichero +' KBs');
          return false;
      } else {
          return true;
      }
  }
    }
  
  // Vista preliminar de la imagen.
  function verImagen(datos) {
    
      if (datos.files && datos.files[0]) {
        
          var reader = new FileReader();
          reader.onload = function (e) {
            $('#img').attr('src', e.target.result);
            
          };
  
          reader.readAsDataURL(datos.files[0]);
          document.addEventListener("DOMContentLoaded", function(event) {
            document.getElementById("#guardar").disable=false;
          });
          
       }
   } 
  }); 