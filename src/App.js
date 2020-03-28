import React from 'react';
import { Grid } from '@material-ui/core';
import youtube from './api/youtube';
import { SearchBar, VideoList, VideoDetail  } from './components';

export default class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null
    }

    componentDidMount(){
        this.handleSubmit('react tutorial');
    }

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video})
    }

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 5,
                key: 'AIzaSyBp0ZHozO3vqANRWLz6SyH8oTao4iYn6B0',
                q: searchTerm,
            }
        });

        this.setState({ videos: response.data.items, selectedVideo: response.data.items[2] })
    }

    render() {
        const {selectedVideo, videos} = this.state;
        return (
            <Grid justify='center'container spacing={12}>
                <Grid item xs={12}>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit}/>
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={ selectedVideo }/>
                        </Grid>
                        <Grid item xs={2}>
                            <VideoList videos={ videos } onVideoSelect={this.onVideoSelect} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
