export interface ForfaitDto{
    idForfait:number
    forfaitLibelle:string
    forfaitValue :number
    reduction :number
    isForAuthor :boolean
    roleId: number
}

export interface ChapitreDto{
      idChapitre :number
      idImage :number
      idStory :number
      idStoryTelling: number
      order :number

/*       image:ImageDto
      story:StoryDto */
}
export interface ChapitreOrderDto{
      idChapitre :number
      idImage :number
      idStory :number
      idStoryTelling: number
      order :number
      hasPrevious:boolean
      hasNext:boolean

}

export interface CommentaryDto{
      idCommentaire :number
      user_id :string
      commentaire :string
      signal :number
      like:number
      dateCreation:Date

      users:userDisplay
}
export interface IdeaDto{
      idIdee:number
      idea :string
}
export interface IdeaVM{
      ideas:Array<IdeaDto>
}
export interface ImageDto{
      idImage:number
      nomImage :string
      descriptionImage: string
      pathImage :string
      uri :string
      dateCreation: Date
      dateModif :Date
      idTag:number
}

export interface LibraryDto{
    idLibrary:string
    nameLibrary :string
    user_id:string
}



export interface StoryDto{
      idStory : number
      nomStory :string
      textStory :string
      dateCreation :Date
      dateModif :Date
}
export interface StoryTellingDto{
    idStoryTelling :number
    nameStory:string
    price :number
    url :string
    idTag :number
    sypnopsis:string
    idZone :number
    numberRef:number
    finished:boolean
    dateCreation :Date
    rating:number
}

export interface StoryBoxesDto{
      idBox :number
      lastPageChecked :number
       idStoryTell :number
      facade :FacadeDto
}
export interface FacadeDto{
      idStoryTelling:number
      nameStory :string
      url :string
      sypnopsis:string
      price:number
      forfaitPrice:number
      user_id :string
      idTag :number
      idZone:number
      dateCreation:Date
      rating:number
      author:AuthorDto
}

export interface AuthorDto{
      username :string
}
export interface ChaptersDto{
      idChapitre :number
      ChapitreName :string
      narration :string
      url :string
      path:string
      nomImage :string
      descriptionImage :string
      order :number

}


export interface StoryBoxDto{
      idBox :number
      lastPageChecked :number//new
     idStoryTell :number//new
}


export interface ChapterFacadeDto{
      idChapitre :number
      order :number
      idStory:number
      story:StoryDto
}
export interface TagDto{
      idTag :number
      nameTag :string
      numberRef:number
}


export interface tagVM{
      tags:Array<TagDto>
}

export interface TransactionDto{
      nameBook :string
      price :number
      dateTransaction :Date
      storyTellId :number
}

/* 
export interface ForfaitDto{
      idForfait:number
      forfaitLibelle :string
      isForAuthor :boolean
} */


export interface AlreadyRated{
        rated :number
        totalRate:number 
        alreadyRated:boolean
}

export interface userDisplay{
      user_id :string
      email :string
      username :string
      location :string
      birthDate :Date
      phoneNumber :string
      description:string
      avatar :string//new 
}


export interface RoleDto{
      idRole :number
      roleLibelle:string
}

export interface UserRolesDto{
   idRole :number
   roleLibelle :string
}

export interface UserRolesVM{
      userRoles:Array<UserRolesDto>
}

export interface IsRoleDto{
      isRole:boolean
      id:number
}

export interface HaveForfaitDto{
      haveForfait :boolean
      currentForfait: number
}


export interface UserForfaitDto{
      idForfait :number
        forfaitLibelle :string
        forfaitValue :number
         reduction :number
         roleId:number
}
export interface UserForfaitVM{
      userForfaits:Array<UserForfaitDto>
}

export interface HasBeenBoughtDto
{
     isBought :boolean
}

export interface AlreadyInChapter
{
   isAlreadyInChapter :boolean
}

export interface UserIdDto
{
      user_id:string
}

export interface BasketDto{
        basket_id :string
        isEmpty:boolean
}
export interface BasketItems{
      idStoryTelling :number
}

export interface NotificationDto{
      idNotification:number
      title:string
      message:string
      read:boolean 
      created:Date 
}



export interface Translator {
      data: Data
    }
    
    export interface Data {
      translations: Translation[]
    }
    
    export interface Translation {
      translatedText: string
      detectedSourceLanguage: string
    }
    
