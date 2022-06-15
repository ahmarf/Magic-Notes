showNotes(); //takke page reload hone ke saath hi notes display hojaye

//If a user adds a note, add it to local storage

let addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', func1);

function func1() {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = []; // notes if null toh array blank kardi ha
    } else {
        notesObj = JSON.parse(notes); //notes array ke andar store hojaye gye if not null.
    }
    notesObj.push(addTxt.value); //addTxt ko notes me push kardya ha
    localStorage.setItem('notes', JSON.stringify(notesObj)); //localStorage ko update kardya aur stringify se notes array se string me convert 
    addTxt.value = ""; // takke baad me text area blank hojaye likha ka likha na rah jye

    showNotes();
}

//function to show notes from local storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element,index)
     {
        html += `
        <div class=" noteCard my-2 mx-2 card" style="width: 18rem;">

        <div class="card-body">
          <h5 class="card-title">Note ${index+1}</h5>
          <p class="card-text">${element}</p>
          <button id ="${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>
      `;
    });

    let notesElement = document.getElementById('notes');
    if(notesObj.length  != 0)
    {
        notesElement.innerHTML= html;
    }
    else
    {
        notesElement.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }

}

//function to delete note
function deleteNote(index)    //index ki base per delete kare ga
{
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1); //aik element remove hojaye ga
    localStorage.setItem('notes', JSON.stringify(notesObj)); //local storage ko update
    showNotes();  //shownotes ko dubara call karo ga
}

//search
let search = document.getElementById('searchTxt');
search.addEventListener('input' , function()
{
    let inputVal = search.value.toLowerCase();  //so at search time it can search by lowercase
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element)   //sare notecards get karlye
    {         
        let CardTxt = element.getElementsByTagName('p')[0].innerText;    //un ke paragraphs ka content Cardtxt me save kardya  -- innertext takke string me mile aur neeche usye include kya ja sakhe
        if(CardTxt.includes(inputVal))
        {
            element.style.display = "block";
        }
        else
        {
            element.style.display = "none";
        }
    });
}); 
