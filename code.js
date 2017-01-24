
  var config = {
    apiKey: "AIzaSyApErB7hsHj_N-1NdAmrq9PkupSS-P2X0k",
    authDomain: "proyecto-diego-78410.firebaseapp.com",
    databaseURL: "https://proyecto-diego-78410.firebaseio.com",
    storageBucket: "proyecto-diego-78410.appspot.com",
    messagingSenderId: "810420667480"
  };
  firebase.initializeApp(config);



var led = document.getElementById('led'),
      els = led.childNodes,
    uid=0, size=15, w=0, h=0, row=0, col=0,
    arr_lights=[];

    var hh = document.getElementById('time-hh'),
      hx = document.getElementById('time-h'),
      mm = document.getElementById('time-mm'),
      mx = document.getElementById('time-m'),
      ss = document.getElementById('time-ss'),
      sx = document.getElementById('time-s');

for(var k=0, len=els.length; k<len; k++){
  if(els[k].nodeType!=1)
    continue;
    w = parseInt(els[k].clientWidth);
  h = parseInt(els[k].clientHeight);
  row   = parseInt(h/size);
    col = parseInt(w/size);

  var t, l, sum=0;
  for(var i=0; i<row; i++){
    for(var j=0; j<col; j++){
      uid++;
      t = size*i;
      l = size*j;
      arr_lights.push( '<div uid="'+uid+'" id="l-'+uid+'" class="light row-'+i+' col-'+j+'" style="top:'+t+'px;left:'+l+'px"></div>');
    }
  }
  els[k].innerHTML = arr_lights.join("");
  arr_lights=[];
}

setInterval(function(){
    var now = new Date(),
        time_hh = parseInt(now.getHours()),
          time_mm = parseInt(now.getMinutes()),
            time_ss = parseInt(now.getSeconds());
    hh.className = "block-digital num-"+parseInt(time_hh/10);
    hx.className = "block-digital num-"+parseInt(time_hh%10);
    mm.className = "block-digital num-"+parseInt(time_mm/10);
    mx.className = "block-digital num-"+parseInt(time_mm%10);
    ss.className = "block-digital num-"+parseInt(time_ss/10);
    sx.className = "block-digital num-"+parseInt(time_ss%10);

}, 1000);


function getUser(){
  return $('#txtUsuario').val();
}


function getHour() {

  return hh.className.slice(-1)+hx.className.slice(-1);
}

function getMinutes() {
  return mm.className.slice(-1)+mx.className.slice(-1);  

}

function getMessage() {

  var vh=parseInt(getHour());
  var vm=parseInt(getMinutes());
  var msg='';
  
    if(vh==9 && vm==0 || vh<9){
      msg="Has madrugado, te mereces un premio";
      return msg;
    }else 
      if(vh==9 && vm<=15){
        msg='Llegaste a la hora';
        return msg;
    }else 
      if(vh==9 && vm>15 || vh>9){
        msg='Has llegado tarde';
        return msg;
      }
    

}

function storageMessage(user,message) {
    eh="9";
    em="00";

    firebase.database().ref('asistencia/'+user).set({
        entrada:{
          hora:eh,
          minuto:em      
        },
        llegada:{
          hora:getHour(),
          minuto:getMinutes()
        },
        mensaje:message

    });
}
function setDataIntoHtml(data) {
  $('#enter').val(data.llegada.hora +':'+ data.llegada.minuto);
  $("#message").val(data.mensaje);
}

function loadForm(data) {

  firebase.database().ref('asistencia/'+data).on('value',function (snapshot) {
    var data=snapshot.val();
    setDataIntoHtml(data);
  });
  
}

$(document).ready(function () {


    $('#btnIngreso').click(function(){
        if($('#txtUsuario').val()==''){
          $('.alert-2').css("display","block");
          $('.alert-1').css("display","none");
              return;
        }else{
              storageMessage(getUser(),getMessage());  
              // $('.alert-1').html('<strong>Buenos días!</strong>&nbsp<span>'+getUser() +',gracias por asistir a ZeHcNaS Corp.</span>');
              $('.alert-1').css("display","block");
              $('.alert-2').css("display","none");
              $('#txtUsuario').val('');
      }
      

    });


    $('.btn-register').click(function () {
       $('.alert-1').css("display","none");
       $('.alert-2').css("display","none");
    })


    $('#btn-search').click(function() {
        loadForm($('#user-search').val());
    });


    //   $('.nav li a').click(function(e) {

    //     $('.nav li').removeClass('active');

    //     var $parent = $(this).parent();
    //     if (!$parent.hasClass('active')) {
    //         $parent.addClass('active');
    //     }
    //     e.preventDefault();
    // });

});

