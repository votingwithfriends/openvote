import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserQuery, useAddPollMutation } from "../generated/graphql";

export const CreatePoll: React.FC = () => {
  const { userId } = useParams();
  const [title, setTitle] = useState("");
  const [addPoll] = useAddPollMutation();
  const navigator = useNavigate();
  const { data, loading } = useUserQuery({
    variables: {
      userId: parseInt(userId!),
    },
  });

  const handleChange = (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    setTitle(value);
    console.log(title);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // add poll using addpoll mutation
      const response = await addPoll({
        variables: {
          title,
          is_open: true,
          userId: parseInt(userId!),
        },
      });

      //   navigate to choices page and send poll data
      navigator(`/poll/choices/${response.data?.addPoll.id}/${userId}`);
    } catch (error) {
      console.log(error);
    }
    setTitle("");
  };

  return (
    <section>
      <div className="flex justify-center">
        <p className="font-bold text-3xl  ">
          Name your poll {data?.user.username}
        </p>
      </div>
      <div className="flex justify-center">
        <form
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 md:w-1/2"
          onSubmit={handleSubmit}
        >
          <label className="font-bold">Poll Title: </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
          <button className="bg-blue-700 p-2 text-white mt-2">Submit</button>
        </form>
      </div>
    </section>
  );
};
