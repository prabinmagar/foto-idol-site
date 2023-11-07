import { Card, Typography } from "@material-tailwind/react";
import { staticImages } from "../../images";
import { Overview } from "../../components/common/Overview";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";

export const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  return (
    <>
      <div className="flex flex-col py-5">
        <DashboardContent />
        <Overview />
      </div>
    </>
  );
};

export const DashboardContent = () => {
  return (
    <>
      <section>
        <Card>
          <div
            className="p-8 overflow-hidden rounded-lg"
            style={{
              background: `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url(${staticImages.intro_hero}) center/cover no-repeat`,
            }}
          >
            <Typography
              variant="h4"
              className="text capitalize font-semibold text-white"
            >
              Dear Admin, You Own The Control to Photol Idol Site!
            </Typography>
            <Typography
              variant="h6"
              className="capitalize font-semibold text-gray- my-3 text-gray-200"
            >
              Welcome to the FotoIdol Admin Panel!
            </Typography>
          </div>
        </Card>
      </section>
    </>
  );
};
