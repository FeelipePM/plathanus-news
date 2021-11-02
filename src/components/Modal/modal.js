import React, { useRef } from "react";
import { Formik, Form, Field } from "formik";

import { usePost } from '../../hooks/posts';

import { AddIcon } from '@chakra-ui/icons'

import { Modal, ModalHeader, ModalBody, ModalOverlay, ModalContent, ModalFooter, ModalCloseButton, FormControl, FormLabel, FormErrorMessage, Input, Textarea, Select, Button, useDisclosure, useToast } from "@chakra-ui/react"


export function FormModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialRef = useRef()
  const finalRef = useRef()

  const { addPost } = usePost();

  function validateTitle(value) {
    let error
    if (!value) {
      error = "Title is required"
    } 
    return error
  }

  function validateContent(value) {
    let error
    if (!value) {
      error = "Content is required"
    } 
    return error
  }

  function validateAuthor(value) {
    let error
    if (!value) {
      error = "Author is required"
    } 
    return error
  }
    
  return (
    <>
      <Button onClick={onOpen} leftIcon={<AddIcon />} colorScheme="blue" textTransform="uppercase" justifyContent="center">Create post</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

          <Formik initialValues={{ title: "", content: "", author: "" }}
          onSubmit={async (values) => {

            const { title, content, author } = values;

            addPost(title, content, author);

            toast({
              title: "post created.",
              description: "We've created your post.",
              status: "success",
              duration: 9000,
              isClosable: true,
        })

        onClose();
        
            
          }}>
      {(props) => (
        <Form>
          <Field name="title" validate={validateTitle}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.title && form.touched.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input {...field} id="title" placeholder="create a title" />
                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="content" validate={validateContent}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.content && form.touched.content}>
              <FormLabel htmlFor="content">Content</FormLabel>
              <Textarea {...field} id="content" placeholder="create an content" />
              <FormErrorMessage>{form.errors.content}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="author" validate={validateAuthor}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.author && form.touched.author}>
              <FormLabel htmlFor="author">Author</FormLabel>
              <Select {...field} placeholder="Select author">
                <option value="1">David Doe</option>
                <option value="2">Sarah Baker</option>
              </Select>
              <FormErrorMessage>{form.errors.author}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <ModalFooter>
            <Button
            mr="10px"
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </Form>
      )}
    </Formik>

          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};