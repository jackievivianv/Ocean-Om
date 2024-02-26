import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext.js";
import { prueba } from "../../img/rigo-baby.jpg";



export const JivamuktiCard = (props) => {
	const [state, setState] = useState({
		//initialize state here
	});

	const { store, actions } = useContext(Context);

	
	return (
		<div className="card mx-0 pl-0" style={{width: "18rem"}}>
            <Link>
			    <img src={`https://starwars-visualguide.com/assets/img/characters/${props.id}.jpg`} className="card-img-top" alt="..."/>
            </Link>
        <div className="card-body">
		  <h5 className="card-title">{props.name}</h5>
          <span className="card-title">{props.asanafocus}</span>
          <span className="card-title">{props.teacher}</span>
          <span className="card-title">{props.level}</span>
		</div>
		
	  </div>
	);
};



/**
 * Define the data-types for
 * your component's properties
 **/

JivamuktiCard.propTypes = {
	history: PropTypes.object,
	id: PropTypes.string
};

/**
 * Define the default values for
 * your component's properties
 **/

