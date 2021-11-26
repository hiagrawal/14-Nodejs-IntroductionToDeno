import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

interface Todo {
    id: string,
    text:string
}

let todos: Todo[] = [];

router.get('/', (ctx) => {
    ctx.response.body = {todos: todos};
})

//Oak parses the request body, we dont need to do it explicitely like we did in node using body parser
//but returns us a promise on parsed body so we can use async await to get the data from the promised return body
//and then we can get the data in returned promise 'value' object
router.post('/todo', async(ctx) =>{
    const data = await ctx.request.body();
    const value = await data.value;
    const newTodo:Todo = {
        id: new Date().toString(),
        text: value.text
    }
    todos.push(newTodo);
    ctx.response.body = {message: 'Added', todo: newTodo, todos: todos};
})

router.put('/todo/:todoId', async (ctx) => {
    const tid = ctx.params.todoId;
    const data = await ctx.request.body();
    const value = await data.value;
    const todoIndex = todos.findIndex(todoItem => todoItem.id == tid);
    if(todoIndex >=0){
        todos[todoIndex] = {id: tid, text: value.text};
        return ctx.response.body = {message: 'Updated', todos:todos};
    }
    ctx.response.body = {message: 'Could not find todo for this id'};
})

router.delete('/todo/:todoId', (ctx)=>{
    const tid = ctx.params.todoId;
    todos = todos.filter(todoItem => todoItem.id !== tid);
    ctx.response.body = {message: 'Deleted', todos: todos};
})

export default router;