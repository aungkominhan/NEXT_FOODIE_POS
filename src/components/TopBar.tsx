import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";
import logo from "../assets/logo.png";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

interface Props {
  title?: string;
}

const TopBar = ({ title = "" }: Props) => {
  const { data } = useSession();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#1B9C85" }}>
          {data ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box sx={{ width: "150px", position: "relative", mt: 2 }}>
                <Image
                  alt="logo"
                  src={logo}
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
              <Typography variant="h5">{title}</Typography>
              <Button
                variant="text"
                size="large"
                onClick={() => signOut({ callbackUrl: "/backoffice" })}
                sx={{ color: "#E8F6EF" }}
              >
                Sign out
              </Button>
            </Box>
          ) : (
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              Foodie POS
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
