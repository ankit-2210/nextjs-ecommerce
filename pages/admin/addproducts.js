import React, { useState } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";

const Addproducts = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [slug, setSlug] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [price, setPrice] = useState("");
    const [availableQty, setAvailableQty] = useState("");
    const [img, setImg] = useState("");
    const [desc, setDesc] = useState("");

    const handleChange = (e) => {
        if (e.target.name == "title") {
            setTitle(e.target.value);
        }
        else if (e.target.name == "category") {
            setCategory(e.target.value);
        }
        else if (e.target.name == "slug") {
            setSlug(e.target.value);
        }
        else if (e.target.name == "size") {
            setSize(e.target.value);
        }
        else if (e.target.name == "color") {
            setColor(e.target.value);
        }
        else if (e.target.name == "price") {
            setPrice(e.target.value);
        }
        else if (e.target.name == "availableQty") {
            setAvailableQty(e.target.value);
        }
        else if (e.target.name == "imageURL") {
            setImg(e.target.value);
        }
        else if (e.target.name == "desc") {
            setDesc(e.target.value);
        }
    }

    const SubmitBtn = async () => {
        price = parseInt(price);
        availableQty = parseInt(availableQty);
        const data = { title, slug, desc, img, category, size, color, price, availableQty };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addProducts`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        let res = await a.json();
        console.log(res);
        if (res.success) {
            toast.success("Product is added Successfully!", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            toast.error("Error! Try Again", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        setTitle("");
        setCategory("");
        setSlug("");
        setSize("");
        setColor("");
        setPrice("");
        setAvailableQty("");
        setImg("");
        setDesc("");
    }

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <style jsx global>{`
                header{
                    display:none
                }
                footer{
                    display:none
                }
                `}</style>
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <BaseCard title="Add a Products">
                            <Stack spacing={3}>
                                <TextField onChange={handleChange} value={title} name="title" label="Title" variant="outlined" />
                                <TextField onChange={handleChange} value={category} name="category" label="category" variant="outlined" />
                                <TextField onChange={handleChange} value={slug} name="slug" label="slug" variant="outlined" />
                                <TextField onChange={handleChange} value={size} name="size" label="size" variant="outlined" />
                                <TextField onChange={handleChange} value={color} name="color" label="color" variant="outlined" />
                                <TextField onChange={handleChange} value={price} name="price" label="price" variant="outlined" />
                                <TextField onChange={handleChange} value={availableQty} name="availableQty" label="availableQty" variant="outlined" />
                                <TextField onChange={handleChange} value={img} name="imageURL" label="imageURL" variant="outlined" />
                                <TextField
                                    onChange={handleChange}
                                    value={desc}
                                    name="desc"
                                    label="desc"
                                    multiline
                                    rows={4}
                                />

                            </Stack>
                            <br />
                            <button onClick={SubmitBtn} className="disabled:bg-green-300 flex mt-8 mr-2 text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded text-lg">Submit</button>
                        </BaseCard>
                    </Grid>

                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default Addproducts;