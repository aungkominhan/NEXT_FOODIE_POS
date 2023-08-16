import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box } from "@mui/material";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { useRouter } from "next/router";
import { store } from "@/store";
import { fetchAppData } from "@/store/slices/appSlice";
import { useEffect } from "react";

interface Props {
  title?: string;
  children: string | JSX.Element | JSX.Element[];
}

const BackofficeLayout = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAppData({ locationId: undefined }));
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <TopBar title={props.title} />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <SideBar />
        <Box sx={{ p: 3, width: "100%" }}>{props.children}</Box>
      </Box>
    </Box>
  );
};

export default BackofficeLayout;
