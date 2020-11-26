# twitter clone coding
twitter clone coding with react and firebase.

## firebase.auth
useing API:
- Auth: [createUserWithEmailAndPassword](https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#createuserwithemailandpassword), [signInWithEmailAndPassword](https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#signinwithemailandpassword), [onAuthStateChanged](https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#onauthstatechanged), [signInWithPopup](https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#signinwithpopup), [signOut](https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#signout).  
- [GoogleAuthProvider](https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider?authuser=0)  
- [GithubAuthProvider](https://firebase.google.com/docs/reference/js/firebase.auth.GithubAuthProvider?authuser=0)  
- [User](https://firebase.google.com/docs/reference/js/firebase.User?authuser=0) : [updateProfile](https://firebase.google.com/docs/reference/js/firebase.User?authuser=0#updateprofile)


## firebase.firestore
using API:
- [collection](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference?authuser=0) : [onSnapshot](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference?authuser=0#onsnapshot), [add](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference?authuser=0#add), [orderBy](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference?authuser=0#orderby), [where](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference?authuser=0#where)
- [doc](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference?authuser=0#doc) : [delete](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference?authuser=0#delete), [update](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference?authuser=0#update)


## firebase.storage
useing API:
- [Ref](https://firebase.google.com/docs/reference/js/firebase.storage.Reference?authuser=0): [child](https://firebase.google.com/docs/reference/js/firebase.storage.Reference?authuser=0#child), [putString](https://firebase.google.com/docs/reference/js/firebase.storage.Reference?authuser=0#putstring), [getDownloadUrl](https://firebase.google.com/docs/reference/js/firebase.storage.Reference?authuser=0#getdownloadurl),
[delete](https://firebase.google.com/docs/reference/js/firebase.storage.Reference?authuser=0#delete)
- [refFromURL](https://firebase.google.com/docs/reference/js/firebase.storage.Storage?authuser=0#reffromurl)

