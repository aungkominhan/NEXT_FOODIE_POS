import { Box, Checkbox, FormControlLabel, Radio } from "@mui/material";
import {
  AddonCategories as AddonCategory,
  Addons as Addon,
} from "@prisma/client";

interface Props {
  addonCategory: AddonCategory;
  validAddons: Addon[];
  selectedAddons: Addon[];
  onChange: (checked: boolean, addon: Addon) => void;
}

const Addons = ({
  addonCategory,
  validAddons,
  selectedAddons,
  onChange,
}: Props) => {
  const addons = validAddons.filter(
    (item) => item.addonCategoryId === addonCategory.id
  );
  return (
    <Box>
      {addons.map((item) => {
        return (
          <Box key={item.id}>
            <FormControlLabel
              value={item.name}
              control={
                addonCategory.isRequired ? (
                  <Radio
                    checked={
                      selectedAddons.find((addon) => addon.id === item.id)
                        ? true
                        : false
                    }
                    onChange={(evt, value) => onChange(value, item)}
                  />
                ) : (
                  <Checkbox
                    checked={
                      selectedAddons.find((addon) => addon.id === item.id)
                        ? true
                        : false
                    }
                    onChange={(evt, value) => onChange(value, item)}
                  />
                )
              }
              label={item.name}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default Addons;
