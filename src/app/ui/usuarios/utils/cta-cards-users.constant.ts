import { ICtaCards } from "@interfaces/cta-cards.interface";

export const CTA_CARDS_USERS:ICtaCards[] = [
  {
    title: 'Volver al Dashboard',
    icon: 'dashboard',
    routerLink: '/admin/dashboard'
  },
  {
    title: 'Nuevo Usuario',
    icon: 'person_add',
    routerLink: '/admin/usuarios/agregar'
  }
]


export const CTA_CARDS_USERS_ADMIN:ICtaCards[] = [
  {
    title: 'Volver al Dashboard',
    icon: 'dashboard',
    routerLink: '/admin/dashboard'
  },
  {
    title: 'Listar Usuarios',
    icon: 'person_search',
    routerLink: '/admin/usuarios/list'
  }
]
