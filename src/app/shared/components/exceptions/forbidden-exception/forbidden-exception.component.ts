import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forbidden-exception',
  templateUrl: './forbidden-exception.component.html',
  styleUrls: ['./forbidden-exception.component.scss']
})
export class ForbiddenExceptionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
this.animEye();
  }


  animEye(){
    var root = document.documentElement;
    var eyef = document.getElementById('eyef');
    var cx = document.getElementById("eyef")!.getAttribute("cx");
    var cy = document.getElementById("eyef")!.getAttribute("cy");
    
    document.addEventListener("mousemove", evt => {
      let x = evt.clientX / innerWidth;
      let y = evt.clientY / innerHeight;
    
      root.style.setProperty("--mouse-x", x.toString());
      root.style.setProperty("--mouse-y", y.toString());
      
      cx = (115 + 30 * x).toString()  ;
      cy = (50 + 30 * y).toString();
      eyef!.setAttribute("cx", cx!);
      eyef!.setAttribute("cy", cy!);
      
    });
    
    document.addEventListener("touchmove", touchHandler => {
      let x = touchHandler.touches[0].clientX / innerWidth;
      let y = touchHandler.touches[0].clientY / innerHeight;
    
      root.style.setProperty("--mouse-x", x.toString());
      root.style.setProperty("--mouse-y", y.toString());
    });
  }
}
