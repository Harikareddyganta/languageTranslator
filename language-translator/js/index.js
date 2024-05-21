const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selectTag = document.querySelectorAll("select");
const exchangeIcon = document.querySelector(".exchange");
translateBtn = document.querySelector("button");
icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected;
        if (id == 0 && country_code == "en-GB"){
            selected = "selected"
        }
        else if (id == 1 && country_code == "hi-IN"){
            selected = "selected"
        }
        //adding the options to the select tag
        //if the country code is equal to the default language, then it should be selected
        let option = ` <option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);

    }
});

console.log(toText + " " + fromText);

exchangeIcon.addEventListener("click", () => {
    //swapping the values of the two textareas
    let tempText = fromText.value;
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
})

translateBtn.addEventListener("click", () => {
    //getting the text to be translated
    //getting the language to translate from and to
    let text = fromText.value;
    translateFrom = selectTag[0].value;
    translateTo = selectTag[1].value;
    //if the text is empty, then return
    if (!text){
        return;
    }
    //setting the placeholder of the toText to "Translating.."
    toText.setAttribute("placeholder", "Translating..");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    //fetching the translation from the api
    //setting the value of the toText to the translated text
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "Translation");
    })
});

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        
            if (target.id == "from"){
                navigator.clipboard.writeText(fromText.value);
            }
            else{
                navigator.clipboard.writeText(toText.value);
            }
       
    });
});


