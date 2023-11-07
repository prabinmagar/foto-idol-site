import { IconButton } from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { MdCheck } from "react-icons/md";
import { getAllUserByAdmin, updateUserByAdmin } from "../../redux/slices/authSlice";

export const UpdateRole = ({ _id, email }) => {
  const [userRole, setUserRole] = useState("");
  const dispatch = useDispatch();
  const changeRole = async (e) => {
    e.preventDefault();

    if (!userRole) {
      toast.error("Please Select a Role");
    }

    const userData = {
      role: userRole,
      id: _id,
    };
    // const emailData = {
    //   subject: "Update Role - GorkCoder",
    //   send_to: email,
    //   reply_to: "noreply@gorkcoder.com",
    //   template: "changeRole",
    //   url: "/login",
    // };
    await dispatch(updateUserByAdmin(userData));
    // await dispatch(sendAutomatedEmail(emailData));
    await dispatch(getAllUserByAdmin());
    // await dispatch(EMAIL_RESET());
  };
  return (
    <>
      <div>
        <form className="flex items-center justify-center gap-2 font-inter" onSubmit={(e) => changeRole(e, _id, userRole)}>
          <select value={userRole} onChange={(e) => setUserRole(e.target.value)} label="Select Role" className="px-4 py-1.5 border-[1px] border-moonstone outline-none rounded text-moonstone text-sm w-full">
            <option className="text-dark-blue" value="">Select Role</option>
            <option className="text-dark-blue" value="author">Author</option>
            <option className="text-dark-blue" value="admin">Admin</option>
          </select>
          <IconButton variant="text" color="indigo" type="submit" className="min-w-[33px] w-[33px] h-[33px] border-[1px] border-moonstone rounded">
            <MdCheck className="text-moonstone" size={20} />
          </IconButton>
        </form>
      </div>
    </>
  );
};
