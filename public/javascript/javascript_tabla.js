$(document).ready(function () {
    
            //$("#contenido").html(htmlpuro)
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