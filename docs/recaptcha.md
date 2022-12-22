```YAML
title: reCAPTCHA
meta:
  description:
    google reCAPTCHA implemented using react and typescript.
```

# reCAPTCHA

---

Integrate [reCAPTCHA Enterprise](https://cloud.google.com/recaptcha-enterprise) into react website

## Usage

- **ReCaptchaProvider** - Enables a Component to capture recaptcha

  ```typescript
  import { ReCaptchaProvider } from "mui-extended";

  const reCaptchEnabledComponent = (
    <ReCaptchaProvider siteKey="<SITE_KEY>">{children}</ReCaptchaProvider>
  );
  ```

  #### Props

  - `siteKey` reCpatcha site key obtained from [google cloud](https://cloud.google.com/recaptcha-enterprise/docs/create-key)

- **useReCaptchaContext** - get token on an action within the reCaptcha Enabled Component

  ```typescript
  import { useReCaptchaContext } from "mui-extended";

  // with in a child component

  const recaptchaContext = useReCaptchaContext();

  /**
   * Get a token for an action
   * pass this token to your api.
   * api must verify this token to analyse if this api call is a bot or human
   */
  const token = await recaptchaContext.getToken("LOGIN");
  ```
