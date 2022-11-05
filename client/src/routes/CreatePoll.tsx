import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserQuery, useAddPollMutation } from "../generated/graphql";

export const CreatePoll: React.FC = () => {
  const { userId } = useParams();
  const [title, setTitle] = useState("");
  const [addPoll] = useAddPollMutation();
  const { data, loading } = useUserQuery({
    variables: {
      userId: parseInt(userId!),
    },
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setTitle(value);
    console.log(title);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addPoll({
        variables: {
          title,
          is_open: true,
          userId: parseInt(userId!),
        },
      });
    } catch (error) {
      console.log(error);
    }
    setTitle("");
  };

  return (
    <section>
      <p className="font-bold text-3xl">Create a Poll {data?.user.username}</p>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Poll Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
          <button>Submit</button>
        </form>
      </div>
    </section>
  );
};
