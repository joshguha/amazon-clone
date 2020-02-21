import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
	const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState(""),

    const signIn = e => {
        e.preventDefault();

        auth
        .signInWithEmailAndPassword(email, password)
        .then(auth => {
            history.push("/")
        })
        .catch(error => alert(error.message))
    }

    

	return <div></div>;
}

export default Login;
