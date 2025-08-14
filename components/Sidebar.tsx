import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Href, Link } from 'expo-router';
import React from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const translateX = React.useRef(new Animated.Value(-300)).current;
  const [rendered, setRendered] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setRendered(true);
    }
    Animated.spring(translateX, {
      toValue: isOpen ? 0 : -300,
      useNativeDriver: true,
      bounciness: 0,
    }).start(({ finished }) => {
      if (!isOpen && finished) {
        setRendered(false);
      }
    });
  }, [isOpen, translateX]);

  if (!rendered) return null;

  const menuItems: Array<{
    title: string;
    icon: Parameters<typeof IconSymbol>[0]['name'];
    href: Href<any>;
  }> = [
    { title: 'Início', icon: 'house.fill', href: '/(tabs)' as Href<any> },
    { title: 'Perfil', icon: 'person.fill', href: '/(tabs)/profile' as Href<any> },
    { title: 'Configurações', icon: 'gearshape.fill', href: '/(tabs)/settings' as Href<any> },
    { title: 'Sobre', icon: 'info.circle.fill', href: '/(tabs)/about' as Href<any> },
  ];

  return (
    <>
      <Animated.View 
        style={[
          styles.overlay,
          { opacity: translateX.interpolate({
              inputRange: [-300, 0],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }) 
          }
        ]}
      />
      <Pressable style={styles.overlayPressable} onPress={onClose} />
      <Animated.View 
        style={[
          styles.sidebar,
          { 
            transform: [{ translateX }],
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom + 20,
          }
        ]}
      >
        <View style={styles.header}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <IconSymbol name="xmark" size={24} color={Colors[colorScheme ?? 'light'].text} />
          </Pressable>
        </View>
        
        <View style={styles.menu}>
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href} onPress={onClose} asChild>
              <Pressable 
                style={({ pressed }: { pressed: boolean }) => [
                  styles.menuItem,
                  { opacity: pressed ? 0.5 : 1 }
                ]}
                onPress={onClose}
              >
                <IconSymbol 
                  name={item.icon}
                  size={22} 
                  color={Colors[colorScheme ?? 'light'].text} 
                  style={styles.menuIcon} 
                />
                <Animated.Text 
                  style={[
                    styles.menuText,
                    { color: Colors[colorScheme ?? 'light'].text }
                  ]}
                >
                  {item.title}
                </Animated.Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 99,
  },
  overlayPressable: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '75%',
    maxWidth: 300,
    zIndex: 101,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  menu: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuIcon: {
    marginRight: 15,
    width: 24,
    textAlign: 'center',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
