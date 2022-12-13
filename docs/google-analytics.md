# Google Analytics

---

Adds Google Analytics to a WebPage

## Usage

- Step 1

  ```typescript
  import { GoogleAnalytics } from "mui-extended";

  const myPage = () => {
    return (
      <>
        <GoogleAnalytics />
        {/* Page Content */}
      </>
    );
  };
  ```

- Step 2.  
  Enable and collect Analitics Id in Google Analytics Account.  
  Refer [Google Support](https://support.google.com/analytics/answer/9304153?hl=en&ref_topic=12156336) for help.

- Step 3.  
  set environmental variable `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` to id obtained from Google Analytics.  
  **Note**: _This component will have no effect if this environmental variable is not set._
