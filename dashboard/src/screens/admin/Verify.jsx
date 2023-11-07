import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { RESET, verifyUser } from "../../redux/slices/authSlice";
import Loader from "../../components/common/Loader";
import { useNavigate } from "react-router-dom";

export const Verify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { verificationToken } = useParams();
  const { isLoading, isSuccess } = useSelector((state) => state.auth);

  const verifyAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET());
    if (isSuccess) {
      navigate("/admin");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="w-1/2 m-auto flex items-center justify-center text-center h-full flex-col gap-4 pt-8">
        <Typography variant="h2" color="blue-gray" className="mb-2 capitalize">
          verify profile
        </Typography>
        <Typography>The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to &quot;Naviglio&quot; where you can enjoy the main night life in Barcelona.</Typography>
        <Button onClick={verifyAccount} color="indigo" size="lg" className="font-medium capitalize">
          Verifie Profile
        </Button>
      </div>
    </>
  );
};
