import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const UserHme = () => {
    const { user } = useAuth();
    const [recentOrders, setRecentOrders] = useState([]);
    const [offers, setOffers] = useState([]);
    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        // Replace these with real API calls later
        setRecentOrders([
            { id: 1, item: "Margherita Pizza", date: "2025-06-19", status: "Delivered" },
            { id: 2, item: "Cheesy Burger", date: "2025-06-18", status: "In Transit" }
        ]);

        setOffers([
            { id: 1, title: "🔥 20% OFF on all pastas", expires: "2025-06-25" },
            { id: 2, title: "🥤 Free Drink with any Burger", expires: "2025-06-22" }
        ]);

        setRecommended([
            { id: 1, name: "Spicy Chicken Wrap", image: "/images/wrap.jpg" },
            { id: 2, name: "Loaded Nachos", image: "/images/nachos.jpg" }
        ]);
    }, []);

    return (
        <div className="p-6 space-y-6">
            {/* Greeting with profile pic */}
            <div className="flex items-center space-x-4">
                {user?.photoURL && (
                    <img
                        src={user.photoURL}
                        alt="User"
                        className="w-12 h-12 rounded-full border shadow"
                    />
                )}
                <h2 className="text-2xl font-bold text-gray-800">
                    Hi {user?.displayName ? user.displayName : "Guest"}, welcome back!
                </h2>
            </div>

            {/* Offers */}
            <section>
                <h3 className="text-xl font-semibold mb-2">Today's Offers 🎉</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {offers.map(offer => (
                        <li key={offer.id} className="border p-4 rounded-md shadow-sm bg-yellow-50">
                            <p className="font-medium">{offer.title}</p>
                            <p className="text-sm text-gray-600">Valid until: {offer.expires}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Recent Orders */}
            <section>
                <h3 className="text-xl font-semibold mb-2">Your Recent Orders 📦</h3>
                <ul className="divide-y">
                    {recentOrders.map(order => (
                        <li key={order.id} className="py-2 flex justify-between items-center">
                            <div>
                                <p className="font-medium">{order.item}</p>
                                <p className="text-sm text-gray-500">{order.date}</p>
                            </div>
                            <span className={`text-sm font-semibold ${order.status === "Delivered" ? "text-green-600" : "text-blue-500"}`}>
                                {order.status}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Recommended */}
            <section>
                <h3 className="text-xl font-semibold mb-2">Recommended For You 🍽️</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {recommended.map(item => (
                        <div key={item.id} className="border rounded-md overflow-hidden shadow hover:shadow-md transition">
                            <img src={'item.image'} alt={item.name} className="w-full h-32 object-cover" />
                            <p className="text-center py-2 font-medium">{item.name}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default UserHme;