import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturesLists } from "../../redux/slices/settings/SettingSlice";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const ViewFeatures = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { features, isLoading } = useSelector((state) => state.setting);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFeatures = features && features[0]?.items?.filter((post) => {
    const titleMatch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const authorMatch = post.user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return titleMatch || authorMatch;
  });

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    dispatch(getFeaturesLists());
  }, [dispatch]);

  return (
    <>
      <section className="p-6 rounded-lg my-6 bg-white">
      <div className="flex justify-between items-center">
        <Typography
          variant="h4"
          color="blue-gray"
          className="text-xl lg:text-2xl"
        >
          View Featured Images
        </Typography>
        <NavLink to="/admin/featured" className="mt-5 block">
          <Button color="gray" className="mb-6 rounded">
            Back to All
          </Button>
        </NavLink>
      </div>
     
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-8">
        <div className="w-full md:w-80">
          <Input
            label="Search by Title & Author"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="font-inter placeholder:font-inter"
          />
        </div>
      </div>
        
        {isLoading && <Loader />}

        {features && features[0]?.items?.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-4 gap-3">
            {filteredFeatures?.map((feature) => {
                return (
                  <Card className="mb-4" key={feature?._id}>
                    <CardHeader
                      shadow={false}
                      floated={false}
                      className="m-1 h-[200px]"
                    >
                      <img
                        src={feature?.assets && feature.assets[0]?.filePath}
                        alt="card-image"
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody className="m-0 p-2">
                      <div className="flex items-center gap-3">
                        <div>
                          <Avatar
                            size="sm"
                            variant="circular"
                            className="min-w-[36px]"
                            src={
                              feature?.user?.avatar?.url || feature.user?.avatar
                            }
                          />
                        </div>
                        <div>
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className=" capitalize text-base"
                          >
                            {feature?.title?.slice(0, 24)}{"..."}
                          </Typography>
                          <Typography
                            variant="small"
                            color="gray"
                            className="font-normal"
                          >
                            {feature?.user?.name}
                          </Typography>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
          </div>
        ) : (
          <div className="bg-white p-4 rounded-md shadow-lg">
            <Typography variant="h6" color="blue-gray">
              No featured images found!
            </Typography>
          </div>
        )}
      </section>
    </>
  );
};
