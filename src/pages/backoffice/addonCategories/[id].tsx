import DeleteDialog from "@/components/DeleteDialog";
import Layout from "@/components/BackofficeLayout";
import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeAddonCategory } from "@/store/slices/addonCategoriesSlice";
import { appData } from "@/store/slices/appSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { AddonCategories as AddonCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";

const EditAddonCategories = () => {
  const router = useRouter();
  const addonCategoryId = router.query.id as string;
  const { addonCategories } = useAppSelector(appData);
  const [open, setOpen] = useState(false);
  const addonCategory = addonCategories.find(
    (item) => item.id === Number(addonCategoryId)
  ) as AddonCategory;
  const [updateAddonCategory, setUpdateAddonCategory] =
    useState<Partial<AddonCategory>>();
  const dispatch = useAppDispatch();

  const handleUpdateAddonCategory = async () => {
    await fetch(`${config.apiBaseUrl}/addonCategories`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: addonCategory.id, ...updateAddonCategory }),
    });
  };

  const handleDeleteAddonCategory = async () => {
    await fetch(`${config.apiBaseUrl}/addonCategories?id=${addonCategoryId}`, {
      method: "DELETE",
    });
    dispatch(removeAddonCategory(addonCategory));
    router.push("/backoffice/addonCategories");
  };

  return (
    <Layout title="Edit Addon Categories">
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          color="error"
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={() => setOpen(true)}
        >
          Delete
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          defaultValue={addonCategory?.name}
          onChange={(evt) =>
            setUpdateAddonCategory({
              ...updateAddonCategory,
              name: evt.target.value,
            })
          }
        />
        <FormControlLabel
          sx={{ my: 2 }}
          control={
            <Switch
              defaultChecked={addonCategory?.isRequired ? true : false}
              onChange={(evt) =>
                setUpdateAddonCategory({
                  ...updateAddonCategory,
                  isRequired: evt.target.checked,
                })
              }
            />
          }
          label="required"
        />
        <Button
          variant="contained"
          onClick={handleUpdateAddonCategory}
          sx={{ width: "fit-content", mt: 3 }}
        >
          Update
        </Button>
      </Box>
      <DeleteDialog
        title="Are you sure you want to delete this addon category?"
        open={open}
        setOpen={setOpen}
        callback={handleDeleteAddonCategory}
      />
    </Layout>
  );
};

export default EditAddonCategories;
