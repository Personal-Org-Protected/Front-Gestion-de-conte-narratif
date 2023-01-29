import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLambdaRoutingModule } from './user-lambda-routing.module';
import { UserLambdaComponent } from './user-lambda.component';

import { TransactionComponent } from './components/transaction/transaction.component';
import { ForfaitPossedeComponent } from './components/forfait-possede/forfait-possede.component';
import { StoreComponent } from './components/store/store.component';
import { BibliothequeComponent } from './components/bibliotheque/bibliotheque.component';
import { TransactionProcessComponent } from './components/transaction-process/transaction-process.component';
import { ChapitresComponent } from './components/chapitres/chapitres.component';
import { ChapitreComponent } from './components/chapitre/chapitre.component';
import { LireComponent } from './components/lire/lire.component';
import { LivreAfficheComponent } from './components/livre-affiche/livre-affiche.component';
import { PrivateModule } from '../private/private.module';
import { SharedModule } from '../shared/shared.module';
import { AchatForfaitComponent } from './components/achat-forfait/achat-forfait.component';


@NgModule({
  declarations: [
    UserLambdaComponent,
    TransactionComponent,
    ForfaitPossedeComponent,
    StoreComponent,
    BibliothequeComponent,
    TransactionProcessComponent,
    ChapitresComponent,
    ChapitreComponent,
    LireComponent,
    LivreAfficheComponent,
    AchatForfaitComponent
  ],
  imports: [
    CommonModule,
    UserLambdaRoutingModule,
    SharedModule
   // PrivateModule
  ]
})
export class UserLambdaModule { }
