(function () {
  "use strict";

  // variables del DOM
  let regalo = document.getElementById("regalo");

  document.addEventListener("DOMContentLoaded", function () {
    // CUERPO DE JS-----------------------------------------
    var map = L.map("mapa").setView([-31.416752, -64.183577], 17);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([-31.416752, -64.183577])
      .addTo(map)
      .bindPopup("GDLWebCamp 2020<br>Boletos ya disponibles")
      .openPopup();
    // .bindTooltip("Un Tooltip")
    // .openTooltip();
    // campos datos usuario
    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let email = document.getElementById("email");

    // campos pases
    let pase_dia = document.getElementById("pase_dia");
    let pase_dosdias = document.getElementById("pase_dosdias");
    let pase_completo = document.getElementById("pase_completo");

    // botones y divs
    let calcular = document.getElementById("calcular");
    let errorDiv = document.getElementById("error");
    let btnRegistro = document.getElementById("btnRegistro");
    let lista_productos = document.getElementById("lista-productos");
    let suma = document.getElementById("suma-total");

    //extras
    let camisas = document.getElementById("camisa_evento");
    let etiquetas = document.getElementById("etiquetas");

    // calculos -----------------------------------------

    calcular.addEventListener("click", calcularMontos);

    pase_dia.addEventListener("blur", mostrarDias);

    pase_dosdias.addEventListener("blur", mostrarDias);

    pase_completo.addEventListener("blur", mostrarDias);

    nombre.addEventListener("blur", validarCampos);
    apellido.addEventListener("blur", validarCampos);
    email.addEventListener("blur", validarCampos);
    email.addEventListener("blur", validarMail);

    // funciones -----------------------------------------
    function validarMail() {
      if (this.value.indexOf("@") > -1) {
        errorDiv.style.display = "none";
        this.style.border = "2px solid #ccc";
      } else {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = "Este campo debe tener al menos un @";
        this.style.border = "2px solid red";
        errorDiv.style.border = "2px solid red";
      }
    }

    function validarCampos() {
      if (this.value == "") {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = "Este campo es obligatorio";
        this.style.border = "2px solid red";
        errorDiv.style.border = "2px solid red";
      } else {
        errorDiv.style.display = "none";
        this.style.border = "2px solid #ccc";
      }
    }

    function calcularMontos(event) {
      event.preventDefault();
      if (regalo.value === "") {
        alert("Debes elegir un regalo");
        regalo.focus();
      } else {
        let boletosDia = parseInt(pase_dia.value, 10) || 0,
          boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
          boletosCompleto = parseInt(pase_completo.value, 10) || 0,
          cantidadCamisas = parseInt(camisas.value, 10) || 0,
          cantidadEtiquetas = parseInt(etiquetas.value, 10) || 0;

        let totalPagar =
          boletosDia * 30 +
          boletos2Dias * 45 +
          boletosCompleto * 60 +
          cantidadCamisas * 10 * 0.93 +
          cantidadEtiquetas * 2;

        let listadoProductos = [];
        if (boletosDia >= 1) {
          listadoProductos.push(boletosDia + " pase(s) por un dia");
        }
        if (boletos2Dias >= 1) {
          listadoProductos.push(boletos2Dias + " pase(s) por dos dias");
        }
        if (boletosCompleto >= 1) {
          listadoProductos.push(boletosCompleto + " pase(s) por los tres dias");
        }
        if (cantidadCamisas >= 1) {
          listadoProductos.push(cantidadCamisas + " camisa(s) del evento");
        }
        if (cantidadEtiquetas >= 1) {
          listadoProductos.push(cantidadEtiquetas + " paquete(s) de etiquetas");
        }

        lista_productos.style.display = "block";
        lista_productos.innerHTML = "";

        for (let i = 0; i < listadoProductos.length; i++) {
          lista_productos.innerHTML += listadoProductos[i] + "<br>";
        }
        suma.innerHTML = "$" + totalPagar.toFixed(2);
      }
    }

    function mostrarDias() {
      document.getElementById("viernes").style.display = "none";
      document.getElementById("sabado").style.display = "none";
      document.getElementById("domingo").style.display = "none";
      let boletosDia = parseInt(pase_dia.value, 10) || 0,
        boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
        boletosCompleto = parseInt(pase_completo.value, 10) || 0;

      let diasElegidos = [];

      if (boletosDia > 0) {
        diasElegidos.push("viernes");
      }
      if (boletos2Dias > 0) {
        diasElegidos.push("viernes", "sabado");
      }
      if (boletosCompleto > 0) {
        diasElegidos.push("viernes", "sabado", "domingo");
      }

      for (let i = 0; i < diasElegidos.length; i++) {
        document.getElementById(diasElegidos[i]).style.display = "block";
      }
    }
    // FIN CUERPO JS -----------------------------------------
  }); // DOM Content Loaded
})();

// jQuery-----------------------------------------

$(function () {
  "use strict";

  // -----------------------------------------
  //    Programa de Conferencias

  $(".programa-evento .info-curso:first").show();
  $(".menu-programa a:first").addClass("activo");

  $(".menu-programa a").on("click", function () {
    $(".menu-programa a").removeClass("activo");
    $(this).addClass("activo");
    $(".ocultar").hide();
    let enlace = $(this).attr("href");
    $(enlace).fadeIn(700);

    return false;
  });

  // -----------------------------------------
  //    Animaciones para los Numeros

  $(".resumen-evento li:nth-child(1) p").animateNumber({ number: 6 }, 2000);
  $(".resumen-evento li:nth-child(2) p").animateNumber({ number: 15 }, 2000);
  $(".resumen-evento li:nth-child(3) p").animateNumber({ number: 3 }, 2000);
  $(".resumen-evento li:nth-child(4) p").animateNumber({ number: 9 }, 2000);

  // -----------------------------------------
  //    Animaciones Countdown

  $(".cuenta-regresiva").countdown("2020/12/10 09:00:00", function (e) {
    $("#dias").html(e.strftime("%-D"));
    $("#horas").html(e.strftime("%-H"));
    $("#minutos").html(e.strftime("%-M"));
    $("#segundos").html(e.strftime("%-S"));
  });
});
