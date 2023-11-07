import { Typography } from "@material-tailwind/react";
import { staticImages } from "../../images";
import { Link } from "react-router-dom";

export function ServerErrorScreen(){
  return (
    <>
      <main className="py-12 mt-20">
        <div className="flex flex-col items-center justify-center mx-auto max-w-[600px]">
          <div className="mb-6">
            <img src={staticImages.page_500} className="max-w-[400px] mx-auto" alt="" />
            <Typography
              variant="h3"
              className="mt-8 mb-3 text-dark text-center font-inter"
            >
              Something has gone seriously wrong
            </Typography>
            <p className="text-center text-gray-800 max-w-[480px] mx-auto">
              It&apos;s always time for a coffee break. We should be back by the time
              you finish your coffee.
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
