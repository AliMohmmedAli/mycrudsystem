let title = document.getElementById("title");
let price =  document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
submit.addEventListener('click',create_Product);
 let mood ='create';
 let tmp;
/* get_Total */
function get_Total(){
    if(price.value != ''){
  let result = (+price.value + +taxes.value + +ads.value)- +discount.value; /* convert values from str for number */
 total.innerHTML = result;
 total.style.background = 'red';
    }else{
        total.innerHTML = '';
        total.style.background = ' #165f3b6b';
    }
}
/* create product */
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}
else{
    dataPro = [];
}
function  create_Product(){
    let productData = {
        title : title.value,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value,
    }
      
  if(title.value &&price.value &&category.value !=null){


    if(mood ==='create'){
        if(productData.count >1){
            for(let i = 0; i < productData.count; i++){
                dataPro.push(productData);
            }
          }else{
            dataPro.push(productData);      
          }
    }else{
           dataPro[tmp] =  productData;
           mood = 'create';
           submit.innerHTML = 'create'
           count.style.display = 'block'
    }



  }else{
    blankData();
  }
 //save data in local storge
  localStorage.setItem("product", JSON.stringify(dataPro));
 
  showData();
}
function blankData(){
    title.value = ''
     price.value = '';
     taxes.value = '';
     ads.value = '';
     discount.value = '';
     total.innerHTML = '';
     count.value = '';
     total.innerHTML = '';
     category.value = '';
}
function showData(){
let table = '';
for(let i = 0; i < dataPro.length; i++){
    table +=   ` 
     <tr>
    <td>${i+1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
  <td><button id =  "updata" onclick = "updataData(${i})  ">updata</button></td>
<td> <button onclick="deletedata(${i})"> delete</button></td>
</tr>
    `   
    
}

document.getElementById("tbody").innerHTML = table;
let BtnDelete = document.getElementById("deleteAll");
if(dataPro.length >0){
    BtnDelete.innerHTML= `
    <td> <button onclick = "DeleteAll()"> delete All</button></td>
    `
}else{
    BtnDelete.innerHTML = '';
}

}
showData()
function deletedata(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
function updataData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    get_Total();
    category.value = dataPro[i].category;
    count.style.display = 'none'
    submit.innerHTML = 'updata'
    scroll({
        top:0,
        behavior:"smooth"
    })
   tmp = i;
   mood = 'updata'
   
    
}

 function DeleteAll(){
  localStorage.clear();
  dataPro.splice(0);
  showData();
 }
 let SearchMood = 'title';
 let Search = document.getElementById("SearchData");
 function searchmood(id){
    if(id === 'SearchTitle')  {
        SearchMood = 'title';

    }else {
        SearchMood = 'category';
    }
    Search.placeholder = 'Search By '+   SearchMood;
    Search.focus();
    

 }
 function Searchaboutinfo(value){
   let table = '';
   for(let i = 0; i<dataPro.length; i++){
    if( SearchMood === 'title'){
        if(dataPro[i].title.includes(value.toLowerCase())){
            table +=   ` 
            <tr>
           <td>${i}</td>
           <td>${dataPro[i].title}</td>
           <td>${dataPro[i].price}</td>
           <td>${dataPro[i].taxes}</td>
           <td>${dataPro[i].ads}</td>
           <td>${dataPro[i].discount}</td>
           <td>${dataPro[i].total}</td>
           <td>${dataPro[i].category}</td>
         <td><button id =  "updata" onclick = "updataData(${i})  ">updata</button></td>
       <td> <button onclick="deletedata(${i})"> delete</button></td>
       </tr>
           `   
        }
    }else{
        if(dataPro[i].category.includes(value.toLowerCase())){
            table +=   ` 
            <tr>
           <td>${i}</td>
           <td>${dataPro[i].title}</td>
           <td>${dataPro[i].price}</td>
           <td>${dataPro[i].taxes}</td>
           <td>${dataPro[i].ads}</td>
           <td>${dataPro[i].discount}</td>
           <td>${dataPro[i].total}</td>
           <td>${dataPro[i].category}</td>
         <td><button id =  "updata" onclick = "updataData(${i})  ">updata</button></td>
       <td> <button onclick="deletedata(${i})"> delete</button></td>
       </tr>
           `   
        }
    }
   }
   document.getElementById("tbody").innerHTML = table;
 }