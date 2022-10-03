import { NavbarData } from './menu.model';

export const menudata: NavbarData[] = [
  {
    title: 'Dashboard',
    path: '/Home',
    icon: 'fal fa-home',
  },
  {
    title: 'Report',
    path: '*****',
    icon: 'fal fa-flag',
    childrens: [
      {
        title: 'Dispatch',
        path: '/report/dispatch',
        icon: 'fal  fa-tags',
      },
      {
        title: 'Recived',
        path: '/report/received',
        icon: 'fal fa-tags',
      },
    ],
  },
  {
    title: 'Contact Us',
    path: '/contactus',
    icon: 'fal fa-phone',
  },
];
