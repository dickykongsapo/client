import { AuthUser, User } from "../../../models/user.model";
import { WhiteLabel } from "../../../models/white-label.model";
export interface AuthPayload {
    authUser: AuthUser | any;
    userDetails: User | any;
    userTokenAccessEnabled: boolean;
    allowedDashboardIds: string[];
    forceFullscreen: boolean;
}

export interface AuthState {
    isAuthenticated: boolean;
    isUserLoaded: boolean;
    authUser: AuthUser;
    userDetails: User;
    userTokenAccessEnabled: boolean;
    allowedDashboardIds: string[];
    forceFullscreen: boolean;
    lastPublicDashboardId: string | any;
    whiteLabel: WhiteLabel;
}
