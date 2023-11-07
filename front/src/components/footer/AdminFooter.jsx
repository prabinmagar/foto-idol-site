import { Typography } from "@material-tailwind/react";
 
export function AdminFooter() {
  const copyrightYear = new Date();
  return (
    <footer className="w-full bg-white p-4 mt-6 shadow-md rounded-lg">
      {/* <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center">
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              License
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contribute
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div> */}
      {/* <hr className="my-5 border-blue-gray-50" /> */}
      <Typography color="blue-gray" className="text-center font-inter font-normal md:text-[15px] text-sm opacity-90">
        &copy; { copyrightYear.getFullYear() } All Rights Reserved To Foto Idol. Developed By Faith Tech.
      </Typography>
    </footer>
  );
}