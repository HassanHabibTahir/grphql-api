"use client";

import { useState } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import {  useMutation, useQuery } from "@apollo/client";
import { CREATE_USER, DELETE_USER, GET_USERS, UPDATE_USER } from "@/graphql/users";
import { CreateUserInput, MutationCreateUserArgs, MutationDeleteUserArgs, MutationUpdateUserArgs, UpdateUserInput } from "@/gql/graphql";

interface Record {
  id: string;
  name: string;
  email: string;
}

export default function CRUD() {
  const [records, setRecords] = useState<Record[]>([]);
  const [formData, setFormData] = useState<Omit<Record, "id">>({
    name: "",
    email: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const { loading, error, data } = useQuery(GET_USERS);
  console.log(loading, error, data);
  const [createUser] = useMutation<MutationCreateUserArgs>(CREATE_USER);
  const [updateUser] = useMutation<MutationUpdateUserArgs>(UPDATE_USER);
  const [deleteUser] = useMutation<MutationDeleteUserArgs>(DELETE_USER);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateRecord(editingId, formData);
      // updateUser
      try {
        const result = await updateUser({
          variables: {
            data: {
              name: formData?.name,
              email: formData?.email,
            },
            updateUserId: parseInt(editingId),
          },
          refetchQueries: [{ query: GET_USERS }],
        });
        console.log("User updated:", result.data);
      } catch (err) {
        console.error("Error updating user:", err);
      }
    } else {
      createRecord(formData);

      try {
        const result = await createUser({
          variables: {
            data: {
              name: formData?.name,
              email: formData?.email,
            },
          },
          refetchQueries: [{ query: GET_USERS }],
        });
        console.log("User created:", result.data);
      } catch (err) {
        console.error("Error creating user:", err);
      }
    }
  };

  const createRecord = (data: Omit<Record, "id">) => {
    const newRecord = { ...data, id: Date.now().toString() };
    setRecords([...records, newRecord]);
    setFormData({ name: "", email: "" });
  };

  const updateRecord = (id: string, data: Omit<Record, "id">) => {
    setRecords(
      records.map((record) =>
        record.id === id ? { ...record, ...data } : record
      )
    );
    setFormData({ name: "", email: "" });
    setEditingId(null);
  };

  const deleteRecord = (id: string) => {
    //delete records
    try{

        const result = deleteUser({
            variables: {
            deleteUserId: parseInt(id),
            },
            refetchQueries: [{ query: GET_USERS }],
        });
        console.log("User deleted:", result);


    }catch(e){
        console.error("Error deleting user:", e);
  
    }
    
  };

  const startEditing = (record: Record) => {
    setFormData({ name: record.name, email: record.email });
    setEditingId(record.id);
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD Application</h1>

      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-100 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            label="Name"
            required
          />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            label="Email"
            required
          />
        </div>
        <Button type="submit" className="mt-4">
          {editingId ? "Update Record" : "Create Record"}
        </Button>
      </form>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* {loading && <tr>Loading...</tr>} */}
          {/* {error && <tr>Error: {error.message}</tr>} */}
          {data?.users?.map((record) => (
            <tr key={record.id}>
              <td className="px-6 py-4 whitespace-nowrap">{record.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{record.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{record.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Button
                  variant="secondary"
                  className="mr-2"
                  onClick={() => startEditing(record)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteRecord(record.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
