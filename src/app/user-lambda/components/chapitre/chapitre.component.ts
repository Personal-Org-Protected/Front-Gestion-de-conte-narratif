import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { ChapitreDto, ImageDto, StoryDto } from 'src/app/private/models/EntityDto';

@Component({
  selector: 'app-chapitre',
  templateUrl: './chapitre.component.html',
  styleUrls: ['./chapitre.component.scss']
})
export class ChapitreComponent implements OnInit {

  private isOpen = false;
  private isExpanded = false;
private paramaRoute$:string;
private Endpoint:string;
private title:any;
private content:any;
resultChapter$:Observable<ChapitreDto>;
resultStory$:Observable<StoryDto>;
resultImage$:Observable<ImageDto>;
Story:StoryDto;
Image:ImageDto;
  constructor(private route:ActivatedRoute,
    private chapitreApiQuery:HttpApiQueryService<ChapitreDto>,
    private storyApiQuery:HttpApiQueryService<StoryDto>,
    private imageApiQuery:HttpApiQueryService<ImageDto>) {}

 
    async ngOnInit(): Promise<void> {
      this.Endpoint="Chapitre"
      await this.bookAnimation();
      this.getIdChapter();
      this.getChapter(this.paramaRoute$);
      await this.getStory();
      await this.getImage();
  }


  getIdChapter(){
    this.paramaRoute$=this.route.snapshot.paramMap.get('id')?? "No value";
  }





  getChapter(id:string){
    console.log(id)
    this.resultChapter$=this.chapitreApiQuery.getWithDetails(this.Endpoint,id);
  }
  async getStory(){
    const endpoint="Story";
    const response=await lastValueFrom(this.resultChapter$);
    this.resultStory$=this.storyApiQuery.getWithDetails(endpoint,response.idStory.toString());
    const StoryResponse=await lastValueFrom(this.resultStory$);
    this.Story=StoryResponse;
  }
  async getImage(){
    const endpoint="SearchImage";
    const response=await lastValueFrom(this.resultChapter$);
    this.resultImage$=this.imageApiQuery.getWithDetails(endpoint,response.idImage.toString());
    const result=await lastValueFrom(this.resultImage$);
   this.Image=result;
  }



  async  bookAnimation(){

    let openTimer;
    let closeTimer;
    
    document.querySelector(".book")?.addEventListener("click", (ev) => {
     const book: HTMLElement = ev.target as HTMLElement;;
    
     if (!this.isOpen) {
      book.classList.add("open");
      this.isOpen = true;
    
       this.implmentImage(book); //tu peux essayer de le mettre dans ngoninnit
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
     }
    });
      }

      implmentImage(book:HTMLElement){
        if(this.Image.uri!= null)
        book.style.setProperty('--url', 'url('+this.Image.uri+')');
      }
    
}
