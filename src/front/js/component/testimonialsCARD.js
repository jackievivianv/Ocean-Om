import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
// import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../../styles/testimonials.css";

export const Testimony = (props) => {



    const [state, setState] = useState({
        //initialize state here
    });
    const { store, actions } = useContext(Context)

    // Convierte la cadena de fecha a un objeto Date
    const testimonialDate = new Date(props.date);

    // Extrae la parte de la fecha (sin la hora)
    const formattedDate = testimonialDate.toLocaleDateString();


    return (
        <div className="card p-4 mx-5 bg-body-tertiary rounded-3 mb-3">
            <div className="card-body d-sm-flex justify-content-sm-between align-items-sm-center pb-0 pt-0">
                <img src="https://res.cloudinary.com/dx23woi99/image/upload/v1708370471/om_1_cmnuza.png" className="me-sm-3 mb-sm-0" style={{ width: "3rem", height: "3rem" }} alt="User Avatar" />
                <h5 className="card-title text-secondary mb-0 poiret-one-regular">{props.title}</h5>
                <span className="card-title text-secondary ms-sm-3 fst-italic">{formattedDate}</span>
            </div>
            <div className="mx-auto mt-1">
                <span className="card-title text-secondary text-start">{props.description}</span><br />
            </div>
        </div>
    );
};



/**
* Define the data-types for
* your component's properties
**/

Testimony.propTypes = {
    history: PropTypes.object,
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string
};

/**
* Define the default values for
* your component's properties
**/

