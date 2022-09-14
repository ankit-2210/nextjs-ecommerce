import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme"
import Orders from '../../src/components/dashboard/Orders';
import Order from '../../models/Order';
import mongoose from "mongoose";

const allorders = ({ orders }) => {

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
                <Orders count={10} orders={orders} />
            </FullLayout>
        </ThemeProvider>
    )
}

export default allorders;

export async function getServerSideProps() {
    let error = null;
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    let orders = await Order.find();
    return { props: { orders: JSON.parse(JSON.stringify(orders)) } };
}