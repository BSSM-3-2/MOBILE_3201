import { useEffect, useState } from 'react';
import { View, ActivityIndicator, LayoutChangeEvent } from 'react-native';
import NavigationTop from '@components/navigation/NavigationTop';
import ContentContainer from '@components/container';
import { FeedList } from '@components/feed/FeedList';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@components/themed-view';
import { useFeedStore } from '@/store/feed-store';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';

export default function HomeScreen() {
    const { posts, loading, fetchFeed, loadMore } = useFeedStore();
    const [headerHeight, setHeaderHeight] = useState(0);

    // TODO: scrollY 선언 (실습 6-4)
    const scrollY = useSharedValue(0);

    // TODO: headerAnimatedStyle 정의 (실습 6-5)
    const headerAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [0, headerHeight],
            [0, -headerHeight],
            Extrapolation.CLAMP,
        );
        const opacity = interpolate(
            scrollY.value,
            [0, headerHeight / 2],
            [1, 0],
            Extrapolation.CLAMP,
        );
        return { transform: [{ translateY }], opacity };
    });

    const handleHeaderLayout = (e: LayoutChangeEvent) => {
        setHeaderHeight(e.nativeEvent.layout.height);
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    return (
        <ThemedView style={{ flex: 1 }}>
            {/* TODO: Animated.View + headerAnimatedStyle (실습 6-6) */}
            <Animated.View
                onLayout={handleHeaderLayout}
                style={[
                    {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 10,
                    },
                    headerAnimatedStyle,
                ]}
            >
                <ContentContainer isTopElement={true}>
                    <NavigationTop
                        title='MyFeed'
                        icon={'layers'}
                        rightButtons={
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: 15,
                                }}
                            >
                                <Ionicons
                                    name='add-outline'
                                    size={24}
                                    color='#262626'
                                />
                            </View>
                        }
                    />
                </ContentContainer>
            </Animated.View>

            {loading && posts.length === 0 ? (
                <ActivityIndicator style={{ flex: 1 }} />
            ) : (
                // TODO: scrollY 전달 (실습 6-7)
                <FeedList
                    posts={posts}
                    onEndReached={loadMore}
                    scrollY={scrollY}
                    headerHeight={headerHeight}
                />
            )}
        </ThemedView>
    );
}
