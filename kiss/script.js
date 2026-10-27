const now = new Date();
const darkHour = 18;
const lightHour = 7;
if (now.getHours() > darkHour || now.getHours() < lightHour) {
    document.getElementById('postcard').src = "street2.png";
    document.getElementById('picture').style.backgroundColor = '#112233';
} else {
    document.getElementById('postcard').src = ('park.png');
    document.getElementById('picture').style.backgroundColor = '#antiquewhite';
}