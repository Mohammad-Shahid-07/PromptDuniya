"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "/components/Form";

const EditPrompt = () => {
  const [submiting, setSubmiting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  useEffect(() => {
    const getPrompt = async () => {
      const response = await fetch(`api/prompt/${promptId}`);
      const data = await response.json();
      console.log(data);
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPrompt();
  }, [promptId]);
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmiting(true);
    if(!promptId) return alert("You can't edit this prompt");
    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
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
      type="Update"
      post={post}
      setPost={setPost}
      submiting={submiting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
