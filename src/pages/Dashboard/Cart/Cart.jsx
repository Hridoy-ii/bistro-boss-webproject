import { FaTrash } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useState } from "react";


const Cart = () => {
    const [cart, refetch] = useCart();
    const axiosSecure = useAxiosSecure();
    const [coupon, setCoupon] = useState("");
    const [discountApplied, setDiscountApplied] = useState(false);

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const discountedPrice = discountApplied ? (totalPrice * 0.8).toFixed(2) : totalPrice.toFixed(2);

    const handleApplyCoupon = () => {
        if (coupon.trim().toLowerCase() === "newbie" && !discountApplied) {
            Swal.fire({
                icon: "success",
                title: "Coupon Applied!",
                text: "20% discount applied successfully.",
                timer: 1500,
                showConfirmButton: false
            });
            setDiscountApplied(true);
        } else if (discountApplied) {
            Swal.fire("Already Applied", "Coupon has already been used.", "info");
        } else {
            Swal.fire("Invalid Coupon", "Please enter a valid coupon code.", "error");
        }
    };

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success",
                                timer: 1000
                            });
                        }
                    });
            }
        });
    };

    return (
        <div className="px-4">
            {/* Top Summary */}
            <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-semibold">
                    Items: {cart.length}
                </h2>
                <h2 className="text-3xl font-semibold">
                    Total: <span className={discountApplied ? "line-through text-red-500 mr-2" : ""}>${totalPrice.toFixed(2)}</span>
                    {discountApplied && <span className="text-green-600 font-bold">${discountedPrice}</span>}
                </h2>
            </div>

            

            {/* Order Item Table */}
            <div className="overflow-x-auto mb-10">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="btn btn-ghost btn-lg text-red-700"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {/* Pay Button - Bottom Right */}
            <div className="flex justify-between">
                {/* Coupon Input */}
                <div className="flex items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        className="input input-bordered w-full max-w-xs"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        disabled={discountApplied}
                    />
                    <button 
                        onClick={handleApplyCoupon}
                        className="btn btn-primary border-0 border-b-2 border-orange-400 "
                        disabled={discountApplied}
                    >
                        Apply
                    </button>
                </div>
                <Link to="/dashboard/payment" state={{ total: discountedPrice }}>
                    <button className="btn btn-primary">Pay</button>
                </Link>
            </div>
        </div>
    );
};

export default Cart;