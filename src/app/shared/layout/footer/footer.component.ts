import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../../services/constants.service';
import { ConsultationPopupComponent } from '../../popups/consultation-popup/consultation-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    public cs: ConstantsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openPopup() {
    const dialogRef = this.dialog.open(ConsultationPopupComponent);
  }
}
