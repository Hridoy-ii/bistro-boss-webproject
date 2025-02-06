import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_host_key = import.meta.env.VITE_image_upload_key;
const image_host_api = `https://api.imgbb.com/1/upload?key=${image_host_key}`


const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data, event) => {
        event.preventDefault();
        console.log(data)
        // upload image to to imgbb server and get an url
        const imgFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_host_api, imgFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res.data);

        // need to send the data to the database
        if (res.data.success) {
            // picking data as like as the database json format to send
            const menuItem = {
                name: data.Name,
                category: data.Category,
                price: parseFloat(data.Price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            console.log("after wrapping data:", menuItem);

            // now sending data to the backend
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes);
            if (menuRes.data.insertedId) {

                // success alert
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Menu Item added successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
            }

        }
        console.log("with img url", res.data);


    };
    return (
        <div>
            <SectionTitle heading="Add Item" subHeading="What's new?"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input type="text" placeholder="Recipe Name"
                            className="input input-bordered w-full"
                            {...register("Name", { required: true })}
                        />
                    </label>

                    <div className="flex gap-6 my-6">
                        {/* Category */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select className="select select-bordered"
                                {...register("Category", { required: true })}>
                                <option value="">Category</option>
                                <option value="Salad">Salad</option>
                                <option value="Desert">Desert</option>
                                <option value="Pizza">Pizza</option>
                                <option value="Soup">Soup</option>
                                <option value="Drinks">Drinks</option>
                            </select>
                        </label>

                        {/* Price */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input type="number" placeholder="Price"
                                className="input input-bordered w-full"
                                {...register("Price", { required: true })}
                            />
                        </label>

                    </div>

                    {/* Recipe Details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details*</span>
                        </div>
                        <textarea className="textarea textarea-bordered h-24" placeholder="Recipe Details"
                            {...register("recipe", { required: true })}
                        ></textarea>
                    </label>

                    {/* File input */}
                    <label className="form-control w-full max-w-xs my-6">
                        <div className="label">
                            <span className="label-text">Choose a file</span>
                        </div>
                        <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </label>

                    <button className="btn">
                        Add Item <FaUtensils className="ml-2"></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;