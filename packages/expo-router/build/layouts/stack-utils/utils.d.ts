import { type ReactElement } from 'react';
export declare function isChildOfType<PropsT>(element: React.ReactNode, type: (props: PropsT) => unknown): element is ReactElement<PropsT>;
export declare function getFirstChildOfType<PropsT>(children: React.ReactNode | React.ReactNode[], type: (props: PropsT) => unknown): ReactElement<PropsT, string | import("react").JSXElementConstructor<any>> | undefined;
//# sourceMappingURL=utils.d.ts.map