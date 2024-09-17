const users = [
  {
    username: "Ahmed Shaaban",
    email: "ahm@gmail.com",
    password: "12345678",
  },
  {
    username: "Nada Taha",
    email: "nada@gmail.com",
    password: "12345678",
  },
  {
    username: "Mohamed Shaaban",
    email: "mo@gmail.com",
    password: "12345678",
  },
];

export function ApiSignUp({ username, email, password }) {
  //vlaidiation
  const isExist = users.find((user) => user.email === email);
  if (isExist) return { error: "this Email is already exist", status: 401 };
  users.push({ username, email, password });
  return {
    success: "success",
    status: 200,
    user: { username, email, password },
  };
}

export function signin({ email, password }) {
  const user = users.find((user) => user.email === email);
  if (!user) return { error: "Not Found", status: 404 };

  if (user.password === password) {
    return { success: "success", status: 200, user };
  } else {
    return {
      error: "There's something wrong with your password or your Email",
      status: 401,
    };
  }
}
