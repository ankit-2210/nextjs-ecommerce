import React, { useEffect } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { Grid, Pagination, Stack } from "@mui/material";
import ProductPerfomance from "../../src/components/dashboard/ProductPerfomance"
import mongoose from "mongoose";
import Product from '../../models/Product';

const viewproducts = ({ products }) => {
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
                <ProductPerfomance count={10} products={products} />
                <Pagination count={10} />
            </FullLayout>
        </ThemeProvider>
    )
}

export default viewproducts;

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