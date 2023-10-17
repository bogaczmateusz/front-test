import React from "react";
import { Switch, VStack } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

const ThemeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <VStack>
      <p>Dark theme</p>
      {/* onChange={() => toggleDarkTheme()} isChecked={darkTheme} */}
      <Switch colorScheme="teal" size="lg" onChange={() => toggleColorMode()} isChecked={colorMode === "dark" ? true : false} />
    </VStack>
  );
};

export default ThemeSwitch;
