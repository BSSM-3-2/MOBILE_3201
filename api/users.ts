import apiClient from './client';
import User from '@type/User';
import { Post } from '@type/Post';

export const getMe = async (): Promise<User> => {
    const res = await apiClient.get<User>('/users/me');
    console.log('getMe response:', res.data); // 디버깅용 로그
    return res.data;
};

export const getUserById = async (id: string): Promise<User> => {
    const res = await apiClient.get<User>(`/users/${id}`);
    console.log('getUserById response:', res.data); // 디버깅용 로그
    return res.data;
};

export const getUserPosts = async (
    id: string,
): Promise<{ data: Post[]; total: number }> => {
    const res = await apiClient.get<{ data: Post[]; total: number }>(
        `/users/${id}/posts`,
    );
    console.log('getUserPosts response:', res.data); // 디버깅용 로그
    return res.data;
};
