### Typescript Learning boilerplate

This is a repository for writing basic Typescript scripts with VSCode debugging integrated via `ts-node`.

To begin, create any file ending with `.ts` and run it using the VSCode debugger (default keybind is F5)

For console programs requiring user input, the `readline-sync` library is also included. It can be used via

```ts
import { question } from "readline-sync";

const name = question("What is your name?\n");
```
