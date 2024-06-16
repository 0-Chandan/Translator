let selectTag = document.querySelectorAll("select");
let translatebtn = document.querySelector(".transbtn");
let fromText = document.querySelector(".inptext")
let ToText = document.querySelector(".inptranslat");
let Exchange = document.querySelector(".exchange");
let icons =  document.querySelectorAll(".icon");
 for(select of selectTag){
   for(const country_code in countries)
    {
        console.log(country_code);
        /**let option=`<option vlaue="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend",option);**/
        let option = document.createElement("option");
        option.innerText=countries[country_code];
        option.value =country_code;
        if(select.name==="from"&& country_code==="en-GB"){
            option.selected="selected";
        }
        else if(select.name==="to"&& country_code==="hi-IN")
            {
                option.selected="selected";
            }
        select.append(option);
    }
};
translatebtn.addEventListener("click",async()=>{
    let text = fromText.value;
    let translatefrom = selectTag[0].value;
    let translateto = selectTag[1].value;
    console.log(text,translatefrom,translateto);
    let API_URL =`https://api.mymemory.translated.net/get?q=${text}!&langpair=${translatefrom}|${translateto}`
    let data = await fetch(API_URL).then(res=>res.json());
    console.log(data.responseData.translatedText);
    ToText.value=data.responseData.translatedText;
  
});
 
Exchange.addEventListener("click",()=>{
let temptext = fromText.value;
    fromText.value=ToText.value ;
    ToText.value = temptext;
let tempLang = selectTag[0].value;
selectTag[0].value= selectTag[1].value;
selectTag[1].value = tempLang;

})

icons.forEach(icon=>{
    icon.addEventListener("click",({target})=>{
       console.log(target)
       if(target.classList.contains("fa-copy"))
        {
       if(target.id=="from")
        {
            navigator.clipboard.writeText(fromText.value);
        }else{
            navigator.clipboard.writeText(ToText.value);
        }
    }else if(target.classList.contains("fa-volume-high")){
        let utterance;
        if(target.id=="from2"){
            utterance = new SpeechSynthesisUtterance(fromText.value);
            utterance.lang=selectTag[0].value;
            speechSynthesis.speak(utterance);
        }
        else{
            utterance = new SpeechSynthesisUtterance(ToText.value);
            utterance.lang=selectTag[1].value;
            speechSynthesis.speak(utterance);
        }
        
    }
    });
});
