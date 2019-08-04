window.onload = () =>{
    // 全局变量
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var isUsingEraser = false;
    var mousedown = false;
    var lineWidth = 3;
    var clear = document.getElementById('clear');
    //工具
    var eraser = document.getElementById('eraser');
    var brush = document.getElementById('brush');
    // 颜色
    var red = document.getElementsByClassName('red');
    var green = document.getElementsByClassName('green');
    var blue = document.getElementsByClassName('blue');
    var black = document.getElementsByClassName('black');
    // 粗细
    var thiner = document.getElementById('thiner');
    var thin = document.getElementById('thin');
    var thick = document.getElementById('thick');
    var thicker = document.getElementById('thicker');

    
    //主函数
    actoSetCanvasSize();
    detectDevices();
    useEraser();
    chooseColor();
    clearCtx();
    chooseThickness();
 
    //监听鼠标事件，包括点击，松开和移动
    function listenToMouse(){
        var newPoint = {x:undefined,y:undefined};
        var lastPoint = {x:undefined,y:undefined};
        //鼠标点击
        document.onmousedown = function(e){
            mousedown = true;
            var x = e.clientX;
            var y = e.clientY;
            lastPoint = {x:x, y:y};
            drawCircle(x,y,lineWidth);
            if(isUsingEraser){
                ctx.clearRect(x-10,y-10,20,20);
            }
        }
        //鼠标移动
        document.onmousemove = function(e){
            var x = e.clientX;
            var y = e.clientY;
            if(mousedown){
                if(isUsingEraser){
                    ctx.clearRect(x-10,y-10,20,20);
                }else{
                    newPoint = {x:x, y:y};
                    drawCircle(x,y,lineWidth);
                    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
                    lastPoint = newPoint;
                }
            }
        }
        //鼠标松开
        document.onmouseup = function(e){
            mousedown = false;
        }
    }
    function listenToTouch(){
        var newPoint = {x:undefined,y:undefined};
        var lastPoint = {x:undefined,y:undefined};
        //鼠标点击
        document.ontouchstart = function(e){
            mousedown = true;
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            lastPoint = {x:x, y:y};
            drawCircle(x,y,5);
            if(isUsingEraser){
                ctx.clearRect(x-10,y-10,20,20);
            }
        }
        //鼠标移动
        document.ontouchmove = function(e){
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            if(mousedown){
                if(isUsingEraser){
                    ctx.clearRect(x-10,y-10,20,20);
                }else{
                    newPoint = {x:x, y:y};
                    drawCircle(x,y,lineWidth);
                    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
                    lastPoint = newPoint;
                }
            }
        }
        //鼠标松开
        document.ontouchover = function(e){
            mousedown = false;
        }
    }
    //点击决定是否使用橡皮擦
    function useEraser(){
        eraser.onclick = function(){
            isUsingEraser = true;
            eraser.classList.add('active');
            brush.classList.remove('active');
        }
        brush.onclick = function(){
            isUsingEraser = false;
            brush.classList.add('active');
            eraser.classList.remove('active');
        }
    }
    
    //设置画布大小和监听窗口大小改变
    function actoSetCanvasSize(){
        setCanvasSize();
        window.onresize = () => {
            setCanvasSize()
        }
    }
    function setCanvasSize(){
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }

    //画圆
    function drawCircle(x,y,radius){
        ctx.beginPath();
        ctx.arc(x,y,radius,0,Math.PI*2);
        ctx.fill();
    }
    //划线
    function drawLine(x1,y1,x2,y2){
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineWidth = lineWidth*2;
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.closePath();
    }

    //特性支持，判断是pc还是移动端
    function detectDevices(){
        console.log(document.body.ontouchstart)
        if(document.body.ontouchstart === undefined ){
            listenToMouse();
        }else{
            listenToTouch();
        }
    }
    //选择画笔颜色
    function chooseColor(){
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
        var colorArr = [black[0],red[0],blue[0],green[0]];
        red[0].onclick = function(e){
            ctx.fillStyle = 'red';
            ctx.strokeStyle = 'red';
            classAction(colorArr,e.target)
        }
        green[0].onclick = function(e){
            ctx.fillStyle = 'green';
            ctx.strokeStyle = 'green';
            classAction(colorArr,e.target)
        }
        blue[0].onclick = function(e){
            ctx.fillStyle = 'blue';
            ctx.strokeStyle = 'blue';
            classAction(colorArr,e.target)
        }
        black[0].onclick = function(e){
            ctx.fillStyle = 'black';
            ctx.strokeStyle = 'black';
            console.log(e);
            classAction(colorArr,e.target)
        }
    }
    //选择画笔粗细
    function chooseThickness(){
        var thicknessArr = [thiner,thin,thick,thicker];
        thiner.onclick = function(e){
            lineWidth = 3;
            classAction(thicknessArr,thiner);
        }
        thin.onclick = function(e){
            lineWidth = 5;
            classAction(thicknessArr,thin);
        }
        thick.onclick = function(e){
            lineWidth = 7;
            classAction(thicknessArr,thick);
        }
        thicker.onclick = function(e){
            lineWidth = 9;
            classAction(thicknessArr,thicker);
        }
    }
    //清除内容
    function clearCtx(){
        clear.onclick = function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
        }
    }
    //重置状态
    function resetState(){
        isUsingEraser = false;
        brush.classList.add('active');
        eraser.classList.remove('active');
        // 颜色
        black.classList.add('active');
        red.classList.remove('active');
        red.classList.remove('active');
        red.classList.remove('active');
        
    }
    //增加和移除class
    function classAction(colorArr,target){
        colorArr.forEach(item => {
            if(item === target){
                item.classList.add('active');
            }else{
                item.classList.remove('active');
            }
        })
    }
}


   
    

