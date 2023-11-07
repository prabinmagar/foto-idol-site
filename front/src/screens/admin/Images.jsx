import { useDispatch, useSelector } from "react-redux";
import { getAllPost, selectAllPosts } from "../../redux/slices/postsSlice";
import { useEffect } from "react";
import { PostDataTable } from "../../components/common/posts/PostDataTable";
import Loader from "../../components/common/Loader";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";

export const Images = () => {
  useRedirectLoggedOutUser("/auth/login");
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  const isLoading = useSelector((state) => state.posts.isLoading);

  return (
    <div className="flex flex-col py-5">
      {isLoading && <Loader />}
      {posts?.length > 0 && <PostDataTable TABLE_DATA={posts} />}
    </div>
  );
};
