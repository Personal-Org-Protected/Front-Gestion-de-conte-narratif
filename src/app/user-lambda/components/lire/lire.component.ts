import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { ChapitreDto, ChapitreOrderDto, ImageDto, StoryBoxDto, StoryDto } from 'src/app/private/models/EntityDto';
import { CommonService } from 'src/app/private/services/common.service';


@Component({
  selector: 'app-lire',
  templateUrl: './lire.component.html',
  styleUrls: ['./lire.component.scss'],
  
})
export class LireComponent  {
  private isOpen = false;
  private isExpanded = false;
private paramRouteIdBox$!:string;
private Endpoint!:string;
private title:any;
private content:any;
private StoryBox!:StoryBoxDto;
private CurrentUser$!: string;
private lastPageChecked$!:number;
//resultChapter$:Observable<ChapitreDto>;
Chapter!:ChapitreOrderDto;
resultStory$!:Observable<StoryDto>;
resultImage$!:Observable<ImageDto>;
Story!:StoryDto;
Image!:ImageDto;

  constructor(
    private chapitreApiQuery:HttpApiQueryService<ChapitreOrderDto>,
    private storyApiQuery:HttpApiQueryService<StoryDto>,
    private imageApiQuery:HttpApiQueryService<ImageDto>,
    private storyBoxApiQuery:HttpApiQueryService<StoryBoxDto>,
    private storyBoxApiCommand:HttpApiCommandService<StoryDto>,
    private router:Router,
    private common:CommonService,
    private route:ActivatedRoute) {}

 
    async ngOnInit(): Promise<void> {
      this.Endpoint="Chapitre"
      await this.bookAnimation();
      this.getBox();
      this.getUserid();
      await this.getStoryBox();
      await this.getChapterByOrder(this.StoryBox.lastPageChecked);
  }

  getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
    this.CurrentUser$=this.common.formatUserId(id); 
  }

  async getStoryBox(){
  const endpoint="StoryBox"
   const response= this.storyBoxApiQuery.getWithDetails(endpoint,this.paramRouteIdBox$);
   this.StoryBox=await lastValueFrom(response);
   this.lastPageChecked$=this.StoryBox.lastPageChecked;
  }

  getBox(){
    this.paramRouteIdBox$=this.route.snapshot.paramMap.get('idBox')?? "No value";
  }





  async getChapterByOrder(order:number){
    const endpoint=this.Endpoint+"/Order";
    let params= new HttpParams();
    params=params.append("id",order);
    const response=this.chapitreApiQuery.getWithDetailsParams(endpoint,this.StoryBox.idStoryTell.toString(),params);

    this.Chapter=await lastValueFrom(response);
  console.log(this.Chapter)
    await this.getImage();
    await this.getStory();
  }
  async getStory(){
    const endpoint="Story";
    this.resultStory$=this.storyApiQuery.getWithDetails(endpoint,this.Chapter.idStory.toString());
    const StoryResponse=await lastValueFrom(this.resultStory$);
    this.Story=StoryResponse;
  }
  async getImage(){
    const endpoint="SearchImage";
    this.resultImage$=this.imageApiQuery.getWithDetails(endpoint,this.Chapter.idImage.toString());
    const result=await lastValueFrom(this.resultImage$);
   this.Image=result;
  }



  async  bookAnimation(){

    let openTimer;
    let closeTimer;
    
    document.querySelector(".book")?.addEventListener("click", async (ev) => {
     const book: HTMLElement = ev.target as HTMLElement;;

     if (!this.isOpen) {
      book.classList.add("open");
      this.isOpen = true;
       this.implmentImage(book); //tu peux essayer de le mettre dans ngoninnit
       this.setOrderExpand();
      openTimer = setTimeout(() => {
       book.classList.add("expanded");
       this.isExpanded = true;
      }, 800);
     } else if (this.isExpanded) {
      book.classList.remove("expanded");
      this.isExpanded = false;
    
      closeTimer = setTimeout(() => {
       book.classList.remove("open");
       this.isOpen = false;
      }, 800);

      await this.StopReading();
      setTimeout(() => {
        this.router.navigate(['/Private/'+this.CurrentUser$+'/User-lambda/Chapitres-liste/'+this.paramRouteIdBox$]);
      }, 1400); 

     }
    });
      }

      implmentImage(book:HTMLElement){
        if(this.Image.uri!= null)
        book.style.setProperty('--url', 'url('+this.Image.uri+')');
      }
    

      setOrderExpand(){
        const previousOrder=document.querySelector(".previous") as HTMLElement;
        const nextOrder=document.querySelector(".next") as HTMLElement;
        if(this.Chapter.hasNext)
        setTimeout(() => {
          nextOrder.style.pointerEvents="unset";
          nextOrder.style.opacity="1";
          nextOrder.style.transition="all 1s ease-in-out"
          //nextOrder.classList.add("appear");
        }, 1000);
        if(this.Chapter.hasPrevious)
        setTimeout(() => {
          previousOrder.style.pointerEvents="unset";
          previousOrder.style.opacity="1";
          previousOrder.style.transition="all 1s ease-in-out"
          //previousOrder.classList.add("appear");
        }, 1000);
      }

      setOrderClose(){
        const previousOrder=document.querySelector(".previous") as HTMLElement;
        const nextOrder=document.querySelector(".next") as HTMLElement;
        if(this.Chapter.hasNext)
        setTimeout(() => {
          nextOrder.style.pointerEvents="none";
          nextOrder.style.opacity="0";
          nextOrder.style.transition="all 1s ease-in-out"
          //nextOrder.classList.remove("appear");
        }, 0);
        if(this.Chapter.hasPrevious)
        setTimeout(() => {
          previousOrder.style.pointerEvents="none";
          previousOrder.style.opacity="0";
          previousOrder.style.transition="all 1s ease-in-out"
          //previousOrder.classList.remove("appear");
        }, 0);
      }

//change page--------------
     async changePage(order:number){
this.lastPageChecked$=order;
        let openTimer;
        let closeTimer;
        const sectionOrder=document.querySelector(".order") as HTMLElement;;
       const book= document.querySelector(".book") as HTMLElement;
       if (this.isExpanded) {
        book.classList.remove("expanded");
        this.isExpanded = false;
       this.setOrderClose();
        closeTimer = setTimeout(() => {
         book.classList.remove("open");
         this.isOpen = false;
        }, 800);
       }

       setTimeout(async () => {
        await this.getChapterByOrder(order);
       }, 1200);
       setTimeout(() => {
        book.classList.add("open");
        this.isOpen = true;
    this.setOrderExpand();
         this.implmentImage(book); //tu peux essayer de le mettre dans ngoninnit
        openTimer = setTimeout(() => {
         book.classList.add("expanded");
         this.isExpanded = true;
        }, 800);
       }, 1500);

      }


      async StopReading(){
        
      const endpoint="StoryBox/Stop-Reading";
      const ids=this.paramRouteIdBox$+'/'+this.lastPageChecked$;

      const response= this.storyBoxApiCommand.putSpec(endpoint,ids);
      const result=await lastValueFrom(response)
      console.log(result);   
      
      }
}
