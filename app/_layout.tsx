import { Sidebar } from '@/components/Sidebar';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const router = useRouter();

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const HeaderLeft = () => (
    <Pressable 
      onPress={toggleSidebar} 
      style={[styles.menuButton, { backgroundColor: '#FFFFFF' }]}
    >
      <IconSymbol 
        name="line.horizontal.3" 
        size={24} 
        color={Colors[colorScheme ?? 'light'].tint} 
      />
    </Pressable>
  );

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <Stack>
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: true,
              headerTitle: '',
              headerLeft: () => <HeaderLeft />,
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: 'transparent',
              },
            }} 
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        
        <Sidebar isOpen={sidebarVisible} onClose={() => setSidebarVisible(false)} />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    padding: 8,
    borderRadius: 20,
    marginLeft: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
});
