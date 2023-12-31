"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "/components/Form";
const CreatePrompt = () => {
  const [ submiting, setSubmiting ] = useState(false);
  const [ post, setPost ] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  const { data: session } = useSession();
  const createPrompt = async (e) => {

    e.preventDefault();
    setSubmiting(true);
    try {
        const res = await fetch("/api/prompt/new", {
            method: "POST",
            body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag,
                userId: session?.user.id,
                image: session?.user.image,
            }),
        })
        if (res.ok) {
            router.push("/");
        }
    } catch (error) {
        console.log(error);
    } finally {
        setSubmiting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submiting={submiting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
