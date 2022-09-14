import React, { useEffect } from "react";
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";


const Orders = ({ orders }) => {
    useEffect(() => {

    }, [])

    return (
        <BaseCard title="All Products">
            <Table
                aria-label="simple table"
                sx={{
                    mt: 3,
                    whiteSpace: "nowrap",
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                OrderId
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Email
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Products (Qty/ Price / Variant)
                            </Typography>
                        </TableCell>


                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Amount
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography color="textSecondary" variant="h6">
                                Status
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (

                        <TableRow key={order._id}>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                    <a href={'/order?id=' + order._id}>{order.orderId}</a>
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: "600",
                                            }}
                                        >
                                            {order.email}
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            sx={{
                                                fontSize: "13px",
                                            }}
                                        >
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {Object.keys(order.products).map((item) => {
                                        return (
                                            <div key="">
                                                <Typography>
                                                    {order.products[item].name} ({order.products[item].qty}/ {order.products[item].price} / {order.products[item].variant})
                                                </Typography>
                                            </div>
                                        )
                                    })
                                    }
                                </Typography>

                            </TableCell>
                            <TableCell>
                                <Typography>
                                    Rs. {order.amount}
                                </Typography>

                            </TableCell>

                            <TableCell align="right">
                                {order.status == 'Paid' ? <Typography variant="h6" color="green">{order.status}</Typography> : <Typography variant="h6" color="red">{order.status}</Typography>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </BaseCard >
    );
};

export default Orders;
