import { Card, Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  CardHeader,
  Input,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { DateFormatter } from "./DateFormatter";
import { useState } from "react";
import ImageViewer from "./ImageViewer";
import useModal from "../../hooks/useModal";

const TABLE_HEAD = ["S.N.", "Title", "Created At", "Creator", "Cover Image"];

export const CategoryDataTable = (props) => {
  // ### PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const categoryPerPage = 10;
  const indexOfLastCategory = currentPage * categoryPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoryPerPage;
  const totalPages = Math.ceil(props.TABLE_DATA.length / categoryPerPage);

  const currentCategories = props.TABLE_DATA.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(props.TABLE_DATA.length / categoryPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ### IMAGE PREVIEW MODAL
  const { modalOpen, imageSrc, openModal, closeModal } = useModal();

  return (
    <>
      {modalOpen && <ImageViewer src={imageSrc} onClose={closeModal} />}
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none p-1">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                All Categories
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about the categries that have been created.
              </Typography>
            </div>
            {props?.showViewBtn && (
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button className="bg-moonstone rounded" size="sm">
                  view all
                </Button>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-80">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="p-0 w-[90vw] lg:w-[calc(100vw-350px)] overflow-x-scroll scrollbar-x-dir">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD?.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 px-4 py-5"
                  >
                    <Typography
                      color="blue-gray"
                      className="leading-none text-base font-semibold"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentCategories?.map((category, index) => {
                const isLast = index === props?.TABLE_DATA?.length - 1;
                const classes = isLast
                  ? "px-4 py-2 align-middle"
                  : "px-4 py-2 border-b border-blue-gray-50 align-middle";
                return (
                  <tr key={category?._id} className="align-top">
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold w-[180px]"
                      >
                        {category?.title}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {<DateFormatter date={category?.createdAt} />}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold uppercase text-sm"
                      >
                        {category?.user?.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {
                        category?.cover ? (<button
                          type="button"
                          className="w-[50px] h-[50px] rounded-full overflow-hidden ms-4"
                          onClick={() => openModal(category?.cover?.filePath)}
                        >
                          <img
                            src={category?.cover?.filePath}
                            alt={category?.title}
                            className="w-full h-full object-cover"
                          />
                        </button>) : <span className="text-sm font-medium font-inter text-dark">Image Not Found!</span>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal font-inter"
          >
            Page {currentPage} of {Math.ceil(props?.TABLE_DATA?.length / categoryPerPage)}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              className="rounded border-[1px] border-moonstone text-moonstone"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              className="rounded border-[1px] border-pink text-pink"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

CategoryDataTable.propTypes = {
  showViewBtn: PropTypes.any,
  TABLE_HEAD: PropTypes.any,
  TABLE_DATA: PropTypes.any,
};
