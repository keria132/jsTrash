//DOM Functions

//DOM Statements


//Get single element by class

// function getByClass(class, ...args){
// 	if(args[0] == "All"){
// 		return document.querySelectorAll(class);
// 	}else{
// 		return document.querySelector(class);
// 	}
// }

// let getElement = {
// 	byClass(elemClass, ...args){
// 		if (args[0] != null){
// 			if(args[0] == "All"){
// 				return document.querySelectorAll(elemClass)
// 			}
// 			else{console.log("Undefined argument");}
// 		}else{
// 			return document.querySelector(elemClass);
// 		}
// 	}
// }

function getByClass(className, ...args){
	if(args[0]!==undefined){
		if(args[0]=="All"){
			return document.querySelectorAll('.'+className);
		}else{
			throw new SyntaxError("Argument is incorrect!")
		}
	}else{
		if([...className][0] != '.'){
			console.log('Add "." in class name');
			return document.querySelector('.'+className)
		}else{
			return document.querySelector(className);
		}
	}
}
