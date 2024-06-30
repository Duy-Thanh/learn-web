function submit(){
    var name = document.getElementById("name").value 
    var email = document.getElementById('email').value 
    var add = document.getElementById("add").value 
    var phone = document.getElementById("phone").value

    var checkphone =  /((0)+([0-9]{9})\b)/

    if(name=="" || email==""|| add==""|| phone==""){
        alert("Ban khong duoc bo trong thong tin")
    }
    else if(!phone.match(checkphone)){
        alert("SDT khong hop le")
    }
    else{
        var thongbao = "Thong tin cua ban: " + "\n"
        thongbao += "Full Name: " + name + "\n"
        thongbao += "Email: " + email + "\n"
        thongbao += "ADD: " + add + "\n"
        thongbao += "Phone: " + phone + "\n"

    alert(thongbao)
    }
}


































// function submit(){
//     var input_name = document.getElementById('input_name').value
//     var email = document.getElementById('email').value
//     var add = document.getElementById('add').value
//     var phone = document.getElementById('phone').value

//     // var checkphone = /^\d{10}$/;
//     var checkphone = /((0)+([0-9]{9})\b)/;
    

//     if(input_name="" || email=="" || add=="" ||phone ==""){
//         alert("khong duoc bo trong")
//     }
//     else if(!phone.match(checkphone)){
//         alert("SDT ko hop le")
//     }
//     else{
//         var thongbao = "Thong tin ca nhan cua ban:" + "\n"
//     thongbao += "Full Name: " + input_name +"\n"
//     thongbao += "Email: " + email + "\n"
//     thongbao += "add: " + add  +"\n"
//     thongbao += "phone: "  + phone + "\n"

//     alert(thongbao)
//     }
// }