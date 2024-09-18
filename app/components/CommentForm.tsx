import { format } from 'date-fns';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

interface CommentItems {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  payload: string;
  replyOf?: string;
}

type Props = {
  comments: Array<CommentItems>,
  setComments: Dispatch<SetStateAction<any>>,
  user: string | null | undefined,
  setValue: UseFormSetValue<any>
}

const CommentForm = ({ comments, setComments, user, setValue }: Props) => {
  const AddField = useRef<HTMLInputElement>(null);
  const EditField = useRef<HTMLInputElement>(null);
  const [editId, setEditID] = useState(0)

  return (
    <div className="flex flex-col gap-1 pt-2 border rounded-md p-3 mb-2">
      <div className="flex text-sm">
        <input type="text-sm font-medium" ref={AddField} placeholder="Add a comment" className="p-2 border-b focus:border-b-gray-700 w-full outline-none" />
        <button className="btn btm-sm w-20" type="button" onClick={() => {
          if (!AddField.current?.value) return

          let newID = Math.max(...comments.map(o => parseInt(o.id)))
          if (newID === -Infinity) { newID = 1 } else { newID++ };
          const newcomment = [{ id: newID, username: user, payload: AddField.current?.value, createdAt: new Date(), updatedAt: new Date() }]
          setComments([...comments, ...newcomment]);
          setValue('notes', JSON.stringify([...comments, ...newcomment]));

          let InputElement = AddField.current as HTMLInputElement
          InputElement.value = "";
        }}>Add</button>
      </div>

      {comments.map((comment, i) => (
        <div key={i} className="border rounded-md p-2">
          <p className="text-xs font-semibold mb-1">{comment.username} <span className="text-xs font-light">{format(comment.createdAt, "yyyy-MM-dd")}</span></p>
          <div className="flex items-center gap-2 justify-between ">
            {(parseInt(comment.id) !== editId) ? (
              <>
                <p className="text-sm font-light">{comment.payload}</p>
                <div className="flex gap-2">
                  <button
                    type="button" id={comment.id} className="font-light text-xs"
                    onClick={(e) => {
                      const element = e.target as HTMLTextAreaElement
                      const newComments = comments.filter((ele) => ele.id != element.id);
                      setComments(newComments);
                      setValue('notes', JSON.stringify(newComments));
                    }}
                  >
                    Delete
                  </button>

                  <button
                    type="button" id={comment.id} className="font-light text-xs"
                    onClick={(e) => {
                      const element = e.target as HTMLTextAreaElement
                      setEditID(parseInt(element.id))
                    }}
                  >
                    Edit
                  </button>
                </div>
              </>) :
              (<>
                <input ref={EditField} hidden={parseInt(comment.id) !== editId} defaultValue={comment.payload} />
                <div className="flex gap-2">
                  <button
                    type="button" id={comment.id} className="font-light text-xs"
                    onClick={(e) => {
                      setEditID(0)
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="button" id={comment.id} className="font-bold text-xs"
                    onClick={(e) => {
                      if (!EditField.current?.value) return
                      const element = e.target as HTMLTextAreaElement
                      const editComment = comments.map((comment) => {
                        if (comment.id == element.id) {
                          return {
                            ...comment,
                            payload: EditField.current?.value,
                            updatedAt: new Date()
                          };
                        }
                        return comment;
                      })
                      console.log(editComment);
                      setComments(editComment);
                      setValue('notes', JSON.stringify(editComment));
                      setEditID(0);
                    }}

                  >
                    Confirm
                  </button></div> </>)}
          </div>
        </div>
      )
      )}

    </div>
  )
}

export default CommentForm