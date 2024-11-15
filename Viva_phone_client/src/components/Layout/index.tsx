import { Header } from "../Header";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Footer } from "../Footer";

interface Post {
  id?: number;
  userId: string;
  title: string;
  body: string;
}

export const Layout = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post>({
    id: 10,
    userId: "",
    title: "",
    body: "",
  });

  useEffect(() => {
    //fetch returns promise GET
    fetch("https://jsonplaceholder.typicode.com/posts").then((response) => {
      response.json().then((data) => setPosts(data));
    });
  }, []);

  const onCreateNewPost = () => {
    fetch("https://jsonplaceholder.typicode.com/posts/10", {
      method: "DELETE",
    }).then((response) =>
      response
        .json()
        .then((data) => console.log("Create new post success ", data))
    );
  };

  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
