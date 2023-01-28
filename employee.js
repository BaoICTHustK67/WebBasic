$(document).ready(function(){ // kiểm tra việc load trang đã hoàn thành hay chưa
    // gán sự kiện cho các element:
        initEvents();
        loadData();
   

    //Load dữ liệu:
})
var employeeId = null;
var formatMode = "add";
/* Load dữ liệu  lên table
Author: BaBao */
function loadData(){    
    fetch("https://cukcuk.manhnv.net/api/v1/Employees")
    .then(res => res.json())
    .then(res => {
        $("table#tbEmployeeList tbody").empty();
        //Xử lý dữ liệu từng đối tượng:
        let ths = $("table#tbEmployeeList thead th");
        // duyệt từng hàng
        for(const emp of res){
            // tạo hàng
            var  trElement = $(`<tr></tr>`);
            // duyệt từng cột trong tiêu đề:
            for (const th of ths){
                // Lấy ra propValue tương ứng với các cột: 
                const propValue = $(th).attr("propValue");
                // Lấy  giá trị tương ứng với tên của propValue trong đối tượng:
                let value = emp[propValue];
                let classAlign = "" ;
                switch(propValue){
                    case "DateOfBirth":
                        value = formateDate(value);
                        classAlign = "text-align--center";
                        break;
                    case "IdentityDate":
                        value = formatIdentityDate(value);
                        break;
                    case "WorkStatus":
                        value = formatWorkStautus(value);
                        break;
                    case "Salary":
                        value = Math.round(Math.random(100)*100000);
                        value = formatMoney(value);
                        classAlign = "text-align--right";
                        break;
                    default:
                        break;

                }
                // Tạo thHtml:
                let thHtml = `<td class = '${classAlign}'>${value||""}</td>`;

                //Đẩy vào trHtml
                trElement.append(thHtml);
            } 
            $(trElement).data("id", emp.EmployeeId);
            $(trElement).data("entity", emp);
            $("table#tbEmployeeList tbody").append(trElement);
   /*          //lấy các thông tin cần thiết
            const employeeCode = emp.EmployeeCode;
            const fullName = emp.FullName;
            //Thông tin ngày sinh
            //Định dạng lại ngày sinh
            let dateOfBirth = emp.DateOfBirth;
            dateOfBirth = formateDate(dateOfBirth);
            const identityNumber = emp.IdentityNumber;
            let identityDate = emp.IdentityDate;
                identityDate = formatIdentityDate(identityDate);
            const identityPlace = emp.IdentityPlace;
            const genderName = emp.GenderName;
            const email = emp.Email;
            const phoneNumber = emp.PhoneNumber;
            const departmentName = emp.DepartmentName;
            const positionName = emp.PositionName;
            //Tiền lương
            let salary = Math.round(Math.random(100) * 1000000);
            //Định dạng hiển thị tiền:
            salary = formatMoney(salary);
            let workStatus = emp.WorkStatus;
            switch(workStatus){
                case 1: 
                        workStatus = " Đang làm việc ";
                        break;
                 default:
                    workStatus = "";
                    break;
            }
 */
             //Build thành các tr HTML tương ứng
           /*  let trHtml = `<tr>
                            <td>${employeeCode}</td>
                            <td>${fullName||''}</td>
                            <td>${genderName||''}</td>
                            <td>${dateOfBirth||""}</td>
                            <td>${phoneNumber||""}</td>
                            <td>${email||""}</td>
                            <td>${identityNumber||""}</td>    
                            <td>${identityDate||""}</td>    
                            <td>${identityPlace||""}</td>                                
                            <td>${positionName||''}</td>
                            <td>${departmentName||""}</td>
                            <td>${salary||""}</td>
                            <td>${workStatus||""}</td>
                            </tr>`;
             // Thực hiện append vào các tr HTML vào tbody của table:
             $("table#tbEmployeeList tbody").append(trHtml); */
        };
    })
    .catch(res => {
        console.log(res);
    })
}

/**Date: 24/1/2023
 * Author :HBBAO()
 * @param {workStatus} WorkStatus 
 * @returns 
 */
function formatWorkStautus(workStatus){
    try{
        if(workStatus === 1){
            return "Đang làm việc"
        }
        else
            return "";

    } catch(error){
        console.log(error);
    }
}
/* định dạng hiển thị ngày tháng năm
    Author: BaBao
    @param {Date} date
23/1/2023 */
function formateDate(date){
    try {
        if(date){
            date = new Date(date);
            //Lấy ra ngày:
            dateValue = date.getDate();
            dateValue = dateValue < 10 ? `0${dateValue}` : dateValue;
            //Lấy ra tháng:
            let month = date.getMonth()+1;
            month = month < 10 ? `0${month}` : month;
            //Lấy ra năm:
            let year = date.getFullYear();

            return `${dateValue}/${month}/${year}`;
        }else{
            return "";
        }
       
     } catch(error) {
        console.log(error);
    }
}
/**Tạo các sự kiện
 * Author: HBBAO()
 * @param {Number} money
 */
function formatMoney(money){
    try {
        money = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND'}).format(money);
    return money;
    } catch(error){
        console.log(error);
    }
}

/**Tạo sự kiện
 * Author: HBBAO()
 * @param {Date} identityDate
 */

function formatIdentityDate(identityDate){
    try{
        if(identityDate){
            identityDate = new Date(identityDate);
            //Lấy ra ngày 
            let Day = identityDate.getDate() ;
            Day = Day < 10 ? `0${Day}` : Day;
            //Lấy ra tháng
            let month = identityDate.getMonth()+1   ;
            month = month < 10 ? `0${month}` : month;
            //Lấy ra năm 
            let year = identityDate.getFullYear();
            return `${Day}/${month}/${year}`;
        }
       
    }catch(error){
        console.log(error);
    }
}
function initEvents(){
    $("#save-button").click(saveData);
    $(document).on('dblclick','table#tbEmployeeList tbody tr', function(){
        formatMode = "edit";
        //hiển thị form
        $(".dialog").show();
        //focus vào ô input đầu tiên
        $(".dialog input")[0].focus();
        //Binding dữ liệu với bản ghi vừa chọn:
        let data =$(this).data('entity');
        employeeId = $(this).data('id');
        $("#txtEmployeeCode").val(data.EmployeeCode);
        //Duyệt tất cả các input:
        let inputs = $("#dialog-content2 input, #dialog-content2 select, #dialog-content2 textarea");
        for(const input of inputs){
            //Đọc thông tin propValue
            const propValue = $(input).attr("propValue");
            //Gán giá trị cho input
            if(propValue){
                let value = data[propValue];
                input.value = value;
            }
         }
    });

    $(document).on('click','table#tbEmployeeList tbody tr',function(){
        //Xóa tất cả trạng thái được chọn của các dòng dữ liệu khác:
        $(this).siblings().removeClass('row-selected');
        // in đậm dòng được chọn    
        this.classList.add("row-selected");
    })
    //Gán sự kiện click cho button thêm mới nhân viên.
    var add = document.getElementById("add");
    add.addEventListener("click", function(){
        formatMode = "add";
        // addEventListener chỉ dùng cho một phần tử
        document.getElementById("dialog").style.display = "flex";
        $('input').val(null);
        $('textarea').val(null);
        //Lấy mã nhân viên mới:
        $.ajax({
            type: "GET",
            url: "https://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode",
            success: function(newEmployeeCode){
                $("#txtEmployeeCode").val(newEmployeeCode);
                $("#txtEmployeeCode").focus();
            } 

        });
    })

    $("#add").click(function(){
       //focus vào ô nhập liệu đầu tiên
       $('#dialog input')[0].focus();
    })
    //Nhấn close thì đóng cửa sổ thêm thành viên
   /*  var close=document.getElementById("dialog-close")
    close.addEventListener("click", function(){
        document.getElementById("dialog").style.display = "none";
    }) */

    $(".dialog-header-icon").click(function(){
        //con trỏ this trỏ đến đối tượng được tương tác hiện tại
       /*  this.parentElement.parentElement.style.display = "none"; */
        $(this).parents(".dialog").hide();
    })
   /*  $("#txtEmployeeCode").keydown(function(){
        /* var value = $("#txtEmployeeCode").value(); */
        /* var value = document.getElementById("txtEmployeeCode").value;
        if(value == ''){
            $("#txtEmployeeCode").addClass("input-error-2");
        }
        else{
            $("#txtEmployeeCode").removeClass("input-error-2");
        }
    }) */
   /*  $("#txtEmployeeCode").blur(function(){
        /* var value = $("#txtEmployeeCode").value(); */
        /* var value = document.getElementById("txtEmployeeCode").value;
        if(value == ''){
            $("#txtEmployeeCode").addClass("input-error-2");
            $("#txtEmployeeCode").attr('title',"Thông tin này không được phép để trống")
        }
        else{
            $("#txtEmployeeCode").removeClass("input-error-2");
            $("#txtEmployeeCode").removeAttr('title');
        }
    })  */ 
    $('input[inputbox]').blur(function(){
        //Lấy ra value
        var value=this.value;   
        //kiểm tra value:
        if(!value) {
            $(this).addClass("input-error-2");
            $(this).attr('title',"Thông tin này không được phép để trống")
        }
        else{
            $(this).removeClass("input-error-2");
            $(this).removeAttr('title');
        }
    })

    $('input[type=email]').blur(function(){
        //Kiểm tra bằng email
        var email = this.value;
        var isEmail = checkEmailFormat(email); // truyền email được nhập vào để ktra
        if(isEmail){
            $(this).attr('title',"Email đúng định dạng");
            $(this).removeAttr('title',"Email không đúng định dạng");
        }
        else{
            $(this).addClass("input-error-2");
            $(this).removeAttr('title',"Email đúng định dạng");
            $(this).attr('title',"Email không đúng định dạng");
        }

    })

    $('input[number]').blur(function(){
        var number = this.value;
        var isNumber = checkTeleNumber(number);
        if(!isNumber){
            $('input[number]').addClass("input-error-2");
            $('input[number]').attr('title',"Số điện thoại không hợp lệ");
        }
        else{
            $('input[number]').removeClass("input-error-2");
            $('input[number]').removeAttr('title',"Số điện thoại không hợp lệ");
            $('input[number]').attr('title',"Số điện thoại hợp lệ");
        }
    })

function saveData(){
    //Thu thập dữ liệu:
    let inputs = $("#dialog-content2 input, #dialog-content2 select, #dialog-content2 textarea");
    var employee = {} ;
    //Build Object: 
    for (const input of inputs){
        //đọc thông tin propValue
        const propValue = $(input).attr('propValue');
        //Lấy ra value:
        if(propValue){
            let value = input.value;
            employee[propValue] = value;
        }
    }
    console.log(employee);
    if(formatMode=="edit"){
        //Gọi api thực hiện cắt dữ liệu:
        try{
            $.ajax({
                type: "PUT",
                url: "https://cukcuk.manhnv.net/api/v1/Employees/" + employeeId,
                data: employee,
                dataType: "json",
                contentType: "application/json",
                success: function(response) {
                    alert("Sửa dữ liệu thành công!")
                    //load lại dữ liệu 
                    loadData();
                    //Ẩn form chi tiết 
                    $(".dialog").hide();
                }
        
            });
        } catch(error){
            console.log(error);
        }
       
    }
    else{
        //Gọi api thực hiện thêm dữ liệu:
        $.ajax({
            type: "POST",
            url: "https://cukcuk.manhnv.net/api/v1/Employees",
            data: employee,
            dataType: "json",
            contentType: "application/json",
            success: function(response) {
                alert("Thêm mới dữ liệu thành công!")
                //load lại dữ liệu 
                loadData();
                //Ẩn form chi tiết 
                $(".dialog").hide();
            }
    
        });
    }
    
    

    //Nhấn đúp chuột vào 1 dòng dữ liệu thì hiển thị form thông tin chi tiết nhân viên.

    //Nhấn button xóa thì hiển thị cảnh báo xóa.

    //Nhấn button Refresh thì load lại dữ liệu.
    //Thực hiện validate dữ liệu khi nhập liệu vào các ô input bắt buộc nhập

}

function checkEmailFormat(email){
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return email.match(re); // kiểm tra có đủ kí tự dc match không,
                            //nếu không trả về giá trị NULL
}

function checkTeleNumber(number){
    return number.match(/^[0-9]+$/);
}


//đối tượng trong javascript
var obj_JS = {
    EmployeeCode: "NV001",
    DateOfBirth: new Date(),
    getName: function(){

    },  
    Address: null,
}

// JSON Object

var obj=JSON = {
    "EmployeeCode" : "NV001",
    "FullName" : "Nguyễn Văn Mạnh",
    "DateOfBirth": "2020-10-10",
    "Address": null
}

}

//1.Tên của property phải nằm trong kí tự ""
//2. Không được chứa function
//3. Không được phép có dấu , ở property cuối cùng
//4. Không được nhận value là undified

//JSON String
//Là một chuỗi nhưng có qui tắc:
// VD: var jsonString = `{"EmployeeCode":"NV001","FullName":"Nguyễn Văn Mạnh","DateOfBirth":null}
