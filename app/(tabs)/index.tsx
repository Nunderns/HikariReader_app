import { Image } from 'expo-image';
import { FlatList, ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

// Placeholder image URLs from a free image hosting service
const PLACEHOLDER_IMAGES = {
  onePiece: 'https://mangatx.com/wp-content/uploads/2022/12/one-piece-1-193x278.jpg',
  jujutsu: 'https://mangatx.com/wp-content/uploads/2020/02/jujutsu-kaisen-193x278.jpg',
  chainsaw: 'https://mangatx.com/wp-content/uploads/2022/09/chainsaw-man-193x278.jpg',
  heroAca: 'https://mangatx.com/wp-content/uploads/2018/10/boku-no-hero-academia-193x278.jpg',
  demonSlayer: 'https://mangatx.com/wp-content/uploads/2019/09/kimetsu-no-yaiba-193x278.jpg',
  aot: 'https://mangatx.com/wp-content/uploads/2019/12/shingeki-no-kyojin-193x278.jpg',
  tokyoRev: 'https://mangatx.com/wp-content/uploads/2021/01/tokyo-revengers-193x278.jpg'
};

// Mock data for featured manga
const featuredManga = {
  id: '1',
  title: 'One Piece',
  author: 'Eiichiro Oda',
  coverImage: { uri: PLACEHOLDER_IMAGES.onePiece },
  latestChapter: '1090',
  isNew: true,
};

// Mock data for popular manga
const popularManga = [
  { id: '1', title: 'Jujutsu Kaisen', chapter: '221', coverImage: { uri: PLACEHOLDER_IMAGES.jujutsu } },
  { id: '2', title: 'Chainsaw Man', chapter: '145', coverImage: { uri: PLACEHOLDER_IMAGES.chainsaw } },
  { id: '3', title: 'My Hero Academia', chapter: '397', coverImage: { uri: PLACEHOLDER_IMAGES.heroAca } },
  { id: '4', title: 'Demon Slayer', chapter: '205', coverImage: { uri: PLACEHOLDER_IMAGES.demonSlayer } },
  { id: '5', title: 'Attack on Titan', chapter: '139', coverImage: { uri: PLACEHOLDER_IMAGES.aot } },
  { id: '6', title: 'Tokyo Revengers', chapter: '278', coverImage: { uri: PLACEHOLDER_IMAGES.tokyoRev } },
];

// Mock data for recently updated
const recentlyUpdated = [
  { id: '1', title: 'One Piece', chapter: '1090', time: '2h ago', coverImage: { uri: PLACEHOLDER_IMAGES.onePiece } },
  { id: '2', title: 'Jujutsu Kaisen', chapter: '221', time: '5h ago', coverImage: { uri: PLACEHOLDER_IMAGES.jujutsu } },
  { id: '3', title: 'Chainsaw Man', chapter: '145', time: '1d ago', coverImage: { uri: PLACEHOLDER_IMAGES.chainsaw } },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  type MangaItem = {
    id: string;
    title: string;
    chapter: string;
    coverImage: { uri: string };
  };

  type RecentItem = MangaItem & {
    time: string;
  };

  const renderMangaItem = ({ item }: { item: MangaItem }) => (
    <View style={styles.mangaItem}>
      <Image 
        source={item.coverImage} 
        style={styles.mangaCover} 
        contentFit="cover"
        transition={1000}
      />
      <ThemedText style={styles.mangaTitle} numberOfLines={1}>{item.title}</ThemedText>
      <ThemedText style={styles.mangaChapter} type="defaultSemiBold">Ch. {item.chapter}</ThemedText>
    </View>
  );

  const renderRecentItem = ({ item }: { item: RecentItem }) => (
    <View style={styles.recentItem}>
      <Image 
        source={item.coverImage} 
        style={styles.recentCover} 
        contentFit="cover"
        transition={1000}
      />
      <View style={styles.recentInfo}>
        <ThemedText style={styles.recentTitle} numberOfLines={1}>{item.title}</ThemedText>
        <View style={styles.recentMeta}>
          <ThemedText style={styles.recentChapter}>Ch. {item.chapter}</ThemedText>
          <ThemedText style={styles.recentTime}>{item.time}</ThemedText>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={[styles.container, isDark && styles.darkContainer]}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>Hikari Reader</ThemedText>
        <Ionicons name="search" size={24} color={isDark ? '#fff' : '#000'} />
      </ThemedView>

      {/* Featured Manga */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Featured</ThemedText>
        <View style={styles.featuredContainer}>
          <Image 
            source={featuredManga.coverImage} 
            style={styles.featuredImage} 
            contentFit="cover"
            transition={1000}
          />
          <View style={styles.featuredInfo}>
            <View style={styles.featuredBadge}>
              <ThemedText style={styles.featuredBadgeText}>New Chapter</ThemedText>
            </View>
            <ThemedText type="title" style={styles.featuredTitle}>{featuredManga.title}</ThemedText>
            <ThemedText style={styles.featuredAuthor}>by {featuredManga.author}</ThemedText>
            <ThemedText style={styles.featuredChapter} type="defaultSemiBold">
              Chapter {featuredManga.latestChapter} • Read Now
            </ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Popular Manga */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Popular</ThemedText>
        <FlatList
          data={popularManga}
          renderItem={renderMangaItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </ThemedView>

      {/* Recently Updated */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Recently Updated</ThemedText>
        <FlatList
          data={recentlyUpdated}
          renderItem={renderRecentItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  featuredContainer: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featuredImage: {
    width: '100%',
    height: 200,
  },
  featuredInfo: {
    padding: 16,
  },
  featuredBadge: {
    backgroundColor: '#FF4757',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  featuredBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredTitle: {
    fontSize: 22,
    marginBottom: 4,
  },
  featuredAuthor: {
    color: '#666',
    marginBottom: 12,
  },
  featuredChapter: {
    color: '#1E90FF',
  },
  horizontalList: {
    paddingHorizontal: 12,
  },
  mangaItem: {
    width: 120,
    marginRight: 12,
  },
  mangaCover: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  mangaTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  mangaChapter: {
    fontSize: 12,
    color: '#666',
  },
  recentItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  recentCover: {
    width: 60,
    height: 80,
    borderRadius: 6,
    marginRight: 12,
  },
  recentInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  recentTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  recentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recentChapter: {
    fontSize: 14,
    color: '#666',
  },
  recentTime: {
    fontSize: 12,
    color: '#999',
  },
});
