import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  AiOutlineClose,
  AiOutlineComment,
  AiOutlineDashboard,
  AiOutlineDollar,
  AiOutlineNumber,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { HiViewGrid, HiViewGridAdd } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsSidebarOpen,
  toggleSidebar,
} from "../../redux/slices/sidebarSlice";
import { BsFillImageFill } from "react-icons/bs";
import { MdContactPage, MdFolderSpecial } from "react-icons/md";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { RiPagesLine, RiPagesFill } from "react-icons/ri";
import { PiTreeStructureFill } from "react-icons/pi";
import { CATEGORY_ADD_ACCESS } from "../../utils/constants";

export const ContentSidebar = () => {
  const [sidebarClass, setSidebarClass] = useState("");
  const [sidebarOverlayClass, setSidebarOverlayClass] = useState("");
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const location = useLocation();

  const [open, setOpen] = useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const [open2, setOpen2] = useState(0);
  const handleOpen2 = (value) => {
    setOpen2(open2 === value ? 0 : value);
  };

  const [open3, setOpen3] = useState(0);
  const handleOpen3 = (value) => {
    setOpen3(open3 === value ? 0 : value);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass("sidebar-change");
      setSidebarOverlayClass("block");
    } else {
      setSidebarClass("");
      setSidebarOverlayClass("hidden");
    }
  }, [isSidebarOpen]);

  const handleOverlayClick = () => {
    setSidebarClass("");
    setSidebarOverlayClass("hidden");
    dispatch(toggleSidebar());
  };

  return (
    <>
      <div
        className={`content-sidebar-overlay ${sidebarOverlayClass}`}
        onClick={handleOverlayClick}
      ></div>
      <div
        className={`overflow-y-scroll scrollbar-y-dir h-[100vh] content-sidebar default-transition w-[260px] ${sidebarClass}`}
      >
        <Card className="min-h-screen default-shadow bg-white">
          <div className="mb-2 p-4 border-b-[1px] border-rich-black/5 flex justify-between items-center">
            <Link href="/">
              <h3 className="text-blue-gradient text-2xl font-bold">
                Foto<span className="text-dark-moonstone">Idol.</span>
              </h3>
            </Link>
            <button
              type="button"
              className="hover:scale-110 default-transition lg:hidden"
              onClick={() => dispatch(toggleSidebar())}
            >
              <AiOutlineClose className="text-moonstone" size={18} />
            </button>
          </div>
          <List className="px-3">
            <ListItem className="p-0 h-[48px] block">
              <Link
                to="/admin"
                className={`flex p-4 w-full ${
                  location.pathname === "/admin" ? "active-link" : ""
                }`}
              >
                <ListItemPrefix className="w-[20px] flex items-center justify-start">
                  <AiOutlineDashboard size={20} />
                </ListItemPrefix>
                Dashboard
              </Link>
            </ListItem>
            <ListItem className="p-0 h-[48px] block">
              <Link
                to="/admin/images"
                className={`flex p-4 w-full ${
                  location.pathname.startsWith("/admin/images")
                    ? "active-link"
                    : ""
                }`}
              >
                <ListItemPrefix className="w-[20px] flex items-center justify-start">
                  <BsFillImageFill size={16} />
                </ListItemPrefix>
                All Photos
              </Link>
            </ListItem>
            <ListItem className="p-0 h-[48px] block">
              <Link
                to="/admin/gallery"
                className={`flex p-4 w-full ${
                  location.pathname === "/admin/gallery" ? "active-link" : ""
                }`}
              >
                <ListItemPrefix className="w-[20px] flex items-center justify-start">
                  <HiViewGridAdd className="scale-125" />
                </ListItemPrefix>
                Gallery
              </Link>
            </ListItem>
            <ListItem className="p-0 h-[48px] block">
              <Link
                to="/admin/users"
                className={`flex p-4 w-full ${
                  location.pathname.startsWith("/admin/users")
                    ? "active-link"
                    : ""
                }`}
              >
                <ListItemPrefix className="w-[20px] flex items-center justify-start">
                  <AiOutlineUsergroupAdd size={20} />
                </ListItemPrefix>
                All Users
              </Link>
            </ListItem>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 px-4 py-3.5 text-base font-normal"
                >
                  <ListItemPrefix className="w-[20px] flex items-center justify-start">
                    <HiViewGrid size={20} />
                  </ListItemPrefix>
                  <span className="me-auto">Category</span>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 nav-sub-list">
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to="/admin/category"
                      className={`flex p-4 w-full ${
                        location.pathname === "/admin/category"
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <HiViewGrid size={20} />
                      </ListItemPrefix>
                      Manage Category
                    </Link>
                  </ListItem>
                  {CATEGORY_ADD_ACCESS && (
                    <ListItem className="p-0 h-[48px] block">
                      <Link
                        to="/admin/addcategory"
                        className={`flex p-4 w-full ${
                          location.pathname === "/admin/addcategory"
                            ? "active-link"
                            : ""
                        }`}
                      >
                        <ListItemPrefix className="w-[20px] flex items-center justify-start">
                          <HiViewGridAdd size={20} />
                        </ListItemPrefix>
                        Add Category
                      </Link>
                    </ListItem>
                  )}
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open2 === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open2 === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open2 === 2}>
                <AccordionHeader
                  onClick={() => handleOpen2(2)}
                  className="border-b-0 px-4 py-3.5 text-base font-normal"
                >
                  <ListItemPrefix className="w-[20px] flex items-center justify-start">
                    <RiPagesFill size={20} />
                  </ListItemPrefix>
                  <span className="me-auto">Pages</span>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 nav-sub-list">
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to="/admin/about"
                      className={`flex p-4 w-full ${
                        location.pathname === "/admin/about"
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <RiPagesLine size={20} />
                      </ListItemPrefix>
                      About
                    </Link>
                  </ListItem>
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to="/admin/location"
                      className={`flex p-4 w-full ${
                        location.pathname === "/admin/location"
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <PiTreeStructureFill size={20} />
                      </ListItemPrefix>
                      Branches
                    </Link>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            {/* <ListItem className="p-0 h-[48px] block">
              <Link
                to="/admin/assetlimit"
                className={`flex p-4 w-full ${
                  location.pathname === "/admin/assetlimit" ? "active-link" : ""
                }`}
              >
                <ListItemPrefix className="w-[20px] flex items-center justify-start">
                  <AiOutlineNumber size={20} />
                </ListItemPrefix>
                Asset Limit
              </Link>
            </ListItem> */}
            <ListItem className="p-0 h-[48px] block">
              <Link
                to="/admin/postlimit"
                className={`flex p-4 w-full ${
                  location.pathname === "/admin/postlimit" ? "active-link" : ""
                }`}
              >
                <ListItemPrefix className="w-[20px] flex items-center justify-start">
                  <AiOutlineNumber size={20} />
                </ListItemPrefix>
                Post Limit
              </Link>
            </ListItem>
            <Accordion
              open={open3 === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open3 === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open3 === 2}>
                <AccordionHeader
                  onClick={() => handleOpen3(2)}
                  className="border-b-0 px-4 py-3.5 text-base font-normal"
                >
                  <ListItemPrefix className="w-[20px] flex items-center justify-start">
                    <RiPagesFill size={20} />
                  </ListItemPrefix>
                  <span className="me-auto">Home Settings</span>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 nav-sub-list">
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to="/admin/homeslider"
                      className={`flex p-4 w-full ${
                        location.pathname.startsWith("/admin/homeslider")
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <RiPagesLine size={20} />
                      </ListItemPrefix>
                      Banner Slider
                    </Link>
                  </ListItem>
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to="/admin/modal"
                      className={`flex p-4 w-full ${
                        location.pathname.startsWith("/admin/modal")
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <RiPagesLine size={20} />
                      </ListItemPrefix>
                      Popup Modal
                    </Link>
                  </ListItem>
                  <ListItem className="p-0 h-[48px] block">
                    <Link
                      to="/admin/pricing"
                      className={`flex p-4 w-full ${
                        location.pathname.startsWith("/admin/pricing")
                          ? "active-link"
                          : ""
                      }`}
                    >
                      <ListItemPrefix className="w-[20px] flex items-center justify-start">
                        <AiOutlineDollar size={20} />
                      </ListItemPrefix>
                      Pricing Details
                    </Link>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            {/* <ListItem className="p-0 h-[48px] block">
              <Link
                to="/admin/homeslider"
                className={`flex p-4 w-full ${
                  location.pathname.startsWith("/admin/homeslider")
                    ? "active-link"
                    : ""
                }`}
              >
                <ListItemPrefix className="w-[20px] flex items-center justify-start">
                  <MdImage size={20} />
                </ListItemPrefix>
                Home Settings
              </Link>
            </ListItem> */}
            <ListItem className="p-0 h-[48px] block">
              <Link
                to="/admin/featured"
                className={`flex p-4 w-full ${
                  location.pathname === "/admin/featured" ||
                  location.pathname.startsWith("/admin/feature")
                    ? "active-link"
                    : ""
                }`}
              >
                <ListItemPrefix className="w-[20px] flex items-center justify-start">
                  <MdFolderSpecial size={20} />
                </ListItemPrefix>
                Slider Featuring
              </Link>
            </ListItem>
            <ListItem className="p-0 h-[48px] block">
              <Link
                to="/admin/contact"
                className={`flex p-4 w-full ${
                  location.pathname === "/admin/contact" ? "active-link" : ""
                }`}
              >
                <ListItemPrefix className="w-[20px] flex items-center justify-start">
                  <MdContactPage size={20} />
                </ListItemPrefix>
                Contact Details
              </Link>
            </ListItem>
            <ListItem className="p-0 h-[48px] block">
              <Link
                to="/admin/comments"
                className={`flex p-4 w-full ${
                  location.pathname === "/admin/comments" ? "active-link" : ""
                }`}
              >
                <ListItemPrefix className="w-[20px] flex items-center justify-start">
                  <AiOutlineComment size={20} />
                </ListItemPrefix>
                Comments
              </Link>
            </ListItem>
            <ListItem className="p-0 h-[48px] block">
              <Link
                to="/admin/account"
                className={`flex p-4 w-full ${
                  location.pathname === "/admin/account" ? "active-link" : ""
                }`}
              >
                <ListItemPrefix className="w-[20px] flex items-center justify-start">
                  <AiOutlineUser size={20} />
                </ListItemPrefix>
                Admin Profile
              </Link>
            </ListItem>
          </List>
        </Card>
      </div>
    </>
  );
};
