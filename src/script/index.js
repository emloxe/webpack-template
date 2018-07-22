import '../style/index.less';


$(function(){
  var is1init = false;  // 判断是否第一次进入第一屏
  var queue = [];
  var speed = 250;  // 打字速度
  var waitTime = 1000;  // 打完单排的等待时间


  init();

  console.log('test');


  function init(){

    pageInit();

    session2show();
  }


  function pageInit(){
    $('#fullPage').fullpage({
      verticalCentered: false,
      // sectionsColor: ['aqua','crimson','green','darkviolet'],
      anchors: ['page1','page2','page3','page4'],
      navigation: true,
       // 滚动到某一屏后产生的动画效果
      afterLoad: function(link, index){
        switch (index){
          case 1:

            if(!is1init){
              $('.J_outline').each(function(value){
                queue.push($(this));
              });
              is1init = true;
              setTimeout(function(){
                queueLoop();
              }, waitTime);
              
            }

            break;
          case 2:
            $('.section2').find('.trans').each(function(){
              $(this).addClass('trans-move')
            });

            break;
          case 3:

            $('.section3').find('.trans').each(function(){
              $(this).addClass('trans-move')
            });

            break;
          case 4:

            $('.section4').find('.trans').each(function(){
              $(this).addClass('trans-move')
            });

            break;
          default :
            break;
        }
      },
      // 离开某一屏后恢复到初始效果
      onLeave: function(link, index){
        
      },
    });
  }


  function queueLoop(){
    if(queue.length >0){
      showOneLine(queue.shift(), function(){
        queueLoop()
      });
    }

  }



  function showOneLine(dom, callback){

    if(dom.data('type') === 'one'){
      let msg = dom.data('msg');
      let showmsg = '';
      let len = msg.length; 

      for(let i = 0; i < len; i++){
        let shiftOne = msg.slice(i, i+1);

        showmsg += shiftOne;


        (function(i, showmsg){
          setTimeout(function(){
            dom.find('span').html(showmsg);
            
          }, speed*i);
          

        })(i, showmsg);
        
      }

      dom.append($('<i class="cursor"></i>'));


      setTimeout(function(){
        dom.find('.cursor').remove();
        callback && callback();
      }, len*speed + waitTime)

    }else{


      dom.find('span').html(dom.data('msg'));
      setTimeout(function(){
        callback && callback();
      }, waitTime)
      
    }



  }


  function session2show(){

    // 判断是否为移动设备
    if( navigator.userAgent.match(/Android/i)  
      || navigator.userAgent.match(/webOS/i)  
      || navigator.userAgent.match(/iPhone/i)  
      || navigator.userAgent.match(/iPad/i)  
      || navigator.userAgent.match(/iPod/i)  
      || navigator.userAgent.match(/BlackBerry/i)  
      || navigator.userAgent.match(/Windows Phone/i)  
      ){

      $('#scroll_wrap .row').width(($(window).width()-15)*3);


      new IScroll('#scroll_wrap', { 
          scrollX: true, 
          scrollY: false, 
          mouseWheel: false 
      });

    }

  }



});








