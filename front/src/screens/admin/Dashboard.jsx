import { Card, Typography } from "@material-tailwind/react";
import { staticImages } from "../../images";
import { Overview } from "../../components/common/Overview";
import { Link } from "react-router-dom";
import { selectUser } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";

export const Dashboard = () => {
  useRedirectLoggedOutUser("/auth/login");
  const user = useSelector(selectUser);
  return (
    <>
      <div className="flex flex-col py-5">
        {!user?.isVerified && (
          <div
            className="flex flex-col p-4 mb-4 text-sm text-dark-blue rounded-lg bg-blue-50"
            role="alert"
          >
            <div className="flex items-center">
              <div className="font-inter text-base">
                <svg
                  className="flex-shrink-0 inline w-4 h-4 mr-3 mb-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="font-semibold">Not Verified!</span> Please
                <span className="font-semibold mx-1">
                  check your email inbox
                </span>{" "}
                for account verfication link or{" "}
                <Link to="/admin/account" className="underline font-medium">
                  click here
                </Link>{" "}
                to go to resend link page if you haven&apos;t recevied yet.
              </div>
            </div>
            <p className="font-inter mt-3">
              <span className="font-semibold">NOTE :</span> Account verification
              is compulsory for uploading photos.
            </p>
          </div>
        )}
        <DashboardContent />
        <Overview />
        {/* <Gallery /> */}
      </div>
    </>
  );
};

export const DashboardContent = () => {
  return (
    <>
      <section className="bg-">
        <Card>
          <div
            className="md:p-8 p-6 overflow-hidden rounded-xl"
            style={{
              background: `linear-gradient(90deg, rgba(0, 143, 161, 1) 0%, rgba(0, 188, 212, 0.95) 100%), url(${staticImages.intro_hero}) center/cover no-repeat`,
            }}
          >
            <Typography
              variant="h4"
              className=" capitalize font-semibold font-inter text-white"
            >
              We’ve been waiting for you!
            </Typography>
            <Typography
              variant="h6"
              className="capitalize font-normal text-sm my-3 font-inter text-white"
            >
              WELCOME TO THE FOTOIDOL UPLOAD PANEL!
            </Typography>
          </div>
        </Card>
      </section>
    </>
  );
};
