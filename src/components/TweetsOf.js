import React, { useEffect, useState } from "react";
import { useConnectToWalletContext } from "../context/ConnectToWalletContext";
import { getContract } from "../utils/contract";

export const TweetsOf = () => {
  const [tweetsOf, setTweetsOf] = useState([]);
  const { ethersApi } = useConnectToWalletContext();

  useEffect(() => {
    const getTweets = async () => {
      const { contractRead } = getContract(); // Use contractRead for fetching data
      if (!contractRead) {
        console.error("Contract not found!");
        return;
      }
      const account = await ethersApi.address;

      try {
        const tweetsOf = await contractRead.getTweetsOf(account, 1);
        setTweetsOf(tweetsOf);
      } catch (error) {
        console.error("Failed to fetch Tweets of the specific user: ", error);
      }
    };

    getTweets();
  }, [ethersApi]);

  console.log(tweetsOf);

  return (
    <div className="w-full h-full">
      <div>
        <p className="text-5xl font-bold text-[#F29F58] px-10 py-10">
          Tweets of {ethersApi.address && ethersApi.address?.slice(0, 6)}...
        </p>
      </div>
      <div className="flex flex-col mx-auto">
        {tweetsOf.map((tweet) => (
          <div key={tweet.id} className="">
            <div>
              <p>{tweet.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
