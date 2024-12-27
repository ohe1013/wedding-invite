import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { realtimeDb } from 'firebase';
import { get, push, ref, set } from 'firebase/database';
import { toast } from 'react-toastify';
import { GuestBookPost } from './type';

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
const addPost = async (newPost: GuestBookPost): Promise<void> => {
  const postRef = ref(realtimeDb, `guestbook`); // 새로운 게시글의 ID를 사용하여 경로 설정
  const newPostRef = push(postRef);
  // 데이터 업데이트
  await set(newPostRef, {
    ...newPost,
    timestamp: Date.now(),
  });
};

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
  return useMutation<void, Error, GuestBookPost>({
    mutationFn: addPost,

    onSuccess: () => {
      toast.success('데이터가 성공적으로 업데이트되었습니다! ✔️');
    },
    onError: (e) => {
      console.error('error', e);
    },
  });
};

export { useFetchPosts, useAddPost };
