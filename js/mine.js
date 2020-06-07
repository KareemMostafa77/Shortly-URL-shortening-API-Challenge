// Array Contain My All hash Links Id
let hashIds;
// string to view data on html page
let temp;


// to check local storage
if(window.localStorage.getItem('shortLinksData')==null)
    hashIds = new Array();
else
{
    hashIds=JSON.parse(window.localStorage.getItem('shortLinksData')).all;
    getShortLinkDetailes(hashIds);
}
    
// input foucs event
$('#shortLink').focus(function(){
    $('#message').removeClass('d-none');
    $('#links').slideDown();
});

//input blur event
$('#shortLink').blur(function(){
    $('#message').addClass('d-none');
    $('#links').slideUp();
});

//input key up event
$('#shortLink').keyup(function(){
    $('#message').addClass('d-none');
})

//function to make short link
$('#shortBtn').click(function(){
    let link = document.getElementById('shortLink').value;  
    if(link===undefined || link==='')
        alert('Sorry , You Must Type Link To Short It');
    else
    {
        $.post("https://rel.ink/api/links/",
        {
            url: link
        },
        function(data){
            document.getElementById('shortLink').value='';
            hashIds.push(data.hashid);
            let linksHashId = {
                all:hashIds
            }
            window.localStorage.setItem('shortLinksData',JSON.stringify(linksHashId));
            getShortLinkDetailes(hashIds);
        });
    }
});

//function to get short link data and view it
function getShortLinkDetailes(hashArray){
    temp='';
    for(let i=0;i<hashArray.length;i++){
        let url = 'https://rel.ink/api/links/'+hashArray[i];
        $.get(url, function(data){
           temp="<div class='row p-3 mb-5 d-flex justify-content-between align-items-center link'> <div class='col-12 col-md-4'> <div> <h6> "+data.url+"</h6> </div></div><hr> <div class='col-12 col-md-4'> <div> <span> https://relink/"+data.hashid+" </span> <button class='btn copyBtn my-2 my-sm-0' onClick=copyToClipboard('https://relink/"+data.hashid+"',"+i+") id='copyBtn"+i+"'>copy</button> </div></div></div>"
           $('#links').append(temp); 
        });
    }
    
    
}

//function to copy text to clipboard
const copyToClipboard = (str,id) => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
 };
