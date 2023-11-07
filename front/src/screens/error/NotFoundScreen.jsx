import { Typography } from "@material-tailwind/react";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { staticImages } from "../../images";
import { Link } from "react-router-dom";

const NotFoundScreen = () => {
  return (
    <>
      <Header />
      <main className="py-12 mt-20">
        <div className="flex flex-col items-center justify-center mx-auto max-w-[600px]">
          <div className="mb-6">
            <img src={staticImages.page_not_found} alt="" />
            <Typography variant="h3" className="mt-8 text-dark text-center font-inter">
              Page Not Found!
            </Typography>
          </div>

          <Link
            className="text-center px-4 h-[50px] min-w-[200px] items-center justify-center font-inter font-medium text-lg border-dark border-[2px] bg-dark text-white default-transition shadow rounded inline-flex tracking-[0.5px]"
            to="/"
          >
            Go To Home Page
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFoundScreen;
