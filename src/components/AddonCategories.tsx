import { Box, Chip, FormControl, RadioGroup, Typography } from "@mui/material";
import {
  AddonCategories as AddonCategory,
  Addons as Addon,
} from "@prisma/client";
import Addons from "./Addons";

interface Props {
  validAddonCategories: AddonCategory[];
  validAddons: Addon[];
  selectedAddons: Addon[];
  onChange: (checked: boolean, addon: Addon) => void;
}

const AddonCategories = ({
  validAddonCategories,
  validAddons,
  selectedAddons,
  onChange,
}: Props) => {
  return (
    <Box>
      {validAddonCategories.map((item) => {
        return (
          <Box key={item.id} sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                width: "300px",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ userSelect: "none" }}>{item.name}</Typography>
              <Chip label={item.isRequired ? "Required" : "Optional"} />
            </Box>
            <Box>
              <FormControl>
                <RadioGroup>
                  <Addons
                    addonCategory={item}
                    validAddons={validAddons}
                    selectedAddons={selectedAddons}
                    onChange={onChange}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default AddonCategories;
