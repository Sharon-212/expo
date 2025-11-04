import { Children, isValidElement, type ReactElement } from 'react';

export function isChildOfType<PropsT>(
  element: React.ReactNode,
  type: (props: PropsT) => unknown
): element is ReactElement<PropsT> {
  return isValidElement(element) && element.type === type;
}

export function getFirstChildOfType<PropsT>(
  children: React.ReactNode | React.ReactNode[],
  type: (props: PropsT) => unknown
) {
  return Children.toArray(children).find((child) => isChildOfType(child, type));
}
