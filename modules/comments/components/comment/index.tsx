import { Avatar } from "@nextui-org/react";
import React, { FC } from "react";
import { Comment as CommentType } from "../../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface CommentProps {
  comment: CommentType;
}

const Comment: FC<CommentProps> = ({ comment }) => {
  return (
    <div className="flex items-start gap-x-2">
      <Avatar size="sm" className="shrink-0" />
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <h3 className="font-medium">{comment.author.name}</h3>
          <span className="text-xs dark:text-gray-300">
            {dayjs(comment.created_at).fromNow()}
          </span>
        </div>
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html: comment.content,
          }}
        />
      </div>
    </div>
  );
};

export default Comment;
