//offline data
db.enablePersistence()
    .catch(err => {
        if(err.code == 'failed-precondition'){
            //probably multiple tabs open at once
            console.log('persistance failed');
        }else if(err.code == 'unimplemented'){
            //lack of browser support
            console.log('persistance is not available');
        }
    });

db.collection('todo').onSnapshot((snapshot) => {
    //console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        //console.log(change, change.doc.data(), change.doc.id);
        if(change.type === 'added'){
            //add the document data to the web page
            renderTask(change.doc.data(), change.doc.id);
        }
        if(change.type === 'removed'){
            //remove the document data from the web page
            removeTask(change.doc.id);
        }
    });
});

//add tasks
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const task = {
        goal: form.input.value
    };

    db.collection('todo').add(task)
    .catch(err => console.log(err));

    form.input.value ; '';
});

//delete task
const deleteTask = document.querySelector('.todo');
deleteTask.addEventListener('click', evt => {
    //console.log(evt);
    if(evt.target.tagName === 'BUTTON'){
        const id = evt.target.getAttribute('data-id');
    db.collection('todo').doc(id).delete();
    };
});








