import { Box, Divider, Checkbox } from "@chakra-ui/react";
import connectContract from "../utils/connectContract";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

// query todos from the graph
const ALL_TODOS = gql`
  query Todos($creator: String) {
    todos(where: { creator: $creator }) {
      id
      todoId
      todoTask
      creator
      isCompleted
    }
  }
`;

const TodoList = ({ address }) => {
  //Adding the ALL_TODOS to the useQuery hook
  const { data, refetch } = useQuery(ALL_TODOS, {
    variables: { creator: address },
  });

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(data);
    // fetch todos after 10 secs
    const refreshTodo = setInterval(() => {
      refetch();
    }, 10000);

    return () => clearInterval(refreshTodo);
  }, [data, refetch]);

  // func to toggle todo isCompleted status
  const onChange = async (id) => {
    try {
      const todoContract = connectContract();
      if (todoContract) {
        await todoContract.toggle(id);
      } else {
        console.log("Error getting contract.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" my="8">
      <>
        <Box fontWeight="semibold" fontSize="xl" mb="2">
          Todo List
        </Box>
        <Divider />

        <Box as="ul" p="4">
          {/* List of uncompleted todo tasks */}
          {todos?.todos
            ?.filter((item) => item.isCompleted !== true)
            .map((todo) => (
              <li key={todo.todoId}>
                <Checkbox isChecked={todo.isCompleted} onChange={() => onChange(todo.todoId)}>
                  {todo.todoTask}
                </Checkbox>
              </li>
            ))}
          {/* List of completed todo tasks */}
          {todos?.todos
            ?.filter((item) => item.isCompleted === true)
            .map((todo) => (
              <li key={todo.todoId}>
                <Checkbox isChecked={todo.isCompleted} onChange={() => onChange(todo.todoId)}>
                  {todo.todoTask}
                </Checkbox>
              </li>
            ))}
        </Box>
      </>
    </Box>
  );
};

export default TodoList;
