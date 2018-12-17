import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item'
import Pagination from './Pagination';
import {perPage} from '../config';

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($skip:Int = 0, $first:Int) {
        allItems(skip: $skip, first: $first, orderBy: createdAt_DESC) {
            id
            title
            price
            description
            image
            largeImage
        }
    }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`

class Items extends Component {
  render() {
    const {page} = this.props;
    return (
      <Center>
        <Pagination page={page}/>
        <Query
          query={ALL_ITEMS_QUERY}
          // fetchPolicy='network-only'
          variables={{
          skip: (page - 1) * perPage,
          first: perPage
        }}>
          {({data, error, loading}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.messge}</p>
            return <ItemsList>
              {data.allItems.map(item => <Item item={item} key={item.id}/>)}
            </ItemsList>
          }}
        </Query>
        <Pagination page={this.props.page}/>
      </Center>
    );
  }
}


export default Items;
export {ALL_ITEMS_QUERY};
