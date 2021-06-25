
document.addEventListener("DOMContentLoaded", async function () {
  console.log("DOM fully loaded and parsed");
  var elems = document.querySelectorAll(".sidenav");
  M.AutoInit();
  $(".datepicker").datepicker({
    format: "yyyy-mm-dd",
    autoClose: true,
    i18n: {
      months: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",],
      monthsShort: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic",],
      weekdaysFull: ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado",],
      weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      selectMonths: true,
      selectYears: 100, // Puedes cambiarlo para mostrar más o menos años
      today: "Hoy",
      close: "Ok",
      labelMonthNext: "Siguiente mes",
      labelMonthPrev: "Mes anterior",
      labelMonthSelect: "Selecciona un mes",
      labelYearSelect: "Selecciona un año",
      weekdaysAbbrev: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
    },
  });
  await traerUno();
  await traerUnHCD();
});





document.getElementById("fecha").addEventListener("change", async () => {
  let fecha = document.getElementById("fecha").value;
  console.log(fecha);
  await traerUno(fecha);
  await traerUnHCD(fecha);
});

async function traerUno(fechaa) {
  if (fechaa) {
    await fetch("php/traerUno.php?fecha=" + fechaa)
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data);
        if (data == false) {
          document.getElementById(
            "tabla"
          ).innerHTML = `<h4>Agentes municipales</h4><h3 style="padding:3%;" class="text-center">No hay datos de esta fecha.</h3>`;
        } else {
          await dibujar(data);
        }
      });
  } else {
    await fetch("php/traerUno.php")
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data);
        if (data == false) {
          document.getElementById(
            "tabla"
          ).innerHTML = `<h4>Agentes municipales</h4><h3 style="padding:3%;" class="text-center">Carga los datos de hoy para su vista previa.</h3>`;
        } else {
          await dibujar(data);
        }
      });
  }
}
async function traerUnHCD(fechaa) {
  if (fechaa) {
    await fetch("php/traerUnHCD.php?fecha=" + fechaa)
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data);
        if (data == false) {
          document.getElementById(
            "tablaHCD"
          ).innerHTML = `<h4>Agentes HCD</h4><h3 style="padding:3%;" class="text-center">No hay datos de esta fecha.</h3>`;
        } else {
          await dibujarHCD(data);
        }
      });
  } else {
    await fetch("php/traerUnHCD.php")
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data);
        if (data == false) {
          document.getElementById(
            "tablaHCD"
          ).innerHTML = `<h4>Agentes HCD</h4><h3 style="padding:3%;" class="text-center">Carga los datos de hoy para su vista previa.</h3>`;
        } else {
          await dibujarHCD(data);
        }
      });
  }
}

async function dibujar(params) {
  let tabla = `
    
    <h4 style="background: #19cbf7db;color: white;text-align:center;margin-bottom: 0;padding: 1%;border-radius: 2px;">Agentes municipales ${params.fecha} <a style="background:#1e88e5;" class="waves-effect waves-light btn btn-large" href="dompdf/imprimir_asistencia.php" target="_blanck">Imprimir</a></h4>
    <div class="table-responsive">
            <table class="table table-bordered table-sm highlight">
              <tbody>
                <tr style="background: #56555559;">
                  <th scope="row">E</th>
                  <td>Efectivos</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.efectivos} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr style="background: #56555559;">
                  <th scope="row">P</th>
                  <td>Presentes</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.presentes} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr style="background: #56555559;">
                  <th scope="row">A</th>
                  <td>Ausentes</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.ausentes} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">AIN</th>
                  <td>Ausente injustificado</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.a} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">LA</th>
                  <td>Licencia anual</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.la} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">AT</th>
                  <td>Accidente de trabajo</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.at} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">MATR</th>
                  <td>Matrimonio agente</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.matr} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">EST</th>
                  <td>Estudio</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.est} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">NAC</th>
                  <td>Nacimiento hijo</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.nac} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">LEA</th>
                  <td>Enfermedad agente</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.lea} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">LEF</th>
                  <td>Atencion familiar</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.lef} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">EXAM</th>
                  <td>Examenes</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.exam} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">LACT</th>
                  <td>Lactancia o alimentacion</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.lact} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">LF</th>
                  <td>Fallecimiento</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.lf} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">HC</th>
                  <td>Historia clinica</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.hc} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">MATERN</th>
                  <td>Maternidad</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.matern} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">RP</th>
                  <td>Razones particulares</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.rp} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">DONS</th>
                  <td>Donaciones de sangre</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.dons} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">JT</th>
                  <td>Jubilacion transitoria</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.jt} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">LI</th>
                  <td>Licencia invernal</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.li} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">MO</th>
                  <td>Mision oficial</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.mo} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">SUSP</th>
                  <td>Suspension</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.susp} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">LEE6M</th>
                  <td>Lic. Esp. Extr./6meses sin goce de haberes</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.lee6m} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">LEE1A</th>
                  <td>Lic. Esp. Extr./1año</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.lee1a} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">ADSC</th>
                  <td>Municipales adscriptos</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.adsc} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">LP</th>
                  <td>Licencia politica</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.lp} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">D538</th>
                  <td>Autorizado decreto 538/20</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.d538} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">CVPOSI</th>
                  <td>Covid positivo</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.cvp} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                  <th scope="row">AISLCE</th>
                  <td>Aislado contacto estrecho</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.aislce} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
                <tr>
                <th scope="row">POSTCOVID</th>
                <td>Post covid positivo</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.postCovidpos} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">FALLECIMIENTOCOVID</th>
                <td>Fallecimiento covid</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.fallecimientoCovid} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
                <tr>
                  <th scope="row">TICE</th>
                  <td>Total inactivos covid ejecutivo</td>
                  <td class="text-center" style="width: ;padding: 0px !important;">${params.ticp} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
                </tr>
              </tbody>
            </table>
          </div>
    `;
  document.getElementById("tabla").innerHTML = tabla;
}

async function dibujarHCD(params) {
  let tabla = `
  
  <h4 style="background: #e036bcbf;color: white;color: white;text-align:center;margin-bottom: 0;padding: 1%;border-radius: 2px;">Agentes HCD ${params.fecha}  <a style="background:#ca15f3;" class="waves-effect waves-light btn btn-large" href="dompdf/imprimir_asistenciaHCD.php" target="_blanck">Imprimir</a></h4>
  <div class="table-responsive">
          <table class="table table-bordered table-sm highlight">
            <tbody>
              <tr style="background: #56555559;">
                <th scope="row">E</th>
                <td>Efectivos</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.efectivos} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr style="background: #56555559;">
                <th scope="row">P</th>
                <td>Presentes</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.presentes} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr style="background: #56555559;">
                <th scope="row">A</th>
                <td>Ausentes</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.ausentes} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">AIN</th>
                <td>Ausente injustificado</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.a} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">LA</th>
                <td>Licencia anual</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.la} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">AT</th>
                <td>Accidente de trabajo</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.at} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">MATR</th>
                <td>Matrimonio agente</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.matr} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">EST</th>
                <td>Estudio</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.est} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">NAC</th>
                <td>Nacimiento hijo</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.nac} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">LEA</th>
                <td>Enfermedad agente</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.lea} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">LEF</th>
                <td>Atencion familiar</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.lef} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">EXAM</th>
                <td>Examenes</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.exam} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">LACT</th>
                <td>Lactancia o alimentacion</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.lact} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">LF</th>
                <td>Fallecimiento</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.lf} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">HC</th>
                <td>Historia clinica</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.hc} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">MATERN</th>
                <td>Maternidad</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.matern} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">RP</th>
                <td>Razones particulares</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.rp} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">DONS</th>
                <td>Donaciones de sangre</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.dons} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">JT</th>
                <td>Jubilacion transitoria</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.jt} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">LI</th>
                <td>Licencia invernal</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.li} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">MO</th>
                <td>Mision oficial</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.mo} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">SUSP</th>
                <td>Suspension</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.susp} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">LEE6M</th>
                <td>Lic. Esp. Extr./6meses sin goce de haberes</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.lee6m} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">LEE1A</th>
                <td>Lic. Esp. Extr./1año</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.lee1a} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">D538</th>
                <td>Autorizado decreto 538/20</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.d538} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">CVPOSI</th>
                <td>Covid positivo</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.cvp} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">AISLCE</th>
                <td>Aislado contacto estrecho</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.aislce} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">POSTCOVID</th>
                <td>Post covid positivo</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.postCovidpos} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">FALLECIMIENTOCOVID</th>
                <td>Fallecimiento covid</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.fallecimientoCovid} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
              <tr>
                <th scope="row">TICE</th>
                <td>Total inactivos covid ejecutivo</td>
                <td class="text-center" style="width: ;padding: 0px !important;">${params.ticp} <button class="waves-effect waves-light btn modal-trigger" href="#mostrarEmpleados" onclick="mostrarEmpleMotivo(this,${params.id})">Ver</button></td>
              </tr>
            </tbody>
          </table>
        </div>
  `;
  document.getElementById("tablaHCD").innerHTML = tabla;
}




document.getElementById("formulario1").addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(document.getElementById("formulario1"));
  fetch("php/addHCD.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then(async (data) => {
      console.log(data);
      traerUnHCD(document.getElementById("fechaH").value);
      document.getElementById("formulario1").reset();
      $(".modal").modal("close");
    });
});

/* //////////////////////////////////////////////////////////////////////////////// */
/* ////////////////////////MUNICIPALES BOTONES MODAL/////////////////////////////// */
/* //////////////////////////////////////////////////////////////////////////////// */

/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */

document.getElementById("formulario2").addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(document.getElementById("formulario2"));

  fetch("php/add.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then(async (data) => {
      console.log("Success:", data);
      traerUno(document.getElementById("fechaM").value);

      localStorage.clear();

      document.getElementById("formulario2").reset();
      /* document.getElementById("mostrarEmpleados").close(); */
      /* $('#mostrarEmpleados').modal('close'); */
      /* $('#mostrarEmpleados').closeModal(); */
      $(".modal").modal("close");
    });
});

function mostrarEmpleMotivo(e, idA) {
  let tituloModal =
    e.parentElement.parentElement.firstChild.nextSibling.nextSibling.nextSibling
      .innerHTML;
  let motivo = e.parentElement.parentElement.firstChild.nextSibling.innerHTML;


  document.getElementById("titulo").innerHTML = tituloModal;

  fetch("php/traerMotivo.php?id=" + idA + "&motivo=" + motivo)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let motivoEmple = ``;
      let emple =data.empleados.split("\n")
      emple.forEach(element => {
        motivoEmple+=`<p>${element}</p>`
      });

      if (data.empleados == "") {
        document.getElementById("empleaFaltan").innerHTML = "Nadie.";
      } else {
        document.getElementById("empleaFaltan").innerHTML = motivoEmple;
      }
    });
}
/* ////////////////////////MUNICIPALES BOTONES MODAL/////////////////////////////// */
/* ////////////////////////MUNICIPALES BOTONES MODAL/////////////////////////////// */
/* ////////////////////////MUNICIPALES BOTONES MODAL/////////////////////////////// */
/* //////////////////////////////////////////////////////////////////////////////// */
