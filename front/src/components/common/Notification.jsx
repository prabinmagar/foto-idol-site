import { Alert, Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { RESET, sendVerificationEmail } from "../../redux/slices/authSlice";

export const Notification = () => {
  const dispatch = useDispatch();
  const sendVerEmail = async () => {
    await dispatch(sendVerificationEmail());
    await dispatch(RESET());
  };
  return (
    <>
      <Alert
        variant="ghost"
        className="mt-5 mb-8 bg-moonstone/10 flex items-center gap-3 justify-between flex-wrap"
        action={
          <Button size="md" className="top-2 right-3 bg-moonstone" onClick={sendVerEmail}>
            Resend Link
          </Button>
        }
      >
        <span className="text-sm font-inter font-normal text-dark-blue">
          To verify your account, please check your email for a verification link. <span className="font-medium">If you haven&apos;t received yet, please click below.</span>
        </span>
      </Alert>
    </>
  );
};
