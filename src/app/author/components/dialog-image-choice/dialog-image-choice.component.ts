import { HttpParams } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems } from 'src/app/private/models/Common';
import { ImageDto } from 'src/app/private/models/EntityDto';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-dialog-image-choice',
  templateUrl: './dialog-image-choice.component.html',
  styleUrls: ['./dialog-image-choice.component.scss']
})
export class DialogImageChoiceComponent implements OnInit {

  faArrowRight=faArrowRight;
  LastPageChecked$:number;
  resultImage$:Observable<PaginatedItems<ImageDto>>;
  Images:Array<ImageDto>;
  constructor(
  private imageApiQuery: HttpApiQueryService<ImageDto>,
  public dialogRef: MatDialogRef<DialogImageChoiceComponent>,) { }

 async ngOnInit(): Promise<void> {
    this.LastPageChecked$=1;
    this.Images=new Array<ImageDto>;
    await this.getImages(this.LastPageChecked$);
  }


  async getImages(pgNumber:number){
    const endpoint="SearchImage"
    let params=new HttpParams();
    params=params.append("pgNumber",pgNumber);
    this.resultImage$=this.imageApiQuery.getWithPaginationParams(endpoint,params);
    const response=await lastValueFrom(this.resultImage$);
    this.Images=response.items;
  }

  chosenImage(image:ImageDto){
    this.dialogRef.close({image:image});
  }



  handlePageEvent(event:PageEvent){
    this.LastPageChecked$= event.pageIndex+1
    this.getImages(this.LastPageChecked$);
  }


}
