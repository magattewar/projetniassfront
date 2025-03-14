import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICommande } from '../model/commande.model';
import { Subscription } from 'rxjs';
import { CommandeService } from '../commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {


  checkAuth() {
    if (localStorage.getItem('authorities') != 'ROLE_ADMIN')
      this.router.navigate(['accessdenied']);
  }

  commandes?: ICommande[];
  eventSubscriber?: Subscription;

  constructor(private router: Router,protected commandeService: CommandeService) {

    this.checkAuth();
  }

  loadAll(): void {
    this.commandeService.getCommandes().subscribe(res=>{
      console.log(res);
      this.commandes = res;
    },
    err=>{
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCommandes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      // this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICommande): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCommandes(): void {
    // this.eventSubscriber = this.eventManager.subscribe('commandeListModification', () => this.loadAll());
  }

  delete(commande: ICommande): void {
    // const modalRef = this.modalService.open(CommandeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    // modalRef.componentInstance.commande = commande;
  }

}
