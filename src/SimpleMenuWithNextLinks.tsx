import { MenuList, MenuItem, ListItemText, MenuItemProps } from "@mui/material";
import Link from "next/link";
import { FunctionComponent, ReactElement } from "react";

export const SimpleMenuWithNextLinks: FunctionComponent<{
  pages: (
    | string
    | { label: string; link: string; menuItemProps?: MenuItemProps }
  )[];
}> = ({ pages }) => {
  const pageLinks: ReactElement[] = [];
  for (const page of pages) {
    const link = typeof page == "string" ? page : page.link;
    const label = typeof page == "string" ? page : page.label;
    const menuItemProps =
      typeof page == "string" ? {} : page.menuItemProps || {};
    pageLinks.push(
      // eslint-disable-next-line @next/next/link-passhref
      <Link href={link} key={link}>
        <MenuItem {...menuItemProps}>
          <ListItemText>{label}</ListItemText>
        </MenuItem>
      </Link>
    );
  }
  return <MenuList>{pageLinks}</MenuList>;
};
