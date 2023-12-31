import Link from "next/link";
const Form = ({ type, post, setPost, submiting, handleSubmit }) => {
  
  return (
    <section className="w-full max-w-full flex-start flex-col">

    <h1 className="head_text text_left"><span className="blue_gradient">{type} Post </span> </h1>
    <p className="desc text-left max-w-md">{type} Amazing prompts with the world, and let your imagination run wild with any AI-powered platform </p>
    <form onSubmit={handleSubmit}
    className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
        <textarea
          className="form_textarea"
          placeholder="Write your prompt here"
          value={post.prompt}
          required
          onChange={(e) => setPost({ ...post, prompt: e.target.value 
          })}
        />
      </label>
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">Tag{'  '} <span className="font-normal">(#product, #gaming, #interveiw)</span></span>
        <input
          className="form_input"
          placeholder="#tag"
          value={post.tag}
          required
          onChange={(e) => setPost({ ...post, tag: e.target.value 
          })}
        />
      </label>
      <div className="flex-end gap-4 mx-3 mb-5">
        <Link href="/" className="text-gray-500 text-sm">
        Cancel
        </Link>
        <button
            type="submit"
            className="px-5 py-2 bg-primary-orange rounded-full text-white"
            disabled={submiting}
          >
            {submiting ? `${type}...`: type}
          </button> 
      </div>
    </form>
    </section>

  );
};

export default Form;
