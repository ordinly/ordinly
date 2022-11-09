export type CommentProps = {
  _id: string;
  user: string;
  text: string;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date;
};

export type CommentsProps = {
  comments: CommentProps[];
};
