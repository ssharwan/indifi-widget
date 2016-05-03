

(function(){
	var options = {
	    user_name: indifi_widget.user_name || "",
	    password: indifi_widget.password || "",
	    token: indifi_widget.token || "",
	    client_id: indifi_widget.client_id || "",
	    submit_button_text: indifi_widget.submit_button_text || "Submit Now",
	    submit_button_css: indifi_widget.submit_button_css || ''
	};
	function init(){
		var wrapper = document.createElement('div');
		wrapper.setAttribute('id','indifi-widget');
		wrapper.setAttribute('style','position:fixed; bottom:0;right:5px; z-index:100000; background:#fff;-webkit-box-shadow: 0 0 2px 2px #D6D6D6;box-shadow: 0 0 2px 2px #D6D6D6;-webkit-border-radius: 5px 5px 0 0;border-radius: 5px 5px 0 0;');

		var collapsed_state_wrapper = document.createElement('div');
		collapsed_state_wrapper.setAttribute('style','height:30px; width:200px; display:block;background: #00a2da; color: #fff;cursor: pointer; text-align: center;padding:6px;-webkit-border-radius: 5px 5px 0 0;border-radius: 5px 5px 0 0;-webkit-box-shadow: 0 0 2px 2px #D6D6D6;box-shadow: 0 0 2px 2px #D6D6D6;');
		collapsed_state_wrapper.innerHTML = "Need Loan? Apply Here!";
		wrapper.appendChild(collapsed_state_wrapper);

		var open_state_wrapper = document.createElement('div');
		open_state_wrapper.setAttribute('style','height:334px; width:450px; display:none;');
		wrapper.appendChild(open_state_wrapper);

		var open_state_header = document.createElement('div');
		open_state_header.setAttribute('style','height: 30px;background: #00a2da; border-radius: 5px 5px 0px 0px;');
		open_state_wrapper.appendChild(open_state_header);


		var frame_wrapper = document.createElement('div');
		frame_wrapper.setAttribute('style','height:100%; width:100%;');
		var iframe = document.createElement('iframe');
		iframe.width = '100%';iframe.height = '100%';iframe.src = 'about:blank';
		iframe.setAttribute('style', 'border:none;')
		frame_wrapper.appendChild(iframe);

		
		open_state_wrapper.appendChild(frame_wrapper);

		document.body.appendChild(wrapper);

		var frame_content = '<!DOCTYPE html>'
		 + '<head><script type="text/javascript" src="indifi-widget/indifi_widget_content.js"></script>'
		 +'<script type="text/javascript">IndifiJS.Widget('+JSON.stringify(options)+');</script>'
		 +'</head>'
		 + '<body>'
		 '</body></html>';
		iframe.contentWindow.document.open('text/html','replace');
		iframe.contentWindow.document.write(frame_content);
		iframe.contentWindow.document.close();

		collapsed_state_wrapper.addEventListener('click', function(evt){
			collapsed_state_wrapper.style.display = 'none';
			open_state_wrapper.style.display = 'block';
		});
		
		var header_heading = document.createElement('div');
		header_heading.setAttribute('style','float: left;color: #fff;padding: 6px 20px;font-weight: bold;');
		header_heading.innerHTML = 'Apply for Loan';
		open_state_header.appendChild(header_heading);


		var minimizer = document.createElement('div');
		minimizer.setAttribute('style','float: right;margin-right: 10px;cursor: pointer;');
		minimizer.innerHTML = '<div title="Minimize" style="width:10%; float: right; -webkit-user-select: none;cursor: pointer;padding: 0px 10px 0px 0px;font-size: 24px;color: #fff;">−</div>';
		open_state_header.appendChild(minimizer);

		minimizer.addEventListener('click', function(evt){
			collapsed_state_wrapper.style.display = 'block';
			open_state_wrapper.style.display = 'none';
		});	
	}
	init();

})();

