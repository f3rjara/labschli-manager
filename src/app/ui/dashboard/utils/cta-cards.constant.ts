import { ICtaCards } from "@interfaces/cta-cards.interface";

export const CTA_CARDS:ICtaCards[] = [
  {
    title: 'Nuevo Usuario',
    icon: 'person_add',
    routerLink: '/admin/usuarios/agregar'
  },
  {
    title: 'Listar Usuarios',
    icon: 'person_search',
    routerLink: '/admin/usuarios/list'
  },
  {
    title: 'Documentos del Usuario',
    icon: 'document_scanner',
    routerLink: '/consulta'
  },
  {
    title: 'Nuevo Administrador',
    icon: 'admin_panel_settings',
    routerLink: '/admin/roles'
  },
  {
    title: 'Mi Perfil',
    icon: 'manage_accounts',
    routerLink: '/admin/perfil'
  },
  {
    title: 'Administrar Plesk',
    icon: 'dns',
    routerLink: 'https://dalfaro.com:8443/login_up.php',
    external: true
  }
]
