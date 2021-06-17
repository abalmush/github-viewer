import React from 'react';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export default function withApollo(WrapperComponent: React.FC<any>) {
    const httpLink = createHttpLink({
        uri: 'https://api.github.com/graphql',
    });
    
    const authLink = setContext((_, { headers }) => {
        const token = process.env.REACT_APP_GITHUB_TOKEN || '';
    
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    });
    
    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    return (props: any) => (
        <ApolloProvider client={client}>
            <WrapperComponent {...props} />
        </ApolloProvider>
    );
}
