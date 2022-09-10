import { BoxProps, Flex, Text } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { sleep } from "../../../utils/functions";

interface Props extends BoxProps {
  title: string;
  rightComponent?: ReactNode;
  leftComponent?: ReactNode;
  children: ReactNode;
  isOpen?: boolean;
  animationName?: string;
  animationTimeout?: number;
  animationDuration?: number;
}

export function Card(props: Props) {
  const {
    title,
    rightComponent,
    leftComponent,
    children,
    isOpen,
    animationTimeout,
    animationName,
    animationDuration,
    ...rest
  } = props;

  return (
    <Flex
      bg="gray.50"
      flexDir="column"
      h="full"
      p="20px"
      rounded="3xl"
      shadow="md"
      style={{ animationDuration: `${animationDuration ?? 400}ms`,animationDelay:`${animationTimeout ?? "0"}ms` }}
      className={`animate__animated ${animationName ?? "animate__fadeInLeft"}`}
      {...rest}
    >
      <Flex justifyContent="space-between" alignItems="center" mb="20px">
        <Flex alignItems="center">
          <Text fontWeight="bold" mr={5}>
            {title}
          </Text>
          {leftComponent}
        </Flex>
        {rightComponent}
      </Flex>
      {children}
    </Flex>
  );
}
