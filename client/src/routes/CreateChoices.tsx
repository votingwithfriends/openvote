import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useUserQuery, useAddChoiceMutation } from "../generated/graphql";

export const CreateChoice = () => {
  // get poll data from create poll
  const location = useLocation();
  const title = location.state.data.title;
  console.log(location.state.data);
  const [choices, setChoices] = useState<Array<string>>([]);
  const [choice, setChoice] = useState("");
  const [addChoice] = useAddChoiceMutation();

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
          pollId: location.state.data.id,
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

  return (
    <section>
      <p className="font-bold text-3xl">Enter Choices for {title} Poll </p>
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
          <button className="bg-blue-700 p-2 text-white">Finish Poll</button>
        </form>
        <div>
          <h2 className="font-bold text-xl">Your Choices for {title} Poll</h2>
          <ul>
            {choices.map((choice) => (
              <li key={choice}>{choice}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
