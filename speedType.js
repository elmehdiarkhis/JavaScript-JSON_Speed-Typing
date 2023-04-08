var timer=document.querySelector(".timer");
var textarea = document.querySelector("textarea");

var text = document.querySelector(".box p");

var button = document.querySelector("button");

var url = 'http://staging.quotable.io/random';
var erreur;





function GetQuote(){
    return fetch(url).then(response=> response.json() ).then(data =>{

        let counter=1;
        let score = setInterval(() => {
            timer.textContent= counter++;
        }, 1000);

        var quote = (data.content).toLowerCase();

         //clear the input
         textarea.value=null;
        //set the text to zero to split>span.
        text.textContent = "";
        

        //tranfrom to spans to style after
        var quoteCharArray = quote.split('');

        quoteCharArray[0]=quoteCharArray[0].toLowerCase();
       

        quoteCharArray.forEach(char => {
            var charSpan = document.createElement('span');
            charSpan.textContent= char;

            text.appendChild(charSpan);

        });

        var Spans = Array.from(document.querySelectorAll(".box p span"));

        

        //tap:
        let exactKeyCounter=0;
        var keyArray=[];
        textarea.addEventListener("keyup",e=>{   

           

            

            if ( (e.key==quoteCharArray[exactKeyCounter]) && (quote.slice(0,exactKeyCounter+1)==textarea.value) ) {
                exactKeyCounter++;
                keyArray[exactKeyCounter-1]=e.key;

                Spans[exactKeyCounter-1].classList.remove("incorrect");
                Spans[exactKeyCounter-1].classList.add("correct");
               
            }else{
                Spans[exactKeyCounter].classList.remove("correct");
                Spans[exactKeyCounter].classList.add("incorrect");
            }


   
            if(keyArray.length>=quoteCharArray.length){
                console.log("mehdi");
                clearInterval(score);
                GetQuote();
            }

        })
        
        


        

        


       
       
    });
}

GetQuote();












