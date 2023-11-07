import { Button, Input, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getPostLimit,
  addPostLimit,
} from "../../redux/slices/settings/SettingSlice";
import { toast } from "react-toastify";

export const PostLimit = () => {
  useRedirectLoggedOutUser("/login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postLimitNo, setPostLimitNo] = useState("");

  const { isSuccess, postLimit } = useSelector((state) => state.setting);
  const create = async (e) => {
    e.preventDefault();
    if (/^[0-9]+$/.test(postLimitNo)) {
      const requestData = { assetLimit: postLimitNo };
      await dispatch(addPostLimit(requestData));
      if (isSuccess) {
        navigate("/admin/postlimit");
      }
      dispatch(getPostLimit());
    } else {
      toast.error("Please enter valid number.");
    }
  };

  useEffect(() => {
    dispatch(getPostLimit());
  }, [dispatch]);

  return (
    <>
      <div className="bg-white shadow-lg rounded-md my-10 py-8 px-3 lg:px-6 font-inter">
        <div className="max-w-[380px]">
          <Typography className="font-medium text-dark-blue font-lg font-inter capitalize">
            Add post limit number
          </Typography>

          <br />
          <form onSubmit={create}>
            <Input
              size="lg"
              type="text"
              label="Post Limit Number"
              name="assetLimit"
              value={postLimitNo}
              onChange={(e) => setPostLimitNo(e.target.value)}
            />
            <br />
            <Button type="submit" className="bg-moonstone w-full rounded">
              Submit{" "}
            </Button>
          </form>
        </div>
        <div className="mt-8 flex items-center gap-3">
          <Typography variant="h1" className="text-2xl capitalize">
            Post limit number :{" "}
          </Typography>
          <Typography variant="h1" className="text-5xl text-moonstone">
            {postLimit?.assetLimit || 0}
          </Typography>
        </div>
      </div>
    </>
  );
};
