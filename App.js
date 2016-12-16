/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Navigator,
    View
} from 'react-native';


import List from './Component/List/list';
import Edit from './Component/Edit/edit';
import Picture from './Component/Picture/picture';
import Account from './Component/Account/account';

import DfyTabBar from './DfyTabBar';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';



export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabNames: ['视频', '录制', '图片', '我的'],
            tabIconNames: ['ios-videocam', 'ios-recording', 'ios-reverse-camera', 'ios-contact'],

        };
    }


    render() {
        let tabNames = this.state.tabNames;
        let tabIconNames = this.state.tabIconNames;
        return (
            <ScrollableTabView
                // renderTabBar={() => <ScrollableTabBar/>}
                renderTabBar={() => <DfyTabBar tabNames={tabNames} tabIconNames={tabIconNames}/>}


                tabBarPosition='bottom'

                onChangeTab={
                    (obj) => {
                        console.log('被选中的tab下标：' + obj.i);
                    }
                }

                onScroll={
                    (position) => {
                        console.log('滑动时的位置：' + position);
                    }
                }
                locked={true}
                initialPage={0}


                prerenderingSiblingsNumber={1}


            >




                <Navigator
                    tabLabel="list"
                    initialRoute={{ name: 'list', component: List }}
                    //配置场景
                    configureScene=
                        {
                            (route) => {

                                //这个是页面之间跳转时候的动画，具体有哪些？可以看这个目录下，有源代码的: node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js

                               // return Navigator.SceneConfigs.PushFromRight;

                                return ({
                                    ...Navigator.SceneConfigs.PushFromRight,
                                    gestures: null
                                });
                            }
                        }
                    renderScene={
                        (route, navigator) =>
                        {
                            let Component = route.component;
                            return <Component {...route.params} navigator={navigator} />
                        }
                    } />

                <Edit tabLabel="edit" />

                <Picture tabLabel="pic" />

                <Account tabLabel="account"/>



            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

});

