//Data model
class CommentDataModel {
    constructor(type) {
        this.type = type;
        this.comments = readFromLS(this.type) || [];
    }


//used the idea from the solution page to combine GetAll() and FilterByName()
getComments(j = null) {
    if (j === null) {
        //from what I understand this simply grabs all comments from the page
        return this.comments;
    } else {
        //this is where we filter by name input from the user
        return this.comments.filter(el => el.name === j);
    }
}

//Allows a user to add a comment to the page
addComment(postName, comment) {
const addComment = {
    name: postName,
    comment: comment, 
    date: newDate()
};
    this.comments.push(addComment);
    writeToList(this.type, this.comments);
}
}

//writing to a local file storage
function writeToList(key, data) {
    window.localStorage.setItem(key, JSON.stringify(date));
}

//reading the local storage
function readFromList(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

//Creating the HTML outputs for the UI. 
//This is where I struggled the most. I kept trying to find ways to cleverly include the HTML into the app.

const commentUI = <div class="addComment">
                  <h2>Add a comment</h2>
                  <input type="text" id="commentEntry" />
                  <button id="commentSubmit">Comment</button>
                  </div>
                  <h2>Comments</h2>
                  <ul class="comments"></ul>;
                  
            function buildCommentList(element, comments) {
                //clear out screen of any comments prior to currrent
                element.innerHTML = '';
                comment.forEach(el => {
                    let item = document.createElement('li');
                    item.innerHTML = '${el.name}: ${el.comment}';
                    element.appendChild(item);
                });

            }

   // Comments: this code handles getting the list of comments from the data source, and outputting them to the screen at the right time.  This is often catagorized as Controller code.
   //I heavily used the example code for this portion
   class Comments {
       constructor(type, commentElementId) {
           this.type = type;
           this.commentElementId = commentElementId;
           this.model = new CommentDataModel(this.type);
       }

        addListenerSubmit(postName) {
            //element.ontouchend avoids more than one listener attacing at a time
            document.getElementById('commentSubmit').ontouchend = () => {
                this.model.addComment(
                    postName,
                    document.getElementById('commentEntry').value = ''
                );
                document.getElementById('commentEntry').value = '';
                this.showCommentList(postName);
            };
        }   
        showCommentList(j = null) {
            try{
                const parent = document.getElementById(this.commentElementId);
                if (!parent) throw new Error('comment parent not found');
                if (parent.innerHTML === '') {
                    parent.innerHTML = commentUI;
                }
                if (j !==null) {
                    document.querySelector('.addComment').style.display = 'block';
                    this.addListenerSubmit(j);
                }
                else {
                    document.querySelector('.addComment').style.display = 'none';
                }
                //retrieve comments from the model
                let allComments = this.model.getComments(j);
                if (allComments === null) {
                    allComments = [];
                }
                renderCommentList(parent.lastChild, allComments);
            } catch (error) {
                console.log(error);
            }
        }
    }
   

    export default Comments;
   