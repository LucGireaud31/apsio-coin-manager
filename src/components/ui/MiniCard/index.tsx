import { Box, BoxProps, ChakraProps, Skeleton, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props extends ChakraProps {
  children: ReactNode;
  title?: string;
  titleStyle?: BoxProps;
  animation?: string;
  animationDuration?: number,
  animationTimeOut?: number,
}

export function MiniCard(props: Props) {
  const { title, children, titleStyle, animation, animationDuration, animationTimeOut, ...rest } = props;
  return (
    <Box
      className={`animate__animated ${animation ?? "animate__zoomIn"}`}
      style={{ animationDuration: `${animationDuration ?? "500"}ms`, animationDelay: `${animationTimeOut ?? "0"}ms` }}
      rounded="lg"
      bg="white"
      w="fit-content"
      h="fit-content"
      position="relative"
      shadow="xl"
      {...rest}
    >
      {title && (
        <Text
          w="fit-content"
          mx="auto"
          mt={-3}
          color="primary.500"
          bg="primary.50"
          p={2}
          shadow="md"
          rounded="lg"
          fontWeight="semibold"
          {...titleStyle}
        >
          {title}
        </Text>
      )}
      {children}
    </Box>
  );
}
