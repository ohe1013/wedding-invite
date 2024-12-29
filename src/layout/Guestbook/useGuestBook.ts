import { useMutation, useQuery } from '@tanstack/react-query';
import bcrypt from 'bcryptjs';
import { realtimeDb } from 'firebase';
import { get, push, ref, remove, set } from 'firebase/database';
import { toast } from 'react-toastify';
import { GuestBookPost, GuestBookPostForm } from './type';
// 게시글을 가져오는 함수
const fetchPosts = async (): Promise<GuestBookPost[]> => {
  const snapshot = await get(ref(realtimeDb, 'guestbook'));
  if (snapshot.exists()) {
    return Object.entries(snapshot.val() as GuestBookPost[]).map((item) => item[1]);
  } else {
    return [];
  }
};

// 게시글을 추가하는 함수
const addPost = async (newPost: GuestBookPostForm): Promise<void> => {
  const postRef = ref(realtimeDb, `guestbook`); // 새로운 게시글의 ID를 사용하여 경로 설정
  const newPostRef = push(postRef);
  // 데이터 업데이트
  await set(newPostRef, {
    ...newPost,
    password: bcrypt.hashSync(newPost.password, 10),
    timestamp: Date.now(),
  });
};

async function deletePost(postId: string, inputPassword: string) {
  const postRef = ref(realtimeDb, `guestbook/${postId}`);
  const snapshot = await get(postRef);

  if (snapshot.exists()) {
    const postData = snapshot.val() as GuestBookPostForm;
    const hashedPassword = postData.password;
    console.log(hashedPassword);

    // 비밀번호 검증
    const isMatch = bcrypt.compareSync(inputPassword, hashedPassword);
    // const isMatch = hashedPassword === inputPassword;
    // console.log(postData.password, inputPassword);
    if (isMatch) {
      await remove(postRef);
      console.log('게시글 삭제 성공!');
    } else {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
  } else {
    console.log('게시글이 존재하지 않습니다.');
  }
}
// 게시글을 가져오는 훅
const useFetchPosts = () => {
  return useQuery<GuestBookPost[]>({
    queryKey: ['guestbook'], // 캐싱 키
    queryFn: fetchPosts, // 패칭 함수
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱
  });
};

// 게시글을 추가하는 훅
const useAddPost = () => {
  return useMutation<void, Error, GuestBookPostForm>({
    mutationFn: addPost,

    onSuccess: () => {
      toast.success('방명록이 업데이트되었습니다!');
    },
    onError: (e) => {
      toast.error('에러가 발생했습니다!');
      console.error('error', e);
    },
  });
};

const useRemovePost = () => {
  return useMutation<void, Error, { postId: string; inputPassword: string }>({
    mutationFn: ({ postId, inputPassword }) => deletePost(postId, inputPassword),
    onSuccess: () => {
      toast.info('방명록이 삭제되었습니다!');
    },
    onError: (e) => {
      toast.error('에러가 발생했습니다!');
      console.error('error', e);
    },
  });
};

export { useFetchPosts, useAddPost, useRemovePost };
