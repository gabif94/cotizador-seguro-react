import React from 'react';
import styled from '@emotion/styled';
import {primerLetraMayuscula} from '../helper';
import PropTypes from 'prop-types';

const ContenedorResumen = styled.div`
	padding: 1rem;
	text-align: center;
	background-color: #00838f;
	color: #fff;
	margin-top: 1rem;
`;

const Resumen = ({datos}) => {
	//extraer datos
	const {marca, anio, plan} = datos;

	if (marca === '' || anio === '' || plan === '') return null;

	return (
		<ContenedorResumen>
			<h2>Resumen de Cotización</h2>

			<ul>
				<li>Marca: {primerLetraMayuscula(marca)}</li>
				<li>Plan: {primerLetraMayuscula(plan)}</li>
				<li>Año del auto: {anio} </li>
			</ul>
		</ContenedorResumen>
	);
};

Resumen.propTypes = {
	datos: PropTypes.object.isRequired,
};

export default Resumen;
