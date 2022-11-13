import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useUserQuery,
  usePollQuery,
  useAddChoiceMutation,
} from "../generated/graphql";

export const CreateChoice: React.FC = () => {
  // get poll data from create poll
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
  const [choice, setChoice] = useState("");
  const [addChoice] = useAddChoiceMutation();

  useEffect(() => {
    setChoices(data?.poll.choices.map((choice) => choice.title) || []);
    setTitle(data?.poll.title || "");
    setUsername(userData?.user.username || "");
  }, [data, userData]);

  const handleChange = async (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    setChoice(value);
    console.log(value);
  };

  const handleAddChoice = async (e: any) => {
    e.preventDefault();
    try {
      // add choice to poll
      const response = await addChoice({
        variables: {
          title: choice,
          pollId: parseInt(pollId!),
        },
      });
    } catch (error) {
      console.log(error);
    }
    // add current choice to choices array
    setChoices((prevChoices) => [...prevChoices, choice]);
    console.log(choices);
    setChoice("");
  };

  const handleFinishPoll = async (e: any) => {
    e.preventDefault();
    console.log(pollId, userId);
    // navigate to finished poll page
    navigator(`/poll/vote/${pollId}/${userId}`);
  };
  return (
    <section>
      <p className="font-bold text-3xl">
        Enter Choices for {title} Poll by {username}
      </p>
      <div>
        <form>
          <label>Choice: </label>
          <input
            className="mr-3"
            type="text"
            name="title"
            value={choice}
            onChange={handleChange}
          />
          <button
            onClick={handleAddChoice}
            className="bg-blue-700 p-2 text-white my-3 mr-3"
          >
            Add Another Choice
          </button>
          <button
            onClick={handleFinishPoll}
            className="bg-blue-700 p-2 text-white"
          >
            Finish Poll
          </button>
        </form>
        <div>
          <h2 className="font-bold text-xl">Your Choices for {title} Poll</h2>
          <ul>
            {choices?.map((choice) => (
              <li key={choice}>{choice}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
