import { FormatPaint, Home, SettingsEthernet, SupervisorAccount } from "@mui/icons-material";

export const MENU_LIST = [
    {
        id: 'home',
        name: 'Home',
        link: '/home',
        icon: <Home />,
    },
    {
        id: 'ruleChains',
        name: 'Rule Chains',
        link: '/ruleChains',
        icon: <SettingsEthernet />,
    },
    {
        id: 'customers',
        name: 'Customers',
        link: '/customers',
        icon: <SupervisorAccount />,
    },
    {
        id: 'whiteLabel',
        name: 'White Label',
        link: '/whiteLabel',
        icon: <FormatPaint />,
    }
]
