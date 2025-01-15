import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { LiaPenNibSolid } from "react-icons/lia";
import { TweetInputs } from "./TweetInputs";
import { useConnectToWalletContext } from "../context/ConnectToWalletContext";
import TwitterAbi from "../abis/Twitter.json";
import { ethers } from "ethers";

export const Page = ({
  signMessage,
  isApproved,
  setIsApproved,
  isApprovalValid,
}) => {
  const [likedTweets, setLikedTweets] = useState([]);
  const [inbox, setInbox] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { ethersApi } = useConnectToWalletContext();

  const CONTRACT_ADDRESS = "0xbcd1e518d3B084Ad1ebb7936b7ceDf92d529ABdf";
  const CONTRACT_ABI = TwitterAbi;
  const provider = new ethers.BrowserProvider(window.ethereum);

  const twitterContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI.abi,
    provider
  );

  const toggleLiked = (tweetId) => {
    setLikedTweets((prevLikedTweets) =>
      prevLikedTweets.includes(tweetId)
        ? prevLikedTweets.filter((id) => id !== tweetId)
        : [...prevLikedTweets, tweetId]
    );
    console.log("Liked: ", tweetId);
  };

  const toggleInbox = () => {
    setInbox(!inbox);
    console.log("Inbox Open: ", !inbox);
  };

  useEffect(() => {
    if (!twitterContract) {
      console.error("Contract is not available");
      return;
    }

    const fetchLatestTweets = async () => {
      const nextTweetId = await twitterContract.getNextTweetId();
      try {
        if (nextTweetId > 0) {
          const count = nextTweetId;

          const latestTweets = await twitterContract.getlatestTweets(count);
          setTweets(latestTweets);
          setRefresh(true);
        } else {
          console.log("No tweets id has found!");
          return;
        }
      } catch (error) {
        console.error("Error fetching latest tweets:", error);
      }
    };

    fetchLatestTweets();
  }, [ethersApi.contract, refresh]);

  useEffect(() => {
    const storedTimestamp = localStorage.getItem("approvalTimestamp");
    if (storedTimestamp && isApprovalValid(storedTimestamp)) {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  }, []);

  const handleApproval = () => {
    if (!ethersApi.address) {
      alert("Please connect your wallet first!");
      return;
    }

    const currentTimestamp = new Date().getTime();
    localStorage.setItem("approvalTimestamp", currentTimestamp);
    setIsApproved(true);
    signMessage();
  };

  return (
    <>
      <div className="flex flex-row items-center shadow-2xl shadow-slate-900">
        <h1 className="text-5xl font-bold text-[#F29F58] px-10 py-10">Post</h1>
        {!isApproved ? (
          <h1
            onClick={handleApproval}
            className="font-bold text-white ml-auto px-4 py-2 mr-8 cursor-pointer rounded-lg bg-[#0a0818] hover:bg-[#5243af] transition-all duration-300 ease-linear"
          >
            Approve
          </h1>
        ) : (
          <h1 className="font-bold text-white ml-auto px-4 py-2 mr-8 rounded-lg bg-green-500">
            Approved
          </h1>
        )}
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
              <button className="mt-1 bg-blue-500 rounded-md px-3 hover:bg-hover-follow">
                Follow
              </button>
            </div>
            <p className="mt-5 px-5 text-xl font-semibold">{tweet.content}</p>
            <span
              onClick={() => toggleLiked(tweet.id)}
              className="w-1 mt-5 px-5 text-3xl cursor-pointer"
            >
              {likedTweets.includes(tweet.id) ? (
                <FaHeart color="red" />
              ) : (
                <FaRegHeart color="red" />
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="Create-Tweet absolute bottom-32 right-32 text-[#F29F58]">
        <button
          onClick={toggleInbox}
          className="text-5xl bg-[#441752] hover:bg-[#912faf] p-3 rounded-full transition-all duration-300 ease-in-out"
        >
          <LiaPenNibSolid />
        </button>
      </div>

      {inbox && <TweetInputs />}
    </>
  );
};
