import { HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [date, setDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      // using prev state here solving the problem with timer
      setSeconds(prevState => prevState + 1);
    }, 1000);

    // putting date string only on component first render to prevent setting new on every component rerender caused by changing seconds state
    const dateString = new Date().toTimeString();
    setDate(dateString)

    return () => {
      clearInterval(interval);
      setSeconds(0)
      setDate("")
    };
  }, []);

  return (
    <VStack gap="10px" align="left">
      <HStack>
        <Text fontWeight="bold">Seconds spend on page:</Text>
        <p>{`${seconds} s`}</p>
      </HStack>
      <HStack>
        <Text fontWeight="bold">Time of entering the website:</Text>
        <p>{date}</p>
      </HStack>
    </VStack>
  );
};

export default Timer;
