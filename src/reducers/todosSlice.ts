import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { delTodos, getTodos, postTodos, putTodos } from "../api/todos";
import { message } from "antd";

export interface TTodo {
  id?: number;
  title: string;
  completed:boolean
}


interface CounterState {
  list: TTodo[];
  title: string
  status: "loading" | "complete" | "error";  
  modal: boolean,
  idx: number
  text:string
}

const initialState: CounterState = {
  list: [],
  title: "",
  status: "complete",
  modal: false,
  idx: 0,
  text: "",

};

export const todosSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    handleCHangeTitle(state: CounterState, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    editUser(state: CounterState, action: PayloadAction<TTodo>) {
      state.text = action.payload.title;
      if (action.payload.id) state.idx = action.payload.id;
      state.modal = true;
    },
    setText(state:CounterState, action:PayloadAction<string>) {
      state.text=action.payload
    },
    setModal(state:CounterState, action:PayloadAction<boolean>) {
      state.modal =action.payload
    },
   
    handleClose(state:CounterState) {
      state.modal=false
    }
  },
  extraReducers: (builder) => {
    //getTodos

    builder.addCase(getTodos.pending, (state: CounterState) => {
      state.status = "loading";
    }),
      builder.addCase(
        getTodos.fulfilled,
        (state: CounterState, action: PayloadAction<TTodo[]>) => {
          state.status = "complete";
          state.list = action.payload;
        }
      ),
      builder.addCase(getTodos.rejected, (state: CounterState) => {
        state.status = "error";
      }),
      //postTodos
      builder.addCase(postTodos.pending, (state: CounterState) => {
        state.status = "loading";
      });
    builder.addCase(
      postTodos.fulfilled,
      (state: CounterState, action: PayloadAction<TTodo>) => {
        state.status = "complete";
        message.success(
          `Todo with title : ${action.payload.title} was successgully added to the list`
        );
      }
    );
    builder.addCase(postTodos.rejected, (state: CounterState) => {
      state.status = "error";
    });
    //putTodos
    builder.addCase(putTodos.pending, (state: CounterState) => {
      state.status = "loading";
    });
    builder.addCase(
      putTodos.fulfilled,
      (state: CounterState, action: PayloadAction<TTodo>) => {
        state.status = "complete";
        message.success(
          `Todo with title : ${action.payload.title} was successgully updated to the list`
        );
      }
    );
    builder.addCase(putTodos.rejected, (state: CounterState) => {
      state.status = "error";
    });

    //delTodos
    builder.addCase(delTodos.pending, (state: CounterState) => {
      state.status = "loading";
    });
    builder.addCase(delTodos.fulfilled, (state: CounterState) => {
      state.status = "complete";
      message.success(`Todo with title  was successgully delete from the list`);
    });
    builder.addCase(delTodos.rejected, (state: CounterState) => {
      state.status = "error";
    });
  },
});

export const { handleCHangeTitle, editUser, handleClose, setText,setModal } =
  todosSlice.actions;


export default todosSlice.reducer;
