import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme"
import Product from '../../models/Product';
import mongoose from "mongoose";

import { Grid, ImageList, ImageListItem } from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}



const ImageUploader = ({ products }) => {
    console.log(products);
    return (
        <ThemeProvider theme={theme}>
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
                        <BaseCard title="All Products Image">
                            <ImageList
                                sx={{ height: 650 }}
                                cols={4}
                                rowHeight={200}
                            >
                                {products.map((product) => (
                                    <ImageListItem
                                        key={product._id}
                                    >
                                        <img
                                            {...srcset(product.img, 121, product.rows, product.cols)}
                                            alt={product.title}
                                            loading="lazy"
                                            spacing={10}
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </BaseCard>
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default ImageUploader;

export async function getServerSideProps() {
    let error = null;
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    let products = await Product.find();
    return { props: { products: JSON.parse(JSON.stringify(products)) } };
}