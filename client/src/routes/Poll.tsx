import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useUserQuery,
  usePollQuery,
  useAddChoiceMutation,
} from "../generated/graphql";

export const Poll = () => {
  const navigator = useNavigate();
  const { pollId, userId } = useParams();
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
  const [choices, setChoices] = useState<Array<string>>([]);

  useEffect(() => {
    setChoices(data?.poll.choices.map((choice) => choice.title) || []);
    setTitle(data?.poll.title || "");
    setUsername(userData?.user.username || "");
  }, [data, userData]);
  return (
    <div>
      <p>
        {title} Poll by {username}
      </p>
      <ul>
        {choices.map((choice) => (
          <li key={choice}>{choice}</li>
        ))}
      </ul>
      <button className="bg-blue-700 p-2 text-white">Vote</button>
    </div>
  );
};
