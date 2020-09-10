import React, { useState } from 'react';
import { Image, View, ScrollView } from 'react-native';
import { Text, Button, Input } from '@ui-kitten/components';
import ImagePicker from 'react-native-image-picker';
import { withFirebaseHOC } from '../utils';

const AddPost = ({ firebase }) => {
    const [ image, setImage ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');

    const onChangeTitle = title => {
        setTitle(title);
    }
    const onChangeDescription = description => {
        setDescription(description);
    }

    const onSubmit = async () => {
        try {
            const post = {
                photo: image,
                title: title,
                description: description
            }
            firebase.uploadPost(post);
            setImage('');
            setTitle('');
            setDescription('');
        } catch (e) {
            console.error(e)
        }
    }

    const selectImage = () => {
        const options = {
            title: 'Load Photo',
            storageOptions: {
                skipBackup: true,
            }
        }
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton) 
            } else {
                const source = { uri: response.uri }
                console.log(source)
                setImage(source)
            }
        })
    }
    return (
        <ScrollView style={{ flex: 1, marginTop: 60 }}>
            <View>
                {image ? (
                    <Image
                        source={image}
                        style={{ width: '100%', height: 300 }}
                    />
                ) : (
                    <Button
                        onPress={selectImage}
                        style={{
                            alignItems: 'center',
                            padding: 10,
                            margin: 30
                    }}>
                        Add an Image
                    </Button>
                )}
            </View>
            <View style={{ marginTop: 80, alignItems: 'center' }}>
                <Text category='h4'>Post Details</Text>
                <Input
                    placeholder='Enter title of the post'
                    style={{ margin: 20 }}
                    value={title}
                    onChangeText={title => onChangeTitle(title)}
                />
                <Input
                    placeholder='Enter description'
                    style={{ margin: 20 }}
                    value={description}
                    onChangeText={description => onChangeDescription(description)}
                />
                <Button status='success' onPress={onSubmit}>
                    Add Post
                </Button>
            </View>
        </ScrollView>
    )
}

export default withFirebaseHOC(AddPost);
