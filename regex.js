var urls = "https://www.hello.com/my_hello_domain/?red+3=204 HTTP://www.bobsburger.com/thank-you/hello(329)&&& https://www.hello.com/shop/sneakers/blue?9838202&red=20003 http://www.myname.com/index.html http://sub.domain.net/?param1=foo/";

//Splits the URLS by space(s) newline(s) and adds them to an array
var url_split = urls.split(/\s+/);

//Regex Will be added to this string
var regex_string = '';

try {

	url_split.forEach(el => {
		//Error Testing
		var url_check =	el.search(/(http|https):\/\/[\w-]+\.[\w-]+\.\w+/i);
		if (url_check == -1) throw "One or more URLS aren't a complete URL path. e.g. https://www.mywebsite.com -- Please include the full URL"; //-1 means there was no match, therefore no complete url

		//Cut domain out of url
		el = el.replace(/(http|https):\/\/[\w-]+\.[\w-]+\.\w+(\/)?/i, '/');	

		//If there is only a '/' is the url, that means there's no path. So don't make regex for it.
		if ( el.length == '1') return; 
		regex_string = regex_string.concat(el, '|');

	});

	//remove extra "|" from end of string
	regex_string = regex_string.slice(0, -1);

	//escape regex characters e.g. ? . + / ( ) [ ] 
	var adjustment = 0;
	[...regex_string].forEach((el, i) => {

		if (el.match(/[\?\.\+\/\(\)\[\]]/)) {
			regex_string = regex_string.slice(0, i + adjustment) + "\\" + regex_string.slice(i + adjustment);
			adjustment++;
		}

	});

	console.log(regex_string);

} catch(err) {
	console.log(`Error: ${err}`);
}


