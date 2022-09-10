import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Collapse, Flex, SlideFade } from "@chakra-ui/react";
import { CaretDown, CaretUp } from "phosphor-react";
import { ReactNode, useState } from "react";

interface Props {
    title: string,
    children: ReactNode

}

export function ExpandButton(props: Props) {

    const { title, children } = props;
    const [isOpen, setIsOpen] = useState(false)
    return <Flex flexDir="column">

        <Button onClick={() => setIsOpen(i => !i)} rightIcon={
            isOpen ?
                <CaretDown size={32} color="#ffffff" weight="regular" /> :
                <CaretUp size={32} color="#ffffff" weight="regular" />
        }>{title}</Button>
        <Collapse in={isOpen}>
            <Box bg="white"  p={5} roundedBottom="xl">
                {children}
            </Box>
        </Collapse>
    </Flex>
}