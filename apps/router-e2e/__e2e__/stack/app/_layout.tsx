import { Icon, Label, Stack } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { IsProtectedContext } from '../utils/contexts';

export default function Layout() {
  const [isProtected, setIsProtected] = useState(true);
  return (
    <IsProtectedContext value={[isProtected, setIsProtected]}>
      <Stack
        screenOptions={({ route: { params } }) => ({
          title: (params as { id?: string } | undefined)?.id,
        })}>
        <Stack.Header>
          <Stack.Header.BackButton src={require('../../../assets/explore_orange.png')}>
            &lt;Go back&lt;
          </Stack.Header.BackButton>
        </Stack.Header>
        <Stack.Screen name="index">
          <Stack.Header
            style={{ backgroundColor: 'transparent' }}
            largeStyle={{ backgroundColor: 'transparent', shadowColor: 'transparent' }}>
            <Stack.Header.Title
              style={{ fontSize: 12, color: 'blue' }}
              largeStyle={{ color: '#F00' }}
              large>
              Custom Header Title
            </Stack.Header.Title>
            <Stack.Header.Left>
              <Stack.Header.Button
                style={{ color: 'green' }}
                sharesBackground
                selected
                onPress={() => alert('Left button pressed!')}>
                Left
              </Stack.Header.Button>
              <Stack.Header.Button
                style={{ color: 'green' }}
                selected={false}
                sharesBackground
                onPress={() => alert('2 pressed!')}>
                <Label>2</Label>
                <Icon sf="star.fill" />
              </Stack.Header.Button>
            </Stack.Header.Left>
            <Stack.Header.Right>
              <Stack.Header.Menu>
                <Stack.Header.Label>Menu</Stack.Header.Label>
                <Stack.Header.MenuAction onPress={() => Alert.alert('Action 1 pressed!')}>
                  <Label>Action 1</Label>
                </Stack.Header.MenuAction>
                <Stack.Header.MenuAction isOn onPress={() => Alert.alert('Action 2 pressed!')}>
                  <Icon sf="star.fill" />
                  <Label>Action 2</Label>
                </Stack.Header.MenuAction>
              </Stack.Header.Menu>
            </Stack.Header.Right>
          </Stack.Header>
        </Stack.Screen>
        <Stack.Screen name="modal" options={{ presentation: 'pageSheet' }}>
          <Stack.Header asChild>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'gray',
                height: 300,
              }}>
              <Text style={{ fontSize: 18, color: '#fff' }}>Modal Header</Text>
            </View>
          </Stack.Header>
        </Stack.Screen>
        <Stack.Protected guard={!isProtected}>
          <Stack.Screen name="protected" />
        </Stack.Protected>
        <Stack.Screen name="[id]" />
      </Stack>
    </IsProtectedContext>
  );
}
