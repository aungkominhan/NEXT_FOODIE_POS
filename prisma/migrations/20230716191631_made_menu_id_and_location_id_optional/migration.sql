-- DropForeignKey
ALTER TABLE "MenusMenuCategoriesLocations" DROP CONSTRAINT "MenusMenuCategoriesLocations_locationId_fkey";

-- DropForeignKey
ALTER TABLE "MenusMenuCategoriesLocations" DROP CONSTRAINT "MenusMenuCategoriesLocations_menuId_fkey";

-- AlterTable
ALTER TABLE "MenusMenuCategoriesLocations" ALTER COLUMN "menuId" DROP NOT NULL,
ALTER COLUMN "locationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "MenusMenuCategoriesLocations" ADD CONSTRAINT "MenusMenuCategoriesLocations_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenusMenuCategoriesLocations" ADD CONSTRAINT "MenusMenuCategoriesLocations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
