import {
    LayoutGrid,
    LucideIcon,
    Search,
    CreditCard,
    Wrench,
    Receipt,
    Tickets,
    Contact
  } from "lucide-react";
  
  type Submenu = {
    href: string;
    label: string;
    active?: boolean;
  };
  
  type Menu = {
    href: string;
    label: string;
    active?: boolean;
    icon: LucideIcon;
    submenus?: Submenu[];
  };
  
  type Group = {
    groupLabel: string;
    menus: Menu[];
  };
  
  export function getMenuList(pathname: string): Group[] {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/dashboard",
            label: "Dashboard",
            icon: LayoutGrid,
            submenus: []
          },
          {
            href: "/search",
            label: "Buscar",
            icon: Search,
            submenus: []
          }
        ]
      },
      {
        groupLabel: "Administracion",
        menus: [
          {
            href: "/customers",
            label: "Clientes",
            icon: Contact
          },
          {
            href: "/cash_register",
            label: "Cortes de Caja",
            icon: Receipt
          },
          {
            href: "/sales",
            label: "Ventas",
            icon: Tickets
          }
        ]
      },
    ];
  }