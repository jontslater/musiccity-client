/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getSinglePost, deletePost } from '../../api/posts';
import { getAllReactions } from '../../api/reactions';
import { getPostReactions, addPostReaction } from '../../api/postReactions';
import { useAuth } from '../../utils/context/authContext';

export default function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  const [reactions, setReactions] = useState([]);
  const [allReactions, setAllReactions] = useState([]);
  const [change, setChange] = useState(true);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const deleteThisPost = () => {
    console.warn('Deleting post with ID:', id);
    if (window.confirm('Delete Post?')) {
      deletePost(id).then(() => {
        router.push('/');
      });
    }
  };

  const handleReactions = (reactionId) => {
    const payload = {
      user: user.id,
      post: postDetails.id,
      reaction: reactionId,
    };
    return addPostReaction(payload)
      .then(setChange((prevState) => !prevState));
  };

  const getReactionTypeCount = (type, reactionId) => {
    if (type === 'posted_reaction') {
      const foundPostReaction = reactions.find((postReaction) => postReaction.reaction.id === reactionId);
      return foundPostReaction ? foundPostReaction.posted_reaction : 0;
    } return 0;
  };

  const getLikes = () => getReactionTypeCount('posted_reaction', 1);
  const getLoves = () => getReactionTypeCount('posted_reaction', 2);
  const getCelebrate = () => getReactionTypeCount('posted_reaction', 3);
  const getDislikes = () => getReactionTypeCount('posted_reaction', 4);

  useEffect(() => {
    getSinglePost(id, user.uid)
      .then((data) => setPostDetails(data))
      .catch((error) => console.error(error));

    getPostReactions(id)
      .then((reaction) => setReactions(reaction))
      .catch((error) => console.error(error));

    getAllReactions()
      .then((allReactionsData) => setAllReactions(allReactionsData))
      .catch((error) => console.error(error));
  }, [id, user.uid, change]);

  return (
    <>
      {postDetails.post_author?.id === user.id && (
        <div>
          <Button className="delete-button" variant="black" onClick={deleteThisPost}>
            Delete This Post
          </Button>
          <Button className="edit-button" variant="black" href={`/posts/edit/${postDetails.id}`}>
            Edit This Post
          </Button>
        </div>
      )}

      <div className="card mb-3">
        <div className="card-body">
          <h1>{postDetails.post_title}</h1>
          <h2>{postDetails.post_author?.first_name} {postDetails.post_author?.last_name}</h2>
          <h2>Created on: {postDetails.created_on}</h2>
          <img src={postDetails.image_url} alt={postDetails.title} style={{ width: '300px' }} />
        </div>
      </div>

      {/* <div className="d-flex flex-wrap">
        {reactions.map((react) => (
          <span key={react.id}>{react.reaction.label}</span>
        ))}
      </div> */}
      <div>
        <h2>Likes: {getLikes()} </h2>
        <h2>Love: {getLoves()} </h2>
        <h2>Celebrate:{getCelebrate()} </h2>
        <h2>Dislike: {getDislikes()}</h2>
      </div>

      <div>
        <ul>
          {allReactions.map((reaction) => (
            <button type="button" key={reaction.id} onClick={() => handleReactions(reaction.id)}>{reaction.label}</button>
          ))}
        </ul>
      </div>

      <div className="proText">{postDetails.post_content}</div>
      <div className="proText">Category: {postDetails.categories?.label}</div>
    </>
  );
}
