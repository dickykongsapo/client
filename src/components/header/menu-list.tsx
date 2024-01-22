/*
 * Copyright © 2016-2021 The Thingsboard Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { FormatPaint, Home, SettingsEthernet, SupervisorAccount } from "@mui/icons-material";

export const MENU_LIST = [
    {
        id: 'home',
        name: 'home.home',
        link: '/home',
        icon: <Home />,
    },
    {
        id: 'ruleChains',
        name: 'rulechain.rulechains',
        link: '/ruleChains',
        icon: <SettingsEthernet />,
    },
    {
        id: 'customers',
        name: 'customer.customers',
        link: '/customers',
        icon: <SupervisorAccount />,
    },
    {
        id: 'whiteLabel',
        name: 'white-labeling.white-labeling',
        link: '/whiteLabel',
        icon: <FormatPaint />,
    }
]
