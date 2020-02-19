import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating }) {
	const [{ basket }, dispatch] = useStateValue();
}
