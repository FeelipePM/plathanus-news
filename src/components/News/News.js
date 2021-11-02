import React, { useState, useEffect } from 'react';

import { api } from '../../services/api';

import { usePost } from '../../hooks/posts';

import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, Flex, Button } from "@chakra-ui/react"

export function News() {
  const [posts, setPosts] = useState([]);
  const { removePost } = usePost();

      async function loadPost(){
      const response = await api.get('articles');
      const data = response.data.map(post => ({
        ...post,
      }))

      setPosts(data);
    }

    useEffect(() => { loadPost() }, []);

    function handleRemovePost(postId) {
      removePost(postId);

    }
  
  return (
    <>

    <Flex flexWrap="wrap" justifyContent="space-evenly">
      {posts.map(post => (
        <Box key={post.id} p="3" mt="10px" maxW="sm" borderWidth="1px" overflow="hidden">
        <Box
          mt="2"
          fontSize="xl"
          fontWeight="semibold"
          as="h1"
          lineHeight="short"
        >
          {post.title}
        </Box><Box mt="1" mb="1.5" as="p" color="gray.600" fontSize="lg">
            {post.content}
          </Box>
          <Box display="flex" justifyContent="space-between">
          <Box as="span" fontWeight="semibold" fontSize="sm">
            Por {post.author.name}
          </Box>
          <Box justifyContent="center">
          <Button leftIcon={<EditIcon w={5} h={5} color="gray.500" />}
            onClick={() => console.log('Edit')} 
            mr="10px"
            color="gray.500" 
            colorScheme="gray" 
            variant="outline">
          Edit
          </Button>
          <Button leftIcon={<DeleteIcon w={5} h={5} color="red.500" />} 
            onClick={() => handleRemovePost(post.id)}
            color="red.500" 
            colorScheme="red" 
            variant="outline">
              Delete
          </Button>
          </Box>
          </Box>
          </Box>
      ))}
  </Flex>
  </>
  );
};
