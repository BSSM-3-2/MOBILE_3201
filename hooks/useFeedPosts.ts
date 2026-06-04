import { useCallback, useMemo } from 'react';
import { useFeedStore } from '@/store/feed-store';

export function useFeedPosts(keyword: string) {
    const posts = useFeedStore(s => s.posts);
    const toggleLike = useFeedStore(s => s.toggleLike);

    const filteredPosts = useMemo(
        () =>
            keyword.trim()
                ? posts.filter(p => p.caption?.includes(keyword))
                : posts,
        [posts, keyword],
    );

    const handleLike = useCallback(
        (id: string) => toggleLike(id),
        [toggleLike],
    );

    return { filteredPosts, handleLike };
}
