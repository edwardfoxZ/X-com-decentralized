// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

contract Twitter {
    struct Tweet {
        uint id;
        string content;
        address author;
        uint createdDate;
        uint likedTweetCounts;
    }
    struct Message {
        uint id;
        string content;
        address from;
        address to;
        uint createdDate;
    }

    mapping(uint => Tweet) private tweets;
    mapping(uint256 => Message[]) private conversations;
    mapping(address => address[]) private following;
    mapping(address => uint[]) private tweetsOf;
    mapping(uint => mapping(address => bool)) private likedBy;
    mapping(address => mapping(address => bool)) private operators;

    event sendTweet(
        uint id,
        string content,
        address indexed author,
        uint createdDate
    );
    event sendMessage(
        uint id,
        string content,
        address indexed from,
        address indexed to,
        uint createdDate
    );

    uint private nextTweetId;
    uint private nextMessageId;

    function tweet(string calldata _content) external {
        _tweet(msg.sender, _content);
    }

    function tweetFrom(address _from, string calldata _content) external {
        _tweet(_from, _content);
    }

    function message(string calldata _content, address _to) external {
        _sendMessage(msg.sender, _to, _content);
    }

    function follow(address _followed) external {
        require(_followed != msg.sender, "You cannot follow yourself");
        for (uint i = 0; i < following[msg.sender].length; i++) {
            require(
                following[msg.sender][i] != _followed,
                "Already following this account"
            );
        }
        following[msg.sender].push(_followed);
    }

    function like(uint _tweetId) external {
        require(_tweetId < nextTweetId, "The tweet does not exist");
        require(!likedBy[_tweetId][msg.sender], "You already liked this tweet");

        Tweet storage _tweeted = tweets[_tweetId];
        _tweeted.likedTweetCounts++;
        likedBy[_tweetId][msg.sender] = true;
    }

    function getlatestTweets(
        uint count
    ) external view returns (Tweet[] memory) {
        require(count > 0 && count <= nextTweetId, "Invalid tweet count");

        Tweet[] memory _tweets = new Tweet[](count);
        for (uint i = nextTweetId - count; i < count; i++) {
            Tweet storage _tweeted = tweets[i];
            _tweets[i] = Tweet(
                _tweeted.id,
                _tweeted.content,
                _tweeted.author,
                _tweeted.createdDate,
                _tweeted.likedTweetCounts
            );
        }
        return _tweets;
    }

    function getTweetsOf(
        address _user,
        uint count
    ) external view returns (Tweet[] memory) {
        uint[] storage tweetIds = tweetsOf[_user];
        require(count > 0 && count <= tweetIds.length, "Invalid tweet count");

        Tweet[] memory _tweets = new Tweet[](count);
        for (uint i = tweetIds.length - count; i < count; i++) {
            Tweet storage _tweeted = tweets[tweetIds[i]];
            _tweets[i] = Tweet(
                _tweeted.id,
                _tweeted.content,
                _tweeted.author,
                _tweeted.createdDate,
                _tweeted.likedTweetCounts
            );
        }
        return _tweets;
    }

    function getNextTweetId() external view returns (uint) {
        return nextTweetId;
    }

    function _tweet(
        address _from,
        string memory _content
    ) internal canOperate(_from) {
        tweets[nextTweetId] = Tweet(
            nextTweetId,
            _content,
            _from,
            block.timestamp,
            0
        );
        tweetsOf[_from].push(nextTweetId);
        emit sendTweet(nextTweetId, _content, _from, block.timestamp);
        nextTweetId++;
    }

    function _sendMessage(
        address _from,
        address _to,
        string memory _content
    ) internal canOperate(_from) {
        uint256 conversationId = uint256(
            keccak256(abi.encodePacked(_from, _to))
        );
        conversations[conversationId].push(
            Message(nextMessageId, _content, _from, _to, block.timestamp)
        );
        emit sendMessage(nextMessageId, _content, _from, _to, block.timestamp);
        nextMessageId++;
    }

    modifier canOperate(address _from) {
        require(
            _from == msg.sender || operators[_from][msg.sender],
            "Unauthorized operator"
        );
        _;
    }
}
