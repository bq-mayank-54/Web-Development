// Define an interface for user data
interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

// A simple User class implementing IUser
class User implements IUser {
  id: number;
  username: string;
  email: string;
  password: string;

  constructor(id: number, username: string, email: string, password: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

// Singleton UserManager to encapsulate user management logic
class UserManager {
  private users: User[] = [];
  private static instance: UserManager;

  // Private constructor prevents external instantiation
  private constructor() {}

  // Get the singleton instance of UserManager
  public static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  // Add a new user
  public addUser(username: string, email: string, password: string): User {
    const id = Date.now(); // Unique id based on timestamp
    const newUser = new User(id, username, email, password);
    this.users.push(newUser);
    return newUser;
  }

  // Retrieve all users
  public getUsers(): User[] {
    return this.users;
  }

  // Remove a user by id
  public removeUser(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index > -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  // Update an existing user
  public updateUser(id: number, username: string, email: string, password: string): boolean {
    const user = this.users.find(user => user.id === id);
    if (user) {
      user.username = username;
      user.email = email;
      user.password = password;
      return true;
    }
    return false;
  }
}

// DOM manipulation and event handling
document.addEventListener('DOMContentLoaded', () => {
  const userManager = UserManager.getInstance();
  const form = document.getElementById('registerForm') as HTMLFormElement;
  const userList = document.getElementById('userList') as HTMLUListElement;

  // Handle form submission to add a new user
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    // Create new user and update UI
    userManager.addUser(usernameInput.value, emailInput.value, passwordInput.value);
    renderUsers(userManager.getUsers());

    form.reset();
  });

  // Render the list of users to the page
  function renderUsers(users: User[]) {
    userList.innerHTML = '';
    users.forEach(user => {
      const li = document.createElement('li');
      li.className = "flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-gray-50";
      
      // Container for text with truncation support
      const textDiv = document.createElement('div');
      textDiv.className = "flex-1 min-w-0";
      textDiv.innerHTML = `
        <div class="font-bold text-gray-800 truncate">${user.username}</div>
        <div class="text-gray-600 truncate">${user.email}</div>
      `;
      
      // Create a delete button styled with Tailwind classes
      const delBtn = document.createElement('button');
      delBtn.textContent = "Delete";
      delBtn.className = "ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300";
      delBtn.addEventListener('click', () => {
        userManager.removeUser(user.id);
        renderUsers(userManager.getUsers());
      });
      
      li.appendChild(textDiv);
      li.appendChild(delBtn);
      userList.appendChild(li);
    });
  }
});
