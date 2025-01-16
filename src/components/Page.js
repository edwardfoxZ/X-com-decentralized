import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { TweetInputs } from "./TweetInputs";
import { LiaPenNibSolid } from "react-icons/lia";
import { getContract } from "../utils/contract";

export const Page = () => {
  const [tweets, setTweets] = useState([]);
  const [contractRead, setContractRead] = useState(null);
  const [contractWrite, setContractWrite] = useState(null);

  useEffect(() => {
    const { contractRead, contractWrite } = getContract();
    if (contractRead && contractWrite) {
      setContractRead(contractRead);
      setContractWrite(contractWrite);
    } else {
      console.error("Contract is not available");
    }
  }, []);

  useEffect(() => {
    if (!contractRead) {
      return;
    }

    const fetchLatestTweets = async () => {
      try {
        const nextTweetId = await contractRead.getNextTweetId(); // Use contractRead for fetching data
        if (nextTweetId > 0) {
          const latestTweets = await contractRead.getlatestTweets(nextTweetId); // Read tweets
          setTweets(latestTweets);
        } else {
          console.log("No tweets found!");
        }
      } catch (error) {
        console.error("Error fetching latest tweets:", error);
      }
    };

    fetchLatestTweets();
  }, [contractRead]); // Trigger when contractRead is available

  const follow = async (authorAddress) => {
    if (!contractWrite) {
      console.error("Contract is not available for writing");
      return;
    }

    try {
      const tx = await contractWrite.follow(authorAddress); // Use contractWrite for state-changing actions
      await tx.wait(); // Wait for transaction confirmation
      console.log(`Successfully followed ${authorAddress}`);
    } catch (error) {
      console.error("Cannot follow: ", error);
    }
  };

  return (
    <>
      <div className="flex flex-row items-center shadow-2xl shadow-slate-900 w-full">
        <h1 className="text-5xl font-bold text-[#F29F58] px-10 py-10">Post</h1>
        <h1 className="font-bold text-white ml-auto px-4 py-2 mr-8 cursor-pointer rounded-lg bg-[#0a0818] hover:bg-[#5243af] transition-all duration-300 ease-linear">
          Approve
        </h1>
      </div>

      <div className="Post w-full flex flex-col overflow-y-scroll max-h-screen custom-scrollbar border-t-4 p-10">
        {tweets.map((tweet) => (
          <div
            key={tweet.id}
            className="Post-Container flex flex-col mx-auto w-4/12 bg-[#0a0818] text-white p-8 pb-5 rounded-lg mt-14"
          >
            <div className="flex flex-row items-center gap-2">
              <div className="Profile w-14">
                <img
                  draggable={false}
                  className="w-full h-full rounded-full"
                  src="https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
                  alt="Profile"
                />
              </div>
              <p className="text-2xl font-mono">
                {tweet.author?.slice(0, 8) || "Unknown"}...
              </p>
              <button
                className="mt-1 bg-blue-500 rounded-md px-3 hover:bg-hover-follow"
                onClick={() => follow(tweet.author)}
              >
                Follow
              </button>
            </div>
            <p className="mt-5 px-5 text-xl font-semibold">{tweet.content}</p>
            <span className="w-1 mt-5 px-5 text-3xl cursor-pointer">
              <FaHeart color="red" />
            </span>
          </div>
        ))}
      </div>

      <div className="Create-Tweet absolute bottom-32 right-32 text-[#F29F58]">
        <button className="text-5xl bg-[#441752] hover:bg-[#912faf] p-3 rounded-full transition-all duration-300 ease-in-out">
          <LiaPenNibSolid />
        </button>
      </div>

      <TweetInputs />
    </>
  );
};
