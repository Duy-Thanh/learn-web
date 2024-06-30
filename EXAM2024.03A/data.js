function submit(){
    var ma = document.getElementById("ma").value 
    var name = document.getElementById('name').value 
    var start = document.getElementById("start").value 
    var end = document.getElementById("end").value

    // var checkdate = /(0|1|2|3)+([0-9]{1})/

    if(ma=="" || name==""|| start==""|| end==""){
        alert("Bạn không được bỏ trống thông tin")
    }
    else if(name.length>5){
        alert("Ten khóa học không được quá 50 kí tự")
    }
    // else if((!start.match(chackdate)) || (!end.match(checkdate))){
    //     alert("Ngày không hợp lệ")
    // }
    else{
        var thongbao = "Thông tin khóa học " + "\n"
        thongbao += "Mã khóa học: " + ma + "\n"
        thongbao += "Tên khóa học: " + name + "\n"
        thongbao += "Ngày bắt đầu: " + start + "\n"
        thongbao += "Ngày kết thúc: " + end + "\n"

    alert(thongbao)
    }
}

var json = [{
    "Mã khóa học" : "CCNA",
    "Tên khóa học" : "Khóa học Triển khai và Quản trị giải pháp Ciso",
    "Ngày bắt đầu" : "31/03/2004",
    "Ngày kết thúc" : "31/06/2004"
},
{
    "Mã khóa học" : "CCNP",
    "Tên khóa học" : "Khóa học quản trị mạng Ciso",
    "Ngày bắt đầu" : "02/04/2024",
    "Ngày kết thúc" : "05/07/2024"
},
{
    "Mã khóa học" : "MCSA",
    "Tên khóa học" : "  QUẢN TRỊ HỆ THỐNG MCSA - AZURE",
    "Ngày bắt đầu" : "04/04/2024",
    "Ngày kết thúc" : "05/07/2024"
},
{
    "Mã khóa học" : "MCSE",
    "Tên khóa học" : "CHUYÊN GIA QUẢN TRỊ HỆ THỐNG MCSE",
    "Ngày bắt đầu" : "06/07/2024",
    "Ngày kết thúc" : "07/09/2024"
}
]
console.log(json)