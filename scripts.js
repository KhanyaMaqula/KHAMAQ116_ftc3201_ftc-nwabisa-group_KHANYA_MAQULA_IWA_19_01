/** 
- `listItems`: a variable that selects the element with a `data-list-items` attribute.
- `listActive`: a variable that selects the element with a `data-list-active` attribute.
- `close_btn`: a variable that selects the element with a `data-list-close` attribute.
- `listBlur`: a variable that selects the element with a `data-list-blur` attribute.
- `listImage`: a variable that selects the element with a `data-list-image` attribute.
- `listTitle`: a variable that selects the element with a `data-list-title` attribute.
- `listSubtitle`: a variable that selects the element with a `data-list-subtitle` attribute.
- `listDescription`: a variable that selects the element with a `data-list-description` attribute.
- `data_list_button`: a variable that selects the element with a `data-list-button` attribute. 
- `data_header_search`: a variable that selects the element with a `data-header-search` attribute. */

const listItems = document.querySelector('[data-list-items]');
const listActive = document.querySelector('[data-list-active]');
const close_btn = document.querySelector('[data-list-close]')
const listBlur = document.querySelector('[data-list-blur]');
const listImage = document.querySelector('[data-list-image]');
const listTitle = document.querySelector('[data-list-title]');
const listSubtitle = document.querySelector('[data-list-subtitle]');
const listDescription = document.querySelector('[data-list-description]');
const data_list_button = document.querySelector("[data-list-button]");
const data_header_search = document.querySelector("[data-header-search]")
const data_search_overlay = document.querySelector("[data-search-overlay]")
const btn_search_cancel = document.querySelector("[data-search-cancel]")
const searchButton = document.querySelector("button.overlay__button.overlay__button_primary[form='search']");
const search_form = document.querySelector("[data-search-form]")
const search_genres = document.querySelector("[data-search-genres]")
const search_authors = document.querySelector("[data-search-authors]")
const settings = document.querySelector("[data-settings-overlay]")
const header_settting = document.querySelector('[data-header-settings]')
const settings_cancel = document.querySelector('[data-settings-cancel]')
page = 1;

range = [0,1]
if (!books && !Array.isArray(books)) throw new Error('Source required') 
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

/**day object contains the light colors */
day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

/**night object contains the dark colors */
night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

fragment = document.createDocumentFragment()

/**extract_book contains array for the first 36 books */
const extract_book = books.slice(0, 36) 


const UpDateButton = () => {
    const remaining = books.length - (page * BOOKS_PER_PAGE);
    const remainingText = remaining > 0 ? `(${remaining})` : '';
    const buttonText = `Show more ${remainingText}`;
    
    data_list_button.disabled = !(remaining > 0);
    data_list_button.innerHTML = buttonText;
};



// createPreview Function, this functions will create a HTML structure for each preview
const createPreview = ({author, id, image, title}) => {
    element = document.createElement('button')
    element.classList = 'preview'
    element.setAttribute('data-preview', id)

    element.innerHTML = /* html*/  `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>`
    return element
}



//This a function that will create books previews and add to document
const createPreviewsList = (list)=>{
    list.map((book)=>{
        const {author, image, id, title } = book
        const preview = createPreview({
            author,
            id,
            image, 
            title
        })
        fragment.appendChild(preview)
    })
    listItems.appendChild(fragment)
    UpDateButton()
}

//Calling the CreatePreviews to show the first 36 books
createPreviewsList(extract_book)





/**Function that will create a drop-down for the search form */
const createDropdownFragment = (items, allOptionText) => {
    const fragment = document.createDocumentFragment()
    const allOption = document.createElement('option')
    allOption.value = 'any'
    allOption.innerText = allOptionText
    allOption.selected = true // set the default option
    fragment.appendChild(allOption)
  
    const itemArray = Object.entries(items)
  
    itemArray.map((item)=>{
        const option = document.createElement('option')
        option.value = item[0]
        option.innerText = item[1]
        fragment.appendChild(option)
    })
  
    return fragment
  }
  
  // Create Genres drop-down
const genresFragment = createDropdownFragment(genres, 'All Genres')
search_genres.appendChild(genresFragment)
  
// Create Authors drop-down
const authorsFragment = createDropdownFragment(authors, 'All Authors')
search_authors.appendChild(authorsFragment)
    
  
  
  
  
  



/*data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' : 'day' //The iternary operation uses : instead of |

//documentElement.style.setProperty('--color-dark', css[v].dark);
//documentElement.style.setProperty('--color-light', css[v].light);


/**Create function that will update the showMore button when it is clicked */


  



btn_search_cancel.addEventListener("click", ()=>{
    data_search_overlay.open = false 
}) 

settings_cancel.addEventListener("click", ()=>{
    settings.open = false
})
/*data-settings-form.submit() { actions.settings.submit }*/

//Open setting overlay 

header_settting.addEventListener("click", ()=>{
    settings.open = true
})

// EventListener handling when button is closed
close_btn.addEventListener("click", ()=>{
    listActive.open = false
})


//Event Handler when the show more button is clicked
data_list_button.addEventListener("click", ()=> {
    const start_index = page * BOOKS_PER_PAGE
    const end_index =(page +1 ) * BOOKS_PER_PAGE
    createPreviewsFragment(start_index,end_index)
});


// Create new Previews when the showMore Button is pressed
const createPreviewsFragment = (previousNumOfBooks, newNumberOfBooks ) => {
    const new_extract_book = books.slice(previousNumOfBooks, newNumberOfBooks)
    page = page + 1
    createPreviewsList(new_extract_book)
}

data_header_search.addEventListener("click", ()=>{
    data_search_overlay.open = true ;
}) 
    


searchButton.addEventListener("click",(event) => {
    event.preventDefault()
    const formData = new FormData(search_form)
    const title = formData.get('title')
    const author = formData.get('author')
    const genre = formData.get('genre')
    let result = []
    if ((author !== "any" || genre !== "any") && title.trim() !== "") {
        // Filter by title, author, and genre
        result = books.filter((book) => {
          return book.title.toLowerCase().includes(title.toLowerCase()) &&
            book.author === author &&
            book.genres.includes(genre);
        });
      } else if (author !== "any" && genre !== "any") {
        // Filter by author and genre only
        result = books.filter((book) => {
          return book.author === author &&
            book.genres.includes(genre);
        });
      } else if (author !== "any") {
        // Filter by author only
        result = books.filter((book) => {
          return book.author === author;
        });
      } else if (genre !== "any") {
        // Filter by genre only
        result = books.filter((book) => {
          return book.genres.includes(genre);
        });
      } else {
        // Filter by title only
        result = books.filter((book) => {
          return book.title.toLowerCase().includes(title.toLowerCase());
        });
      }
       
    

    /*for (book; booksList; i++) {
        titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
        authorMatch = filters.author = 'any' || book.author === filters.author

        {
            genreMatch = filters.genre = 'any'
            for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
        }

        if titleMatch && authorMatch && genreMatch => result.push(book)
    }*/

  /*  if display.length < 1 
    data-list-message.class.add('list__message_show')
    else data-list-message.class.remove('list__message_show')*/
    

    listItems.innerHTML = ''
    const fragment = document.createDocumentFragment()
    //const extracted = source.slice(range[0], range[1])
    
  
    result.map((book)=> {
        const { author: authorId, id, image, title } = book
        element = document.createElement('button')
        element.classList = 'preview'
       element.setAttribute('data-preview', id)
        element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `
        fragment.appendChild(element)   
    });
    data_search_overlay.open = false ;
    listItems.appendChild(fragment)
    

    window.scrollTo({ top: 0, behavior: 'smooth' });
    
});

settings.addEventListener("submit",(event)=>{
    event.preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
   // console.log(result.theme)
    if (result.theme === "day") {
        document.documentElement.style.setProperty('--color-light', `css${result.theme}.light`);
    }
    else if (result.theme === 'night'){
        document.documentElement.style.setProperty('--color-dark', `css${result.theme}.light`)
    }
   
    settings.open === false
})


/** An event listener to handle if a book preview has been clicked */
listItems.addEventListener("click", (event)=> {
  
    /**pathArray shows all the dom elements that event passed from target to root */
    pathArray = Array.from(event.path || event.composedPath())

    /**active will store the book object */
    let active;

    for (const node of pathArray) {

        /**previewId stores the id of the book preview */
        const previewId = node?.dataset?.preview

        if (active){
            break;
        } 
        
        /**iterating over the books object */
        for (let singleBook of books) {

            if (singleBook.id === previewId) {

                /**When the Singlebook.id  is equal to the previewId, we will set the singleBook 
                 * object to active
                */
                active = singleBook
            } 
        } 
    }
    
    if (!active) return

    
   
    
    listActive.setAttribute('open', 'true');
    listBlur.setAttribute('src', active.image);
    listImage.setAttribute('src', active.image);
    listTitle.textContent = active.title;  //Setting the listTitle textContent to the title in active.title

   
   
    //Convert string format date to Date Object
    const publishDate = new Date(active.published)
    listSubtitle.textContent = `${authors[active.author]} (${publishDate.getFullYear()})`;
    
    
    listDescription.textContent = active.description;
});
