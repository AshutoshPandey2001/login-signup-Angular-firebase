export interface NavbarData {
  title: string;
  path: string;
  icon?: string;
  expanded?: boolean;
  childrens?: NavbarData[];
}
