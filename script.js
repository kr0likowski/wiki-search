var pageArray=[];
var pageid=[];
$(document).ready(function(){
    var helper=0;

    $('#random').click(function(){    window.open("https://en.wikipedia.org/wiki/Special:Random");
    });
    $('#search').click(function(){
        var txt=$('#textinput').val();
        var wikiurl='https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+txt+'&callback=JSON_CALLBACK';
        if(txt){
        $.ajax( {
        url: wikiurl,
        dataType: 'jsonp',
        type: 'GET',
        headers: { 'Api-User-Agent': 'kr0lik' },
        success: function(data) {
            $('#list').empty();
            console.log('succeed');
            var pages = data.query.pages;
            $.each(pages,function(index,page){
                pageArray[helper]=page.title;
                pageid[helper]=page.pageid;
                fullpage=$('<a href="#" class="list-group-item list-group-item-action" onClick="handlelink(this.id)">'+page.title+'<a/>').attr('id',helper);

                $('#list').append(fullpage);
                 helper++;
                });
            console.log(pages);
            helper=0;

        }
    });
        }
        else {
            alert('You cant search nothing');
        }

    });
});
function handlelink(data){
    var currPageId=pageid[data];
    window.open('https://en.wikipedia.org/?curid='+currPageId);
}