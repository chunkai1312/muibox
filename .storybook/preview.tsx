import type { Preview } from "@storybook/react-vite";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { DialogProvider } from "../src";

const theme = createTheme();

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DialogProvider>
          <Story />
        </DialogProvider>
      </ThemeProvider>
    ),
  ],
  tags: ["autodocs"],
};

export default preview;
