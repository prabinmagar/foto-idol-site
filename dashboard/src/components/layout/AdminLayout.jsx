import { Outlet } from "react-router-dom";
import { DashboardHeader } from "../header/DashboardHeader";
import { ContentSidebar } from "../sidebar/ContentSidebar";
import { AdminFooter } from "../footer/AdminFooter";
import PropTypes from "prop-types";

export const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="flex relative">
        <div className="z-50 sticky top-0 left-0 h-[100vh]">
          <ContentSidebar className="z-50" />
        </div>
        <main className="gradient-pink-to-indigo flex-1 overflow-hidden">
          <div className="py-5 xxl:px-8 xl:px-6 lg:px-5 px-3 flex flex-col justify-between h-full">
            <div>
              <DashboardHeader />
              {/* <Outlet /> */}
              {children}
            </div>
            <AdminFooter className="mt-auto" />
          </div>
        </main>
      </div>
    </>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.any,
};
