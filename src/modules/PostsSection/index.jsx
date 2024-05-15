import { Link } from "react-router-dom";
import PostsCard from "../../components/PostsCard/index";
import "./styles.css";
import { useEffect, useState } from "react";
import useGetAll from "../../utils/services/hooks/useGetAll";

function PostsSection() {
  const [posts, setPosts] = useState([])

  const { data } = useGetAll({
    url: "publication?size=3&pageNumber=0",
    needsAuth: false,
  })

  useEffect(() => {
    if (data?.data?.content.length >= 0) {
      setPosts(data?.data?.content)
    }

  }, [data])

  return (
    <section className="posts-section">
      <div className="posts-section-title">
        <h1 className="title">Publicaciones</h1>
        <h2>Impulsando transformaciones</h2>
      </div>
      <div className="posts-section-cards">
        {posts?.slice(0, 3)?.map((post) => (
          <PostsCard key={post.id} post={post} />
        ))}
      </div>
      <Link to={"/posts"}>
        <button className="posts-section-button">Ir a Publicaciones</button>
      </Link>
    </section>
  );
}

export default PostsSection;