import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserQuery, usePollQuery } from "../generated/graphql";
import { Layout } from "../components/layout";

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
    // console.log(username);
  }, [data, userData]);

  if (loading || userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <section>
        <div className="flex justify-center">
          <p className="font-bold text-center text-3xl mb-4 ">
            {title} poll by {username}
          </p>
        </div>
        <div className="flex justify-center">
          <form className="bg-white w-full md:w-auto p-8 rounded-lg border-2 border-blue-500">
            <ul className="">
              {choices?.map((choice) => (
                <div key={choice.title} className="flex justify-between m-1">
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
            <div className="flex justify-center mt-3">
              <button className="bg-blue-700 p-2 px-6 text-white">Vote</button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};
