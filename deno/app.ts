import { Application } from "https://deno.land/x/oak/mod.ts";

import todoRoutes from './routes/todos.ts';

const app = new Application();

//Now here withn Oak, all middleware sends back the response without waiting for the routes to complete and in that case
//our routes response will never be sent as it will never reach till there and sends the response before only
//and with Oak, in all middleware await should be used to let them know to wait till the next middleware/routes are being executed
app.use(async(ctx, next) => {
  console.log('Deno middleware');
  await next();  
});

//we need to register these two methods to make routes to work
app.use(todoRoutes.routes());
app.use(todoRoutes.allowedMethods());

await app.listen({ port: 3000 });