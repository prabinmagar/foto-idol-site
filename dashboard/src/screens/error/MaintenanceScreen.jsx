import { Typography } from "@material-tailwind/react";
import { staticImages } from "../../images";
import { Link } from "react-router-dom";

export function MaintenanceScreen(){
  return (
    <>
      <main className="py-12 mt-20">
        <div className="flex flex-col items-center justify-center mx-auto max-w-[600px]">
          <div className="mb-6">
            <img
              src={staticImages.page_maintenance}
              className="max-w-[400px] mx-auto"
              alt=""
            />
            <Typography
              variant="h3"
              className="mt-8 mb-3 text-dark text-center font-inter"
            >
              Under Maintenance
            </Typography>
            <p className="text-center text-gray-800 max-w-[480px] mx-auto">
              Sorry for the inconvenience but we’re performing some maintenance
              at the moment. If you need to you can always contact us, otherwise
              we’ll be back online shortly!.
            </p>
          </div>
          <Link
            className="text-center px-4 h-[50px] min-w-[200px] items-center justify-center font-inter font-medium text-lg border-dark border-[2px] bg-dark text-white default-transition shadow rounded inline-flex tracking-[0.5px]"
            to="/"
          >
            Go back home
          </Link>
        </div>
      </main>
    </>
  );
}

