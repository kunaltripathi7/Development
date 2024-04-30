// recipe to follow using context api -> provider + custom hook
// made to look clean
import { createContext, useContext, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const PostContext = createContext();

function PostProvider({ children }) {
  // same no rerender of child compos if context change and they don;t consume the provider.
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  // only happens if someone above this context changes in state which cause context compo to rerender
  // obj -> context -> props change -> consumer rerender (fixing it to correct children render -> because parent rerender dark mode change)
  const value = useMemo(
    () => ({
      posts: searchedPosts,
      onClearPosts: handleClearPosts,
      searchQuery,
      setSearchQuery,
      onAddPost: handleAddPost,
    }),
    [searchQuery, searchedPosts]
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

function usePosts() {
  const x = useContext(PostContext);
  if (x === undefined) throw new Error("Context used out of Scope");
  return x;
}

export { PostProvider, usePosts };
// only optimize if app slow & too many consumers & state change freq in context

// why create one context per func. -> cuz using any one prprty will rerender all consumers -> so make less prprty -> avoid unnecessary render
