// http://stackoverflow.com/a/23371115/604040





 
  
    document.addEventListener('DOMContentLoaded', function(){
      var pages = document.getElementsByClassName('page');
      for(var i = 0; i < pages.length; i++)
        {
          var page = pages[i];
          if (i % 2 === 0)
            {
              page.style.zIndex = (pages.length - i);
            }
        }
      for(var i = 0; i < pages.length; i++)
        {
          //Or var page = pages[i];
          pages[i].pageNum = i + 1;
          pages[i].onclick=function()
            {
              if (this.pageNum % 2 === 0)
                {
                  this.classList.remove('flipped');
                  this.previousElementSibling.classList.remove('flipped');
                }
              else
                {
                  this.classList.add('flipped');
                  this.nextElementSibling.classList.add('flipped');
                }
             }
          }
    });







/*  $('.page').click(function() {
    alert('page triggered');
    $(this).removeClass('no-anim').toggleClass('flipped');
   $('.page > div').click(function(e) {
        e.stopPropagation();
   });
 reorder()   
});
function reorder(){
    alert("in the reorder method");
   $(".book").each(function(){
    var pages=$(this).find(".page")
    var pages_flipped=$(this).find(".flipped")
    pages.each(function(i){
        $(this).css("z-index",pages.length-i)
    })
    pages_flipped.each(function(i){
        $(this).css("z-index",i+1)
    })
   });    
}
 reorder() 
     */