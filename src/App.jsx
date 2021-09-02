import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import Profile from './Profile';

class App extends Component {
    constructor(props) {
        super(props);
        this.state= {
            query: '',
            artist: null,
        }
    }

    search() {
        console.log('this.state', this.state.query);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;

        console.log('FETCH_URL', FETCH_URL);
        
        fetch(FETCH_URL, {
            method:'GET',
            headers: new Headers({
            'Authorization': 'Bearer BQDCUXMnSTWvZDH0zKkf25i0xDwPFNbcvT-Dk8IupNUNR6lVaYJyEhBjnyVBmNqkSqvMNbarfwuz9dOL9hU'
            }),
        })
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0];
            console.log('artist', artist);
            this.setState({artist});
        })
        //.catch(error => console.log('error', error))
    }

    render() {
        return (
            <div className="App">
                <div className="App-title">Music Master from App</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl 
                            type="text"
                            placeholder="Search for an Artist"
                            value={this.state.query} 
                            onChange={event => {this.setState({query: event.target.value})}}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search();
                                }
                            }}
                        />
                        <Button onClick={() => this.search()}> Search </Button>
                        {/* <InputGroup.Addon>
                            <Glyphicon glyph="search"/>
                        </InputGroup.Addon> */}
                    </InputGroup>  
                </FormGroup>
                {
                    this.state.artist !== null
                    ? 
                    <div>
                        <Profile 
                        artist={this.state.artist}
                        />
                        <div className="Gallery">
                            Gallery
                        </div>
                    </div>
                    
                    : <div></div>
                }
                
            </div>
        )
    }
}

export default App;