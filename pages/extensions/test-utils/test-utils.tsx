import { Provider } from "jotai";
import React from "react";
import { appConfigAtom } from "../store";
import { appSdkRefAtom } from "../hooks/useAppSdk";
import { render } from "@testing-library/react";

export const TestProvider = ({
  children,
  appSdk,
  appConfig = {},
}: {
  appConfig: any;
  children?: React.ReactNode;
  appSdk: any;
}) => {
  return (
    <Provider
      // @ts-ignore
      initialValues={[
        [appSdkRefAtom, appSdk],
        [appConfigAtom, appConfig],
      ]}
    >
      {children}
    </Provider>
  );
};

const AllTheProviders = ({ children, initialProps }: any) => {
  return (
    <TestProvider appConfig={initialProps?.appConfig} appSdk={initialProps?.appSdk}>
      {children}
    </TestProvider>
  );
};

const customRender = (ui: any, options?: object) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
