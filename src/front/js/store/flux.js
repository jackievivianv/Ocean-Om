import { useState } from "react";
import { element } from "prop-types";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: [],
			loggedUser: null,
			jivamuktiYoga: [],
			jivamuktiSessionInfo: {},
			vinyasaYoga: [],
			vinyasaSessionInfo: {},
			hathaYoga: [],
			rocketYoga: [],
			ashtangaYoga: [],
			meditation: [],
			harmonium: [],
			teachers: [],
			singleYogaSessionInfo: {},
			contactus: {},
			payment: {},
			testimonials: []

			// demo: [
			// 	{
			// 		title: "FIRST",
			// 		background: "white",
			// 		initial: "white"
			// 	},
			// 	{
			// 		title: "SECOND",
			// 		background: "white",
			// 		initial: "white"
			// 	}
			// ]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello") // Aqui se esta usando la variable de entorno
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			login: async (email, password) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						// mode: 'cors',
						body: JSON.stringify({
							"email": email,
							"password": password
						})
					})
					let data = await response.json()
					if (response.status === 401) {
						return 401;
					}
					if (response.status === 403) {
						return 403;
					}
					localStorage.setItem("token", data.access_token)
					localStorage.setItem("user", JSON.stringify(data.user)) //para convertir los datos en string
					setStore({ loggedUser: data })
					// console.log(data);
					return true
				} catch (error) {
					// console.log(error);
					return false
				}
			},
			signup: async (name, lastname, email, password, confirmPassword) => {
				// console.log("funciona")
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							"email": email,
							"password": password,
							"name": name,
							"last_name": lastname,
						})
					})
					let data = await response.json()

					if (response.status === 401) {
						return false;
					}
					// Almacenamos el clientsecret y la session id que nos da stripe en el local storage para pasarsela al formulario
					localStorage.setItem("payment", JSON.stringify({ clientSecret: data.clientSecret, session_id: data.session_id }))

					return true
				} catch (error) {
					// console.log(error);
					return false
				}
			},

			signupFree: async (name, lastname, email, password, confirmPassword) => {
				// console.log("funciona")
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/signup/freetrial", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							"email": email,
							"password": password,
							"name": name,
							"last_name": lastname,
						})
					})
					let data = await response.json()

					if (response.status === 401) {
						return false;
					}
					// Almacenamos el clientsecret y la session id que nos da stripe en el local storage para pasarsela al formulario
					localStorage.setItem("payment", JSON.stringify({ clientSecret: data.clientSecret, session_id: data.session_id }))

					return true
				} catch (error) {
					// console.log(error);
					return false
				}
			},

			getUserProfile: async () => {
				let token = localStorage.getItem("token")
				try {
					let response = await fetch(process.env.BACKEND_URL + `/api/user`, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}` //pondremos el token en headers
						},
					});
					let data = await response.json();
					if (response.status === 200) {
						setStore({ user: data.user });
					}
					return true
				} catch (err) {
					console.error(err);
					return false
				}
			},





			getAllSessions: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/yogatype");
					// console.log(response.status);
					if (response.status === 200) {
						const data = await response.json();
						// console.log(data);
						setStore({ jivamuktiYoga: data.jivamukti_sessions, vinyasaYoga: data.vinyasa_sessions, hathaYoga: data.hatha_sessions, ashtangaYoga: data.ashtanga_sessions, rocketYoga: data.rocket_sessions, meditation: data.meditation_sessions, harmonium: data.harmonium_sessions });
						return true;
					} else {
						throw new Error("Error fetching Yoga sessions");
					}
				} catch (error) {
					console.error(error);
					return false;
				}
			},

			getOneYogatypeSession: async (yogatype, yogatype_Id) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + `/api/${yogatype}/${yogatype_Id}`, {
						method: "GET",
					});
					let data = await response.json();
					console.log(yogatype, yogatype_Id);
					if (response.status === 200) {
						if (yogatype == 'jivamuktiyoga') {
							setStore({ singleYogaSessionInfo: data.jivamukti_session })
						}
						else if (yogatype == 'vinyasayoga') {
							setStore({ singleYogaSessionInfo: data.vinyasa_session })
						}
						else if (yogatype == 'rocketyoga') {
							setStore({ singleYogaSessionInfo: data.rocket_session })
						}
						else if (yogatype == 'ashtangayoga') {
							setStore({ singleYogaSessionInfo: data.rocket_session })
						}
						else if (yogatype == 'hathayoga') {
							setStore({ singleYogaSessionInfo: data.hatha_session })
						}
						else if (yogatype == 'meditation') {
							setStore({ singleYogaSessionInfo: data.meditation_session })
						}
						else if (yogatype == 'harmonium') {
							setStore({ singleYogaSessionInfo: data.harmonium_session })
						}
						return true
					} else {
						throw new Error("Error fetching session yoga info");
					}
				} catch (err) {
					console.error(err);
					return false
				}
			},

			getAllTeachers: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/theteachers");
					// console.log(response.status);

					if (response.status === 200) {
						const data = await response.json();
						setStore({ teachers: data.theteachers });
						return true;
					} else {
						throw new Error("Error fetching teachers data");
					}
				} catch (error) {
					console.error(error);
					return false;
				}
			},

			unsubscribe: async () => {
				let token = localStorage.getItem("token")
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/unsubscribe", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}` //pondremos el token en headers
						},
					})
					if (response.status === 200) {
						// console.log("unsubscribed")
						return true;
					}
					else {
						throw new Error("Error unsubscribing");
					}
				} catch (error) {
					// console.error(error);
					return false;
				}


			},
			contactus: async (email, name, message) => {
				// console.log(email, password);
				// console.log("funciona")
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/contactus", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						// mode: 'cors',
						body: JSON.stringify({
							"email": email,
							"name": name,
							"message": message
						})
					})
					let data = await response.json()
					if (response.status === 401) {
						return false;
					}
					localStorage.setItem("token", data.access_token)
					console.log(data);
					return true
				} catch (error) {
					console.log(error);
					return false
				}
			},

			logout: () => {
				// console.log("Logging out...");
				localStorage.removeItem("token"); // Elimina el token del almacenamiento local
				localStorage.removeItem("user"); // Elimina los datos de usuario del almacenamiento local
				setStore({ loggedUser: null }); // Actualiza el estado indicando que no hay un usuario autenticado
				console.log(store.loggedUser)
			},
			resetPassword: async (email) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/reset-password", {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ email }),
					});
					if (response.ok) {
						return { success: true, message: 'Password reset successful. Check your email for the new password.' };
					} else {
						const data = await response.json();
						console.error('Error response from server:', data);
						return { success: false, message: 'Error: User not found' };
					}
				} catch (error) {
					// console.error('Error:', error);
					return { success: false, message: `An unexpected error occurred.` };
				}
			},

			testimonials: async (title, description, date) => {
				// console.log(email, password);
				// console.log("funciona")
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/testimony", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						// mode: 'cors',
						body: JSON.stringify({
							"title": title,
							"description": description,
							"date": date
						})
					})
					let data = await response.json()
					if (response.status === 401) {
						return false;
					}
					localStorage.setItem("token", data.access_token)
					console.log(data);
					return true
				} catch (error) {
					console.log(error);
					return false
				}
			},

			getAllTestimonials: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/testimony");


					if (response.status === 200) {
						const data = await response.json();
						setStore({ testimonials: data.testimony });
						return true;
					} else {
						throw new Error("Error fetching testimonials data");
					}
				} catch (error) {
					console.error(error);
					return false;
				}
			},

		}
	}
};

export default getState;


