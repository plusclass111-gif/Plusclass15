let teachers=[
"اسماء بنت خلفان الغنبوصي","افراح بنت ناصر الغنبوصي","امنه بنت ناصر الغنبوصي",
"بدريه بنت راشد الغنبوصي","بدور بنت ناصر الغيلاني","تهانى بنت ناصر الغنبوصى",
"جميله بنت سالم الزرعي","خديجه بنت صالح الغنبوصي","رايه بنت على الغنبوصي",
"رايه بنت محمد الغنبوصي","رحاب بنت سالم الغنبوصي","رحمه بنت حمد الروتلي",
"رحمه بنت سعيد الحربي","رحمه بنت ناجم الغنبوصي","رحمة بنت ناجم الحربية",
"سارة بنت سالم الغنبوصي","ساره بنت صالح البلوشية","سالمه بنت خميس الغنبوصيه",
"سعاده بنت عبدالله الكاسبية","سكينه بنت جمعه الغيلاني","سليمه بنت سالم الغزالي",
"سليمه بنت عبدالله الغنبوصى","شغيله بنت سعيد العلوي","شهد بنت محمد الحربي",
"شيخه بنت صالح الغنبوصي","شيخه بنت على الغنبوصي","شيخه بنت مسلم الحربي",
"شيماء بنت ناصر الغنبوصى","طاهره بنت ناصر الغنبوصي","عائشه بنت سعيد الغزالية",
"عشيبه بنت مسعود الكاسبي","غاليه بنت علي الساعدي","فاطمه بنت ناصر الغنبوصي",
"مآثر بنت محمد الغنبوصي","مروه بنت راشد الغنبوصي","مريم بنت سالم الغيلاني",
"مريم بنت سالم الغنبوصي","مريم بنت علي الحربي","مريم بنت مسلم الغنبوصي",
"منال بنت سالم الغنبوصي","موزه بنت سعيد الغنبوصي","موزه بنت على الغنبوصي",
"نافجه بنت سالم الستمي","نصرى بنت صالح السنيدي","نعيمه بنت مصبح الساعدي",
"نوال بنت ناجم الغنبوصي","هاجر بنت ربيع الغنبوصيه","هاله بنت خلفان الغنبوصيه",
"هدى بنت على الغنبوصيه","وفاء بنت عبدالله الغنبوصيه","يسرا بنت على الغنبوصيه",
"أبرار بنت خلفان الغنبوصية","صالحه بنت سالم الغنبوصية","هيام بنت صالح العريمية",
"هدى بنت محمد الغنبوصيه","هيام بنت حمد الغنبوصية","وداد بنت عبدالله الغنبوصية",
"وضحى بنت ماجد الغنبوصية"
];

let bookings=[];
const teacherSelect=document.getElementById("teacher");
teachers.forEach(name=>{
    let option=document.createElement("option");
    option.textContent=name;
    teacherSelect.appendChild(option);
});

function showSection(id){
document.querySelectorAll(".section").forEach(sec=>sec.classList.remove("active"));
document.getElementById(id).classList.add("active");
updateSchedule();
renderBookings();
renderTeachersSimple();
renderPeriodSettings();
}

function updateSchedule(){
const box=document.getElementById("dailySchedule");
if(!box)return;
box.innerHTML="";
for(let i=1;i<=8;i++){
const div=document.createElement("div");
const booked=bookings.find(b=>b.period==i);
if(booked){div.className="booked";div.textContent=`الحصة ${i} 🔴 محجوز`;}
else{div.className="available";div.textContent=`الحصة ${i} 🟢 متاح`;}
box.appendChild(div);
}
}

document.getElementById("bookingForm").addEventListener("submit",e=>{
e.preventDefault();
const newBooking={
teacher:teacherSelect.value,
subject:document.getElementById("subject").value,
date:document.getElementById("date").value,
period:document.getElementById("period").value,
resource:document.getElementById("resource").value
};
bookings.push(newBooking);
alert("✅ تم تنفيذ الحجز بنجاح");
updateSchedule();
renderBookings();
renderPeriodSettings();
});

function renderBookings(){
const container=document.getElementById("bookingsList");
if(!container)return;
container.innerHTML="";
if(bookings.length===0){container.innerHTML="<p>لا توجد حجوزات بعد</p>";return;}
bookings.forEach((b,i)=>{
const div=document.createElement("div");
div.className="card";
div.innerHTML=`📅 ${b.date} | 👩‍🏫 ${b.teacher} | المادة: ${b.subject} | الحصة: ${b.period} | المصدر: ${b.resource} 
<button onclick="deleteBooking(${i})">❌ حذف</button>`;
container.appendChild(div);
});
}

function deleteBooking(i){
if(confirm("هل تريد حذف هذا الحجز؟")){
bookings.splice(i,1);
updateSchedule();
renderBookings();
renderPeriodSettings();
}
}

function handleTeacherAction(){
const action=document.getElementById("teacherAction").value;
const name=document.getElementById("teacherName").value.trim();
if(name===""){alert("الرجاء إدخال الاسم"); return;}
if(action==="add"){
if(confirm(`هل تريد إضافة المعلم/ة "${name}"؟`)){
teachers.push(name);
alert("تمت الإضافة بنجاح");
renderTeachersSimple();
updateTeacherSelect();
document.getElementById("teacherName").value="";
}
}else{
if(!teachers.includes(name)){alert("الاسم غير موجود"); return;}
if(confirm(`هل تريد حذف المعلم/ة "${name}"؟`)){
teachers.splice(teachers.indexOf(name),1);
alert("تم الحذف بنجاح");
renderTeachersSimple();
updateTeacherSelect();
document.getElementById("teacherName").value="";
}
}
}

function renderTeachersSimple(){
const list=document.getElementById("teachersListSimple");
list.innerHTML="";
teachers.forEach(t=>{
const p=document.createElement("p");
p.textContent=t;
list.appendChild(p);
});
}

function updateTeacherSelect(){
teacherSelect.innerHTML="";
teachers.forEach(name=>{
let option=document.createElement("option");
option.textContent=name;
teacherSelect.appendChild(option);
});
}

function renderPeriodSettings(){
const container=document.getElementById("periodSettings");
container.innerHTML="";
let table=document.createElement("table");
let thead=document.createElement("thead");
thead.innerHTML="<tr><th>الحصة</th><th>التوقيت الجديد</th></tr>";
table.appendChild(thead);
let tbody=document.createElement("tbody");
for(let i=1;i<=8;i++){
let b=bookings.find(x=>x.period==i);
let tr=document.createElement("tr");
tr.innerHTML=`<td>${i}</td><td contenteditable="true">${b?b.period:"-"}</td>`;
tbody.appendChild(tr);
}
table.appendChild(tbody);
container.appendChild(table);
}

updateSchedule();
renderBookings();
renderTeachersSimple();
renderPeriodSettings();