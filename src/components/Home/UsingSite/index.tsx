import { Box, List, VStack, Text, HStack, Flex, Grid, Divider, Spinner } from "@chakra-ui/react";
import { ChalkboardTeacher, GraduationCap, IconProps, MagnifyingGlass, Stack, TerminalWindow, UserCircle } from "phosphor-react";
import { ForwardRefExoticComponent, ReactNode } from "react";
import { MiniCard } from "../../ui/MiniCard";
import { adminItemsDegrees, adminItemsManager, studentsItems, teacherItems, visitorItems } from "./items";

export function UsingSite() {
  return (
    <VStack mt={5} ml={5} spacing={7}>
      <HStack align="start" spacing={7}>
        <LocalMiniCard title="Les visiteurs">
          <SubMenu items={visitorItems} titleIcon={MagnifyingGlass} />
        </LocalMiniCard>
        <LocalMiniCard title="Les étudiants" timeOut={400}>
          <SubMenu items={studentsItems} titleIcon={UserCircle} />
        </LocalMiniCard>
      </HStack>
      <LocalMiniCard title="Les professeurs"  timeOut={600}>
        <SubMenu items={teacherItems} titleIcon={ChalkboardTeacher} />
      </LocalMiniCard>
      <LocalMiniCard title="Les admins"  timeOut={800}>
        <>
          <SubMenu items={adminItemsManager} titleIcon={TerminalWindow} />
          <SubMenu items={adminItemsDegrees} titleIcon={GraduationCap} />
        </>
      </LocalMiniCard>
    </VStack>
  );
}

interface LocalMiniCardProps {
  title: string,
  children: ReactNode
  timeOut?: number
}
function LocalMiniCard(props: LocalMiniCardProps) {

  const { title, children, timeOut } = props

  return <MiniCard title={title} animationTimeOut={timeOut ?? 0} >
    <HStack align="start" mt={5}>
      {children}
    </HStack>
  </MiniCard>
}

interface SubMenuProps {
  titleIcon: ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>
  items: string[]
}
function SubMenu({ titleIcon, items }: SubMenuProps) {
  return <Box h="full" p={4} position="relative">
    <Box as={titleIcon} bg="white" size={30} mx="auto" position="absolute" top={-15} left="46%" />
    <VStack align="left" border="1px solid" rounded="lg" px={2} pb={2} pt={4} mt={-4}>
      {items.map(item => <Flex alignItems="center" key={item}>
        <Box bg="primary.500" w={2} h={2} rounded="full" mr={2} /><Text>{item}</Text>
      </Flex>
      )}
    </VStack>
  </Box>
}
