import React from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
	"pk_test_51HPvU9DFg5koCdLGJJbNo60QAU99BejacsvnKvT8xnCu1wFLCuQP3WBArscK3RvSQmSIB3N0Pbsc7TtbQiJ1vaOi00X9sIbazL"
);

useEffect(() => {
	auth.onAuthStateChanged((authUser) => {
		console.log("THE USER IS:", authUser);

		if (authUser) {
			dispatch({
				type: "SET_USER",
				user: authUser,
			});
		} else {
			dispatch({
				type: "SET_USER",
				user: null,
			});
		}
	});
}, []);

function App() {
	const [{}, dispatch] = useStateValue();

	return (
		<Router>
			<div className="app">
				<Switch>
					<Route path="/checkout">
						<h1>Checkout</h1>
					</Route>
					<Route path="/login">
						<h1>Login page</h1>
					</Route>
					<Route path="/">
						<h1>Home page</h1>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
