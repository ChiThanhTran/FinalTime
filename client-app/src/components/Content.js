import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import AdminUsersList from "../pages/admin/AdminUsersList";
import AdminHome from "../pages/admin/AdminHome";
import AdminAsset from "../pages/admin/AdminAsset";
import AdminAssignment from "../pages/admin/AdminAssignment";
import AdminRequest from "../pages/admin/AdminRequest";
import AdminReport from "../pages/admin/AdminReport";
import StaffHome from "../pages/staff/StaffHome";
import StaffUsersList from "../pages/staff/StaffUsersList";
import StaffAsset from "../pages/staff/StaffAsset";
import StaffAssignment from "../pages/staff/StaffAssignment";
import StaffRequest from "../pages/staff/StaffRequest";
import StaffReport from "../pages/staff/StaffReport";
import CreateAsset from "./admin/CreateAsset";
import CreateUser from "./admin/CreateUser";
import CreateAssignment from "./admin/CreateAssignment";
import UpdateUser from "./admin/UpdateUser"
import UpdateAsset from "./admin/UpdateAsset"
import UpdateAssignment from "./admin/UpdateAssignment"

const Content = () => {
    return (
        <Routes>
            {localStorage.getItem("role") === "Admin"}?(
                <Route index element={<AdminHome />} />
                <Route path="/home" element={<AdminHome />} />
                <Route path="/user" element={<AdminUsersList />} />
                <Route path="/createuser" element={<CreateUser />} />
                <Route path="/asset" element={<AdminAsset />} />
                <Route path="/createasset" element={<CreateAsset />} />
                <Route path="/assignment" element={<AdminAssignment />} />
                <Route path="/createassignment" element={<CreateAssignment />} />
                <Route path="/request" element={<AdminRequest />} />
                <Route path="/report" element={<AdminReport />} />
                <Route path="/user/:id" element={<UpdateUser />} />
                <Route path="/asset/:id" element={<UpdateAsset />} />
                <Route path="/assignment/:id" element={<UpdateAssignment />} />
            ):(
                <Route index element={<StaffHome />} />
                <Route path="/home" element={<StaffHome />} />
                <Route path="/user" element={<StaffUsersList />} />
                <Route path="/asset" element={<StaffAsset />} />
                <Route path="/assignment" element={<StaffAssignment />} />
                <Route path="/request" element={<StaffRequest />} />
                <Route path="/report" element={<StaffReport />} />
            )

        </Routes>
    )
}

export default Content;