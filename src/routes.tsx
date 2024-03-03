import Dashboard from "./layout/dashboard";
import Support from "./layout/supporter";
import { routeType } from "./types/routeType";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useTranslation } from 'react-i18next'

function Routes():routeType[]{
    let {t,i18n}=useTranslation("common")
    //     const sub_domain = localStorage.getItem('sub_domain')
    //   let {t}=useTranslation("common")
  
    return (
        [
            {
                href: `/setting`,
                label: t("Settings"),
                active: window.location.pathname === `/setting`,
                permissions: [],
                component:  <Dashboard />,
                submenu: [],
                icon: <DashboardIcon/>,
                noCollapse: false,
                // collapse
            },{
                href: `/supplier`,
                label: t("Suppliers"),
                active: window.location.pathname === `/supplier`,
                permissions: [],
                // component:  <Support />,
                submenu: [{
                href: `/supplier`,
                label: t("Suppliers"),
                active: window.location.pathname === `/supplier`,
                permissions: [],
                component:  <Support />,
                }],
                icon: <ApartmentIcon/>,
                noCollapse: true,
                // collapse
            },     ]
    )
}
export default Routes
