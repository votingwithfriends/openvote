import { Layout } from "../components/layout";
import { useParams, Link } from "react-router-dom";
import { FiPlus, FiUsers } from "react-icons/fi";
import {
  useUserQuery,
  usePollByUserQuery,
  useMeQuery,
} from "../generated/graphql";

export const Profile: React.FC = () => {
  const { userId } = useParams();
  const { data: meData } = useMeQuery();
  const { data, loading } = useUserQuery({
    variables: {
      userId: parseInt(userId!),
    },
  });
  const pollData = usePollByUserQuery({
    variables: {
      userId: parseInt(userId as string),
    },
  });
  const pollArr = pollData.data?.pollByUser;

  if (loading) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex mt-16 flex-col gap-y-6">
        <section className="flex items-center">
          <p className="font-bold text-3xl">{data?.user.username}</p>
          {meData?.me?.id != userId && (
            <p className="inline-flex ml-4 rounded-md text-indigo-50 items-center py-1 px-3 bg-indigo-400">
              <FiUsers className="mr-2" />
              Follow
            </p>
          )}
        </section>
        <section className="bg-blue-100 p-4 rounded-md">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-bold text-lg">Polls</h2>
            {meData?.me?.id == userId && (
              <Link
                className="bg-indigo-400 text-white p-2 rounded-md"
                to={`/poll/cp/${userId}`}
              >
                Create new
                <FiPlus className="inline-block" />
              </Link>
            )}
          </div>
          <ul className="flex flex-col gap-y-6">
            {pollArr && pollArr.length > 0 ? (
              <>
                <li className="flex px-3 justify-between items-center pb-2 border-b-2 border-indigo-200">
                  <span>Poll title</span>
                  <span>Status</span>
                </li>
                {pollArr.map((poll) => (
                  <li key={poll.id}>
                    <Link
                      to={`/poll/vote/${poll.id}/${userId}`}
                      className="bg-indigo-200 lg:hover:bg-indigo-300 flex justify-between items-center text-indigo-900 p-3 rounded-md"
                    >
                      <span className="font-bold">{poll.title}</span>
                      <span className="text-sm">
                        {poll.is_open ? "Open" : "Closed"}
                      </span>
                    </Link>
                  </li>
                ))}
              </>
            ) : (
              <p className="text-indigo-400">
                No polls. Try creating a new one!
              </p>
            )}
          </ul>
        </section>
      </div>
    </Layout>
  );
};
