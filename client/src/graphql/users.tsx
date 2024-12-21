// import { graphql } from "@/gql";
import { gql } from '@apollo/client';
// get all users
export const GET_USERS = gql(`
  query Users {
    users {
      id
      email
      name
    }
  }
`);
// create users
export const CREATE_USER = gql(`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      name
      email
    }
  }
`);

// update user
export const UPDATE_USER = gql(`
 mutation UpdateUser($data: UpdateUserInput!, $updateUserId: Float!) {
  updateUser(data: $data, id: $updateUserId) {
  name
  email
  id  
  }
}
`);

// delete user
export const DELETE_USER = gql(`
mutation DeleteUser($deleteUserId: Float!) {
  deleteUser(id: $deleteUserId) {
  name
  email  
  }
}
`);