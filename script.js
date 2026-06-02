let op1="0",op2="",operator=[];
let op_flag = 0;
let pair=0;


function calculate(operand1,operand2,operator){
    if ( !(operand1 && operand2) ) return ;
    let num1 = Number(operand1);
    let num2 = Number(operand2);
    let result;

    if (operator === "+") {
        result = num1 + num2;
    } else if (operator === "-") {
        result = num1 - num2;
    } else if (operator === "*") {
        result = num1 * num2;
    } else if (operator === "%") {
        if (num2 === 0) {
            result = "Error: Division by zero";
            return result;
        } else {
            result = num1 / num2;
        }
    } else {
        result = "Invalid operator";
    }
    return result.toFixed(2) ;
}
function show() {
    const dis = document.querySelector("#display");
    
    // Wrap the ternary operator in parentheses so it processes correctly
    let currentOperator = (operator.length > 0) ? operator[0] : "";
    
    dis.textContent = op1 + currentOperator + op2;
}
function display(){
    const dis = document.querySelector("#display");
    const cal = document.querySelector(".c_body");
    let text = "";
    let ans="";
    show();
    cal.addEventListener("click",function (e){
        console.log(e.target.className);
        if (e.target.className=="operation button" ) {
            if (pair==1 && op_flag==1)
            {
                operator.pop();
                operator.push(e.target.id)
                text=op1;
            }
            else {
            operator.push(e.target.id)
            op_flag++;
            }
        }
        if (e.target.className=="num button" ||e.target.className=="operation button" )
        {
            if (op_flag <= 1 ){
                console.log(e.target.id);
                // text=text+e.target.id;
                // dis.textContent = text;
                if (op_flag==0 && e.target.className=="num button" ) 
                    {
                        if (op1 === "0" || op1 === "") {
                                op1 = e.target.id;
                            } else {
                                op1 = op1 + e.target.id;
                            }
                        pair=1;
                    }
                if (op_flag==1 && e.target.className=="num button" ) 
                    {
                        op2 = op2+e.target.id;
                        pair=2;
                    }
                show();
            }
            else if (op_flag == 2){
                op1 = calculate(op1,op2,operator[0]);
                op2="";
                operator.splice(0,1);
                text=op1+operator[0];
                op_flag=1;
                pair=1;
                // dis.textContent = text;
                show();
            }
        }
        else if (e.target.id=='='){
            if (op1 && op2)
            result=calculate(op1,op2,operator[0]);
            op1=result;
            op2='';
            text=result;
            op_flag=0;
            pair=1;
            operator.pop();
            // dis.textContent = text;
            show();
        }
        else if (e.target.id=="clear")
        {
            op1='0';
            op2='';
            operator=[];
            op_flag=0;
            pair=0;
            text=""
            // dis.textContent = text;
            show();
        }
        else if (e.target.id=="delete")
        {
            //op1 , op2 , operator 
            // pair = 1 , flag=0 

            //op1 
            if (pair==1 && op_flag==0)
            {
                op1=op1.slice(0,-1);
                if (op1=="") 
                {   op1='0';
                    pair=0;
                }

            }
            else if (pair==2 && op_flag==1)
            {
                op2=op2.slice(0,-1);
                if (op2=="")
                {
                    pair=1;
                }
            }
            else if (pair==1 && op_flag==1)
            {
                operator.splice(0,1);
                op_flag=0;
            }
            show();
            console.log(operator);

        }
    })
}

display();