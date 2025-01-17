import { Todo } from "./Todo";
import { TodoManager } from "./TodoManager";
import * as readline from "readline";

const todoManager = new TodoManager();

// Create an interface for reading input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const exitCommand = "exit"; // Designated exit command

// Function to process user input
function handleUserInput(input: string) {
  const inputParts = input.trim().split(/\s+/); // Split input by spaces
  const command = inputParts[0].toLowerCase(); // First part is the command
  const args = inputParts.slice(1); // Remaining parts are arguments

  // Perform an action based on user input
  switch (command) {
    case "add":
      promptForTodoDetails();
      return;

    case "view":
      console.log("view all Todos");
      console.log(todoManager.listAllTodos());
      break;

    case "remove":
      console.log("removing Todo");
      todoManager.removeTodoById(parseInt(args[0], 10));
      break;

    case "mark":
      console.log("mark Todo");
      todoManager.markTodoAsCompleted(parseInt(args[0], 10));
      break;

    case exitCommand:
      console.log("Exiting... Goodbye!");
      rl.close(); // Close the readline interface
      return;

    default:
      console.log(`You entered: "${input}" (No specific action assigned)`);
  }

  // Ask for input again
  askForInput();
}

// Function to prompt for Todo details
function promptForTodoDetails() {
  rl.question("Enter Todo ID: ", (id) => {
    rl.question("Enter Todo Title: ", (title) => {
      rl.question("Enter Todo Description: ", (description) => {
        rl.question("Is the Todo completed? (yes/no): ", (completed) => {
            const todo: Todo = {
                id: parseInt(id, 10),
                title,
                description,
                completed: completed.toLowerCase() === "yes"
              };
          todoManager.addTodo(todo);
          console.log("Todo added successfully!");
          askForInput(); // Ask for input again
        });
      });
    });
  });
}

// Function to prompt user input
function askForInput() {
  rl.question("Enter a command (type 'exit' to quit): ", (input) => {
    handleUserInput(input);
  });
}

// Start the process
askForInput();
