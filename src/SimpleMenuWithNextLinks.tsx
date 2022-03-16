import { MenuList, MenuItem, ListItemText, MenuItemProps } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, ReactElement } from "react";

export const SimpleMenuWithNextLinks: FunctionComponent<{
  pages: (
    | string
    | { label: string; link: string; menuItemProps?: MenuItemProps }
  )[];
}> = ({ pages }) => {
  const router = useRouter();
  const pageLinks: ReactElement[] = [];
  for (const page of pages) {
    const _link = typeof page == "string" ? page : page.link;
    const link = _link.startsWith("/") ? _link : "/" + _link;
    const label = typeof page == "string" ? page : page.label;
    const menuItemProps =
      typeof page == "string" ? {} : page.menuItemProps || {};
    menuItemProps.selected = link == router.route;

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
