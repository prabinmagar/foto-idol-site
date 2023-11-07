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
        color="orange"
        variant="ghost"
        className="mt-5"
        action={
          <Button size="md" className="!absolute top-2 right-3 bg-red-800" onClick={sendVerEmail}>
            Resend Link
          </Button>
        }
      >
        <span>
          <b>Message</b> : To verify your account, check your email for a verification link.
        </span>
      </Alert>
    </>
  );
};
