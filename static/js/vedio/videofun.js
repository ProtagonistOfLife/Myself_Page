//通过使用dplayer播放视频，目前实验暂时只能播放mp4格式文件
function dplayshow(mp4_url){
	var dp = new DPlayer({
	    container: document.getElementById('dplayer'),
	    screenshot: true,
	    video: {
//	        url: mp4_url,
	    	quality: [{
	            name: '高清',
	            url: mp4_url,
	            type: 'normal'
	        }, {
	            name: '标清',
	            url: mp4_url,
	            type: "hls"
	        }],
	        defaultQuality: 0,
	        pic: 'demo.jpg',
	        thumbnails: 'thumbnails.jpg'
	    }
	});
}