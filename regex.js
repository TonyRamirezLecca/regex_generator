	/*
	 URL RegEx Generator
	 Created by Tony Ramirez
	 -----------------------------------------------------------
	 Paste all your urls seperated by white space and hit submit.
	 This code will generate RegEx to select all of your urls.
	 ------------------------------------------------------------
	 Helpful for Google Analytics, Google Optimize, GTM, and 
		other conversion trackers
	 */
console.log("RegEx Generator 1.0.0");

document.querySelector('.form_submit-btn').addEventListener('click', () => {
	event.preventDefault();
	//Get URLS from input
	var urls = document.querySelector('#url_input-area').value;
	//Splits the URLS by space(s) newline(s) and adds them to an array
	var url_split = urls.split(/\s+/);
	//RegEx will be added to this string
	var regex_string = '';
	//Boolean for if there is an empty element in the array
	var empty_element = false;

	//Begin error checking and generating RegEx
	try {
		//Counts Url

		url_split.forEach((el, i) => {
			//Error Testing
			var url_check =	el.search(/(http|https):\/\/[\w-]+\.[\w-]+\.\w+/i);
			if (url_check == -1)  { //-1 means there was no match, therefore no complete url.
				if (!el){
					empty_element = true; //Checks for empty array (The exception to this url_check)
				} 
				else {
					throw `One or more URLs aren't a complete URL path. -- Check URL number: ${i}`; 
				}
			}

			//Cut domain out of url
			el = el.replace(/(http|https):\/\/[\w-]+\.[\w-]+\.\w+(\/)?/i, '/');	

			//If there is only a '/' is the url, that means there's no path. So don't make regex for it.
			//if ( el.length == '1') return; 
			//COMMENTED OUT ^^^ LINE ABOVE BECAUSE IF THERE IS NO PATH THAT MEANS THEY WANT TO TARGET HOMEPAGE

			regex_string = regex_string.concat(el, '|');
		});

		//remove extra "|" from end of string
		regex_string = regex_string.slice(0, -1);
		//Delete 2 things off the end because of empty element bug
		if (empty_element) {
			regex_string = regex_string.slice(0, -1); 
		}

		//escape regex characters e.g. ? . + / ( ) [ ] 
		var adjustment = 0;
		[...regex_string].forEach((el, i) => {
			if (el.match(/[\?\.\+\/\(\)\[\]]/)) {
				regex_string = regex_string.slice(0, i + adjustment) + "\\" + regex_string.slice(i + adjustment);
				adjustment++;
			}
		});



		//Places regex text in output textarea
		document.querySelector('#url_output-area').value = regex_string;
		//Submit button turns green
		document.querySelector('#url_submit-btn').classList.add('submit_success-btn');
		document.querySelector('#url_submit-btn').setAttribute('value', 'Success');
		//Removes Error Class
		document.querySelector('#url_submit-btn').classList.remove('submit_error-btn');


	} catch(err) {
		//Places error text in output textarea
		document.querySelector('#url_output-area').value = err;
		//Submit button turns red 
		document.querySelector('#url_submit-btn').classList.add('submit_error-btn');
		document.querySelector('#url_submit-btn').setAttribute('value', 'Error');
		//Removes Success Class
		document.querySelector('#url_submit-btn').classList.remove('submit_success-btn');
	}
});


