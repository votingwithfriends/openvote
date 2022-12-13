import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/layout";
import { IoExitOutline } from "react-icons/io5";

export const Home: React.FC = () => {
  return (
    <Layout>
      <article className="my-20 grid grid-rows-[1fr_auto] items-center gap-y-6 md:grid-cols-2 lg:gap-x-6">
        <div>
          <section className="text-4xl font-black lg:text-7xl">
            <p>Reach</p>
            <p>Meaningful</p>
            <p>Decisions</p>
          </section>
          <section className="mt-6 flex w-full flex-col gap-y-8 leading-loose md:w-3/4 lg:gap-y-6">
            <p>
              OpenVote is a ranked choice web application where users can create
              polls, invite their friends to participate, and reach a meaningful
              decision that everyone is happy with!
            </p>
            <p>
              Keep scrolling to learn more about how ranked choice voting works.
              Or if you're ready to get started, hit the button below!
            </p>
            <Link
              className="mx-auto mb-4 inline-block w-1/2 rounded bg-blue-500 py-4 text-center text-white hover:bg-blue-600 dark:bg-cyan-600 dark:hover:bg-cyan-500 md:mx-0 md:mr-auto lg:mb-0"
              to="/login"
            >
              Get Started
            </Link>
          </section>
        </div>
      </article>

      <article>
        <article className="my-40 flex flex-col gab-y-48">
          <section>
            <article className="grid grid-cols-1 items-center gap-y-10 md:grid-cols2 md:gap-x-10">
              <section>
                <p className="leading-loose">
                  Ranked Choice voting, also known as{" "}
                  <em>Instant-Runoff Voting</em> is a voting system where voters
                  are able to rank candidates by preference. If a candidate has
                  the majority of the votes, that candidate wins the poll.
                  However, is no candidate has a majority, the candidate with
                  the least amount of votes is eliminated and voters who voted
                  for this candidate as their first choice now have their vote
                  counted towards their second choice, if they had a second
                  choice. This continues until a candidate reaches a majority
                  and wins the poll.
                </p>
                <a
                  href="https://www.rcvresources.org/"
                  target="_blank"
                  className="mt-6 inline-block text-blue-600 underline dark:text-cyan-500"
                >
                  More about ranked choice voting
                  <IoExitOutline className="ml-2 inline" />
                </a>
              </section>
            </article>
          </section>
          <section>
            <article className="grid grid-cols-1 items-center gap-y-10 md:grid-cols-2 md:gap-x-10">
              <section>
                <h2 className="mb-8 text-3xl font-bold lg:text-5xl">
                  A Social Ranking Platform
                </h2>

                <p className="leading-loose">
                  <strong>
                    <em>OpenVote</em>
                  </strong>{" "}
                  aims to be a community-driven voting platform. Create polls
                  and easily invite your friends to participate. Browse polls
                  created by your friends. Comment on poll results, and more!
                </p>
                <p className="mt-8 leading-loose">
                  Need to decide on a place to eat with your friends? Don't
                  argue about it, just create a poll and have your friends
                  participate!
                </p>
              </section>
            </article>
          </section>
        </article>
      </article>

      <article className="w-full">
        <section className="grid-col-1 my-20 grid items-center gap-y-10 md:grid-cols-2 md:gap-x-10">
          <article>
            <h2 className="mb-8 text-3xl font-bold lg:text-5xl">Open Source</h2>
            <p className="leading-loose">
              This is a fully open source project. Developers are welcome to
              contribute to{" "}
              <strong>
                <em>OpenVote</em>
              </strong>{" "}
              . Help us grow into the largest social voting community on the
              web! Visit our{" "}
              <a
                href="https://github.com/votingwithfriends/openvote"
                target="_blank"
                className="text-blue-500 underline dark:text-cyan-500"
              >
                GitHub
              </a>{" "}
              organization page to view open issues and projects.
            </p>
          </article>
        </section>
      </article>
    </Layout>
  );
};
