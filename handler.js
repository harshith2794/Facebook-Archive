var DEBUG=true;
var mobj, local={};
var flag=0;

$(document).ready( function() {fetchitems();
});
	
	
function fetchitems()
{
	console.log('begin');
	var items = $("._5pcr");
	$(items).addClass("archive_add");

	var i=0;
	//console.log(items.length);
	for (i=0; i<items.length; i++)
		addArchiveOption(items[i]);
	var items= $("._5pax");
	$(items).addClass("archive_add");
	for (i=0; i<items.length; i++)
		addArchiveOption(items[i]);
}

function addArchiveOption(ele){
	console.log('start');
	var link='https://www.facebook.com';
	var hlink=String($(ele).find("._5pcq").attr("href"));
	if(hlink.split('/')[0]!='https:')
	{

		//console.log('match https'+hlink);
		link=link.concat(hlink);
		//console.log(link);

	}
	else
		link=hlink;
	
		var title = $(ele).find('span.fwb').find('a').eq(0).text();
	
		console.log(hlink);
	if (hlink == '#' || hlink==null){

		hlink = $(ele).find("a._5dec").attr("href");
		console.log("in "+hlink)
		link=hlink;
		if(hlink== null)
		link=$(ele).find("._5pcj").attr("href");

		}

	var text=null;
		
	text=$(ele).find(".userContent").text();
	text=text.substring(0,30);
	text=text+'...';
	$(ele).addClass("archive_add");

	 // var url_encoded_url = encodeURIComponent(tab && tab.url);
	 // chrome.browserAction.onClicked.addListener(function(tab) {
	 // console.log(tab.url);
	 // console.log('found url');
	 //  });

	chrome.storage.sync.get( null, function (items)
	{
		//console.length(items.length)
		for (var i in items) {
			//console.log(items[i]['href']+" "+ link);
			if (items[i]['href']==link)			
			{
				console.log('found');
				if(flag==1 && (local[link]==null || local[link]=="Archive"))
				{
					console.log('inside');

					local[link]=1;
				  add = "<span> • </span><span><a href='#' title='"+title+"'hreff='" + link + "' text='"+text+"' class='archived'>Added to Archive List</a></span>";
				 
					//{
						//console.log("match");
				 		 $(ele).find("form").find("._5pcp").append(add);
				 		 return;
				 	//}
				 } 

				if(flag==0)
				{
					flag=1;
					local[link]=1;   
		   		    add = "<span> • </span><span><a href='#' title='"+title+"' hreff='" + link + "' text='"+text+"' class='archived'>Added to Archive List</a></span>"
				  $(ele).find("form").find("._5pcp").append(add);
				  return;

			    }
			}
		}
				

			if(flag==1 && local[link]==null)
			{

				local[link]=1;
				add = "<span> • </span><span><a href='#' title='"+title+"' hreff='" + link + "' text='"+text+"' class='archived' >Archive</a></span>"
				console.log(title);
				var check= String($(ele).find("._5pcp").find('span.archived').text());
				if(check=="")
				{
						//console.log("afch");

					//$(ele).find("form").find("._5pcp").append(add);
					$(ele).find("form").find("._5pcp").append(add);
					
				}
				else
					console.log(check);

			}
			if(flag==0)
			{
				flag=1;
				local[link]=1;
				add = "<span> • </span><span><a href='#' title='"+title+"' hreff='" + link + "' text='"+text+"' class='archived' >Archive</a></span>"
				console.log(title);
				var check= String($(ele).find("._5pcp").find('span.archived').text());
				if(check=="")
				{
						console.log("afch");

					//$(ele).find("form").find("._5pcp").append(add);
					$(ele).find("form").find("._5pcp").append(add);
					
				}
				else
					console.log(check);	 
			}	
		//}
});



			
}

	
$(document).on("DOMNodeInserted","._5pcr:not(.archive_add)",function(){
	
		addArchiveOption(this);
		//console.log("added");
});


$(document).on("click", ".archived", function(event) {
	//console.log('sdfsdf');
	flag=1;
	var href = $(this).attr('hreff');
	var tit = $(this).attr('title');
	var text = $(this).attr('text');
	var mobj = {};
	var vals = {};
	vals['title'] = tit;
	vals['href'] = href;
	vals['text'] = text;
	
	mobj[vals['href']]=vals;
	chrome.storage.sync.set(mobj);
	$(this).text("Added to Archive List");

});
	


//console.log(text);
	//console.log('enter');
	//var tit = $(ele).find(".board_item_title").find("a").text();
	// chrome.storage.sync.get( null, function (items)
	// {
	// 	for(k in items)
	// 	{
	// 		if(items[k]['href']==link)
	// 		{
	// 			$(ele).addClass("archive_add");
	// 			console.log('found');

	// 		  add = "<span> • </span><span><a href='#' title='"+title+"' hreff='" + link + "' text='"+text+"' class='archived'>Added to Archive List</a></span>"
	// 		  var check= String($(ele).find("._5pcp").find('span.archived').text());
	// 			if(check=="")
	// 			{
	// 				console.log("match");
	// 		 		 $(ele).find("form").find("._5pcp").append(add);
	// 		 	}
	// 		     return;
	// 		}
	// 	}
	// 		{
				
			// }	
			// else{