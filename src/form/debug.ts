export const debugRender = (name: string) => {
  if (process.env.NEXT_PUBLIC_DEBUG_FORM_RENDER == "true") {
    // eslint-disable-next-line no-console
    console.debug("Rendering " + name);
  }
};

export const debugPropChanges = (
  prevProps: Record<string, unknown>,
  nextProps: Record<string, unknown>
) => {
  if (process.env.NEXT_PUBLIC_DEBUG_FORM_PROP_CHANGES == "true") {
    // eslint-disable-next-line no-console
    console.debug(prevProps, nextProps);
  }
};

export const debugEvent = (event: string, message: string) => {
  if (process.env.NEXT_PUBLIC_DEBUG_FORM_EVENT == "true") {
    // eslint-disable-next-line no-console
    console.debug(event + ": " + message);
  }
};
