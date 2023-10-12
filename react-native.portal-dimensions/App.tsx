/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {Portal, PortalHost, PortalProvider} from '@gorhom/portal';
import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section(props: SectionProps): JSX.Element {
  const [portalEnabled, setPortalEnabled] = useState(false);

  const portalButton = (
    <Button
      onPress={() => setPortalEnabled(prevEnabled => !prevEnabled)}
      title={portalEnabled ? 'Disable portal' : 'Enable portal'}
    />
  );

  return portalEnabled ? (
    <Portal hostName="bottomPortal">
      <SectionImpl {...props} portalButton={portalButton} />
    </Portal>
  ) : (
    <SectionImpl {...props} portalButton={portalButton} />
  );
}

type SectionImplProps = SectionProps & {portalButton: React.ReactNode};

function SectionImpl({
  children,
  portalButton,
  title,
}: SectionImplProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      {portalButton}
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [bottomContainerHeight, setBottomContainerHeight] = useState(0);

  return (
    <PortalProvider>
      <SafeAreaView style={[styles.root, backgroundStyle]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Text style={styles.portalHeightLabel}>
          Portal height: {bottomContainerHeight}
        </Text>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={[backgroundStyle, {marginBottom: bottomContainerHeight}]}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <LearnMoreLinks />
            <Section title="Step One">
              Edit <Text style={styles.highlight}>App.tsx</Text> to change this
              screen and then come back to see your edits.
            </Section>
            <Section title="See Your Changes">
              <ReloadInstructions />
            </Section>
            <Section title="Debug">
              <DebugInstructions />
            </Section>
            <Section title="Learn More">
              Read the docs to discover what to do next:
            </Section>
          </View>
        </ScrollView>
        <View
          onLayout={event =>
            setBottomContainerHeight(event.nativeEvent.layout.height)
          }
          style={styles.floatingBottonContainer}>
          <PortalHost name="bottomPortal" />
        </View>
      </SafeAreaView>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  sectionContainer: {
    marginVertical: 16,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  floatingBottonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'pink',
  },
  portalHeightLabel: {
    backgroundColor: 'pink',
  },
});

export default App;
