import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserQuery, usePollQuery } from "../generated/graphql";

export const Poll = () => {
  const navigator = useNavigate();
  const { pollId } = useParams();
  const { data, loading } = usePollQuery({
    variables: {
      id: parseInt(pollId!),
    },
  });
  const { data: userData, loading: userLoading } = useUserQuery({
    variables: {
      userId: data?.poll.userId || 0,
    },
  });
  // console.log(userData);
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [choices, setChoices] = useState<Array<any>>([]);

  useEffect(() => {
    console.log(data?.poll.choices.map((choice) => choice));
    setChoices(data?.poll.choices.map((choice) => choice) || []);
    setTitle(data?.poll.title || "");
    setUsername(userData?.user.username || "");
  }, [data]);

  if (loading || userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="flex justify-center">
        <p className="font-bold text-3xl  ">
          {title} poll by {username}
        </p>
      </div>
      <div className="flex justify-center">
        <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 md:w-1/2">
          <ul className="">
            {choices?.map((choice) => (
              <div className="flex justify-between m-1">
                <li key={choice.id}>{choice.title}</li>
                <input
                  type="text"
                  name="vote"
                  placeholder="vote"
                  className="w-1/5"
                />
              </div>
            ))}
          </ul>
          <button className="bg-blue-700 p-2 text-white">Vote</button>
        </form>
      </div>
    </section>
  );
};
