import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../../utils/useRedirectLoggedOutUser";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { gethomeSlider } from "../../../redux/slices/settings/homeSliderSlice";
import Loader from "../../../components/common/Loader";
import { format } from "date-fns";

export const ViewPricing = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { id } = useParams();
  const { content, isLoading } = useSelector((state) => state.homeslider);

  const formattedDate = content?.createdAt
    ? format(new Date(content.createdAt), "yyyy-MM-dd HH:mm:ss")
    : "";

  useEffect(() => {
    dispatch(gethomeSlider(id));
  }, [dispatch, id]);
  return (
    <>
      {isLoading && <Loader />}
      <Card className="p-8 mt-5 font-inter shadow-lg rounded-md">
        <NavLink to="/admin/pricing">
          <Button className="rounded">Back to table</Button>
        </NavLink>
        <div className="grid md:grid-cols-2 gap-x-12 mt-6 max-w-[1200px]">
          <div className="border-[1px] border-gray-200 rounded-md p-4 shadow-lg">
            <div className="flex justify-start flex-col gap-3">
              <div className="flex flex-col gap-y-1.5 justify-between mt-1">
                <Typography variant="h6">Title</Typography>
                <Input
                  className="w-full capitalize"
                  value={content?.title || ""}
                  readOnly
                  disabled
                  size="lg"
                  label="Verified"
                />
              </div>
              <div className="flex flex-col gap-y-1.5 justify-between mt-1">
                <Typography variant="h6">Sub Title</Typography>
                <Input
                  className="w-full"
                  value={content?.subtitle || ""}
                  readOnly
                  size="lg"
                  label="Address"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-y-1.5 justify-between mt-1">
                <Typography variant="h6">Modal or Home slider</Typography>
                <Input
                  className="w-full"
                  value={content?.category || ""}
                  readOnly
                  size="lg"
                  label="Address"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-y-1.5 justify-between mt-1">
                <Typography variant="h6">Description</Typography>
                <Textarea
                  className="w-full"
                  value={content?.description || ""}
                  readOnly
                  size="lg"
                  label="Bio"
                  disabled
                />
              </div>
            </div>
          </div>
          <div>
            {content?.category === "Home Slider" && (
              <img
                src={content?.cover?.filePath}
                alt={content?._id}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
            {content?.category === "Modal" && (
              <img
                src={content?.cover?.filePath}
                alt={content?._id}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      </Card>
    </>
  );
};
