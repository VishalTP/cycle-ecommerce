import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

import "./Payment.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));


    const navigate = useNavigate()

    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            console.log(paymentData)
            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );

            // const client_secret = data.client_secret;

            // if (!stripe || !elements) return;

            // const result = await stripe.confirmCardPayment(client_secret, {
            //     payment_method: {
            //         card: elements.getElement(CardNumberElement),
            //         billing_details: {
            //             name: user.name,
            //             email: user.email,
            //             address: {
            //                 line1: shippingInfo.address,
            //                 city: shippingInfo.city,
            //                 state: shippingInfo.state,
            //                 postal_code: shippingInfo.pinCode,
            //                 country: shippingInfo.country,
            //             },
            //         },
            //     },
            // });

            //////////////////////////////////////////////////dummy code
            const result = {
                paymentIntent:{
                    status: "succeeded",
                    id: Math.random()*33232323232323
                },
                error: null
            }
            //////////////////////////////////////////////////

            if (result.error) {
                payBtn.current.disabled = false;

                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {

                    const order = {
                        shippingInfo,
                        orderItems: cartItems,
                        paymentInfo : {
                            id: result.paymentIntent.id,
                            status: result.paymentIntent.status,
                        },
                        itemsPrice: orderInfo.subtotal,
                        taxPrice: orderInfo.tax,
                        shippingPrice: orderInfo.shippingCharges,
                        totalPrice: orderInfo.totalPrice,
                    };

                      dispatch(createOrder(order));

                    navigate("/success");
                } else {
                    //   alert - "There's some issue while processing payment ";
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            //   alert -error.response.data.message;
        }
    };

    useEffect(() => {
        if (error) {
            //   alert
              dispatch(clearErrors());
        }
    }, [dispatch, error]);

    return (
        <Fragment>
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <h2>Card Info</h2>
                    <div>
                        {/* CreditCardIcon  */}
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        {/* EventIcon  */}
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        {/* VpnKeyIcon  */}
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </Fragment>
    );
};

export default Payment;