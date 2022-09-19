import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flex, Box, Spacer } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex bg="grey" p="4">
      <Box color="white" fontWeight="semibold" fontSize="xl">
        Todo dApp
      </Box>
      <Spacer />
      <ConnectButton />
    </Flex>
  );
};

export default Navbar;
