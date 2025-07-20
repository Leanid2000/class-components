import { Component } from 'react';
import type { Pokemon } from '../../utils/interfaces/pokemonInterfaces';
import './displayComponent.css';

export default class DisplayComponent extends Component<{
  pokemons: Pokemon[];
  isFound: boolean;
  loading: boolean;
}> {
  render() {
    return (
      <ul className="list">
        {this.props.loading && <p>loading...</p>}
        {!this.props.isFound && <p>Pokemon not found</p>}
        {this.props.pokemons.map((element: Pokemon) => {
          return (
            <div className="listElement" key={element.name}>
              <img src={element.img} alt={element.name} className="img" />
              <p className="name">{element.name.toUpperCase()}</p>
              <p className="descriptions">
                {element.descriptions || 'There is no description'}
              </p>
            </div>
          );
        })}
      </ul>
    );
  }
}
