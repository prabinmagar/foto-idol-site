import { Button, Input, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addPostConfig,
  getPostConfig,
} from "../../redux/slices/settings/AssestLimitSlice";

export const PostConfig = () => {
  useRedirectLoggedOutUser("/login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [assetLimitNo, setAssetLimitNo] = useState("");

  const { isSuccess, assetLimit } = useSelector((state) => state.assetlimit);
  const create = async (e) => {
    e.preventDefault();
    const requestData = { assetLimit: assetLimitNo };

    await dispatch(addPostConfig(requestData));
    if (isSuccess) {
      navigate("/admin/assetlimit");
    }
    dispatch(getPostConfig());
  };

  useEffect(() => {
    dispatch(getPostConfig());
  }, [dispatch]);

  return (
    <>
      <div className="bg-white shadow rounded my-10 py-8 px-3 lg:px-6 font-inter">
        <div className="max-w-[380px]">
          <Typography className="font-medium text-dark-blue font-lg font-inter">
            Add asset limit number
          </Typography>

          <br />
          <form onSubmit={create}>
            <Input
              size="lg"
              type="text"
              label="Asset Limit Number"
              name="assetLimit"
              value={assetLimitNo}
              onChange={(e) => setAssetLimitNo(e.target.value)}
            />
            <br />
            <Button type="submit" className="bg-moonstone w-full rounded">
              Submit{" "}
            </Button>
          </form>
        </div>
        <div className="mt-8 flex items-center gap-3">
          <Typography variant="h1" className="text-2xl">
            Add asset limit number :{" "}
          </Typography>
          <Typography variant="h1" className="text-5xl text-moonstone">
            {assetLimit?.assetLimit || 0}
          </Typography>
        </div>
      </div>
    </>
  );
};
