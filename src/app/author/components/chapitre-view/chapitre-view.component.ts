import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { text } from '@fortawesome/fontawesome-svg-core';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { Chapitre, Story } from 'src/app/private/models/Entity';
import { ChapitreDto, ImageDto, StoryDto } from 'src/app/private/models/EntityDto';

@Component({
  selector: 'app-chapitre-view',
  templateUrl: './chapitre-view.component.html',
  styleUrls: ['./chapitre-view.component.scss']
})
export class ChapitreViewComponent implements OnInit {

    private isOpen = false;
    private isExpanded = false;
     isTexteArea=false;
     isInput=false;
  private paramaRoute$:string;
  private Endpoint:string;
  private title:any;
  private content:any;
  resultChapter$:Observable<ChapitreDto>;
  resultStory$:Observable<StoryDto>;
  resultImage$:Observable<ImageDto>;
  StoryForm:FormGroup;
  Story:StoryDto;
  Image:ImageDto;

  constructor(private route:ActivatedRoute,
    private chapitreApiQuery:HttpApiQueryService<ChapitreDto>,
    private storyApiQuery:HttpApiQueryService<StoryDto>,
    private imageApiQuery:HttpApiQueryService<ImageDto>,
    private formBuilder:FormBuilder,
    private storyApiCommand:HttpApiCommandService<Story>) {

     }


  async ngOnInit(): Promise<void> {
    this.Endpoint="Chapitre"
    await this.bookAnimation();
    this.getIdChapter();
    this.getChapter(this.paramaRoute$);
    await this.getStory();
    await this.getImage();
   this.innnitForm(this.Story.nomStory,this.Story.textStory);
  }

  innnitForm(title:string,content:string){
    this.StoryForm=this.formBuilder.group({
      idStory:[this.Story.idStory,[Validators.required,Validators.min(1)]],
      nomStory:[title,[Validators.required, Validators.maxLength(40)]],
      textStory: [content,[Validators.required,Validators.minLength(20),Validators.maxLength(400)]],
    });
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


  TextAreaMode(){
    console.log("textArea mode");
    var e = document.getElementsByTagName('p')[0];
    var d = document.createElement('textarea');
    this.content=e;
    d.cols=38;
    d.rows=15;
    d.textContent=e.textContent ;
    e.parentNode?.replaceChild(d, e);
    this.isTexteArea=true;
  }
  backToTextMode(){
    var e = document.getElementsByTagName('textarea')[0];
    var d = document.createElement('p');
    d=this.content;
    d.textContent=e.value ;
    e.parentNode?.replaceChild(d, e);
    this.isTexteArea=false;
    return e.value;
  }

  inputMode(){
    console.log("input mode");
    var e = document.getElementsByTagName('h3')[0];
    var d = document.createElement('input');
    this.title=e;
    d.value=e.textContent!;
    e.parentNode?.replaceChild(d, e);
    this.isInput=true;
  }
  backToTitleMode(){
    var e = document.getElementsByTagName('input')[0];
    var d = document.createElement('h3');
    d=this.title;
    d.textContent=e.value ;
    e.parentNode?.replaceChild(d, e);
    this.isInput=false;
    return e.value;
  }

  async backToOriginal(){
    let title:string="";
    let content:string="";
    if(this.isTexteArea && this.isInput)
    {content=this.backToTextMode()!;title=this.backToTitleMode();}
    this.innnitForm(title,content);
    await this.submit();
  }
  FormMode(){
    if(!this.isTexteArea && ! this.isInput){
      this.TextAreaMode();
      this.inputMode()
    }
  }

  async submit(){
    if(this.StoryForm.valid){
    const endpoint="Story"
   const response= this.storyApiCommand.put(this.StoryForm.value,endpoint,this.Story.idStory.toString());
    const result= await lastValueFrom(response);
    console.log(result);
    await this.getStory(); }
  } 
}
