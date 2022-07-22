// const person={
//     name:'Jon Doe',
//     age:30
// }


console.log(__dirname,__filename);
//module wrapper function

class Person{
    constructor(name,age){
        this.name=name
        this.age=age
    }
    greeting(){
        console.log(`My name is ${this.name} and I am ${this.age}`);
    }
}

module.exports=Person