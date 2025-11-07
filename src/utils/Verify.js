const regs = {
  password: /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*_]{8,}$/
}

const vertify = (rule, value , reg , callback) => {
  if(value){
    if(reg.test(value)){
      callback();

    }else{
      callback(new Error(rule.message))
    }
  }else{
    callback();
  }
}

export default {
  password: (rule , value , callback) => {
    return vertify(rule,value, regs.password , callback);
  }
}