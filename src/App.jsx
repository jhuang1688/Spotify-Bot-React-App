import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
    constructor(props) {
        super(props);
        this.state= {
            query: '',
            artist: null,
            tracks: [],
        }
    }

    search() {
        console.log('this.state', this.state.query);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        
        //console.log('FETCH_URL', FETCH_URL);
        
        fetch(FETCH_URL, {
            method:'GET',
            headers: new Headers({
            'Authorization': 'Bearer BQCuYROu9SOgMYkKdqDtdY7To1k8Z4ZPNXDvMDlnnxJMTtJ_Ygivu2-FmiyAQAaErIpYh_eDnhlWFzHjnFY'
            }),
        })
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0];
            console.log('artist', artist);
            this.setState({artist});

            FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=AU&`;
            fetch(FETCH_URL, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer BQCuYROu9SOgMYkKdqDtdY7To1k8Z4ZPNXDvMDlnnxJMTtJ_Ygivu2-FmiyAQAaErIpYh_eDnhlWFzHjnFY'
                }),
            })
            .then(response => response.json())
            .then(json => {
                console.log('artist\'s top tracks: ', json);
                const { tracks } = json;
                this.setState({tracks});
            })
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
                        <Gallery
                            tracks={this.state.tracks}
                        />
                    </div>
                    
                    : <div></div>
                }
                
            </div>
        )
    }
}

export default App;