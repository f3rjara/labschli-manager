import { ICtaCards } from "@interfaces/cta-cards.interface";

export const CTA_CARDS_ROLES:ICtaCards[] = [
  {
    title: 'Volver al Dashboard',
    icon: 'dashboard',
    routerLink: '/admin/dashboard'
  },
  {
    title: 'Nuevo Administrador',
    icon: 'person_add',
    routerLink: '/admin/usuarios/agregar'
  }
]
