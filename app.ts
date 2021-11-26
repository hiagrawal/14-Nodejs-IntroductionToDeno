
//sample deno message run
let message: string;

message = 'Hi there!';

console.log(message);

//Writing to a file using Deno // to run would need write permission
//deno run --allow-write app.ts

const text="This is a test and it should be stored in a file!";

const encoder = new TextEncoder(); //TextEncode is available globally in Deno that is used to encode the data
const data = encoder.encode(text);

Deno.writeFile('message.txt', data).then(() => {
    console.log('Wrote to file!');
}) 

//creating a server with Deno //to run would need a net permission
//deno run --allow-net app.ts
//https://deno.land/std@0.116.0/http

// import { serve } from "https://deno.land/std@0.116.0/http/server_legacy.ts";

// const server = serve({ port: 8000 });
// console.log("http://localhost:8000/");

// for await (const req of server) {
//   req.respond({ body: "Hello World\n" });
// }

//creating a server using deno oak framework //to run would need a net permission
//deno run --allow-net app.ts
//https://deno.land/x/oak@v10.0.0

import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 4000 });