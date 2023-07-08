import { Text } from "components";
import { TodoWrapper, DeleteButton } from "./Todo.styled";
import { RiDeleteBinLine } from "react-icons/ri";

export const Todo = ({ id, counter, text, onClick }) => {
  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO #{counter}
      </Text>
      <Text>{text}</Text>
      <DeleteButton type="button" onClick={()=>onClick(id)}>
        <RiDeleteBinLine size={24} />
      </DeleteButton>
    </TodoWrapper>
  );
};


//EditButton
//RiEdit2Line