export default function validate(input) {
  let errors = {};
  var regex = new RegExp("^[0-9-]+$");
  if (!input.name) {
    errors.name = "Se requiere un nombre";
  } else if (input.name.length < 3 || input.name.length > 20) {
    errors.name = "El nombre debe tener entre 3 y 20 caracteres";
  } else if (/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\d/?~]/.test(input.name)) {
    errors.name = "Sólo ingrese letras";
  } else if (
    input.name.includes("-") ||
    input.name.charAt(input.name.length - 1) == " " ||
    input.name.charAt(0) == " "
  ) {
    errors.name =
      "¡Ingrese un nombre válido, pueden ser mayúsculas y minúsculas!";
  } else if (!input.height) {
    errors.height = "Se requiere una altura de formato 'Hmin-Hmax'";
  } else if (!input.height.charAt(input.height.indexOf("-") + 1)) {
    errors.height = "Se requiere la altura en formato 'Hmin-Hmax'";
  } else if (!input.height.includes("-")) {
    errors.height = "Se requiere la altura en formato 'Hmin-Hmax'";
  } else if (
    Number(input.height.split("-")[0]) > Number(input.height.split("-")[1])
  ) {
    errors.height = "La altura máxima debe ser mayor que la altura mínima";
  } else if (regex.test(input.height) == false) {
    errors.height = "Ingrese solo números enteros positivos";
  } else if (input.height.charAt(0) == "-") {
    errors.height = "Ingrese solo números enteros positivos";
  } else if (!input.weight) {
    errors.weight = "Se requiere el peso en formato 'Wmin-Wmax'";
  } else if (!input.weight.includes("-")) {
    errors.weight = "Se requiere el peso en formato 'Wmin-Wmax'";
  } else if (!input.weight.charAt(input.weight.indexOf("-") + 1)) {
    errors.weight = "Se requiere el peso en formato 'Wmin-Wmax'";
  } else if (
    Number(input.weight.split("-")[0]) > Number(input.weight.split("-")[1])
  ) {
    errors.weight = "El peso máximo debe ser mayor que el peso mínimo";
  } else if (regex.test(input.weight) == false) {
    errors.weight = "Ingrese solo números enteros positivos";
  } else if (input.weight.charAt(0) == "-") {
    errors.weight = "Ingrese solo números enteros positivos";
  } else if (!input.life_span) {
    errors.life_span = "Se requiere los años de vida en formato 'Vmin-Vmax'";
  } else if (!input.life_span.includes("-")) {
    errors.life_span = "Se requiere los años de vida en formato 'Vmin-Vmax'";
  } else if (!input.life_span.charAt(input.life_span.indexOf("-") + 1)) {
    errors.life_span = "Se requiere los años de vida en formato 'Vmin-Vmax'";
  } else if (
    Number(input.life_span.split("-")[0]) >
    Number(input.life_span.split("-")[1])
  ) {
    errors.life_span =
      "El máximo de los años de vida debe ser superior a la mínima";
  } else if (regex.test(input.life_span) == false) {
    errors.life_span = "Ingrese solo números enteros positivos";
  } else if (input.life_span.charAt(0) == "-") {
    errors.life_span = "Ingrese solo números enteros positivos";
  } else if (input.temperament?.length == 5) {
    errors.temperament = "Solo puedes ingresar hasta seis temperamentos";
  }
  if (!errors.name && !errors.height && !errors.weight && !errors.life_span) {
    document.getElementById("Create").disabled = false;
  } else {
    document.getElementById("Create").disabled = true;
  }
  return errors;
}
