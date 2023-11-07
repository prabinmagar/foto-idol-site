import {
  Card,
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  CardHeader,
  Input,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import useRedirectLoggedOutUser from "../../../utils/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  getAllComment,
  selectAllComment,
} from "../../../redux/slices/commentSlice";
import { confirmAlert } from "react-confirm-alert";
import Loader from "../../../components/common/Loader";

const TABLE_HEAD = [
  "S.N.",
  "Commented By",
  "Comment",
  "Post Author",
  "Post Title",
  "Replied To",
  "Parent Reply Comment",
  "Action",
];

const CommentTable = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.comment);
  const comments = useSelector(selectAllComment);
  const [searchQuery, setSearchQuery] = useState("");

  console.log(comments);

  // ### COMMENT SEARCHING & FILTER
  const filteredComments =
    comments?.allComment?.length > 0 &&
    comments.allComment.filter((comment) => {
      const nameMatch = comment.user.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const parentNameMatch = comment.parentComment?.user.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const contentMatch = comment.content
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const parentContentMatch = comment.parentComment?.content
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return nameMatch || parentNameMatch || contentMatch || parentContentMatch;
    });

  //   ### PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 12;

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments =
    filteredComments?.length > 0 &&
    filteredComments?.slice(indexOfFirstComment, indexOfLastComment);
  const totalPages = Math.ceil(filteredComments.length / commentsPerPage);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(comments.allComment.length / commentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDeleteComment = async (id) => {
    await dispatch(deleteComment(id));
    await dispatch(getAllComment());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete this comment?",
      message: "Are you sure to do delete this comment?.",
      buttons: [
        {
          label: "Delete",
          onClick: () => handleDeleteComment(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  useEffect(() => {
    dispatch(getAllComment());
  }, [dispatch]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      {isLoading && <Loader />}
      <Card className="h-full w-full rounded-md shadow-lg mt-8">
        <CardHeader floated={false} shadow={false} className="rounded-none p-1">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                All Comments
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about the categories that have been created.
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-80 font-inter">
              <Input
                label="Search by comment or user"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="p-0 w-[90vw] lg:w-[calc(100vw-350px)] overflow-x-scroll scrollbar-x-dir">
          {comments?.allComment?.length > 0 ? (
            <table className="mt-4 w-full mx-5 min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD?.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 px-4 py-3"
                    >
                      <Typography
                        color="blue-gray"
                        className="font-medium text-[15px] text-dark"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentComments.length > 0 &&
                  currentComments.map((comment, index) => {
                    const isLast = index === currentComments?.length - 1;
                    const classes = isLast
                      ? "px-4 py-2 align-middle"
                      : "px-4 py-2 border-b border-blue-gray-50 align-middle";
                    return (
                      <tr
                        key={comment?._id}
                        className="align-top  even:bg-blue-gray-50/50"
                      >
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {currentPage > 1
                                ? index + 1 + (currentPage - 1) * 10
                                : index + 1}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-x-3">
                            <img
                              className="w-8 h-8 rounded-full overflow-hidden"
                              src={
                                comment?.user?.avatar?.url
                                  ? comment?.user?.avatar?.url
                                  : comment?.user?.avatar
                              }
                              alt={comment?.user?.name}
                            />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-medium max-w-[100px] text-ellipsis whitespace-nowrap overflow-hidden"
                            >
                              <span className="capitalize font-normal">
                                {comment?.user?.name || "Not found"}
                              </span>
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Popover
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}
                          >
                            <PopoverHandler>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="cursor-pointer default-transition hover:text-moonstone max-w-[200px] text-ellipsis whitespace-nowrap overflow-hidden font-medium"
                              >
                                {comment?.content}
                              </Typography>
                            </PopoverHandler>
                            <PopoverContent>
                              <p className="text-dark">{comment?.content}</p>
                            </PopoverContent>
                          </Popover>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-x-3">
                            <img
                              className="w-8 h-8 rounded-full overflow-hidden"
                              src={
                                comment?.posts?.user?.avatar?.url
                                  ? comment?.posts?.user?.avatar?.url
                                  : comment?.posts?.user?.avatar
                              }
                            />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-medium max-w-[100px] text-ellipsis whitespace-nowrap overflow-hidden"
                            >
                              <span className="capitalize font-normal">
                                {comment?.posts?.user?.name || "Not found"}
                              </span>
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Popover
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}
                          >
                            <PopoverHandler>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="cursor-pointer default-transition hover:text-moonstone max-w-[200px] text-ellipsis whitespace-nowrap overflow-hidden font-medium"
                              >
                                {comment?.posts?.title}
                              </Typography>
                            </PopoverHandler>
                            <PopoverContent>
                              <p className="text-dark">{comment?.posts?.title}</p>
                            </PopoverContent>
                          </Popover>
                        </td>
                        <td className={classes}>
                          {
                            comment?.parentComment ? (<div className="flex items-center gap-x-3">
                            <img
                              className="w-8 h-8 rounded-full overflow-hidden"
                              src={
                                comment?.parentComment
                                  ? comment?.parentComment.user?.avatar?.url
                                  : comment?.parentComment?.user?.avatar
                              }
                            />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-medium max-w-[100px] text-ellipsis whitespace-nowrap overflow-hidden"
                            >
                              <span className="capitalize font-normal">
                                {comment?.parentComment?.user?.name || "Not found"}
                              </span>
                            </Typography>
                          </div>) : (<div>--</div>)
                          }
                          
                        </td>
                        <td className={classes}>
                          <Popover
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}
                          >
                            <PopoverHandler>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="cursor-pointer default-transition hover:text-moonstone max-w-[200px] text-ellipsis whitespace-nowrap overflow-hidden font-medium"
                              >
                                {comment?.parentComment
                                  ? comment?.parentComment?.content
                                  : "--"}
                              </Typography>
                            </PopoverHandler>
                            <PopoverContent>
                              <p className="text-dark">
                                {comment?.parentComment
                                  ? comment?.parentComment?.content
                                  : "--"}
                              </p>
                            </PopoverContent>
                          </Popover>
                        </td>
                        <td className={classes}>
                          <div className="flex gap-2">
                            {comment && (
                              <IconButton
                                onClick={() => confirmDelete(comment._id)}
                                size="sm"
                                className="rounded"
                                color="red"
                              >
                                <AiOutlineDelete size={20} />
                              </IconButton>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <Typography variant="h6" color="blue-gray" className="px-5 py-4">
              No comments found!
            </Typography>
          )}
        </CardBody>
        {comments?.allComment?.length > 0 && (
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal font-inter"
            >
              Page {currentPage} of{" "}
              {Math.ceil(filteredComments?.length / commentsPerPage)}
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
        )}
      </Card>
    </div>
  );
};

export default CommentTable;
