import type { NativeStackHeaderItem } from '@react-navigation/native-stack/lib/typescript/src';
import { isValidElement } from 'react';
import { Text } from 'react-native';

import { StackHeader } from '../elements';
import { appendScreenStackPropsToOptions } from '../elements/StackScreen';

it('should convert header items children, correctly to options', () => {
  function CustomHeaderElement() {
    return <Text>Custom Element</Text>;
  }
  const result = appendScreenStackPropsToOptions(
    {},
    {
      children: (
        <StackHeader>
          <StackHeader.Left>
            <StackHeader.Button>1LB</StackHeader.Button>
            <StackHeader.Button
              style={{
                fontWeight: 500,
                fontSize: 10,
                color: '#f0f',
              }}>
              <StackHeader.Label>2LB</StackHeader.Label>
              <StackHeader.Icon sf="star" />
            </StackHeader.Button>
            <StackHeader.Item>
              <CustomHeaderElement />
            </StackHeader.Item>
          </StackHeader.Left>
          <StackHeader.Right>
            <StackHeader.Menu
              style={{
                color: '#00f',
                fontFamily: 'Arial',
              }}>
              <StackHeader.Label>Menu</StackHeader.Label>
              <StackHeader.Icon sf="ellipsis.circle" />
              <StackHeader.MenuAction>
                <StackHeader.Label>Action 1</StackHeader.Label>
                <StackHeader.Icon sf="star" />
              </StackHeader.MenuAction>
              <StackHeader.Menu title="Test">
                <StackHeader.Label>Submenu</StackHeader.Label>
                <StackHeader.MenuAction isOn>Sub Action</StackHeader.MenuAction>
              </StackHeader.Menu>
            </StackHeader.Menu>
            <StackHeader.Menu title="right-menu">
              <StackHeader.Label>Second</StackHeader.Label>
            </StackHeader.Menu>
          </StackHeader.Right>
        </StackHeader>
      ),
    }
  );

  const expectedLeftItems: NativeStackHeaderItem[] = [
    {
      type: 'button',
      label: '1LB',
      icon: undefined,
      onPress: expect.any(Function),
      selected: false,
      labelStyle: undefined,
    },
    {
      type: 'button',
      label: '2LB',
      icon: {
        type: 'sfSymbol',
        name: 'star',
      },
      onPress: expect.any(Function),
      selected: false,
      labelStyle: {
        fontSize: 10,
        color: '#f0f',
        fontWeight: '500',
      },
    },
    {
      type: 'custom',
      element: expect.any(Object),
    },
  ];

  const expectedRightItems: NativeStackHeaderItem[] = [
    {
      type: 'menu',
      label: 'Menu',
      labelStyle: {
        color: '#00f',
        fontFamily: 'Arial',
        fontWeight: undefined,
      },
      icon: {
        type: 'sfSymbol',
        name: 'ellipsis.circle',
      },
      menu: {
        items: [
          {
            type: 'action',
            label: 'Action 1',
            keepsMenuPresented: undefined,
            icon: {
              type: 'sfSymbol',
              name: 'star',
            },
            state: 'off',
            onPress: expect.any(Function),
          },
          {
            type: 'submenu',
            label: 'Submenu',
            icon: undefined,
            items: [
              {
                type: 'action',
                label: 'Sub Action',
                keepsMenuPresented: undefined,
                icon: undefined,
                state: 'on',
                onPress: expect.any(Function),
              },
            ],
          },
        ],
        title: undefined,
      },
    },
    {
      type: 'menu',
      label: 'Second',
      labelStyle: undefined,
      icon: undefined,
      menu: {
        items: [],
        title: 'right-menu',
      },
    },
  ];

  expect(typeof result.unstable_headerLeftItems).toBe('function');
  const leftHeaderItems = result.unstable_headerLeftItems({});
  expect(leftHeaderItems).toStrictEqual(expectedLeftItems);
  expect(leftHeaderItems[2].type).toBe('custom');
  // To satisfy TypeScript
  if (leftHeaderItems[2].type !== 'custom') throw new Error('Type is not custom');
  expect(isValidElement(leftHeaderItems[2].element)).toBe(true);
  // To satisfy TypeScript
  if (!isValidElement(leftHeaderItems[2].element)) throw new Error('Element is not valid');
  expect(leftHeaderItems[2].element.type).toBe(CustomHeaderElement);

  expect(typeof result.unstable_headerRightItems).toBe('function');
  expect(result.unstable_headerRightItems({})).toStrictEqual(expectedRightItems);
});
