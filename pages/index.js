import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useState } from "react";
import { Container, Input, Button, Flex } from "@chakra-ui/react";
import connectContract from "../utils/connectContract";
import TodoList from "./TodoList";
import { useAccount } from "wagmi"; // TO READ WALLET ADDRESS

export default function Home() {
  const [todo, setTodo] = useState("");
  const { address } = useAccount();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const todoContract = connectContract(); // get contract from connectContract func

      if (todoContract) {
        let todoTask = todo;
        setTodo("");
        await todoContract.addTodo(todoTask); // create new todo
      } else {
        console.log("Error getting contract.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChakraProvider>
      <Navbar />
      <Container>
        <Flex mt="8">
          <Input placeholder="Type todo..." mr="5" value={todo} onChange={(e) => setTodo(e.target.value)} />
          <Button colorScheme="blue" type="submit" onClick={onSubmit}>
            Add
          </Button>
        </Flex>
        {/* Add component with address as a prop */}
        <TodoList address={address} />
      </Container>
    </ChakraProvider>
  );
}
