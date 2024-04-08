import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Testimony } from "../component/testimonialsCARD";
import { TestimonialForm } from "../component/testimonialFORM";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import "../../styles/testimonials.css";

export const Testimonials = () => {
	const { store, actions } = useContext(Context)



	useEffect(() => {
		// Llama a getAllTestimonials solo si store.testimonials es un array vacío
		actions.getAllTestimonials();

	}, [store.testimonials, actions]);

	return (

		<div className="container-fluid d-block mt-2 py-5 text-center backgroundWaves min-vh-100">
			<div className="d-block justify-content-center mt-5 pt-5">
				<h1 className="poiret-one-regular text-secondary fw-bold mb-5">Testimonials</h1>
				<div className="w-75 mx-auto">
					<hr className="border-bottom border-dark" />
				</div>
			</div>

			<div className="container-fluid mt-5">
				<div className="row justify-content-center align-items-center">
					{store.testimonials && store.testimonials.map(item => (
						<div className="col-12 mb-4 mt-2 mx-auto gap-1 align-self-center overflow-auto align-self-center" key={item.id}>
							<Testimony
								id={item.id}
								title={item.title}
								description={item.description}
								date={item.date}
							/>
						</div>
					))}
				</div>
				<TestimonialForm />
			</div>
			<div className="col-lg-12 col-md-12 col-sm-12 mb-4 mt-2 mt-4">
				<Link to="/sessions">
					<button className="btn btn-outline-secondary">Back to home</button>
				</Link>
			</div>
			<div className="my-5 mb-0">
                    <div>
                        <p className="mb-2 text-secondary">Follow us on</p>
                    </div>
                    <div>
                        <a href="https://twitter.com/oceanom" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                            <i className="fab fa-twitter fa-xl m-1" style={{ color: "#9b9d85" }}></i>
                        </a>
                        <a href="https://www.instagram.com/oceanom" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                            <i className="fab fa-instagram fa-xl m-1" style={{ color: "#9b9d85" }}></i>
                        </a>
                        <a href="https://www.facebook.com/ocean_om" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                            <i className="fab fa-facebook fa-xl m-1" style={{ color: "#9b9d85" }}></i>
                        </a>
                    </div>
                </div>
		</div>

	);
}








