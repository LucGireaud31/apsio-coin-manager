import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";

export const theme = extendTheme({
  colors,
  components: {
    Button: {
      defaultProps: {
        colorScheme: "primary",
      },
    },
  },
});
