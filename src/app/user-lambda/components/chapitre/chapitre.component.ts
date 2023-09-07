import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { ChapitreDto, ImageDto, StoryDto, Translator } from 'src/app/private/models/EntityDto';
import {faLanguage,faFilter,faXmark} from '@fortawesome/free-solid-svg-icons'
import { TranslatorService } from 'src/app/private/http/General-Services/translator.service';


@Component({
  selector: 'app-chapitre',
  templateUrl: './chapitre.component.html',
  styleUrls: ['./chapitre.component.scss']
})
export class ChapitreComponent implements OnInit {

  faLanguage=faLanguage;
  faFilter=faFilter;
  faCross=faXmark;
  Intro:string="Prologue"
  Titre:string;
  Text:string;
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
    private imageApiQuery:HttpApiQueryService<ImageDto>,
    private trans:TranslatorService) {}

 
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
    this.resultChapter$=this.chapitreApiQuery.getWithDetails(this.Endpoint,id);
  }
  async getStory(){
    const endpoint="Story";
    const response=await lastValueFrom(this.resultChapter$);
    this.resultStory$=this.storyApiQuery.getWithDetails(endpoint,response.idStory.toString());
    const StoryResponse=await lastValueFrom(this.resultStory$);
    this.Story=StoryResponse;
    this.Text=StoryResponse.textStory;
    this.Titre=StoryResponse.nomStory
  }
  async getImage(){
    const endpoint="SearchImage";
    const response=await lastValueFrom(this.resultChapter$);
    this.resultImage$=this.imageApiQuery.getWithDetails(endpoint,response.idImage.toString());
    const result=await lastValueFrom(this.resultImage$);
   this.Image=result;
  }


filterActive(){

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
    

     async translate(target:string){
        const valueIntro=await this.trans.call(this.Intro,target) as string
        let trad=JSON.parse(valueIntro) 
        this.Intro=trad.data.translations[0].translatedText
        //-----
        const valueTitle=await this.trans.call(this.Titre,target) as string
         trad=JSON.parse(valueTitle) 
        this.Titre=trad.data.translations[0].translatedText
        //-----
        const valueText=await this.trans.call(this.Text,target) as string
         trad=JSON.parse(valueText) 
        this.Text=trad.data.translations[0].translatedText
      }

      default(){
        this.Intro="Prologue";
        this.Titre=this.Story.nomStory;
        this.Text=this.Story.textStory;
      }

      pannelDisplay(){
        const btn= document.querySelector(".filter");
        const pannel= document.querySelector(".alignment");
        pannel?.classList.add("appearance");
        btn?.classList.add("disable");
      }
      pannelDiseapear(){
        const btn= document.querySelector(".filter");
        const pannel= document.querySelector(".alignment");
        pannel?.classList.add("hidden");
        pannel?.classList.remove("appearance");
        btn?.classList.remove("disable");
      }
}
