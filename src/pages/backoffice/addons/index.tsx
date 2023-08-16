import ItemCard from "@/components/ItemCard";
import Layout from "@/components/BackofficeLayout";
import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addAddon } from "@/store/slices/addonsSlice";
import { appData } from "@/store/slices/appSlice";
import { getAddonsByLocationId, getSelectedLocationId } from "@/utils/client";
import AddIcon from "@mui/icons-material/Add";
import EggIcon from "@mui/icons-material/Egg";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

const Addons = () => {
  const {
    addons,
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations,
  } = useAppSelector(appData);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const selectedLocationId = getSelectedLocationId() as string;
  const [newAddon, setNewAddon] = useState({
    name: "",
    price: 0,
    addonCategoryId: "",
  });
  const validAddons = getAddonsByLocationId(
    addons,
    menusAddonCategories,
    menusMenuCategoriesLocations,
    selectedLocationId
  );

  const createAddon = async () => {
    const isValid = newAddon.name && newAddon.addonCategoryId;
    if (!isValid)
      return alert("Please enter addon name and select one addon category");
    const response = await fetch(`${config.apiBaseUrl}/addons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddon),
    });
    const addonCreated = await response.json();
    dispatch(addAddon(addonCreated));
    setOpen(false);
  };

  return (
    <Layout title="Addons">
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
                bgcolor: "#1B9C85", // theme.palette.primary.main
                color: "white",
              },
            }}
          >
            New addon
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {validAddons.map((addon) => (
            <ItemCard
              key={addon.id}
              icon={
                <EggIcon sx={{ fontSize: "60px", mb: 1.5, color: "#1B9C85" }} />
              }
              href={`/backoffice/addons/${addon.id}`}
              title={addon.name}
              subtitle={`${addon.price} kyat`}
            />
          ))}
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create new addon</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 300,
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            sx={{ mt: 1 }}
            onChange={(evt) =>
              setNewAddon({
                ...newAddon,
                name: evt.target.value,
              })
            }
          />
          <TextField
            label="Price"
            variant="outlined"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            sx={{ my: 2 }}
            onChange={(evt) =>
              setNewAddon({
                ...newAddon,
                price: Number(evt.target.value),
              })
            }
          />
          <FormControl fullWidth>
            <InputLabel>Addon Category</InputLabel>
            <Select
              value={newAddon.addonCategoryId}
              label="Addon Category"
              onChange={(evt) =>
                setNewAddon({ ...newAddon, addonCategoryId: evt.target.value })
              }
            >
              {addonCategories.map((item) => {
                return (
                  <MenuItem value={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={createAddon}
            sx={{ width: "fit-content", alignSelf: "flex-end", mt: 2 }}
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Addons;
