/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    var loading = '<img src="img/loading.gif" alt=""/>';
    var efe_aja;
    function f_ajax(request, cadena, metodo) {
        this.efe_aja = $.ajax({
            url: request,
            cache: false,
            beforeSend: function () { /*httpR es la variable global donde guardamos la conexion*/
                $(document).ajaxStop();
                $(document).ajaxStart();
            },
            type: "POST",
            dataType: "html",
            contentType: 'application/x-www-form-urlencoded; charset=utf-8;',
            data: cadena,
            //timeout: 8000,
            success: function (datos) {
                metodo(datos);
            },
            error: function () {//jqXHR, textStatus, errorThrown 
                alert('Algunas funciones de sistema no se han cargado correctamente\n debido a un problema de conectividad con Internet.\n Verifique su conexión a internet');
            }
        });
    }


    function cargarTipo() {
        var request = "Logica/FiltroTipo.php";
        var cadena = "elem=Tipo";
        var metodoCal = function (datos) {
            var datos = $.parseJSON(datos);
            for (var contador in datos) {
                var tipo = datos[contador];
                $("#selectTipo").append("<option value='" + tipo.Tipo + "'>" + tipo.Tipo + "</option>");
            }
        };
        f_ajax(request, cadena, metodoCal);
    }
    function cargarCiudad() {
        var request = "Logica/FiltroTipo.php";
        var cadena = "elem=Ciudad";
        var metodoCal = function (datos) {
            var datos = $.parseJSON(datos);
            for (var contador in datos) {
                var tipo = datos[contador];
                $("#selectCiudad").append("<option value='" + tipo.Ciudad + "'>" + tipo.Ciudad + "</option>");
            }
            cargarTipo();
        };
        f_ajax(request, cadena, metodoCal);
    }
    cargarCiudad();


    $("#submitButton").click(function () {
        $("#Resultado").html("Procensado...." + loading);
        setTimeout(function () {
            var request = "Logica/Filtro.php";
            var cadena = $("#formulario").serialize();
            var metodoCal = function (datos) {
                llenar(datos);
            };
            f_ajax(request, cadena, metodoCal);
        }, 1000);
    });



    $("#todos").click(function () {
        $("#Resultado").html("Procensado...." + loading);
        setTimeout(function () {
            var request = "Logica/todo.php";
            var cadena = "acceso=true";
            var metodoCal = function (datos) {
                llenar(datos);
            };
            f_ajax(request, cadena, metodoCal);
        });
    });



    function llenar(Respuesta) {
        $("#Resultado").html("");
        var datos = $.parseJSON(Respuesta);
        if (datos != "") {
            for (var contador in datos) {
                var elemto = datos[contador];
                var div = $("<div></div>");
                div.css("width", "100%").css("overflow", "hidden").addClass("card-panel");
                var div1 = $("<div><img src='img/home.jpg' width='160px' alt='' /></div>");
                // div1.addClass("col s4");
                div1.css("float", "left");
                var div2 = $("<div></div>");
                var mensaje = "<b>Dirección:</b> " + elemto.Direccion + "<br>" +
                        "<b>Ciudad:</b> " + elemto.Ciudad + "<br>" +
                        "<b>Telefono:</b> " + elemto.Telefono + "<br>" +
                        "<b>Codigo Postal:</b> " + elemto.Codigo_Postal + "<br>" +
                        "<b>Tipo:</b> " + elemto.Tipo + "<br>" +
                        "<b>Precio:</b> " + elemto.Precio + "<br>";
                div2.css("float", "left").css("margin-left", "20px").html(mensaje);
                div.append(div1);
                div.append(div2);
                $("#Resultado").append(div);
            }
        }else{
            $("#Resultado").append("<center><h4>!Opsss! !Opsss!</h4></center>");
            $("#Resultado").append("<center><h5>No hay disponiblidad segun los criterios de Busqueda</h5></center>");
            $("#Resultado").append("<center><h5>Intenta modificando los criterios en los filtros</h5></center>");
        }
    }

});