import React, { createContext,  useState ,useContext } from "react";

import { api } from '../../src/services/api';  

  const PostContext = createContext(null);

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  async function loadPost(){
      const response = await api.get('articles');
      const data = response.data.map(post => ({
        ...post,
      }))

      setPosts(data);
    }

  async function addPost(title, content, author) {
    const response = await api.post('/articles', {title, content, author});

      const newPost = response.data;
      console.log(newPost);

      setPosts(newPost)
  }

    async function removePost(id){
      const response = await api.delete(`articles/${id}`);
      const removedPost = response.data;

        setPosts(...posts ,removedPost);
    }

  return <PostContext.Provider value={{posts, loadPost, addPost, removePost}}>{children}
  </PostContext.Provider>;
};

export function usePost() {
  const context = useContext(PostContext);

  return context;
}

