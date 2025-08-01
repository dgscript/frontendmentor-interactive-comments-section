import { useState } from "react";

export default function NewCommentReply({
  userComments,
  replyContent,
  setReplyContent,
  item,
  setUserComments,
  setReplyingtoId,
}: any) {
  const [isContentEmpty, setIsContentEmpty] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-[0.5rem] flex items-start p-5 gap-5 mb-5 max-md:flex-col">
      <img
        src={userComments.currentUser.image.png}
        alt="user profile"
        className="h-10 w-10 max-md:hidden"
      />
      <textarea
        className={` ${
          isContentEmpty ? "border-red-400 ease-in-out duration-75" : ""
        } border-1 rounded-[0.5rem] border-purple-200 resize-none grow focus:outline-2 focus:outline-grey-800 px-5 py-3 min-h-25 w-full`}
        placeholder="Add a reply..."
        onChange={(e) => {
          setReplyContent(e.target.value.trimStart());
        }}
        value={replyContent}
      ></textarea>
      <button
        onClick={() => {
          if (replyContent === "") {
            setIsContentEmpty(true);
            setTimeout(() => {
              setIsContentEmpty(false);
            }, 700);
          } else {
            const commentIndex: number = userComments.comments.indexOf(item);
            const newReply = {
              id: Date.now(),
              content: replyContent,
              createdAt: "Right Now",
              score: 0,
              replyingTo: item.user.username,
              user: userComments.currentUser,
              replies: [],
            };

            const updatedComments = [...userComments.comments];

            updatedComments[commentIndex].replies = [
              ...updatedComments[commentIndex].replies,
              newReply,
            ];

            setReplyContent("");

            setUserComments({
              ...userComments,
              comments: updatedComments,
            });

            setReplyingtoId(null);
          }
        }}
        className="bg-purple-600 rounded-[0.5rem] py-3 px-5 font-semibold text-white active:bg-purple-200 hover:cursor-pointer max-md:hidden"
      >
        SEND
      </button>

      {/* this div will appear if the screen width is smaller than 760px */}
      <div className="flex justify-between w-full md:hidden">
        <img
          src={userComments?.currentUser.image.png}
          alt="user profile"
          className="h-10 w-10 md:hidden"
        />

        <button
          onClick={() => {
            if (replyContent === "") {
              setIsContentEmpty(true);
              setTimeout(() => {
                setIsContentEmpty(false);
              }, 700);
            } else {
              const commentIndex: number = userComments.comments.indexOf(item);
              const newReply = {
                id: Date.now(),
                content: replyContent,
                createdAt: "Right Now",
                score: 0,
                replyingTo: item.user.username,
                user: userComments.currentUser,
                replies: [],
              };

              const updatedComments = [...userComments.comments];

              updatedComments[commentIndex].replies = [
                ...updatedComments[commentIndex].replies,
                newReply,
              ];

              setReplyContent("");

              setUserComments({
                ...userComments,
                comments: updatedComments,
              });

              setReplyingtoId(null);
            }
          }}
          className="bg-purple-600 rounded-[0.5rem] py-3 px-5 font-semibold text-white active:bg-purple-200 hover:cursor-pointer"
        >
          SEND
        </button>
      </div>
    </div>
  );
}
