export function obtenerDiferenciaAnio(anio) {
	return new Date().getFullYear() - anio;
}

//calcular el total a pagar segun la marca

export function calcularMarca(marca) {
	let incremento;

	switch (marca) {
		case 'Europeo':
			incremento = 1.3;

			break;
		case 'Americano':
			incremento = 1.15;
			break;
		case 'Asiatico':
			incremento = 1.05;
			break;
		default:
			break;
	}
	return incremento;
}

//Calcula el tipo de seguro
export function obtenerPlan(plan) {
	return plan === 'basico' ? 1.2 : 1.5;
}

//Mostrar la primer letra mayuscula
export function primerLetraMayuscula(texto) {
	return (
		texto.charAt(0).toUpperCase() + texto.slice(1)
	);
}
