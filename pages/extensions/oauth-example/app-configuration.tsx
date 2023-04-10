import { Button, FieldLabel, InstructionText } from "@contentstack/venus-components";
import { IOAuthExampleConfig, TypeAppSdkConfigState } from "../types";
import { showError, showSuccess } from "../utils/notifications";

import CodeEditor from "@uiw/react-textarea-code-editor";
import Icon from "../images/appconfig.svg";
import React from "react";
import { useAppSdk } from "../hooks/useAppSdk";
import utils from "../utils";

const isValidJson = (json: any) => {
  try {
    JSON.parse(json);
  } catch (e) {
    return false;
  }
  return true;
};

const AppConfigurationExtension = () => {
  const [sdk] = useAppSdk();
  const [state, setState] = React.useState<TypeAppSdkConfigState & { oAuthExampleConfig: IOAuthExampleConfig }>({
    installationData: {
      configuration: {},
      serverConfiguration: {},
    },
    setInstallationData: (): any => {},
    appSdkInitialized: false,
    oAuthExampleConfig: {},
  });

  /** updateConfig - Function where you should update the state variable
   * Call this function whenever any field value is changed in the DOM
   * */
  const updateConfig = React.useCallback(() => {
    setLoading(true);
    const updatedConfig = state?.installationData?.configuration || {};
    delete updatedConfig.temp;
    updatedConfig.oAuthExampleConfig = state.oAuthExampleConfig;
    const updatedServerConfig = state.installationData.serverConfiguration;
    delete updatedServerConfig.temp;
    updatedServerConfig.oAuthExampleConfig = state.oAuthExampleConfig;

    if (typeof state.setInstallationData !== "undefined") {
      state
        .setInstallationData({
          ...state.installationData,
          configuration: updatedConfig,
          serverConfiguration: updatedServerConfig,
        })
        .then(() => {
          showSuccess("Configuration saved successfully");
          setLoading(false);
        })
        .catch((error: any) => {
          showError(error);
          setLoading(false);
        });
    }

    return true;
  }, [state]);

  React.useEffect(() => {
    const sdkConfigData = sdk?.location.AppConfigWidget?.installation;
    if (sdkConfigData) {
      sdkConfigData.getInstallationData().then((installationDataFromSDK: any) => {
        const setInstallationDataOfSDK = sdkConfigData.setInstallationData;
        console.log(
          "🚀 ~ file: AppConfiguration.tsx  line 75 ~ sdkConfigData.getInstallationData ~ setInstallationDataOfSDK",
          installationDataFromSDK.configuration.oAuthExampleConfig
        );

        setState(() => {
          setLoading(false);
          return {
            ...state,
            installationData: utils.mergeObjects(state.installationData, installationDataFromSDK),
            setInstallationData: setInstallationDataOfSDK,
            appSdkInitialized: true,
            oAuthExampleConfig: installationDataFromSDK.configuration.oAuthExampleConfig,
          };
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [isValid, setIsValid] = React.useState<boolean>(true);
  return (
    <div className="app-config">
      <div className="app-config-container">
        <div className="app-config-icon">
          <img src={Icon} alt="icon" />
        </div>
        <div className="app-component-content">
          <FieldLabel required htmlFor="advancedPublishingConfig" error={!isValid}>
            JSON Configuration 2
          </FieldLabel>

          {loading ? (
            <>Loading...</>
          ) : (
            <>
              {!isValid && <InstructionText style={{ color: "red" }}>Invalid JSON</InstructionText>}
              <div
                style={{
                  border: !isValid ? "1px solid red" : "",
                }}
              >
                <CodeEditor
                  key="advancedPublishingConfig"
                  value={state.appSdkInitialized ? JSON.stringify(state.oAuthExampleConfig, null, 2) : "Loading..."}
                  language="json"
                  placeholder="Please enter JSON content."
                  onChange={(e: any) => {
                    const valid = isValidJson(e.target.value);
                    setIsValid(valid);
                    if (valid) {
                      setState((s) => {
                        return { ...s, oAuthExampleConfig: JSON.parse(e.target.value) };
                      });
                    }
                  }}
                  padding={15}
                  style={{
                    fontSize: 12,
                    width: "100%",
                    backgroundColor: "#f5f5f5",
                    fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                />
              </div>
            </>
          )}
          <br />
          <Button
            isLoading={loading}
            buttonType="primary"
            disabled={!isValid}
            onClick={() => {
              updateConfig();
            }}
          >
            Update Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppConfigurationExtension;
