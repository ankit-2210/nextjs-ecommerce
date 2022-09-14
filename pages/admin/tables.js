import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import Image from 'next/image'
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
import BaseCard from "../../src/components/baseCard/BaseCard";

const tables = () => {
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
                                        Title
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        Slug
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        Image
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        Size/Color
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography color="textSecondary" variant="h6">
                                        Price
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow >
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >

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
                                    <Typography color="textSecondary" variant="h6">
                                        <img style={{ height: '100px' }} />
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6"
                                        sx={{
                                            fontWeight: "600",
                                        }}>

                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">Rs. </Typography>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </BaseCard>
            </FullLayout>
        </ThemeProvider>
    )
}

export default tables;