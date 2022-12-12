import { useMoralis } from "react-moralis";
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

export default function Header() {
    const {
        enableWeb3,
        account,
        isWeb3Enabled,
        Moralis,
        deactivateWeb3,
        isWeb3EnableLoading,
    } = useMoralis();

    async function connectWallet() {
        try {
            await enableWeb3();
            window.localStorage.setItem("Connected", "injected");
        } catch (e) {
            console.log("error connecting wallet:", e);
        }
    }

    // connect wallet on page load
    useEffect(() => {
        if (isWeb3Enabled) return;
        if (typeof window !== "undefined") {
            console.log("MetaMask is installed!");
            if (window.localStorage.getItem("Connected")) {
                enableWeb3();
            }
        }
    }, [isWeb3Enabled]);

    // account changed or disconnected
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log("account changed", account);
            if (!account) {
                window.localStorage.removeItem("Connected");
                deactivateWeb3();
                console.log("Wallet disconnected");
            }
        });
    });

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

    const pages = ["Host Event", "Profile"];

    return (
        <AppBar className="navbar" position="static">
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
                            <Button
                                variant="contained"
                                onClick={connectWallet}
                                disabled={isWeb3EnableLoading}
                                sx={{
                                    my: 2,
                                }}
                            >
                                {account ? "Connected" : "Connect Wallet"}
                            </Button>
                        </Box>
                    </Item>
                </Grid>
            </Grid>
        </AppBar>
    );
}
