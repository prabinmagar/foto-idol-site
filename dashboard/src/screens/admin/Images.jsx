import { PostDataTable } from "../../components/common/PostDataTable";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";

export const Images = () => {
  useRedirectLoggedOutUser("/login");
  return (
    <>
      <div className="flex flex-col py-5">
        <PostDataTable />
      </div>
    </>
  );
};
