/*setTimeout(()=>{
    console.log("Hello 1")
},1000)
setTimeout(()=>{
    console.log("Hello 2")
},1000)*/
/*setInterval(()=>{
    console.log("alaram")},5000
)*/
function welcome(name, callback){
    console.log("Hello "+ name)
    callback()
}
function display(){
    console.log("Welcome to Backend 75");
}
welcome("Nathisooriya", display)



