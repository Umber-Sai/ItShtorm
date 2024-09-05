import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../../services/constants.service';
import { ConsultationPopupComponent } from '../../popups/consultation-popup/consultation-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  p = this.routerService.navPoints
  
  constructor(
    public cs: ConstantsService,
    private dialog: MatDialog,
    public routerService : RouterService,
  ) { }

  ngOnInit(): void {
  }

  openPopup() {
    const dialogRef = this.dialog.open(ConsultationPopupComponent);
  }
}
