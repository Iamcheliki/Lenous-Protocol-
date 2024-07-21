// menuConstants.ts
interface SubMenu {
  title: string;
  link: string;
  iconName?: string;
}

interface MenuItem {
  title: string;
  submenu: SubMenu[];
}

export const menuItems: MenuItem[] = [
  {
    title: 'Platform',
    submenu: [
      { title: 'Home', link: '/' },
      { title: 'Swap Lite', link: '#' },
      { title: 'Swap Advance', link: '#' },
      { title: 'Pools', link: '#' },
    ],
  },
  {
    title: 'Trade',
    submenu: [
      { title: 'Super Chart Lite', link: '#' },
      { title: 'Convert', link: '#' },
      { title: 'smart Exchange', link: '#' },
      { title: 'Spot Exchange', link: '#' },
      { title: 'Trading Bots', link: '#' },
    ],
  },
  {
    title: 'Support',
    submenu: [
      { title: 'About us', link: '#' },
      { title: 'Contact Us', link: '#' },
      { title: 'Feedback', link: '#' },
    ],
  },
  {
    title: 'Website',
    submenu: [
      { title: 'Lenous', link: '#' },
      { title: 'Products', link: '#' },
      { title: 'Docs', link: '#' },
      { title: 'Inteligent Protocol', link: '#' },
    ],
  },
  {
    title: 'Follow Us',
    submenu: [
      { title: 'FaceBook', link: '#', iconName: 'facebook' },
      { title: 'Instagram', link: '#', iconName: 'instagram' },
      { title: 'X', link: '#', iconName: 'x' },
      { title: 'Linkedin', link: '#', iconName: 'linkedin' },
      { title: 'Youtube', link: '#', iconName: 'youtube' },
    ],
  },
];
