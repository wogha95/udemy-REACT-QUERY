import { useQuery } from "@tanstack/react-query";
import "./PostDetail.css";
import { fetchComments } from "./api";

export function PostDetail({ post, deleteMutation }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: ({ queryKey }) => fetchComments(queryKey[1]),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && (
        <p className="error">{deleteMutation.error}</p>
      )}
      {deleteMutation.isPending && <p className="loading">Deleting..</p>}
      {deleteMutation.isSuccess && <p className="success">Deleted</p>}
      <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
