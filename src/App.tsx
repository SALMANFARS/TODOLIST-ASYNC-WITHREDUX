import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import {
  TTodo,
  editUser,
  handleCHangeTitle,
  handleClose,
  setModal,
  setText,
} from "./reducers/todosSlice";
import { delTodos, getTodos, postTodos, putTodos } from "./api/todos";
//modalka
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { store } from "./store/store";
//

function App() {
  const dispatch = useAppDispatch();
  const title = useAppSelector<string>((store) => store.todo.title);
  const status = useAppSelector<string>((store) => store.todo.status);
  const list = useAppSelector<TTodo[]>((store) => store.todo.list);
  let modal = useAppSelector<boolean>((store) => store.todo.modal);
  const text = useAppSelector<string>((store) => store.todo.text);
  const idx = useAppSelector<number>((store) => store.todo.idx)
  // console.log(list);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  if (status === "loading") {
    return <span className="loader"></span>;
  }
  if (status === "error") {
    return <div>Something went wrond</div>;
  }
  return (
    <>
      {" "}
      <div className="">
        <div className="todo w-[50%] m-auto border-2  border-white py-[50px] rounded-2xl">
          <div className="addUser text-center ">
            <h1 className="text-[42px] text-orange-300">Todos</h1>
            <input
              type="text"
              value={title}
              onChange={(event) =>
                dispatch(handleCHangeTitle(event.target.value))
              }
              className="border-2 border-[white] outline-none  py-[5px] px-[10px]"
            />
            <button
              onClick={() => {
                const obj: TTodo = {
                  title: title,
                  completed: false,
                };
                dispatch(postTodos(obj));
                dispatch(handleCHangeTitle(""));
              }}
              className="border-2 border-[white] ml-[5px] py-[5px] px-[10px] mb-[20px] text-white"
            >
              addUser
            </button>
          </div>

          {list.map((elem: TTodo) => {
            return (
              <div
                key={elem.id}
                className="flex justify-center items-center text-white "
              >
                <span className="text-[30px] mr-[10px] font-bold text-orange-500">
                  {" "}
                  {elem.completed ? <s>{elem.title}</s> : elem.title}
                </span>

                <div>
                  <input
                    type="checkbox"
                    checked={elem.completed}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const complete: TTodo = { ...elem };
                      complete.completed = event.target.checked;
                      dispatch(putTodos(complete));
                    }}
                    className="border-2 border-[white]"
                  />
                  <button
                    onClick={() => {
                      if (elem.id) dispatch(delTodos(elem.id));
                    }}
                    className="border-2 border-[white] ml-[10px] py-[5px] px-[10px] "
                  >
                    DELETE
                  </button>

                  <button
                    onClick={() => dispatch(editUser(elem))}
                    className="border-2 border-[white]  ml-[10px] py-[5px] px-[10px]"
                  >
                    EDIT USER
                  </button>
                </div>
              </div>
            );
          })}

          <div className="modal">
            <Modal
              open={modal}
              onClose={() => dispatch(handleClose())}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="flex justify-center items-center"
            >
              <Box className="w-[300px] h-[350px] bg-[#fff] flex items-center justify-center">
                <form
                  action=""
                  onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    let newObj = {
                      title: text,
                      completed: false,
                      id: idx,
                    };
                    dispatch(putTodos(newObj));
                    dispatch(setModal(false));
                  }}
                  className="flex flex-col justify-center items-center gap-[20px]"
                >
                  <h1 className="text-[30px] text-gray-500">Edit User</h1>
                  <input
                    type="text"
                    value={text}
                    onChange={(event) => dispatch(setText(event.target.value))}
                    className="border-[2px] border-[gray] py-[5px] px-[10px]"
                  />
                  <button className="p-[5px_40px] rounded-[30px] text-[#fff] bg-orange-500">
                    Edit
                  </button>
                </form>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
