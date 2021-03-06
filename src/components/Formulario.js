import React, {useState} from 'react';
import styled from '@emotion/styled';
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from '../helper';
import PropTypes from 'prop-types';

const Campo = styled.div`
	display: flex;
	margin-bottom: 1rem;
	align-items: center;
`;

const Label = styled.label`
	flex: 0 0 100px;
`;

const Select = styled.select`
	display: block;
	width: 100%;
	padding: 1rem;
	border: 1px solid #e1e1e1;
	--webkit-appearance: none;
`;

const InputRadio = styled.input`
	margin: 0 1rem;
`;

const Boton = styled.button`
	background-color: #00838f;
	font-size: 16px;
	width: 100%;
	padding: 1rem;
	color: #fff;
	text-transform: uppercase;
	font-weight: bold;
	border: none;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #23c6da;
		cursor: pointer;
	}
`;

const Error = styled.div`
	background-color: red;
	color: white;
	padding: 1rem;
	width: 100%;
	text-align: center;
	margin-bottom: 2rem;
`;
const Formulario = ({setResumen, setCargando}) => {
	const [datos, setDatos] = useState({
		marca: '',
		anio: '',
		plan: '',
	});

	const [error, setError] = useState(false);

	//extraer los valores del state
	const {marca, anio, plan} = datos;

	//leer los datos del formulario y colocarlos en el state
	const obtenerInformacion = e => {
		setDatos({
			...datos,
			[e.target.name]: e.target.value,
		});
	};

	//cuando el usuario presiona submit

	const cotizarSeguro = e => {
		e.preventDefault();
		if (marca.trim() === '' || anio.trim() === '' || plan.trim() === '') {
			setError(true);
			return;
		}
		setError(false);

		//Una base de 2000
		let resultado = 2000;

		//obtener la diferencia de años

		const diferencia = obtenerDiferenciaAnio(anio);
		//por cada año hay que restar el 3%
		resultado -= (diferencia * 3 * resultado) / 100;

		console.log(resultado);

		//Americano 15
		//Asiatico 5%
		//Europeo 30%
		resultado = calcularMarca(marca) * resultado;

		console.log(resultado);

		//Basico aumenta 20%
		//Completo 50%
		const incrementoPlan = obtenerPlan(plan);

		resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

		setCargando(true);
		setTimeout(() => {
			setCargando(false);
			setResumen({
				cotizacion: Number(resultado),
				datos,
			});
		}, 3000);
	};
	return (
		<form onSubmit={cotizarSeguro}>
			{error ? <Error>Todos los campos son obligatorios</Error> : null}

			<Campo>
				<Label>Marca: </Label>
				<Select name="marca" value={marca} onChange={obtenerInformacion}>
					<option value="">Seleccione la marca</option>
					<option value="Americano">Americano</option>
					<option value="Europeo">Europeo</option>
					<option value="Asiatico">Asiatico</option>
				</Select>
			</Campo>
			<Campo>
				<Label>Año: </Label>
				<Select name="anio" anio={anio} onChange={obtenerInformacion}>
					<option value="">Seleccione el año</option>
					<option value="2021">2021</option>
					<option value="2020">2020</option>
					<option value="2019">2019</option>
					<option value="2018">2018</option>
					<option value="2017">2017</option>
					<option value="2016">2016</option>
					<option value="2015">2015</option>
					<option value="2014">2014</option>
					<option value="2013">2013</option>
					<option value="2012">2012</option>
				</Select>
			</Campo>
			<Campo>
				<Label>Plan: </Label>
				<InputRadio
					type="radio"
					name="plan"
					value="basico"
					checked={plan === 'basico'}
					onChange={obtenerInformacion}
				/>
				Basico
				<InputRadio
					type="radio"
					name="plan"
					value="completo"
					checked={plan === 'completo'}
					onChange={obtenerInformacion}
				/>
				Completo
			</Campo>
			<Boton type="submit">Cotizar</Boton>
		</form>
	);
};

Formulario.propTypes = {
	setResumen: PropTypes.func.isRequired,
	setCargando: PropTypes.func.isRequired,
};

export default Formulario;
