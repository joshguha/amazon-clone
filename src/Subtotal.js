import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
	const history = useHistory();
	const [{ basket }, dispatch] = useStateValue();

	return (
		<div className="subtotal">
			<CurrencyFormat />
		</div>
	);
}
