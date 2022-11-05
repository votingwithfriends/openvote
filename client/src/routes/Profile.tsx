import React from "react";
import { useParams } from "react-router-dom";
import { useUserQuery } from "../generated/graphql";

export const Profile: React.FC = () => {
  const { userId } = useParams();
  const { data, loading } = useUserQuery({
    variables: {
      userId: parseInt(userId!),
    },
  });

  return (
    <section>
      <p className="font-bold text-3xl">Profile</p>
      <p>{data?.user.username}</p>
    </section>
  );
};
