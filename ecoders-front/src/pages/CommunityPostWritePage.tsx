import { useState, useEffect } from 'react';

import PostWrite from '../components/features/PostWrite';

import { useLocation } from 'react-router-dom';

import { postData } from './CommunityPostDetailPage';

function CommunityPostWritePage() {
  const { state } = useLocation();
  const [postid, setPostId] = useState<number>(0);
  let initPostid;

  if (state) {
    initPostid = Number(state.post.postId);
  } else {
    initPostid = 0;
  }
  const [post, setPost] = useState<postData>({
    // memberId: '',
    memberId: '0',
    postId: initPostid,
    title: '',
    content: '',
    category: '',
    thumbnailUrl: '',
    username: '',
    views: 0,
    likes: 0,
    createdAt: '',
    updatedAt: '',
    comments: [],
    likedByUserIds: [],
  });

  if (state !== null) {
    console.log(postid);
    useEffect(() => {
      console.log(state.post);
      console.log(state.post.postId);
      setPostId(state.post.postId);
      setPost(state.post);
    }, []);
  }
  // <PostWrite post={state.dummyData} />

  return (
    <>
      <PostWrite post={post} />:
      {/* // postid={postid} 
      post={post} />: */}
    </>
  );
}

export default CommunityPostWritePage;
