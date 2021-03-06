/**
 *  Fetches a build from the backend and render it
 */

import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';

class Builds extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            loading: false,
            buildPath: null
        };                      
    }
    
    componentDidMount() {
        this.fetchBuildRecommendation();
    }

    fetchBuildRecommendation() {
        this.setState({ loading: true });
        console.log("build")
        console.log(this.props.championId);
        fetch(`/build?champion=${this.props.championId}`, {
            method: "GET"
        })
            .then(res => {
                return res.json();
            })
            .then(json => {               
                this.setState({ buildPath: json });
                console.log(this.state.buildPath);
                this.setState({ loading: false });
            })
            .catch((error) => {
                console.log(error);
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div>
                {this.state.buildPath == null ? null : (
                    <div className='build-path'>
                        {this.state.buildPath.map((item) => 
                            <Image 
                                centered={true}
                                key={item}
                                src={`http://ddragon.leagueoflegends.com/cdn/8.9.1/img/item/${item}.png`} 
                            />
                        )}
                    </div>
                )}
           </div>
        )
    }
}

export default Builds