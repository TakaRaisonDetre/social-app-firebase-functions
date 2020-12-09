//helper 
const isEmpty = (string)=>{
    if(string.trim()==='') return true;
    else return false
}
const isEmail = (email) =>{
    const regEx =/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(email.match(regEx)) return true;
    else return false;
};


exports.validateSignUpData =(data)=>{
    // initialie error object     
let errors = {};

if(isEmpty(data.email)){
   errors.email ="must not be empty"
} else if (!isEmail(data.email)){
   errors.email = "must be valid email address"
}

if(isEmpty(data.password)) errors.password = "must not be empty"
if(data.password !== data.confirmPassword) errors.confirmPassword = "Password must match"
if(isEmpty(data.handle)) errors.handle = "must not be empty"


return {
    errors,
    valid: Object.keys(errors).length===0 ?  true : false
}
}

exports.validateLoginData =(data)=>{
    let errors ={};
     if(isEmpty(data.email)) errors.email ='must not be empty';
     if(isEmpty(data.password)) errors.password ='must not be empty';
     if(Object.keys(errors).length>0) return res.status(400).json(errors);
     return {
        errors,
        valid: Object.keys(errors).length===0 ?  true : false
    }
}

exports.reduceUserDetails =(data)=> {
    let userDetails = {};
    
    if(!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
    if(!isEmpty(data.website.trim())) {
        // https //web
          if(data.website.trim().substring(0, 4)!=='http'){
              userDetails.website =`http://${data.website.trim()}`;
          }else userDetails.website = data.website;
    }
    if(!isEmpty(data.location.trim())) userDetails.location = data.location;
    return userDetails;
}