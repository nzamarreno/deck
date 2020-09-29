import {PrismicLink} from "apollo-link-prismic";
import {InMemoryCache} from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";

export class GraphClient {
    constructor() {
        this.client = new ApolloClient({
            link: PrismicLink({
                uri: "https://alphabet-alpha.prismic.io/graphql",
            }),
            cache: new InMemoryCache()
        });
    }

    _getText(obj) {
        return obj[0].text;
    }

    _getImage(objPicture) {
        return objPicture.url;
    }

    _getCards(cards) {
        return cards.map(c => ({
            name: this._getText(c.cards_card.word),
            description: this._getText(c.cards_card.description),
            picture: this._getImage(c.cards_card.cover)
        }));
    }

    async getCollection() {
        return await this.client.query({
            query: gql`
                query{
                  allCollectionss{
                    edges{
                      node{
                        name
                        color
                        cards {
                          cards_card {
                            ...on Card {
                              word
                              description
                              cover
                            }
                          }
                        }
                        _meta{
                          id
                          uid
                          type
                        }
                      }
                    }
                  }
                }
            `
        }).then(response => {
            return response.data.allCollectionss.edges.map(x => ({
                name: this._getText(x.node.name),
                color: x.node.color,
                cards: this._getCards(x.node.cards)
            }));
        }).catch(error => {
            console.error(error);
        });
    }
}