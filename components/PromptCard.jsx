"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete, searchResults }) => {
  const { data: session } = useSession();
  const [copied, setCopied] = useState('');
  const router = useRouter();
  const pathName = usePathname();
  const handleCopy = () => {
    setCopied(post);
    navigator.clipboard.writeText(post);
    setTimeout(() => setCopied(""),3000);
  }
  const id  = post?.creator?._id;

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <Link href={session?.user.id === post?.creator?._id ? '/profile' : `/user-profile/${id}` }>
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer ">
          <img

            src={post?.image}
            alt="profile"
            className="rounded-full object-contain user_profile"
          />
          <div className="flex flex-col">
            <p className="text-sm fonst-satoshi font-semibold">
              {post?.creator?.username}
            </p>
            <p className="text-xs font-inter text-gray-400">
              {post?.creator?.email}
            </p>
          </div>
        </div>
        </Link>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post?.prompt ? "/assets/icons/tick.svg": "/assets/icons/copy.svg" }
            alt="copy"
            width={20}
            height={20}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700"> {post?.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer " onClick={() => handleTagClick && handleTagClick(post?.tag)}>#{post?.tag}</p>
      {session?.user.id === post?.creator?._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-green-100 pt-3 ">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>Delete</p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
