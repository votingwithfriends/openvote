import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useUserQuery,
  usePollQuery,
  useAddChoiceMutation,
  useDeleteChoiceMutation,
} from "../generated/graphql";
import { TiDelete } from "react-icons/ti";

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
  const [choices, setChoices] = useState<Array<any>>([]);
  const [choice, setChoice] = useState("");
  const [addChoice] = useAddChoiceMutation();
  const [deleteChoice] = useDeleteChoiceMutation();

  useEffect(() => {
    setChoices(data?.poll.choices.map((choice) => choice) || []);
    setTitle(data?.poll.title || "");
    setUsername(userData?.user.username || "");
  }, [data, userData]);

  const handleChange = async (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    setChoice(value);
    // console.log(value);
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
      console.log(response);
      setChoices((prevChoices) => [...prevChoices, response.data?.addChoice]);
    } catch (error) {
      console.log(error);
    }
    // add current choice to choices array
    console.log(choices);
    setChoice("");
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    console.log(e.target.id);
    try {
      const response = await deleteChoice({
        variables: {
          id: parseInt(e.target.id),
        },
      });
    } catch (error) {
      console.log(error);
    }
    // setChoices(choices.filter((choice, id) => id !== choice.id));
    window.location.reload();
  };

  const handleFinishPoll = async (e: any) => {
    e.preventDefault();
    // navigate to finished poll page
    navigator(`/poll/vote/${pollId}/${userId}`);
  };
  return (
    <section>
      <div className="flex justify-center">
        <p className="font-bold text-3xl mb-4">
          Enter choices for {title} poll by {username}
        </p>
      </div>
      <div className="flex justify-center">
        <form className="bg-white w-full md:w-auto p-8 rounded-lg border-2 border-blue-500">
          <label className="font-bold">Choice: </label>
          <input
            className="w-full"
            type="text"
            name="title"
            value={choice}
            onChange={handleChange}
          />
          <div className="flex justify-center mt-3">
            <button
              onClick={handleAddChoice}
              className="bg-blue-700 p-2 text-white mr-3"
            >
              Add Another Choice
            </button>
            <button
              onClick={handleFinishPoll}
              className="bg-blue-700 p-2 text-white"
            >
              Finish Poll
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 my-4  w-full md:w-auto p-8 border-2 border-blue-500">
          <h2 className="font-bold text-xl text-center">
            Your choices for {title} poll
          </h2>
          <ul className="">
            {choices?.map((choice) => (
              <li key={choice.id} className=" flex justify-between">
                {choice.title}{" "}
                <div className="px-4" onClick={handleDelete}>
                  <TiDelete
                    id={choice.id}
                    className="inline text-2xl justify-end cursor-pointer"
                    title={`delete ${choice}`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
