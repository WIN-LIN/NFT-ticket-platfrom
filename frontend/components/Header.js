import { useMoralis } from "react-moralis";
import { useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import StoreIcon from '@mui/icons-material/Store';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';

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

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    return (
        <AppBar className="navbar" position="static">
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Item className="brand">
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <StoreIcon sx={{ mr: 1 }} />
                            Ticket Platform
                        </Typography>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item className="search-bar">
                        <Search className="">
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item >
                        <Button variant="contained" onClick={connectWallet} disabled={isWeb3EnableLoading}>
                            {account ? "Connected to " + account.slice(0, 6)+ "..." + account.slice(account.length - 4)  : "Connect Wallet"}
                        </Button>
                    </Item>
                </Grid>
            </Grid>
        </AppBar>

    );
}
