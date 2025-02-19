import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import "./home.scss";
import CreatePost from "../../components/createpost/CreatePost";

export default function Home() {
  return (
    <div className="home">
      <Stories />
      <CreatePost />
      <Posts />
    </div>
  );
}