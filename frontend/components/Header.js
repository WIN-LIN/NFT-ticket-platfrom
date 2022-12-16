import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import StoreIcon from "@mui/icons-material/Store";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Head from "next/head";
import { ConnectKitButton } from 'connectkit';

export default function Header() {

    const Search = styled("div")(({ theme }) => ({
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    }));
    const SearchIconWrapper = styled("div")(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }));
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: "inherit",
        "& .MuiInputBase-input": {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                width: "12ch",
                "&:focus": {
                    width: "20ch",
                },
            },
        },
    }));
    return (
        <>
            <Head>
                <title>Host your party!</title>
                <meta name="description" content="Ticket Platform" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppBar className="navbar" position="sticky">
                <Grid container spacing={1} >
                    <Grid item xs={3}>
                        <Item className="brand">
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                    paddingTop: "20px",
                                }}
                            >
                                <StoreIcon sx={{ mr: 1 }} />
                                Ticket Platform
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={3} className="search-bar">
                        <Item>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ "aria-label": "search" }}
                                />
                            </Search>
                        </Item>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "none", md: "flex" },
                                    justifyContent: "space-around",
                                    alignContent: "center",
                                }}
                            >
                                <Button
                                    sx={{
                                        my: 2,
                                        color: "black",
                                        display: "block",
                                        fontFamily: "monospace",
                                    }}
                                    href={`/host-event`}
                                >Host Event</Button>
                                <Button
                                    sx={{
                                        my: 2,
                                        color: "black",
                                        display: "block",
                                        fontFamily: "monospace",
                                    }}
                                    href={`/profile`}
                                >Profile</Button>
                                <div className="connect-wallet">
                                    <ConnectKitButton/>
                                </div>
                            </Box>
                        </Item>
                    </Grid>
                </Grid>
            </AppBar>
        </>
    );
}
