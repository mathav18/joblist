fetch('./data.json')
.then((data)=>{
    return data.json();
})
.then((res)=>{
    creatBox(res);
});


let feed=document.getElementById("feeds");
let sea=document.getElementById("search");
sea.style.display="none";
let searchBox=document.getElementById("display");
let filterArray=[];
let data;


function creatBox(arr){
  data=arr;
    for(let i=0;i<arr.length;i++){
    let sr=arr[i].logo
   
    let main=document.createElement("div");
   
    feed.appendChild(main).id=`main${i+1}`;
    main.classList.add("main")

   

    let avatar=document.createElement("img");
    sr=sr.split("/")
    main.appendChild(avatar).id="avatarImg"
    avatar.src=sr[2];

    let userData=document.createElement("div");
    main.appendChild(userData).id="userData";

    let fst=document.createElement("div");
    userData.appendChild(fst).id="fst";
    fst.innerText=arr[i].company;

    if(arr[i].new==true){
        let newDiv=document.createElement("div");
        fst.appendChild(newDiv).id="newDiv";
        newDiv.innerText="new!"
    }
    if(arr[i].featured==true){ 
        let newDiv2=document.createElement("div");
        fst.appendChild(newDiv2).id="newDiv2";
        newDiv2.innerText="featured"
    }

    let sec=document.createElement("div");
    userData.appendChild(sec).id="sec";
    sec.innerText=arr[i].position;

    let third=document.createElement("div");
    userData.appendChild(third).id="third";
    third.innerText=arr[i].postedAt+"."+arr[i].contract+"."+arr[i].location;

    let lan=document.createElement("div");
    main.appendChild(lan).id="lan";

  
    for(let j=0;j<arr[i].languages.length;j++){
       let datails=document.createElement("div");
       lan.appendChild(datails).id="datails";
       datails.innerText=arr[i].languages[j];
       datails.setAttribute("onclick","filter(this.innerText)");
    }

     let level=document.createElement("div");
     lan.appendChild(level).id="datails";
     level.innerText=arr[i].level;
     level.setAttribute("onclick","filter(this.innerText)");

     let pos=document.createElement("div");
     lan.appendChild(pos).id="datails";
     pos.innerText=arr[i].role;
     pos.setAttribute("onclick","filter(this.innerText)");
 }
}

function filter(val){
  
    sea.style.display="block"
    sea.style.display="grid"
  
    let c=1;

if(!filterArray.includes(val)){
    if(val!=""){
    filterArray.push(val);
    searchBox.style.display="gird";
    searchBox.innerHTML+=`<div id="query"><p>${val}</p>
    <button id="remo" onclick='remover(this)'>X</button ></div>`
    }
}
console.log(filterArray);
for(let i of data){
    let count=0;
    for(let j=0;j<filterArray.length;j++){
        if(i.languages.includes(filterArray[j])||i.role.includes(filterArray[j])||i.level.includes(filterArray[j])){
            count++;
        }
     }
   
    
    if(count==filterArray.length){
        let show=document.getElementById(`main${c}`);
        show.style.display="grid";
        c++;
        }else
        {
        let hide=document.getElementById(`main${c}`);
        hide.style.display="none";
       c++;
    }
 }
}

function remover(child){
    let parent=child.parentNode;
let val=parent.firstChild.innerText;
console.log(val);
child.style.display="none";
parent.style.display="none"
let index=filterArray.indexOf(val);
console.log(index);
console.log(filterArray.splice(index,1));
console.log(filterArray);
if(filterArray.length==0)
{
   clearArray();
}
else{
filter("");
}

}


function clearArray(){
  
   display.innerHTML="";
   filterArray=[];
   feed.innerHTML="";
   creatBox(data);
   search.style.display='none';
  }