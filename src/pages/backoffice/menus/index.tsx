import Layout from "@/components/BackofficeLayout";
import MenuCard from "@/components/MenuCard";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import NewMenu from "./NewMenu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Menus = () => {
  const [open, setOpen] = useState(false);
  const { menusMenuCategoriesLocations, menus } = useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId() as string;

  const validMenusIds = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.menuId && item.locationId === parseInt(selectedLocationId, 10)
    )
    .map((item) => item.menuId);
  const filteredMenus = menus.filter(
    (menu) => menu.id && validMenusIds.includes(menu.id)
  );

  return (
    <Layout title="Menus">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          m: "0 auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#4C4C6D",
              width: "fit-content",
              color: "#E8F6EF",
              mb: 2,
              ":hover": {
                bgcolor: "#1B9C85",
                color: "white",
              },
            }}
          >
            New menu
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {filteredMenus.map((item) => (
            <MenuCard
              key={item.id}
              menu={item}
              href={`/backoffice/menus/${item.id}`}
            />
          ))}
        </Box>
      </Box>
      <NewMenu open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Menus;
