let elUsersList = document.querySelector("#usersList")
let elPostsList = document.querySelector("#postList")
let elCommentsList = document.querySelector("#commentList")
let elUsersTemplate = document.querySelector("#usersTemplate").content
let elPostsTemplate = document.querySelector("#postsTemplate").content
let elCommentsTemplate = document.querySelector("#commentsTemplate").content
let elWrapper = document.querySelector("#wrapper")


fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => renderUsers(data))

function renderUsers(array) {
    let fragment = document.createDocumentFragment()

    for (let i = 0; i < array.length; i++) {
        let usersTemplate = elUsersTemplate.cloneNode(true)

        usersTemplate.querySelector("#userItem").dataset.userID = array[i].id
        usersTemplate.querySelector("#usersName").textContent = array[i].name
        usersTemplate.querySelector("#usersName").dataset.userID = array[i].id
        usersTemplate.querySelector("#usersUserName").textContent = array[i].username
        usersTemplate.querySelector("#usersUserName").dataset.userID = array[i].id
        usersTemplate.querySelector("#usersMail").textContent = array[i].email
        usersTemplate.querySelector("#usersMail").dataset.userID = array[i].id
        usersTemplate.querySelector("#usersMail").href = `mailTo: ${array[i].email}`
        usersTemplate.querySelector("#usersTel").textContent = array[i].phone
        usersTemplate.querySelector("#usersTel").dataset.userID = array[i].id
        usersTemplate.querySelector("#usersTel").href = `tel: ${array[i].phone}`
        usersTemplate.querySelector("#usersWeb").textContent = array[i].website
        usersTemplate.querySelector("#usersWeb").dataset.userID = array[i].id
        usersTemplate.querySelector("#usersWeb").href = `${array[i].website}`

        fragment.appendChild(usersTemplate)
    }
    elUsersList.appendChild(fragment)
}

elWrapper.addEventListener("click" , function (evt) {
    let current = evt.target.dataset

    if (current.userID) {
        fetch(`https://jsonplaceholder.typicode.com/posts`)
            .then(res => res.json())
            .then(data => renderPost(data.filter(function (item) {
               return current.userID == item.userId
            })))
    }
    if (current.postId) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${current.postId}/comments`)
            .then(res => res.json())
            .then(data => renderComment(data))
    }
})


function renderPost(array) {
    elPostsList.innerHTML = null
    elCommentsList.innerHTML = null
    let fragment = document.createDocumentFragment()
    
    for (let i = 0; i < array.length; i++) {
        let postTemplate = elPostsTemplate.cloneNode(true)

        postTemplate.querySelector("#postItem").dataset.postId = array[i].id
        postTemplate.querySelector("#postsTitle").textContent = array[i].title
        postTemplate.querySelector("#postsTitle").dataset.postId = array[i].id
        postTemplate.querySelector("#postsBody").textContent = array[i].body
        postTemplate.querySelector("#postsBody").dataset.postId = array[i].id

        fragment.appendChild(postTemplate)
    }
    elPostsList.appendChild(fragment)
}

function renderComment(array) {
    elCommentsList.innerHTML = null
    let fragment = document.createDocumentFragment()
    
    for (let i = 0; i < array.length; i++) {
        let commentsTemplate = elCommentsTemplate.cloneNode(true)

        commentsTemplate.querySelector("#commentItem").dataset.commentsId = array[i].id
        commentsTemplate.querySelector("#commentsName").textContent = array[i].name
        commentsTemplate.querySelector("#commentsName").dataset.commentsId = array[i].id
        commentsTemplate.querySelector("#commentsMail").textContent = array[i].email
        commentsTemplate.querySelector("#commentsMail").href = `mailTo: ${array[i].email}`
        commentsTemplate.querySelector("#commentsMail").dataset.commentsId = array[i].id
        commentsTemplate.querySelector("#commentsBody").textContent = array[i].body
        commentsTemplate.querySelector("#commentsBody").dataset.commentsId = array[i].id

        fragment.appendChild(commentsTemplate)
    }
    elCommentsList.appendChild(fragment)
}