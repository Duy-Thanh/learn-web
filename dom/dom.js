// var alltitle = document.getElementsByTagName('h1')

// console.log(alltitle)
// console.log("Do dai cua alltitle la:" +alltitle.length)
// for(var i = 0;i<alltitle.length;i++){
//     console.log(alltitle[i].textContent)
// }

// var title = document.getElementsByClassName("title")
// console.log(title)
// console.log(title.length)

// const bochon = document.querySelectorAll('h1')
// // bochon[3].className = "so3"
// // bochon[3].id = "hello"
// // console.log(bochon[3])
// // bochon[3].innerHTML = "Toi la javascript"
// for(var i = 0;i<bochon.length;i++){
//     bochon[i].setAttribute('class', 'cinchao')
// }
// console.log(bochon)
// bochon.forEach((bochon, i )=>{
//     bochon.style.fontSize = "24px"
//     if(i%2==0){
//         bochon.style.color = 'red'
//     }
// })
function submit() {
    var a = document.getElementById("input_firstname").value
    var b = document.getElementById("input_lastname").value
    // var e = document.getElementById("input_gender")
    // var giatri = e.options[e.selectedIndex].text;
    var gender = document.querySelector('input[name="gender"]:checked').value
    var day = document.getElementById("day")
    var month = document.getElementById("month")
    var year = document.getElementById("year")
    var giatri = day.options[day.selectedIndex].text + "/" + month.options[month.selectedIndex].text + "/" + year.options[year.selectedIndex].text;
    // e.options[e.selectedIndex].text
    var sothich = document.getElementsByName("sothich")
    var bien1 = []

    for(var i = 0; i<sothich.length; i++){
        if(sothich[i].checked){
            bien1.push(sothich[i].value)
        }
    }



    var thongbao = "Thong tin cua ban:" + "\n"
    thongbao += "Firstname: " + a + "\n"
    thongbao += "Lastname: " + b + "\n"
    thongbao += "Gender: " + gender + "\n"
    thongbao += "Birthday: " + giatri + "\n"
    thongbao += "Hobby: " + bien1 + "\n"
    alert(thongbao)
}



//1. lấy gia tri tu text
//2. lấy giá trị tư thẻ select
//3. lấy giá trị tự radio
//4. lay gia tri tu checkbox