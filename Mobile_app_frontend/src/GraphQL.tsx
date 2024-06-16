import {useMemo} from 'react';
import {Client, Provider, createClient} from 'urql';
import tunnelconfig from './tunnel_config.json';
import React from 'react';

export const GraphQLProvider: any = (props: any) => {
  const client = createClient({url: `${tunnelconfig.graphql}/graphql`});
  return <Provider value={client}>{props.children}</Provider>;
};
