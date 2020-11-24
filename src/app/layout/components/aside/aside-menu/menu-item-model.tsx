import {ReactElement} from "react";

export interface MenuItemModel {
  display?: boolean;
  section?: boolean;
  title?: string;
  url?: string;
  icon?: ReactElement|string;
  children?: MenuItemModel[];
  parent?: boolean;
}