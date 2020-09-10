import React, { Component, useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, Avatar, withStyles, List } from '@ui-kitten/components';
import { withFirebaseHOC } from '../utils';

// const DATA = [
//     {
//         id: 1,
//         postTitle: 'Planet of Nature',
//         avatarURI: 
//             'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
//         imageURI: 
//             'https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
//         randomText:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
//     },
//     {
//         id: 2,
//         postTitle: 'Lampost',
//         avatarURI:
//           'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
//         imageURI:
//           'https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
//         randomText:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
//       }
// ]

const _Feed = (props) => {
    const { eva, navigation, firebase } = props;
    const [ data, setData ] = useState(null);
    const [ isRefreshing, setIsRefreshing ] = useState(false);

    const fetchPosts = async () => {
        try {
            const posts = await firebase.getPosts();
            console.log(posts);
            setData(posts);
            setIsRefreshing(false);
        } catch (e) {
            console.log(e);
        }
    }

    const onRefresh = () => {
        setIsRefreshing(true);
        fetchPosts();
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    const renderItem = ({ item }) => (
        <View style={ eva.style.card }>
            <Image
                source={{ uri: item.postPhoto.uri }}
                style={ eva.style.cardImage }
            />
            <View style={ eva.style.cardHeader }>
                <Text category='s1' style={eva.style.cardTitle}>
                    {item.postTitle}
                </Text>
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Profile')}}>
                    <Avatar
                        source={{ uri: 
                            'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' }}
                        size='small'
                        style={ eva.style.cardAvatar }
                    />
                </TouchableOpacity>
            </View>
            <View style={ eva.style.cardContent }>
                <Text category='p2'>{item.postDescription}</Text>
            </View>
        </View>
    )

    if (data !== null) {
        return (
            <List 
                style={eva.style.container}
                data={data}
                renderItem={renderItem}
                keyExtractor={data.id}
                refreshing={isRefreshing}
                onRefresh={() => onRefresh()}
            />
        )
    } else {
        return (
            <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size='large' />
            </View>
        )
    }
}

// class _Feed extends Component {
//     render() {
//         const { eva, navigation } = this.props;
//         const renderItem = ({ item }) => (
//             <View style={ eva.style.card }>
//                 <Image
//                     source={{ uri: item.imageURI }}
//                     style={ eva.style.cardImage }
//                 />
//                 <View style={ eva.style.cardHeader }>
//                     <Text category='s1' style={eva.style.cardTitle}>
//                         {item.postTitle}
//                     </Text>
//                     <TouchableOpacity
//                         onPress={() => navigation.navigate('Profile')}>
//                         <Avatar
//                             source={{ uri: item.avatarURI }}
//                             size='small'
//                             style={ eva.style.cardAvatar }
//                         />
//                     </TouchableOpacity>
//                 </View>
//                 <View style={ eva.style.cardContent }>
//                     <Text category='p2'>{item.randomText}</Text>
//                 </View>
//             </View>
//         )
//         return (
//             <List
//                 style={eva.style.container}
//                 data={DATA}
//                 renderItem={renderItem}
//                 keyExtractor={DATA.id}
//             />
//         )
//     }
// }

export const Feed = withFirebaseHOC(
    withStyles(_Feed, theme => ({
        container: {
            flex: 1
        },
        card: {
            backgroundColor: theme['color-basic-100'],
            marginBottom: 25
        },
        cardImage: {
            width: '100%',
            height: 300
        },
        cardHeader: {
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        cardTitle: {
            color: theme['color-basic-1000']
        },
        cardAvatar: {
            marginRight: 16
        },
        cardContent: {
            padding: 10,
            borderWidth: 0.25,
            borderColor: theme['color-basic-100']
        }
    }))
)