import PrivateRoute from "../utils/navigation";
import { Roles } from "./roles";

// Provider components
import ProvidersProfile from "../modules/Providers/ProvidersProfile";
import ProvidersForm from "../modules/Providers/ProvidersForm";

// Admin components
import AdminDashboard from "../modules/dashboard/administrador/adminDashboard";
import AdminListProviders from "../modules/dashboard/administrador/adminListProviders";
import AdminPublications from "../modules/dashboard/administrador/adminPublications";
import NewPublication from "../modules/dashboard/administrador/AdminNewPublication";

// Provider Routes

export const PROVIDER_PROFILE = {
    path: "/profile",
    element: (
        <PrivateRoute path="/profile" roles={[Roles.Provider]} Component={ProvidersProfile} />
    ),
};

export const CREATE_PRODUCT = {
    path: "/profile/product/create",
    element: (
        <PrivateRoute
            path="/profile/product/create"
            roles={[Roles.Provider]}
            Component={ProvidersForm}
        />
    ),
};

export const UPDATE_PRODUCT = {
    path: "/profile/product/update/:id",
    element: (
        <PrivateRoute
            path="/profile/product/update/:id"
            roles={[Roles.Provider]}
            Component={ProvidersForm}
        />
    ),
};

export const ADMIN_DASHBOARD = {
    path: "/admin",
    element: <PrivateRoute path="/admin" roles={[Roles.Admin]} Component={AdminDashboard} />,
};

export const PROVIDERS_LIST = {
    path: "/admin/providers",
    element: (
        <PrivateRoute path="/admin/providers" roles={Roles.Admin} Component={AdminListProviders} />
    ),
};

export const POSTS_LIST = {
    path: "/admin/posts",
    element: (
        <PrivateRoute path="/admin/posts" roles={[Roles.Admin]} Component={AdminPublications} />
    ),
};

export const CREATE_POST = {
    path: "/admin/posts/create",
    element: (
        <PrivateRoute
            path="/admin/posts/create"
            roles={[Roles.Admin]}
            Component={NewPublication}
        />
    ),
};

export const UPDATE_POST = {
    path: "/admin/posts/update/:id",
    element: (
        <PrivateRoute
            path="/admin/posts/update/:id"
            roles={[Roles.Admin]}
            Component={NewPublication}
        />
    ),
};
