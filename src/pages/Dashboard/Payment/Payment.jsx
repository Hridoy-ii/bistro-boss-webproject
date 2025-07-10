import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckoutForm from './CheckoutForm';
import { FaCreditCard } from 'react-icons/fa6';

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_payment_PK_stripe);

const appearance = {
    theme: 'night',
    variables: {
        colorPrimary: '#fb923c', // Tailwind orange-400
        colorBackground: '#1e293b', // slate-800
        colorText: '#f1f5f9', // slate-100
        borderRadius: '8px',
        fontFamily: 'Inter, sans-serif',
    },
    rules: {
        '.Input': {
            padding: '12px',
        },
        '.Tab': {
            padding: '10px 14px',
            border: '1px solid #334155', // slate-700
        },
    }
};

const options = {
    appearance,
};

const Payment = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <SectionTitle
                heading="Payment Gateway"
                subHeading="Pay for delicious food"
            />
            <div className="card w-full md:w-3/4 mx-auto bg-base-100 shadow-xl border-0 border-b-4 border-orange-400">
                <div className="card-body">
                    <div className="flex items-center gap-3 mb-6 justify-center">
                        <FaCreditCard className="text-2xl text-slate-900" />
                        <h2 className="text-xl font-semibold text-slate-900">
                            Enter Your Payment Details
                        </h2>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg">
                        <Elements stripe={stripePromise} options={options}>
                            <CheckoutForm />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;