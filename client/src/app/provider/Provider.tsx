"use client"
import React, { ReactNode } from 'react';
import { ApolloProvider as Provider } from '@apollo/client';
import client from '@/utils/appolloClient';

interface ApolloProviderProps {
  children: ReactNode;
}

const ApolloProvider: React.FC<ApolloProviderProps> = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};

export default ApolloProvider;
