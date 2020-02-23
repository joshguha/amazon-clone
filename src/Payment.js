import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "axios";
import { db } from "./firebase";

function Payment() {
	const [{ basket, user }, dispatch] = useStateValue();
	const history = useHistory();

	const stripe = useStripe();
	const elements = useElements();

	const [suceeded, setSuceeded] = useState(false);
	const [processing, setProcessing] = useState("");
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState(true);

	useEffect(() => {
		// generates stripe secret which charges customer
		const getClientSecret = async () => {
			const response = await axios({
				method: "post",
				// Stripe expects the total in a currencies' subunits
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
			});

			setClientSecret(response.data.clientSecret);
		};

		getClientSecret();
	}, [basket]);
}

const handleSubmit = async (event) => {
	event.preventDefault();
	setProcessing(true);

	const payload = await stripe
		.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(cardElement),
			},
		})
		.then(({ paymentIntent }) => {
			db.collection("users")
				.doc(user?.uid)
				.collection("orders")
				.doc(paymentIntent.id)
				.set({
					basket: basket,
					amount: paymentIntent.amount,
					created: payment.created,
				});

			setSuceeded(true);
			setError(null);
			setProcessing(false);

			dispatch({
				type: "EMPTY_BASKET",
            });
            
			history.replace("/orders");
		});
};

export default Payment;
