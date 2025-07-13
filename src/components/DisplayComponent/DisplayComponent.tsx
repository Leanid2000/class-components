import { Component } from 'react';
import type { Pokemon } from '../../utils/interfaces/pokemonInterfaces';

export default class DisplayComponent extends Component<{
  pokemons: Pokemon[];
  isFound: boolean;
  loading: boolean;
}> {
  render() {
    return (
      <ul>
        {this.props.loading && <p>loading...</p>}
        {!this.props.isFound && <p>Pokemon not found</p>}
        {this.props.pokemons.map((element: Pokemon) => {
          return (
            <li key={element.name}>
              <p>
                {element.name}:{element.descriptions}
              </p>
            </li>
          );
        })}
      </ul>
    );
  }
}
