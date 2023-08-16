import ItemCard from "@/components/ItemCard";
import Layout from "@/components/BackofficeLayout";
import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addAddonCategory } from "@/store/slices/addonCategoriesSlice";
import { appData } from "@/store/slices/appSlice";
import { fetchMenusAddonCategories } from "@/store/slices/menusAddonCategoriesSlice";
import { getSelectedLocationId } from "@/utils/client";
import AddIcon from "@mui/icons-material/Add";
import ClassIcon from "@mui/icons-material/Class";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddonCategories = () => {
  const {
    addonCategories,
    addons,
    menus,
    menusAddonCategories,
    menusMenuCategoriesLocations,
  } = useAppSelector(appData);
  const [open, setOpen] = useState(false);
  const selectedLocationId = getSelectedLocationId();
  const [newAddonCategory, setNewAddonCategory] = useState({
    name: "",
    isRequired: false,
    menuIds: [] as number[],
  });
  const dispatch = useAppDispatch();
  const validMenuIds = menusMenuCategoriesLocations
    .filter(
      (item) => item.menuId && item.locationId === Number(selectedLocationId)
    )
    .map((item) => item.menuId as number);
  const validMenus = menus.filter((item) => validMenuIds.includes(item.id));
  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => item.menuId && validMenuIds.includes(item.menuId))
    .map((item) => item.addonCategoryId);
  const validAddonCategories = addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id)
  );

  const getAddonsCount = (addonCategoryId?: number) => {
    if (!addonCategoryId) return 0;
    return addons.filter((item) => item.addonCategoryId === addonCategoryId)
      .length;
  };

  const createAddonCategory = async () => {
    const isValid = newAddonCategory.name && newAddonCategory.menuIds.length;
    if (!isValid)
      return alert(
        "Please enter addon category name and select one or more menus"
      );
    const response = await fetch(`${config.apiBaseUrl}/addonCategories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddonCategory),
    });
    const addonCategoryCreated = await response.json();
    dispatch(addAddonCategory(addonCategoryCreated));
    dispatch(fetchMenusAddonCategories(validMenuIds));
    setOpen(false);
  };

  return (
    <Layout title="Addon Categories">
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
            New addon category
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {validAddonCategories.map((addonCategory) => (
            <ItemCard
              key={addonCategory.id}
              icon={
                <ClassIcon
                  sx={{ fontSize: "60px", mb: 1.5, color: "#1B9C85" }}
                />
              }
              href={`/backoffice/addonCategories/${addonCategory.id}`}
              title={addonCategory.name}
              subtitle={`${getAddonsCount(addonCategory.id)} addons`}
            />
          ))}
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create new addon category</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 300,
            minHeight: 150,
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            sx={{ my: 2 }}
            onChange={(evt) =>
              setNewAddonCategory({
                ...newAddonCategory,
                name: evt.target.value,
              })
            }
          />
          <FormControl>
            <InputLabel id="select-menu-categories">Menus</InputLabel>
            <Select
              label="Menus"
              multiple
              value={newAddonCategory.menuIds}
              onChange={(evt) => {
                const values = evt.target.value as number[];
                setNewAddonCategory({ ...newAddonCategory, menuIds: values });
              }}
              input={<OutlinedInput label="Menus" />}
              renderValue={(values) => {
                const selectedMenus = newAddonCategory.menuIds.map((menuId) => {
                  return validMenus.find((menu) => menu.id === menuId);
                });
                return selectedMenus
                  .map((menu) => menu && menu.name)
                  .join(", ");
              }}
              MenuProps={MenuProps}
            >
              {validMenus.map((menu) => (
                <MenuItem key={menu.id} value={menu.id}>
                  <Checkbox
                    checked={
                      newAddonCategory.menuIds.includes(menu.id) ? true : false
                    }
                  />
                  <ListItemText primary={menu.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            sx={{ mt: 2 }}
            control={
              <Switch
                checked={newAddonCategory.isRequired}
                onChange={(evt) =>
                  setNewAddonCategory({
                    ...newAddonCategory,
                    isRequired: evt.target.checked,
                  })
                }
              />
            }
            label="required"
          />
          <Button
            variant="contained"
            onClick={createAddonCategory}
            sx={{ width: "fit-content", alignSelf: "flex-end", mt: 2 }}
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AddonCategories;
