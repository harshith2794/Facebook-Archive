var DEBUG=true;
$(document).ready( function() 
{

	chrome.storage.sync.get( null, function (items)
	{

		$(".list").html("");
		$(".list").append("<table></table>")
		console.log('created table');
		var i=0;
		for (var k in items)
		{
			var id,href,title;
			text = items[k]['text'];
			title = items[k]['title'];
			href= items[k]['href'];
			var tableentry = $(".list > table");
			// if(text)
			// 	tableentry.append("<tr><td><a target='_blank' href='" + href + "' >" + title: +text+"</a></td><td><a href='#'><img src='delete.png' alt='DELETE' id='picture' /></a></td></tr>");
			// else

			tableentry.append("<tr class='footer'><td ><a target='_blank' href='" + href + "' >"+title+"<div style='color:black'>"+text+"</div></a></td><td><a href='#'><img src='delete.png' alt='DELETE' id='picture' /></a></td></tr>");
			tableentry.append("</hr>");
			i++;
		}
		if(i==0)
		{
			$(".list").html("");
			$(".list").append("<div class='default'>Archive list is empty!</div>");
		}

		$('.list').on('click', 'img' ,function(event)
		{
			var delRow=$(this).parent().parent().parent().eq(0);
			var url=delRow.children("td").eq(0).find("a").attr("href");
			chrome.storage.sync.remove(url);
			delRow.remove();
		 });



	});
	



$("#clr").click(function(){
		chrome.storage.sync.clear();
		$(".list").html("");
		$(".list").append("<div class='default'>Archive list is empty!</div>")
		updateList();
	});


});


	