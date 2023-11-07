import {
  Button,
  Card,
  CardBody,
  IconButton,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
  Switch,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { SocialIcon } from "react-social-icons";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import {
  createLinks,
  deleteLink,
  getAllLinks,
  selectAllLinks,
  updateLink,
} from "../../redux/slices/userSlice";
import { BsPencilSquare } from "react-icons/bs";
const TABLE_HEAD = ["S.N.", "Social Media", "URL", "Visibility", "Action"];

export const SocialLinks = () => {
  useRedirectLoggedOutUser("/auth/login");
  const [updateLinkData, setUpdateLinkData] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    links: [],
  });

  const links = useSelector(selectAllLinks);
  const handleSocialMediaChange = (e, index) => {
    const newLinks = [...formData.links];
    newLinks[index] = { ...newLinks[index], link: e.target.value };
    setFormData({ links: newLinks });
  };

  const addSocialMediaLink = () => {
    setFormData({
      links: [...formData.links, { link: "", visibility: "public" }],
    });
  };

  const removeSocialMediaLink = (index) => {
    const newLinks = [...formData.links];
    newLinks.splice(index, 1);
    setFormData({ links: newLinks });
  };

  const isInvalidSocialMediaLink = (link) => {
    const regex = /^(https?:\/\/|www\.|web\.)[^\s]+\.(com|.+)$/i;
    return !regex.test(link);
  };

  const submitLinks = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (formData.links.length !== 0) {
      formData.links.forEach(async (link) => {
        if (!link.link.trim()) {
          hasError = true;
          toast.error("Social media link can't be empty.");
        } else {
          if (isInvalidSocialMediaLink(link.link)) {
            hasError = true;
            toast.error(link.link + ` is not a valid social medai link.`);
          }
        }
      });

      if (!hasError) {
        const httpAddedLinks = formData.links.map((link) => {
          if (!link.link.startsWith("https://")) {
            return {
              ...link,
              link: `https://${link.link}`,
            };
          }
          return link;
        });
        await dispatch(
          createLinks({
            links: httpAddedLinks,
          })
        );
        await dispatch(getAllLinks());
      }
    } else {
      toast.error("Please enter social media links.");
    }
  };

  const handleLinkDelete = async (linkId) => {
    await dispatch(deleteLink(linkId));
    await dispatch(getAllLinks());
  };

  const handleVisibilityToggle = async (link) => {
    const tempLink = {
      linkId: link._id,
      linkData: {
        link: link.link,
        visibility: link.visibility === "public" ? "private" : "public",
      },
    };

    await dispatch(updateLink(tempLink));
    await dispatch(getAllLinks());
  };

  const handleURLEdit = (link) => {
    setUpdateLinkData(link);
  };

  const handleURLChange = (e) => {
    setUpdateLinkData((prevData) => {
      return {
        ...prevData,
        link: e.target.value,
      };
    });
  };

  const updateURLChange = async () => {
    let hasError = false;

    if (isInvalidSocialMediaLink(updateLinkData.link)) {
      hasError = true;
      toast.error(
        updateLinkData.link.toString() + ` is not a valid social medai link.`
      );
    } else {
      const tempLink = {
        linkId: updateLinkData._id,
        linkData: {
          link: updateLinkData.link.toString().startsWith("https://")
            ? updateLinkData.link.toString()
            : `https://${updateLinkData.link.toString()}`,
          visibility: updateLinkData.visibility,
        },
      };

      if (!hasError) {
        await dispatch(updateLink(tempLink));
        await dispatch(getAllLinks());
      }
    }
  };

  useEffect(() => {
    dispatch(getAllLinks());
  }, [dispatch]);

  return (
    <>
      <Card className="h-full w-full font-inter mt-6">
        <div className="max-w-[500px] w-full p-6">
          <Typography variant="h4" color="blue-gray" className="mb-5">
            Add Social Media Links
          </Typography>
          <form onSubmit={submitLinks}>
            <div className="mb-4 flex flex-col gap-4">
              {formData.links.map((linkObj, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    name={`socialMedia[${index}]`}
                    value={linkObj.link}
                    onChange={(e) => handleSocialMediaChange(e, index)}
                    label="Enter social link URL"
                  />
                  <IconButton
                    className="min-w-[36px] w-[36px] h-[36px] rounded"
                    color="red"
                    onClick={() => removeSocialMediaLink(index)}
                  >
                    <RxCross1 size={18} />
                  </IconButton>
                </div>
              ))}
              <IconButton
                className="border-2 bg-white text-moonstone border-moonstone rounded"
                onClick={addSocialMediaLink}
              >
                <AiOutlinePlus size={20} />
              </IconButton>
            </div>
            <Button className="mt-6 bg-moonstone rounded" type="submit">
              Save Contact Info
            </Button>
          </form>
        </div>
        <CardBody className="overflow-x-scroll scrollbar-x-dir p-1">
          {links && links[0]?.links?.length === 0 && (
            <div>
              <p className="py-6 px-4 font-inter font-semibold">
                No social media links added yet!
              </p>
            </div>
          )}

          {links && links[0]?.links?.length > 0 && (
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium uppercase text-base leading-none"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {links[0]?.links?.map((link, index) => {
                  const isLast = index === links && links[0]?.links?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
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
                        <div className="flex flex-col items-start gap-3">
                          <SocialIcon
                            url={link.link}
                            target="_blank"
                            style={{ width: "36px", height: "36px" }}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Popover placement="bottom-end">
                          <div className="flex gap-x-2 justify-between max-w-[280px]">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {link?.link}
                            </Typography>
                            <PopoverHandler onClick={() => handleURLEdit(link)}>
                              <button
                                type="button"
                                className="hover:text-moonstone default-transition"
                              >
                                <BsPencilSquare size={18} />
                              </button>
                            </PopoverHandler>
                          </div>

                          <PopoverContent className=" w-full max-w-[280px] p-2.5">
                            <Typography
                              color="blue-gray"
                              className="mb-2 text-sm font-semibold"
                            >
                              Change URL
                            </Typography>
                            <div className="flex flex-col gap-2">
                              <Input
                                label="Social link URL"
                                className="w-full"
                                value={`${updateLinkData.link.toString()}`}
                                onChange={handleURLChange}
                              />
                              <Button
                                className="bg-moonstone rounded"
                                onClick={updateURLChange}
                              >
                                CHANGE
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-x-3">
                          <Switch
                            onChange={() => handleVisibilityToggle(link)}
                            checked={
                              link?.visibility === "public" ? true : false
                            }
                            className={` checked:bg-moonstone`}
                            circleProps={{
                              className: "border-none",
                            }}
                          />
                          <span className="capitalize text-sm text-dark-blue">
                            {link?.visibility}
                          </span>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex gap-2">
                          <IconButton
                            size="sm"
                            className="rounded"
                            color="red"
                            onClick={() => handleLinkDelete(link?._id)}
                          >
                            <AiFillDelete size={20} />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </>
  );
};
