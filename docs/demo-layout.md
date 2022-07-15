# Demo Layout

---

## Usage

1. Add `@solib/ui-components` as dependency

   ```
   npm install @solib/ui-components --save-dev
   ```

2. Create `pages/_app.tsx` with below content

   ```typescript
   export { SodaruApp as default } from "@solib/ui-components";
   ```

3. Create `pages/_document.tsx` with below content

   ```typescript
   export { SodaruDocument as default } from "@solib/ui-components";
   ```

4. Create `next.config.js` with following content

   ```javascript
   /* eslint-disable */
   const images = { domains: ["about.gitlab.com"] };
   if (process.env.NEXT_PUBLIC_DISABLE_SODARU_IMAGE_OPTIMIZATION === "true") {
     images.loader = "custom";
   }

   /**
    * @type import("@mui/material").ThemeOptions;
    */
   const defaultThemeOptions = {
     palette: {
       primary: { main: "#004b89" },
       secondary: { main: "#ffb476" }
     },
     components: {
       MuiFormControl: {
         defaultProps: { size: "small", margin: "normal" }
       },
       MuiSwitch: {
         defaultProps: { size: "small" }
       },
       MuiRadio: {
         defaultProps: { size: "small" }
       },
       MuiCheckbox: {
         defaultProps: { size: "small" }
       },
       MuiButton: {
         defaultProps: { size: "small" }
       },
       MuiIconButton: {
         defaultProps: { size: "small" }
       },
       MuiSvgIcon: {
         defaultProps: { fontSize: "small" }
       }
     }
   };

   module.exports = {
     images: images,
     publicRuntimeConfig: {
       defaultThemeOptions: defaultThemeOptions
     }
   };
   ```

5. Create Documentation in `docs` folder , (create `.md` files)

6. Create pages as follows

   ```typescript
   import { demoPage } from "../node_modules/@solib/ui-components/dist/demo-utils/demoLayout";
   import { getStaticPropsFactory } from "../node_modules/@solib/ui-components/dist/demo-utils/staticProps";

   const DemoComponent = () => {
     // Implement the demo in this function component
   };

   const Index = demoPage(
     DemoComponent, // pass undefined , if there is no demo
     "home", // home is the path to documentation md file, pass undefined if there is no documentation
     "Sodaru UI Components", // Title
     "https://gitlab.com/sodaru/solib/ui-components" // Repo home page link
   );

   export default Index; // Index is a PageName , can by any relavent to page name

   export const getStaticProps = getStaticPropsFactory(["home"]); // home is the path to documentation md file
   ```

> **Guidelines for Documentation**
>
> - Start with `# Heading` followed by underline
>   ```
>    # Demo
>    ---
>   ```
> - Include Usage Snipets
> - Document all Props
> - Highlight Special Instructions, If Any
