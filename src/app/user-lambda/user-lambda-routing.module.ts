import { compileClassMetadata } from '@angular/compiler';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchatForfaitComponent } from './components/achat-forfait/achat-forfait.component';
import { BibliothequeComponent } from './components/bibliotheque/bibliotheque.component';
import { ChapitreComponent } from './components/chapitre/chapitre.component';
import { ChapitresComponent } from './components/chapitres/chapitres.component';
import { ForfaitPossedeComponent } from './components/forfait-possede/forfait-possede.component';
import { LireComponent } from './components/lire/lire.component';
import { LivreAfficheComponent } from './components/livre-affiche/livre-affiche.component';
import { StoreComponent } from './components/store/store.component';
import { TransactionProcessComponent } from './components/transaction-process/transaction-process.component';
import { TransactionComponent } from './components/transaction/transaction.component';

const routes: Routes = [
  {path:''
  ,children:[
    {path:"Library", component:BibliothequeComponent},
    {path:'Lecture/:idBox',component:LireComponent},
    {path:'livre',component:LivreAfficheComponent},
    {path:'Chapitres-liste/:id',component:ChapitresComponent},
    {path:'Chapitre-details/:id',component:ChapitreComponent},
    {path:'Store-Librairie',component:StoreComponent},
    {path:'Transaction-process/:id',component:TransactionProcessComponent},
    {path:'Transactions-liste',component:TransactionComponent},
    {path:'Forfait-acheté', component:ForfaitPossedeComponent},
    {path:'Forfait-achat/:id', component:AchatForfaitComponent}
  ]
},
//{path:'**',component:BibliothequeComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLambdaRoutingModule { }
