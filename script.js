var i = 0;
var images = [];
var time = 4000;

images[0] = 'imgs/187818.jpg';
images[1] = 'imgs/187819.jpg';
images[2] = 'imgs/187820.jpg';
images[3] = 'imgs/187821.jpg';
images[4] = 'imgs/187822.jpg';

function changimg(){
    document.slide.src = images[i];

    if(i<images.length - 1){
        i++;
    }else{
        i = 0;
    }
    setTimeout("changimg()" , time);
}
window.onload = changimg;