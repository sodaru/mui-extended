import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Fab,
  FabProps,
  List,
  ListItem,
  ListItemText,
  Switch,
  Typography
} from "@mui/material";
import { forwardRef, FunctionComponent, ReactNode, useState } from "react";
import { ResponsiveDialogProps } from "./ResponsiveDialog";
import { useStateWithLocalStorage } from "./utils";
import CookieOutlinedIcon from "@mui/icons-material/CookieOutlined";

export type CookiePreferenceDialogProps = Omit<
  ResponsiveDialogProps,
  "children"
> & {
  title?: ReactNode;
  description?: ReactNode;
  necessory?: { title?: string; description?: ReactNode };
  preferences: Record<
    string,
    { default: boolean; title: string; description: ReactNode }
  >;
} & DialogProps;

const defaultTitle = "Cookie Preferences";

const defaultDescription =
  "When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to. The information does not usually directly identify you, but it can give you a more personalized web experience. Because we respect your right to privacy, you can choose not to allow some types of cookies. Click on the different category headings to find out more and change our default settings. However, blocking some types of cookies may impact your experience of the site and the services we are able to offer. By activating any of the below cookies you also explicitly consent to the fact that your personal data may be transferred to third countries. For more information about the transfer and related risks please see our Cookie Policy.";

const defaultNecessory: CookiePreferenceDialogProps["necessory"] = {
  title: "Necessary cookies",
  description:
    "Necessary cookies enable core functionality of the website such as security, network management, accessibility, and basic visitor statistics. You may disable these by changing your browser settings, but this may affect how the website functions."
};

export const defaultCookiePreferences: CookiePreferenceDialogProps["preferences"] =
  {
    performance: {
      default: true,
      title: "Performance",
      description:
        "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site, which helps us optimize your experience. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not be able to use your data in this way."
    },
    functional: {
      default: true,
      title: "Functional",
      description:
        "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly."
    },
    targeting: {
      default: true,
      title: "Targeting",
      description:
        "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising."
    }
  };

export const CookiePreferenceDialog: FunctionComponent<
  CookiePreferenceDialogProps
> = ({ title, description, necessory, preferences, ...props }) => {
  const [cookiePreference, setCookiePreference] = useStateWithLocalStorage(
    "cookie-preference",
    Object.fromEntries(
      Object.keys(preferences).map(p => [p, preferences[p].default])
    )
  );

  return (
    <Dialog {...props}>
      <DialogTitle>{title || defaultTitle}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {description || defaultDescription}
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary={
                <Box display="flex">
                  <Box flexGrow={1}>
                    {necessory?.title || defaultNecessory.title}
                  </Box>
                  <Box>Always Active</Box>
                </Box>
              }
              secondary={necessory?.description || defaultNecessory.description}
            />
          </ListItem>
          {Object.keys(preferences).map(preferenceKey => (
            <ListItem key={preferenceKey}>
              <ListItemText
                primary={
                  <Box display="flex">
                    <Box flexGrow={1}>{preferences[preferenceKey].title}</Box>
                    <Box>
                      <Switch
                        checked={cookiePreference[preferenceKey]}
                        onChange={event => {
                          setCookiePreference({
                            ...cookiePreference,
                            [preferenceKey]: event.target.checked
                          });
                        }}
                      />
                    </Box>
                  </Box>
                }
                secondary={preferences[preferenceKey].description}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={event => {
            if (props.onClose) {
              props.onClose(event, "escapeKeyDown");
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export type CookiePreferenceProps = FabProps & {
  dialogProps?: CookiePreferenceDialogProps;
};

export const CookiePreference = forwardRef<
  HTMLButtonElement,
  CookiePreferenceProps
>(function CookiePreference({ dialogProps, ...props }, ref) {
  const [open, setOpen] = useState(false);

  const onClick: FabProps["onClick"] = event => {
    setOpen(true);
    if (props?.onClick) {
      props.onClick(event);
    }
  };

  const onClose: CookiePreferenceDialogProps["onClose"] = (event, reason) => {
    setOpen(false);
    if (dialogProps?.onClose) {
      dialogProps.onClose(event, reason);
    }
  };

  return (
    <>
      <Fab
        size="small"
        aria-label="cookie preferences"
        {...props}
        onClick={onClick}
        ref={ref}
      >
        <CookieOutlinedIcon />
      </Fab>
      <CookiePreferenceDialog
        preferences={defaultCookiePreferences}
        {...dialogProps}
        open={open}
        onClose={onClose}
      />
    </>
  );
});
