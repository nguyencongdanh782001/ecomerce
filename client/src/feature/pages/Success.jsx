import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import * as api from '../../api/orderApi'
const Success = () => {
    const location = useLocation();
    //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
    const data = location.state.stripeData;
    const cart = location.state.cart;
    const { currentUser } = useSelector((state) => state.user);
    const { currentAuthUser } = useSelector((state) => state.auth);
    const [orderId, setOrderId] = useState(null);
    console.log({ data, cart, currentUser, currentAuthUser });
    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await api.createOrder({
                    userId: currentUser._id ? currentUser._id : currentAuthUser._id,
                    products: cart.products.map((item) => ({
                        productId: item._id,
                        quantity: item._quantity,
                    })),
                    amount: cart.total,
                    address: data.billing_details.address,
                });
                setOrderId(res.data._id);
            } catch { }
        };
        data && createOrder();
    }, [cart, data, currentUser, currentAuthUser._id]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {orderId
                ? `Order has been created successfully. Your order number is ${orderId}`
                : `Successfull. Your order is being prepared...`}
            <Link to='/' style={{ padding: 10, marginTop: 20, border: '1px solid black', textDecoration: 'none', color: 'inherit', backgroundColor: 'whitesmoke' }}>Go to Homepage</Link>
        </div>
    );
};

export default Success;