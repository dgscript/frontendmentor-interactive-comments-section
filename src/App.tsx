import { useEffect, useState } from "react";
import "./App.css";
import Comment from "./components/Comment";
import Reply from "./components/Reply";
import NewCommentReply from "./components/NewCommentReply";
import NewReplyReply from "./components/NewReplyReply";
import NewComment from "./components/NewComment";
import DeleteComment from "./components/DeleteComment";
import DeleteReply from "./components/DeleteReply";
import Loading from "./components/Loading";

interface CurrentUser {
  image: { png: string; webp: string };
  username: string;
}

interface Comments {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: CurrentUser;
  replies: Reply[];
}

interface Reply extends Comments {
  replyingTo: string;
  user: CurrentUser;
}

interface ApiData {
  currentUser: CurrentUser;
  comments: Comments[];
}

function App() {
  const [userComments, setUserComments] = useState<ApiData | null>(null);
  const [replyingtoId, setReplyingtoId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");
  const [commentContent, setCommentContent] = useState<string>("");
  const [deleteCommentPopUp, setDeleteCommentPopUp] = useState<boolean>(false);
  const [deleteReplyPopUp, setDeleteReplyPopUp] = useState<boolean>(false);
  const [commentIndexToDelete, setCommentIndexToDelete] = useState<
    number | null
  >(null);
  const [replyIndexToDelete, setReplyIndexToDelete] = useState<number | null>(
    null
  );
  const [replyCommentIndex, setReplyCommentIndex] = useState<number | null>(
    null
  );

  function deleteComment() {
    const updatedComments = [...userComments!.comments];

    const removedComment = updatedComments.filter(
      (index) => index.id !== commentIndexToDelete
    );

    setUserComments({
      ...userComments!,
      comments: removedComment,
    });

    setDeleteCommentPopUp(false);
  }

  function deleteReply() {
    if (replyCommentIndex !== null && userComments !== null) {
      const updatedReplies = [
        ...userComments?.comments[replyCommentIndex].replies.filter(
          (reply: any) => reply.id !== replyIndexToDelete
        ),
      ];

      const updatedComments = userComments?.comments.map(
        (comment: any, index: any) =>
          index === replyCommentIndex
            ? {
                ...comment,
                replies: updatedReplies,
              }
            : comment
      );

      setUserComments({
        ...userComments,
        comments: updatedComments,
      });

      setDeleteReplyPopUp(false);
    }
  }

  useEffect(() => {
    async function commentsData() {
      const response: Response = await fetch("data.json");
      const data: ApiData = await response.json();
      if (data) {
        setUserComments(data);
      }
    }
    commentsData();
  }, []);

  return (
    <>
      {deleteCommentPopUp && (
        <DeleteComment
          triggerFunction={deleteComment}
          setDeleteCommentPopUp={setDeleteCommentPopUp}
          setCommentIndexToDelete={setCommentIndexToDelete}
        />
      )}
      {deleteReplyPopUp && (
        <DeleteReply
          triggerFunction={deleteReply}
          setReplyIndexToDelete={setReplyIndexToDelete}
          setDeleteReplyPopUp={setDeleteReplyPopUp}
        />
      )}
      {!userComments ? (
        <div className="absolute w-full h-dvh">
          <Loading />
        </div>
      ) : (
        <main className="max-w-3xl m-auto p-5">
          {userComments &&
            userComments.comments.map((comment) => (
              <div>
                {/* comments */}
                <Comment
                  setCommentIndexToDelete={setCommentIndexToDelete}
                  setDeleteCommentPopUp={setDeleteCommentPopUp}
                  item={comment}
                  userComments={userComments}
                  setUserComments={setUserComments}
                  setReplyingtoId={setReplyingtoId}
                />

                {/* new reply */}
                {replyingtoId === comment.id && (
                  <NewCommentReply
                    userComments={userComments}
                    replyContent={replyContent}
                    setReplyContent={setReplyContent}
                    item={comment}
                    setUserComments={setUserComments}
                    setReplyingtoId={setReplyingtoId}
                  />
                )}

                {/* replies */}
                {comment.replies.length > 0 && (
                  <div className="flex mb-5">
                    {/* gray line besides the replies */}
                    <div className="min-w-[0.1rem] min-h-full mx-8 bg-purple-200 max-md:hidden"></div>
                    <div className="flex flex-col gap-5 grow">
                      {comment.replies.map((item) => (
                        <div className="flex">
                          <div className="flex w-full">
                            <div className="w-full">
                              <Reply
                                setReplyCommentIndex={setReplyCommentIndex}
                                setReplyIndexToDelete={setReplyIndexToDelete}
                                setDeleteReplyPopUp={setDeleteReplyPopUp}
                                item={item}
                                comment={comment}
                                userComments={userComments}
                                setUserComments={setUserComments}
                                setReplyingtoId={setReplyingtoId}
                              />

                              {/* new reply container */}
                              {replyingtoId === item.id && (
                                /* i know its a dumb name but at least is explanatory for what is does tho xd */
                                <NewReplyReply
                                  setReplyingtoId={setReplyingtoId}
                                  comment={comment}
                                  item={item}
                                  userComments={userComments}
                                  setUserComments={setUserComments}
                                  replyContent={replyContent}
                                  setReplyContent={setReplyContent}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

          {/* new comment */}
          <NewComment
            userComments={userComments}
            setUserComments={setUserComments}
            commentContent={commentContent}
            setCommentContent={setCommentContent}
          />
        </main>
      )}
    </>
  );
}

export default App;
