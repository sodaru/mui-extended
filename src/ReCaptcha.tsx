import { Component, createContext, PropsWithChildren, useContext } from "react";

declare global {
  interface Window {
    grecaptcha: {
      // created from https://cloud.google.com/recaptcha-enterprise/docs/api-ref-checkbox-keys
      enterprise: {
        execute: (
          site_key: string,
          params: { action: string }
        ) => Promise<string>;
        ready: (fn: () => void) => void;
      };
    };
  }
}

type ReCaptchaContextType = {
  getToken?: (action: string) => Promise<string>;
};

const ReCaptchaContext = createContext<ReCaptchaContextType>({});

export const useReCaptchaContext = () => {
  const reCaptchaContext = useContext(ReCaptchaContext);
  if (!reCaptchaContext.getToken) {
    throw new Error("useReCaptchaToken must be used with in ReCaptchaProvider");
  }
  return reCaptchaContext;
};

export class ReCaptchaProvider extends Component<
  PropsWithChildren<{
    siteKey: string;
  }>
> {
  constructor(props) {
    super(props);
    this.getReCaptchaToken = this.getReCaptchaToken.bind(this);
  }

  componentDidMount() {
    const head = document.getElementsByTagName("head")[0];
    if (head.querySelector("script#recaptcha" + this.props.siteKey) == null) {
      const scriptTag = document.createElement("script");
      scriptTag.setAttribute(
        "src",
        "https://www.google.com/recaptcha/enterprise.js?render=" +
          this.props.siteKey
      );
      scriptTag.id = "recaptcha" + this.props.siteKey;
      head.appendChild(scriptTag);

      const styleTag = document.createElement("style");
      styleTag.innerText = `.grecaptcha-badge { display: none; }`;
      head.appendChild(styleTag);
    }
  }

  getReCaptchaToken(action: string) {
    return new Promise<string>((resolve, reject) => {
      window.grecaptcha.enterprise.ready(() => {
        window.grecaptcha.enterprise
          .execute(this.props.siteKey, { action })
          .then(resolve)
          .catch(reject);
      });

      setTimeout(() => {
        reject(new Error("getReCaptchaToken timedout"));
      }, 5000);
    });
  }

  render() {
    return (
      <ReCaptchaContext.Provider value={{ getToken: this.getReCaptchaToken }}>
        {this.props.children}
      </ReCaptchaContext.Provider>
    );
  }
}
