import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import "../../styles/aboutUs.css";
import logo from "../../img/logoOCEANOM.png";


import imagenClases from "../../img/fotonavacerrada.jpeg"
import imagenThePractices from "../../img/thepracticesSINFONDO.png"


export const AboutUs = () => {
	const [state, setState] = useState({

	});


	const { store, actions } = useContext(Context);


	useEffect(() => {

	}, []);




	return (


		<div className="backgroundWaves container-fluid mt-5 pt-5 text-center min-vh-100">
			<div className="mx-auto opacity-75 min-vh-100">
				<div className="d-flex justify-content-center mt-4 pt-4 mx-auto row">
					<h1 className="poiret-one-regular text-dark col-sm-12 col-md-6">About Us</h1>
				</div>
				<div className="container-fluid d-flex justify-content-center ">
					<div className="p-5 pt-3">
						<img className="img-fluid rounded-6" src="https://www.webconsultas.com/sites/default/files/styles/wch_image_schema/public/temas/yoga.jpg" style={{ maxWidth: "20rem" }} alt="Yoga" />
						<div className="mt-3">
							<p className="text-dark poiret-one-regular">
								Ocean of Om is a worldwide Yoga Hub, which looks for create a yoga community that doesn't know about separation. That is unified by one unique ocean. We want to put down the walls between the sky and the sea, the students and the teachers, one country and another and between us and you. Our purpose is to create a place for you to practice with any teacher without the barriers of physical distance. Also, we want teachers to expand their spiritual teachings to the whole world. We know changing the globe can be a huge purpose, but at least we want to touch people's heart. Your heart.
							</p>
						</div>
					</div>
				</div>
				<div className="mt-2 pb-0">
					<Link to="/sessions">
						<button className="btn btn-outline-secondary">Back to sessions</button>
					</Link>
				</div>
			</div>
		</div>


	);
};
