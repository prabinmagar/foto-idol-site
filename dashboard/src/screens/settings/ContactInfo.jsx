import {
  Button,
  Card,
  IconButton,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import {
  createOrUpdateContactInfo,
  getContactInfo,
} from "../../redux/slices/settings/SettingSlice";
import { SocialIcon } from "react-social-icons";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

export const ContactInfo = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    address: "",
    socialMedia: [],
  });

  const { contactinfo } = useSelector((state) => state.setting);

  useEffect(() => {
    dispatch(getContactInfo());
  }, [dispatch]);

  useEffect(() => {
    if(contactinfo){
      setFormData({
        phone: contactinfo.phone,
        email: contactinfo .email,
        address: contactinfo.address,
        socialMedia: contactinfo.socialMedia
      })
    }
  }, [contactinfo]);

  console.log(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocialMediaChange = (e, index) => {
    const newSocialMedia = [...formData.socialMedia];
    newSocialMedia[index] = { link: e.target.value };
    setFormData({ ...formData, socialMedia: newSocialMedia });
  };

  const addSocialMediaLink = () => {
    setFormData({
      ...formData,
      socialMedia: [...formData.socialMedia, { link: "" }],
    });
  };

  const removeSocialMediaLink = (index) => {
    const newSocialMedia = [...formData.socialMedia];
    newSocialMedia.splice(index, 1);
    setFormData({ ...formData, socialMedia: newSocialMedia });
  };

  const isInvalidSocialMediaLink = (link) => {
    const regex = /^(https?:\/\/|www\.|web\.)[^\s]+\.(com|.+)$/i;
    return !regex.test(link);
  };

  const createOrUpdate = async (e) => {
    e.preventDefault();
    let hasError = false;
    if (formData.socialMedia.length !== 0) {
      formData.socialMedia.forEach(async (link) => {
        if (!link.link.trim()) {
          hasError = true;
          toast.error("Social media link can't be empty.");
        } else {
          if (isInvalidSocialMediaLink(link.link)) {
            hasError = true;
            toast.error(link.link + ` is not a valid social media link.`);
          }
        }
      });

      if (!hasError) {
        const httpdAddedLinks = formData.socialMedia.map((link) => {
          if (!link.link.startsWith("https://")) {
            return {
              ...link,
              link: `https://${link.link}`,
            };
          }
          return link;
        });
        await dispatch(
          createOrUpdateContactInfo({
            ...formData,
            socialMedia: httpdAddedLinks,
          })
        );
        await dispatch(getContactInfo());
      }
    }
  };

  return (
    <>
      <Card className="py-8 px-4 lg:px-8 mt-5 font-inter rounded-md shadow-lg">
        <NavLink to="/admin/homeslider">
          <Button className="rounded">Back to table</Button>
        </NavLink>
        <br />
        <div className="grid md:grid-cols-2 gap-10 max-w-[1200px]">
          <div className="flex flex-col gap-5 border shadow-lg p-5 rounded-lg">
            <Typography variant="h4" color="blue-gray">
              Contact Information
            </Typography>
            <div className="flex flex-col gap-3">
              <div>
                <Typography
                  variant="h6"
                  className="font-inter text-[14px]  text-dark/70"
                >
                  Email address
                </Typography>
              </div>
              <div className="w-full">
                <Input size="lg" label={contactinfo?.email} disabled />
              </div>
            </div>
            <div className="grid xxl:grid-cols-2 gap-3">
              <div className="flex flex-col gap-3">
                <div>
                  <Typography
                    variant="h6"
                    className="font-inter text-[14px]  text-dark/70"
                  >
                    Contact number
                  </Typography>
                </div>
                <div className="w-full">
                  <Input size="lg" label={contactinfo?.phone} disabled />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <Typography
                    variant="h6"
                    className="font-inter text-[14px]  text-dark/70"
                  >
                    Address
                  </Typography>
                </div>
                <div className="w-full">
                  <Input size="lg" label={contactinfo?.address} disabled />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <Typography
                  variant="h6"
                  className="font-inter text-[14px]  text-dark/70"
                >
                  Social Media
                </Typography>
              </div>
              <div className="w-full">
                {contactinfo?.socialMedia?.map((links, index) => (
                  <div
                    key={index}
                    className="flex md:flex-row flex-col md:items-center gap-3 mb-3"
                  >
                    <div>
                      <SocialIcon
                        url={links.link}
                        target="_blank"
                        style={{
                          width: "40px",
                          height: "40px",
                          minWidth: "40px",
                        }}
                      />
                    </div>
                    <Input size="lg" label={links.link} disabled />
                  </div>
                ))}
                {contactinfo?.socialMedia?.length === 0 && (
                  <Typography className="font-inter font-medium text-sm text-dark/60">
                    No social links found.
                  </Typography>
                )}
              </div>
            </div>
          </div>
          {!showContactForm && (
            <div>
              <Button
                className="bg-moonstone rounded flex items-center gap-x-2"
                onClick={() => setShowContactForm(true)}
              >
                <AiFillEdit />
                <span>change contact information</span>
              </Button>
            </div>
          )}
          {showContactForm && (
            <div>
              <Typography
                variant="h4"
                color="blue-gray"
                className="mb-5 text-lg"
              >
                Change Contact Details
              </Typography>
              <form onSubmit={createOrUpdate}>
                <div className="mb-4 flex flex-col gap-3">
                  <Input
                    size="lg"
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <Input
                    size="lg"
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />

                  <Textarea
                    size="lg"
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  <div className="mb-4 flex flex-col gap-2">
                    <Typography className="font-medium">
                      Social Media Links
                    </Typography>
                    {formData.socialMedia.map((linkObj, index) => (
                      <div key={index} className="flex items-center gap-2 my-1">
                        <Input
                          size="lg"
                          name={`socialMedia[${index}]`}
                          value={linkObj.link}
                          onChange={(e) => handleSocialMediaChange(e, index)}
                          label="Social Media Link"
                        />
                        <IconButton
                          color="red"
                          onClick={() => removeSocialMediaLink(index)}
                        >
                          <RxCross1 size={20} />
                        </IconButton>
                      </div>
                    ))}
                    <IconButton
                      className="bg-moonstone rounded"
                      onClick={addSocialMediaLink}
                    >
                      <AiOutlinePlus size={20} />
                    </IconButton>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    className="mt-6 bg-red-500 rounded"
                    onClick={() => setShowContactForm(false)}
                  >
                    close
                  </Button>
                  <Button className="mt-6 bg-moonstone rounded" type="submit">
                    Save Contact Info
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};
