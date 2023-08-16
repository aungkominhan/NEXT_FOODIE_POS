import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Menus as Menu } from "@prisma/client";
import Link from "next/link";

interface Props {
  menu: Menu;
  href: string | object;
}

const MenuCard = ({ menu, href }: Props) => {
  return (
    <Link
      key={menu.id}
      href={href}
      style={{
        textDecoration: "none",
        marginRight: "15px",
        marginBottom: "20px",
      }}
    >
      <Card sx={{ width: 200, height: 220, py: 2 }}>
        <CardMedia
          sx={{ height: 140, backgroundSize: "contain" }}
          image={menu.assetUrl || ""}
          component={"div"}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle1"
            sx={{ textAlign: "center" }}
          >
            {menu.name}
          </Typography>
          <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
            {menu.price} kyat
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCard;
