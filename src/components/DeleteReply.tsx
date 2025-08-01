export default function DeleteReply({
  triggerFunction,
  setDeleteReplyPopUp,
  setReplyIndexToDelete,
}: any) {
  return (
    <div className="bg-[#0000006b] fixed w-full h-[100vh] flex items-center justify-center">
      <div className="bg-white rounded-[0.5rem] p-7 w-[23.125rem]">
        <p className="font-semibold text-2xl text-gray-800 pb-4">
          Delete reply
        </p>
        <p className="text-grey-500 pb-6">
          Are you sure you want to delete this reply? This will remove the reply
          and can't be undone.
        </p>

        <div className="flex gap-4">
          {/* cancel delete reply button */}
          <button
            onClick={() => {
              setDeleteReplyPopUp(false);
              setReplyIndexToDelete(null);
            }}
            className="bg-grey-500 text-white rounded-[0.5rem] py-3 px-5 font-semibold hover:cursor-pointer active:bg-grey-400 grow"
          >
            NO, CANCEL
          </button>

          {/* confirm delete reply button */}
          <button
            onClick={triggerFunction}
            className="bg-pink-400 text-white rounded-[0.5rem] py-3 px-5 font-semibold hover:cursor-pointer active:bg-pink-200 grow"
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
