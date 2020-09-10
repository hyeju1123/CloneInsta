import firestore from '@react-native-firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const Firebase = {
    uploadPost: post => {
        let id = uuidv4();
        console.log("id: "+id);
        const uploadData = {
            id: id,
            postPhoto: post.photo,
            postTitle: post.title,
            postDescription: post.description,
            likes: []
        }
        return firestore().collection('posts').doc(id).set(uploadData)
    },
    getPosts: () => {
        return firestore()
                    .collection('posts')
                    .get()
                    .then(function(querySnapshot) {
                        let posts =querySnapshot.docs.map(doc => doc.data())
                        return posts
                    })
                    .catch(e => {console.log('Error getting documents: ', e)})
    }
}

export default Firebase;