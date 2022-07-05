import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "src/context/auth-context";
import { LoginRole, Role } from "src/generated/generates";

const localStorageKey = "___auth_provider_token___";

async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

async function handleUserResponse(accessToken: string) {
  window.localStorage.setItem(localStorageKey, accessToken);

  let user = await currentUser(accessToken);

  return user;
}

async function currentUser(accessToken: string) {
  const response = await fetch("http://localhost:3001/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `
        query currentUser{
          currentUser{
              id
              name
              role
              projectId
              username
              project{
                current_archive_name
                id
                current_archive_id
              }
            }
          }
        `,
    }),
  });
  const json = await response.json();

  if (json.data.currentUser) {
    return { ...json.data.currentUser, accessToken };
  }
  return null;
}

async function login({
  username,
  password,
  loginRole,
}: {
  username: string;
  password: string;
  loginRole: LoginRole;
}) {
  const response = await fetch("http://localhost:3001/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      mutation login(
        $username: String!,
        $password: String!,
        $loginRole: LoginRole!
      ){
        login(loginUserInput:{
          password: $password,
          username:$username,
          loginRole: $loginRole
        }){
          accessToken,
          user{
            id
            name
            username
          }
        }
      }
        `,
      variables: {
        username,
        password,
        loginRole,
      },
    }),
  });

  const json = await response.json();

  return handleUserResponse(json.data.login.accessToken);
}

function logout() {
  window.localStorage.removeItem(localStorageKey);
}

async function client(endpoint: string, data: any) {
  const config = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return window
    .fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, config)
    .then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { getToken, handleUserResponse, currentUser, login, logout, client };
