import React, { Component, Suspense } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import Posts from './Posts/Posts';
//import NewPost from './NewPost/NewPost';
import './Blog.css';
import asyncComponent from '../../hoc/asyncComponent';
//import FullPost from '../Blog/FullPost/FullPost';

const AsyncNewPost = asyncComponent(() => {
    //it is lazy loading, it is pretty useful if we have big chunck of code the user might not use
    return import('./NewPost/NewPost');
});

// const AsyncNewPost  = React.lazy(() => import('./NewPost/NewPost'));react 16.6

class Blog extends Component {
    state = {
        auth: true,
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                    to="/posts/" 
                                    exact
                                    activeClassName="active"
                                    activeStyle={{
                                        color: '#fa923f',
                                        textDecoration: 'underline'
                                    }}>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>}/> */}
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null}
                    {/* this is method in react 16.6, you have to use suspense component */}
                    {/* {this.state.auth ? <Route path="/new-post" render = {() => <Suspense fallback={<div>Loading</div>}><AsyncNewPost/></Suspense>}/> : null} */}
                    <Route path="/posts" component={Posts}/>
                    <Route render={()=><h1>Not Found</h1>}/>
                    <Redirect from="/" to="/posts"/>
                </Switch>
               
            </div>
        );
    }
}

export default Blog;