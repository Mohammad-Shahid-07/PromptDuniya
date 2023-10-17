"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post?._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [post, setPost] = useState([]);

  const filterPosts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item?.creator?.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    triggerSearch(e.target.value);
  };

  const triggerSearch = (text) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filterPosts(text);
        setSearchResults(searchResults);
      }, 300)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    triggerSearch(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPost(data);
      setAllPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          className="search_input peer"
          required
          value={searchText}
          onChange={(e) => {
            handleSearchChange(e);
          }}
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchResults}
          handleTagClick={(tag) => handleTagClick(tag)}
        />
      ) : (
        <PromptCardList
          data={post}
          handleTagClick={(tag) => handleTagClick(tag)}
        />
      )}
    </section>
  );
};


export default Feed;
