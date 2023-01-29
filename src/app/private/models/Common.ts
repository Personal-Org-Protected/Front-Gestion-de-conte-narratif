export interface PaginatedItems<T>{

    items :Array<T>
    pageNumber :number
    totalPages :number
    totalCount :number
}

export interface Result{
      idEntity :number
      Succeeded :boolean;
      Msg :string
     Errors :string[]
}

