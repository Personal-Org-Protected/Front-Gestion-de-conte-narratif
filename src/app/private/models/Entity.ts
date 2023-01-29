export interface User{

}
export interface UserIntern{
    
}

export interface Forfait{
    forfaitLibelle:string
    forfaitValue :number
    reduction :number
    isForAuthor :boolean
    idRole: number
}

export interface StoryTelling{
    url: string,
    nameStory: string,
    user_id: string,
    price: 0,
    synopsis: string,
    idTag: 0
}
export interface StoryTellingEdit{
    id:number
    url: string,
    nameStory: string,
    price: 0,
    synopsis: string,
    idTag: 0
}

export interface Idea{

}

export interface Commentary{

}
export interface Tag{

}

export interface Chapitre{

}
export interface Story{

}

export interface Image{

}
export interface Transaction{

}

export interface Library{

}

export interface StoryTellBox{

}

export interface ChangeForfait{

}
export interface UpdateUser{
    
}


